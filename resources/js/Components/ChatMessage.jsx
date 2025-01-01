import React from "react";
import PropTypes from "prop-types";

export function ChatMessage({ type, content }) {
    return (
        <div
            className={`flex ${
                type === "user" ? "justify-end" : "justify-start"
            }`}
        >
            <div
                className={`max-w-[80%] rounded-lg p-3 ${
                    type === "user"
                        ? "bg-purple-500 text-white"
                        : "bg-gray-700 text-gray-100"
                }`}
            >
                {content}
            </div>
        </div>
    );
}

ChatMessage.propTypes = {
    type: PropTypes.oneOf(["user", "bot"]).isRequired,
    content: PropTypes.string.isRequired,
};
