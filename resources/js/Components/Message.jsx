import React from "react";
import { Remarkable } from "remarkable";

const Message = ({ content }) => {
    // Function to parse markdown content and fix line breaks
    const markdownToHtml = (markdownContent) => {
        // Initialize a new Remarkable converter
        const md = new Remarkable();

        // First, parse the markdown content to HTML
        const htmlContent = md.render(markdownContent);

        // Replace any extra line breaks between tags, avoiding empty paragraphs
        return htmlContent
            .replace(/(\r\n|\n|\r)/gm, " ")
            .replace(/<\/p>\s*<p>/g, "");
    };

    return (
        <div
            className="whitespace-pre-wrap text-sm sm:text-base"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }} // Rendering raw HTML
        />
    );
};

export default Message;
