import { MessageSquare, Send, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const getGeminiResponse = async (message) => {
    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-CSRF-TOKEN": document.querySelector(
                    'meta[name="csrf-token"]'
                ).content,
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to send message");
        }

        return await response.json();
    } catch (error) {
        console.error("Error details:", error);
        throw new Error(error.message || "Failed to send message");
    }
};

export default function Messages({ messages: initialMessages }) {
    const [messages, setMessages] = useState([...initialMessages]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Scroll to bottom when messages change or loading state changes
    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (inputMessage.trim() === "" || isLoading) {
            return;
        }

        const userMessage = {
            id: Date.now(),
            content: inputMessage,
            is_user: true,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputMessage("");
        setIsLoading(true);

        try {
            const response = await getGeminiResponse(inputMessage);
            setMessages(response.messages);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    content:
                        "Sorry, I couldn't process your message. Please try again.",
                    is_user: false,
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="flex-1 overflow-y-auto p-4 space-y-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300">
                {messages.length > 0 ? (
                    messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex gap-4 max-w-2xl mx-auto w-full ${
                                message.is_user
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            {!message.is_user && (
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                    <MessageSquare className="w-5 h-5 text-gray-600" />
                                </div>
                            )}
                            <div
                                className={`max-w-[75%] sm:max-w-[85%] rounded-lg p-3 sm:p-4 ${
                                    message.is_user
                                        ? "bg-gray-100 text-gray-800"
                                        : "bg-white border border-gray-200 text-gray-800"
                                }`}
                            >
                                <div className="whitespace-pre-wrap text-sm sm:text-base">
                                    {message.content}
                                </div>
                            </div>
                            {message.is_user === 1 && (
                                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-sm">
                                        U
                                    </span>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="flex-1 flex items-center justify-center h-full">
                        <div className="flex items-center flex-col text-center">
                            <MessageSquare className="w-12 h-12 text-gray-300" />
                            <h2 className="text-lg font-semibold mt-4">
                                What can I help with?
                            </h2>
                        </div>
                    </div>
                )}

                {isLoading && (
                    <div className="flex gap-4 max-w-2xl mx-auto w-full justify-start">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                            <MessageSquare className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="max-w-[75%] sm:max-w-[85%] rounded-lg p-3 sm:p-4 bg-white border border-gray-200">
                            <div className="flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                                <span className="text-sm text-gray-500">
                                    Thinking...
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Invisible element to scroll to */}
                <div ref={messagesEndRef} />
            </div>

            <form
                onSubmit={handleSendMessage}
                className="p-4 border-t border-gray-200"
            >
                <div className="flex items-center gap-2 max-w-2xl mx-auto">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border bg-white border-gray-200 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        className="p-2 bg-gray-950 hover:bg-gray-800 active:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 text-gray-300 animate-spin" />
                        ) : (
                            <Send className="w-5 h-5 text-gray-300" />
                        )}
                    </button>
                </div>
            </form>
        </>
    );
}
