import React from "react";
import { Bot, Sparkles, Zap } from "lucide-react";

export function Hero() {
    return (
        <div className="bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
                <div className="flex justify-center mb-8">
                    <Bot className="h-16 w-16 text-purple-400" />
                </div>
                <h1 className="text-5xl font-bold text-white mb-6">
                    Meet GeminiChat
                    <span className="text-purple-400">.</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Experience the power of AI conversation powered by Google's
                    Gemini. Smart, intuitive, and ready to help.
                </p>
                <div className="flex justify-center gap-4">
                    <button className="bg-purple-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-600 transition-colors flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        Try Now
                    </button>
                    <button className="bg-gray-800 text-purple-400 px-8 py-3 rounded-lg font-medium border border-purple-400/20 hover:border-purple-400/40 transition-colors flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        See Demo
                    </button>
                </div>
            </div>
        </div>
    );
}
