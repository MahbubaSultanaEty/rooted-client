"use client";

import { useState } from 'react';
import { Leaf, X, Send, Sparkles } from 'lucide-react';

export default function SageWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Sage. What kind of home are you looking for today?" }
  ]);
  const [input, setInput] = useState('');

  const toggleWidget = () => setIsOpen(!isOpen);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    const currentInput = input;
    setInput('');

    // Mock AI response (will be replaced with actual Groq stream)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `I can help you find "${currentInput}". Here are some great matches I found for you.` 
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleWidget}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-brand-primary text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ${isOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100'}`}
      >
        <Leaf className="w-6 h-6" />
      </button>

      {/* Chat Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="bg-brand-primary text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-brand-accent" />
            <h3 className="font-heading font-semibold text-lg">Sage — Your Home Guide</h3>
          </div>
          <button onClick={toggleWidget} className="p-1 hover:bg-white/20 rounded-md transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-bg/30">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-brand-primary text-white rounded-br-none' 
                    : 'bg-white border border-brand-primary/10 text-brand-text rounded-bl-none shadow-sm'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-1 mb-1 text-brand-accent">
                    <Sparkles className="w-3 h-3" />
                    <span className="text-xs font-bold uppercase tracking-wider">Sage</span>
                  </div>
                )}
                <p className="leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-brand-primary/10">
          {/* Suggested Chips */}
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
            {['2-bed in Gulshan', 'Pet friendly?', 'Under 50k'].map((chip, i) => (
              <button 
                key={i}
                onClick={() => setInput(chip)}
                className="whitespace-nowrap px-3 py-1.5 bg-brand-bg rounded-full text-xs text-brand-primary font-medium hover:bg-brand-primary/10 transition-colors border border-brand-primary/20"
              >
                {chip}
              </button>
            ))}
          </div>

          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Sage..."
              className="flex-1 px-4 py-2 bg-brand-bg border border-brand-primary/20 rounded-full text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="p-2 bg-brand-primary text-white rounded-full hover:bg-brand-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 sm:hidden backdrop-blur-sm"
          onClick={toggleWidget}
        />
      )}
    </>
  );
}
