<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\Chat;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller {
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $chats = Chat::with('user')->where('user_id', Auth::id())->latest()->get();
        // echo "<pre>";
        // echo json_encode($chats);
        // echo "</pre>";
        // die();


        return Inertia::render('Chat', [
            'chats' => $chats,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return Inertia::render('Chats');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Chat::create([
            'name' => $request->name,
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('chats.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Chat $chat) {
        $this->authorize('view', $chat);

        return Inertia::render('Chats/Show', [
            'chat' => $chat->load('messages'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Chat $chat) {
        $this->authorize('update', $chat);

        return Inertia::render('Chats/Edit', [
            'chat' => $chat,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chat $chat) {
        $this->authorize('update', $chat);

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $chat->update([
            'name' => $request->name,
        ]);

        return redirect()->route('chats.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chat $chat) {
        $this->authorize('delete', $chat);

        $chat->delete();

        return redirect()->route('chats.index');
    }
}
