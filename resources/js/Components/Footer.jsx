import React from "react";
import { Github, Twitter, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-gray-900 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-white font-bold text-lg mb-4">
                            GeminiChat
                        </h3>
                        <p className="text-gray-400 max-w-md">
                            Experience the future of conversation with our
                            advanced AI chatbot powered by Google's Gemini
                            technology.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            {[
                                "About",
                                "Features",
                                "Pricing",
                                "Documentation",
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-gray-400 hover:text-purple-400 transition-colors"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4">
                            Connect
                        </h4>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-purple-400 transition-colors"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-purple-400 transition-colors"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-purple-400 transition-colors"
                            >
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
                    <p>
                        © {new Date().getFullYear()} GeminiChat. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
