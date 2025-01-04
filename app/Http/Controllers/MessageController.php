<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class MessageController extends Controller {
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $messages = Message::with('user')->where('user_id', Auth::id())->orderBy('created_at', 'asc')->get();

        return Inertia::render('Chat', [
            'messages' => $messages,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        try {
            // Log incoming request
            Log::info('Chat request received', [
                'user_id' => Auth::id(),
                'message' => $request->message
            ]);

            $validated = $request->validate([
                'message' => 'required|string',
            ]);

            // Save user's message
            $message = Message::create([
                'user_id' => Auth::id(),
                'content' => $validated['message'],
                'is_user' => true,
            ]);

            Log::info('User message saved', ['message_id' => $message->id]);

            // Get API key
            $key = config('services.gemini.key');
            if (!$key) {
                throw new \Exception('Gemini API key not configured');
            }

            // Prepare API request
            $apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key={$key}";
            $requestBody = [
                'contents' => [
                    'parts' => [
                        ['text' => $validated['message']],
                    ],
                ],
            ];

            Log::info('Sending request to Gemini API', [
                'url' => $apiUrl,
                'request_body' => $requestBody
            ]);

            // Send request to Gemini
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post($apiUrl, $requestBody);

            // Log raw response for debugging
            Log::info('Received response from Gemini API', [
                'status' => $response->status(),
                'body' => $response->body()
            ]);

            if (!$response->successful()) {
                throw new \Exception('Gemini API request failed: ' . $response->body());
            }

            $responseData = $response->json();

            // Validate response structure
            if (!isset($responseData['candidates'][0]['content']['parts'][0]['text'])) {
                Log::error('Invalid Gemini API response structure', [
                    'response' => $responseData
                ]);
                throw new \Exception('Invalid response structure from Gemini API');
            }

            $aiMessage = $responseData['candidates'][0]['content']['parts'][0]['text'];

            // Save AI response
            $aiResponse = Message::create([
                'user_id' => Auth::id(),
                'content' => $aiMessage,
                'is_user' => false,
            ]);

            Log::info('AI response saved', ['message_id' => $aiResponse->id]);

            // Return whole conversation
            $messages = Message::with('user')->where('user_id', Auth::id())->orderBy('created_at', 'asc')->get();

            return response()->json([
                'success' => true,
                'messages' => $messages
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::warning('Validation failed', [
                'errors' => $e->errors()
            ]);
            return response()->json([
                'success' => false,
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error in chat processing', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing your message: ' . $e->getMessage()
            ], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy() {
        try {
            Message::where('user_id', Auth::id())->delete();

            return redirect()->back()->with('success', 'Chat history deleted successfully.');
        } catch (\Exception $e) {
            return back()->withErrors(['general' => 'Failed to delete chat history.']);
        }
    }
}
