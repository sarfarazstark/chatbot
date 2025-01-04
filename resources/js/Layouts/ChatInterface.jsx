"use client";
import Messages from "@/Components/Messages";

export default function ChatInterface(props) {
    const { messages } = props;

    return (
        <div className="flex flex-col bg-gray-50 text-gray-900">
            <div className="flex flex-1 overflow-hidden">
                {/* Chat Area */}
                <div className="flex-1 flex flex-col h-[calc(100vh_-_65px)] bg-white">
                    {/* Messages area */}
                    <Messages messages={messages} />
                </div>
            </div>
        </div>
    );
}
