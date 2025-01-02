"use client";

import { useState } from "react";
import {
    MessageSquare,
    Plus,
    Send,
    Trash2,
    Crown,
    Moon,
    Sun,
    User,
    ChevronDown,
    Menu,
} from "lucide-react";

export default function ChatInterface() {
    const [chats, setChats] = useState([
        { id: 1, text: "what can you do for me ?" },
        { id: 2, text: "write me short joke for web development tu..." },
        { id: 3, text: "top 10 most used css triks." },
        { id: 4, text: "easy way to join foang" },
        { id: 5, text: "how to learn front end web development" },
        { id: 6, text: "Could you write a basic chapter 1 tutorial fo..." },
    ]);

    const [messages, setMessages] = useState([
        {
            id: 1,
            content:
                "ok, write me short joke for web development tutorial starting.",
            isUser: true,
        },
        {
            id: 2,
            content: `Sure, here's a short joke for a web development tutorial starting:

Why was the web developer always cold?
Because he left his Windows open!`,
            isUser: false,
        },
        {
            id: 3,
            content:
                "Could you write a basic chapter 1 tutorial for JavaScript for me ?",
            isUser: true,
        },
        {
            id: 4,
            content: `Chapter 1: Getting Started with JavaScript and CSS

JavaScript and CSS are two essential technologies for building modern web applications. In this chapter, we will cover the basics of JavaScript and CSS, including data types, variables, and control structures, as well as an example of how to use JavaScript and CSS together.

1.1 Data Types

JavaScript supports several data types, including numbers, strings, booleans, null, and undefined. Here are some examples:

• Numbers: 42, 3.14, -7
• Strings: "hello", "world", "123"
• Booleans: true, false
• Null: null
• Undefined: undefined

To declare a variable in JavaScript, you can use the "var" keyword, followed by the variable name and an optional initial value. Here's an example:`,
            isUser: false,
        },
    ]);

    const [inputMessage, setInputMessage] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleNewChat = () => {
        const newChat = {
            id: chats.length + 1,
            text: "New Chat",
        };
        setChats([newChat, ...chats]);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputMessage.trim() === "") return;

        const newMessage = {
            id: messages.length + 1,
            content: inputMessage,
            isUser: true,
        };
        setMessages([...messages, newMessage]);
        setInputMessage("");

        // Simulate bot response
        setTimeout(() => {
            const botResponse = {
                id: messages.length + 2,
                content:
                    "Thank you for your message. How else can I assist you?",
                isUser: false,
            };
            setMessages((prevMessages) => [...prevMessages, botResponse]);
        }, 1000);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex flex-col mx-auto max-w-7xl bg-gray-50 text-gray-900">
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div
                    className={`${
                        isSidebarOpen ? "block" : "hidden"
                    } sm:block w-full sm:w-80 bg-white border-gray-200 border-r flex flex-col absolute sm:relative z-10`}
                >
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Chat Archive
                                </h2>
                                <p className="text-sm text-gray-500">
                                    200+ Conversations
                                </p>
                            </div>
                            <button
                                onClick={handleNewChat}
                                className="p-1 hover:bg-gray-100 rounded-full"
                            >
                                <Plus className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 h-[calc(100vh_-_165px)] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300">
                        {chats.map((chat) => (
                            <button
                                key={chat.id}
                                className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-start gap-3"
                            >
                                <MessageSquare className="w-5 h-5 mt-0.5 text-gray-400" />
                                <span className="text-sm truncate">
                                    {chat.text}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col h-[calc(100vh_-_65px)] bg-white">
                    <div className="flex-1 overflow-y-auto p-4 space-y-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex gap-4 max-w-2xl mx-auto w-full ${
                                    message.isUser
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                {!message.isUser && (
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                        <MessageSquare className="w-5 h-5 text-gray-600" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[75%] sm:max-w-[85%] rounded-lg p-3 sm:p-4 ${
                                        message.isUser
                                            ? "bg-gray-100 text-gray-800"
                                            : "bg-white border border-gray-200 text-gray-800"
                                    }`}
                                >
                                    <div className="whitespace-pre-wrap text-sm sm:text-base">
                                        {message.content}
                                    </div>
                                </div>
                                {message.isUser && (
                                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-sm">
                                            U
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <form
                        onSubmit={handleSendMessage}
                        className="p-4 border-t border-gray-200"
                    >
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) =>
                                    setInputMessage(e.target.value)
                                }
                                placeholder="Type a message..."
                                className="flex-1 px-4 py-2 border bg-white border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                            />
                            <button
                                type="submit"
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <Send className="w-5 h-5 text-gray-300}" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
