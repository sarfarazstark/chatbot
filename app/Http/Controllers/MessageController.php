<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class MessageController extends Controller {
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $messages = Message::with('user')->where('user_id', Auth::id())->latest()->get();

        return Inertia::render('Chat', [
            'messages' => $messages,
            'user' => Auth::user(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Chat $chat) {
        $this->authorize('view', $chat); // Ensure user can access this chat

        $message = $chat->messages()->create([
            'content' => $request->content,
            'is_user' => true,
        ]);

        // Add bot response logic here if needed
        $gemini_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" . env('GEMINI_API_KEY');
        $response = Http::post($gemini_url, [
            'prompt' => $request->content,
            'max_tokens' => 50,
            'temperature' => 0.5,
            'top_p' => 1,
            'frequency_penalty' => 0,
            'presence_penalty' => 0,
        ]);

        // For example, make an API call using Guzzle and save the response
        // Simulated response for now
        $botMessage = $chat->messages()->create([
            'content' => $response['data']['content'],
            'is_user' => false,
        ]);

        return response()->json(['userMessage' => $message, 'botMessage' => $botMessage], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        //
    }
}
