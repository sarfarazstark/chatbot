import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function Messages({ user, messages: initialMessages }) {
    const [messages, setMessages] = useState([...initialMessages]);
    const [inputMessage, setInputMessage] = useState("");

    // Add the following code to the handleSendMessage function
    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (inputMessage.trim() === "") {
            return;
        }

        const newMessage = {
            id: messages.length + 1,
            content: inputMessage,
            isUser: true,
        };

        setMessages([...messages, newMessage]);
        setInputMessage("");

        try {
            await axios.post("/api/messages", {
                content: inputMessage,
                user_id: user.id,
            });
        } catch (error) {
            console.error(error);
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
                                message.isUser ? "justify-end" : "justify-start"
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
                    />
                    <button
                        type="submit"
                        className="p-2 bg-gray-950 hover:bg-gray-400 active:bg-gray-700 rounded-lg"
                    >
                        <Send className="w-5 h-5 text-gray-300" />
                    </button>
                </div>
            </form>
        </>
    );
}
