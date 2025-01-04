import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
    Menu,
    X,
    MessageSquare,
    Brain,
    Zap,
    Lock,
    Globe,
    Briefcase,
    Stethoscope,
    GraduationCap,
    ShoppingBag,
} from "lucide-react";
import ApplicationLogo from "@/Components/ApplicationLogo";

// Chat demo messages
const messages = [
    { text: "How can you help me with my business?", isUser: true },
    {
        text: "I can assist with market analysis, customer service automation, and data-driven insights to optimize your operations.",
        isUser: false,
    },
    { text: "What about content creation?", isUser: true },
    {
        text: "Absolutely! I can help generate blog posts, social media content, and marketing copy while maintaining your brand voice.",
        isUser: false,
    },
];

// Features data
const features = [
    {
        icon: Brain,
        title: "Advanced AI Understanding",
        description:
            "Powered by Google's Gemini AI for deep comprehension and natural conversations",
    },
    {
        icon: Zap,
        title: "Lightning Fast",
        description:
            "Get instant responses to your queries with our optimized processing",
    },
    {
        icon: Lock,
        title: "Secure & Private",
        description:
            "Enterprise-grade security with end-to-end encryption for your conversations",
    },
    {
        icon: Globe,
        title: "Multilingual Support",
        description:
            "Communicate in over 50 languages with native-like understanding",
    },
];

// Use cases data
const useCases = [
    {
        icon: Briefcase,
        title: "Business",
        description:
            "Automate customer support, generate reports, and analyze market trends",
    },
    {
        icon: Stethoscope,
        title: "Healthcare",
        description:
            "Assist with patient inquiries, schedule management, and medical information",
    },
    {
        icon: GraduationCap,
        title: "Education",
        description:
            "Support students with homework, research, and learning assistance",
    },
    {
        icon: ShoppingBag,
        title: "Retail",
        description:
            "Handle product inquiries, inventory checks, and shopping assistance",
    },
];

function ChatDemo() {
    const [visibleMessages, setVisibleMessages] = useState(0);

    useEffect(() => {
        if (visibleMessages < messages.length) {
            const timer = setTimeout(() => {
                setVisibleMessages((prev) => prev + 1);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [visibleMessages]);

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
            <div className="space-y-4">
                {messages.slice(0, visibleMessages).map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${
                            message.isUser ? "justify-end" : "justify-start"
                        }`}
                    >
                        <div
                            className={`flex items-start space-x-2 max-w-[80%] ${
                                message.isUser
                                    ? "flex-row-reverse space-x-reverse"
                                    : "flex-row"
                            }`}
                        >
                            <div
                                className={`p-1 rounded-full ${
                                    message.isUser ? "bg-black" : "bg-gray-100"
                                }`}
                            >
                                {message.isUser ? (
                                    <MessageSquare className="h-5 w-5 text-white" />
                                ) : (
                                    <ApplicationLogo className="h-7 w-28 text-black" />
                                )}
                            </div>
                            <div
                                className={`p-3 rounded-lg ${
                                    message.isUser
                                        ? "bg-black text-white"
                                        : "bg-gray-100 text-gray-800"
                                }`}
                            >
                                {message.text}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {visibleMessages < messages.length && (
                <div className="flex justify-start mt-4">
                    <div className="flex space-x-2">
                        <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                        />
                        <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                        />
                        <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Welcome({ auth }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen flex flex-col bg-white">
                {/* Navbar */}
                <nav className="bg-white border-b sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <ApplicationLogo className="h-9 w-auto fill-current text-gray-800" />
                                <span className="ml-2 text-xl font-bold">
                                    Chatbot
                                </span>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="flex items-center space-x-8">
                                {auth.user ? (
                                    <Link
                                        href={route("chat")}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <MessageSquare className="h-5 w-5 text-black" />
                                            Chat
                                        </div>
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>

                            {/* Mobile menu button */}
                        </div>
                    </div>

                    {/* Mobile menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {auth.user ? (
                                    <Link
                                        href={route("chat")}
                                        className="rounded-md px-3 font-bold py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                    >
                                        Chat
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </nav>

                {/* Hero Section */}
                <main className="flex-grow">
                    <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center">
                                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                                    Experience the Future of Conversation
                                </h1>
                                <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                                    Powered by Google's Gemini AI, our chatbot
                                    delivers human-like interactions with
                                    unprecedented understanding and accuracy.
                                </p>
                                <ChatDemo />
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="py-16 bg-gray-50" id="features">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-gray-900">
                                    Powerful Features
                                </h2>
                                <p className="mt-4 text-xl text-gray-600">
                                    Everything you need for seamless AI
                                    interactions
                                </p>
                            </div>

                            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                                    >
                                        <div className="bg-black rounded-lg p-3 inline-block">
                                            <feature.icon className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="mt-4 text-lg font-semibold text-gray-900">
                                            {feature.title}
                                        </h3>
                                        <p className="mt-2 text-gray-600">
                                            {feature.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Use Cases Section */}
                    <div className="py-16" id="use-cases">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-gray-900">
                                    Industry Solutions
                                </h2>
                                <p className="mt-4 text-xl text-gray-600">
                                    Transforming businesses across sectors
                                </p>
                            </div>

                            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
                                {useCases.map((useCase, index) => (
                                    <div
                                        key={index}
                                        className="relative overflow-hidden rounded-lg group w-full h-64 shadow-sm hover:shadow-lg transition-shadow"
                                    >
                                        <div className="absolute inset-0 bg-gray-50 flex flex-col justify-center items-center text-black p-6">
                                            <useCase.icon className="h-12 w-12 mb-4" />
                                            <h3 className="text-2xl font-bold mb-2">
                                                {useCase.title}
                                            </h3>
                                            <p className="text-center">
                                                {useCase.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="col-span-1 md:col-span-2">
                                <div className="flex items-center">
                                    <ApplicationLogo className="h-8 w-8 text-black" />
                                    <span className="ml-2 text-xl font-bold">
                                        Chatbot
                                    </span>
                                </div>
                                <p className="mt-4 text-gray-600">
                                    Experience the next generation of AI
                                    conversation with our Gemini-powered
                                    chatbot.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                                    Resources
                                </h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-600 hover:text-black"
                                        >
                                            Documentation
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-600 hover:text-black"
                                        >
                                            API Reference
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-600 hover:text-black"
                                        >
                                            Support
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                                    Legal
                                </h3>
                                <ul className="mt-4 space-y-4">
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-600 hover:text-black"
                                        >
                                            Privacy Policy
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-600 hover:text-black"
                                        >
                                            Terms of Service
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-600 hover:text-black"
                                        >
                                            Cookie Policy
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-8 border-t border-gray-200 pt-8">
                            <p className="text-center text-gray-400">
                                &copy; 2025 Chatbot. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
