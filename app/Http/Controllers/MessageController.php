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
        // only return content id is_user created_at thats it
        $messages = $messages->map(function ($message) {
            return [
                'id' => $message->id,
                'content' => $message->content,
                'is_user' => $message->is_user,
                'created_at' => $message->created_at->toDateTimeString(),
            ];
        });

        return Inertia::render('Chat', [
            'messages' => $messages,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        try {

            $validated = $request->validate([
                'message' => 'required|string',
            ]);

            // Save user's message
            Message::create([
                'user_id' => Auth::id(),
                'content' => $validated['message'],
                'is_user' => true,
            ]);


            // Get API key
            $key = config('services.gemini.key');
            if (!$key) {
                throw new \Exception('Gemini API key not configured');
            }

            // Fetch last 10 messages (both user and model messages)
            $messages = Message::where('user_id', Auth::id())
                ->latest()
                ->take(20)
                ->get()
                ->reverse();  // Reverse to maintain the correct order of messages

            // Prepare the message content in the required format
            $formattedMessages = $messages->map(function ($message) {
                return [
                    'role' => $message->is_user ? 'user' : 'model',  // 'user' or 'model' based on is_user field
                    'parts' => [
                        ['text' => $message->content]  // Ensure only 'text' is included
                    ]
                ];
            })->toArray();

            // Add the current message as the last part with 'user' role
            $formattedMessages = array_merge($formattedMessages, [
                [
                    'role' => 'user',
                    'parts' => [
                        ['text' => $validated['message'] . "\nRespond only to this message."]
                    ]
                ]
            ]);

            // Prepare API request body to match the structure
            $requestBody = [
                'contents' => $formattedMessages
            ];

            // Prepare API request
            $apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key={$key}";

            // Send request to Gemini
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post($apiUrl, $requestBody);

            if (!$response->successful()) {
                throw new \Exception('Gemini API request failed: ' . $response->body());
            }

            $responseData = $response->json();

            // Validate response structure
            if (!isset($responseData['candidates'][0]['content']['parts'][0]['text'])) {
                throw new \Exception('Invalid response structure from Gemini API');
            }

            $aiMessage = $responseData['candidates'][0]['content']['parts'][0]['text'];

            // Save AI response
            $aiResponse = Message::create([
                'user_id' => Auth::id(),
                'content' => $aiMessage,
                'is_user' => false,
            ]);

            // Return whole conversation
            $messages = Message::with('user')->where('user_id', Auth::id())->orderBy('created_at', 'asc')->get();
            // only return content id is_user created_at thats it
            $messages = $messages->map(function ($message) {
                return [
                    'id' => $message->id,
                    'content' => $message->content,
                    'is_user' => $message->is_user,
                    'created_at' => $message->created_at->toDateTimeString(),
                ];
            });

            return response()->json([
                'success' => true,
                'messages' => $messages
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
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
