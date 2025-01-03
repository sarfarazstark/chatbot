<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chat;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class MessageController extends Controller {
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index() {
        //
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
        // For example, make an API call using Guzzle and save the response
        // Simulated response for now
        $botMessage = $chat->messages()->create([
            'content' => 'This is a bot response.',
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
