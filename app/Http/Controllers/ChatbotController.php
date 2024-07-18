<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use OpenAI\Laravel\Facades\OpenAI;

class ChatbotController extends Controller
{
    public function index()
    {
        return Inertia::render('chat');
    }

    public function chat(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        $response = OpenAI::completions()->create([
            'model' => 'gpt-3.5-turbo',
            'prompt' => $request->message,
            'max_tokens' => 150,
        ]);

        return response()->json([
            'response' => $response['choices'][0]['text'] ?? 'Tidak ada jawaban',
        ]);
    }
}
