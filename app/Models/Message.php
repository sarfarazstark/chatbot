<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model {
    use HasFactory;

    protected $fillable = ['user_id', 'content', 'is_user'];

    /**
     * Get the user that owns the message.
     */
    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
