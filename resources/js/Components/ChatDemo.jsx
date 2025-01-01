import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { ChatMessage } from './ChatMessage';

export function ChatDemo() {
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hi! I`m GeminiChat. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { type: 'user', content: input }]);
    setInput('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'This is a demo interface. In production, this would connect to the Gemini API for real responses.'
      }]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
        <div className="h-[400px] overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} {...message} />
          ))}
        </div>
        <form onSubmit={handleSubmit} className="border-t border-gray-700 p-4 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white border-0 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}