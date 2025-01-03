"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

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
    ChevronRight,
    ChevronLeft,
} from "lucide-react";

export default function ChatInterface(props) {
    const { chats, messages } = props;

    const { data, setData, post, reset } = useForm({
        content: "",
    });

    const [inputMessage, setInputMessage] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // const handleNewChat = () => {
    //     const newChat = {
    //         id: chats.length + 1,
    //         text: "New Chat",
    //     };
    //     setChats([newChat, ...chats]);
    // };

    // const handleSendMessage = (e) => {
    //     e.preventDefault();
    //     if (inputMessage.trim() === "") return;

    //     const newMessage = {
    //         id: messages.length + 1,
    //         content: inputMessage,
    //         isUser: true,
    //     };
    //     setMessages([...messages, newMessage]);
    //     setInputMessage("");

    //     // Simulate bot response
    //     setTimeout(() => {
    //         const botResponse = {
    //             id: messages.length + 2,
    //             content:
    //                 "Thank you for your message. How else can I assist you?",
    //             isUser: false,
    //         };
    //         setMessages((prevMessages) => [...prevMessages, botResponse]);
    //     }, 1000);
    // };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex flex-col bg-gray-50 text-gray-900">
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div
                    className={`fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:relative lg:translate-x-0`}
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
                                // onClick={handleNewChat}
                                className="p-1 hover:bg-gray-100 rounded-full"
                            >
                                <Plus className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    {/* sidebar chats */}
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

                    <button
                        onClick={toggleSidebar}
                        className={`absolute top-16 -right-6 z-50 px-1 py-1 bg-gray-950 border border-gray-200 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 lg:hidden`}
                        aria-label={
                            isSidebarOpen ? "Close sidebar" : "Open sidebar"
                        }
                    >
                        {isSidebarOpen ? (
                            <ChevronLeft className="w-5 h-5 text-white" />
                        ) : (
                            <ChevronRight className="w-5 h-5 text-white" />
                        )}
                    </button>
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
                        // onSubmit={handleSendMessage}
                        className="p-4 border-t border-gray-200"
                    >
                        <div className="flex items-center gap-2 max-w-2xl mx-auto">
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
