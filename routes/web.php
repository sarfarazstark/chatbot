<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MessageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/chats', [ChatController::class, 'index'])->name('chat'); // Show chat interface
    Route::post('/chats', [ChatController::class, 'store'])->name('chats.store'); // Create a new chat
    Route::get('/chats/{chat}', [ChatController::class, 'show'])->name('chats.show'); // Fetch messages for a chat
    Route::post('/chats/{chat}/messages', [MessageController::class, 'store'])->name('messages.store'); // Send a new message
});
// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('/chats/{chat}', [ChatController::class, 'index'])->name('chats.show');
//     Route::post('/chats/{chat}/messages', [ChatController::class, 'store']);
//     Route::post('/chats', [ChatController::class, 'createChat']);
// });


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
