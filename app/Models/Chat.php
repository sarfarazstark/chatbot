<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model {
    use HasFactory;

    protected $fillable = [
        'name',
        'user_id',
    ];

    /**
     * Relationship: A chat belongs to a user.
     */
    public function user() {
        return $this->belongsTo(User::class);
    }

    /**
     * Relationship: A chat has many messages.
     */
    public function messages() {
        return $this->hasMany(Message::class);
    }
}
