import React from "react";
import { Brain, Clock, Lock, MessageSquare } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

const features = [
    {
        icon: Brain,
        title: "Advanced AI",
        description:
            "Powered by Google`s cutting-edge Gemini language model for human-like conversations",
    },
    {
        icon: Clock,
        title: "Real-time Responses",
        description:
            "Get instant, contextually aware responses to your questions and prompts",
    },
    {
        icon: Lock,
        title: "Secure & Private",
        description:
            "Your conversations are encrypted and never stored without your permission",
    },
    {
        icon: MessageSquare,
        title: "Natural Dialogue",
        description:
            "Engage in flowing conversations with context-aware responses",
    },
];

export function Features() {
    return (
        <div className="py-24 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Powered by Advanced AI Technology
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Experience the next generation of conversational AI with
                        our powerful features
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </div>
    );
}
