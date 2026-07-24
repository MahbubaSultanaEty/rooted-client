"use client";

import { useState } from 'react';
import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import { Sparkles, ArrowRight, ArrowLeft, LoaderCircle } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const SUGGESTIONS = [
  "Find me a pet-friendly apartment in Gulshan",
  "2 bedroom flat under 40k in Dhaka",
  "Villa for sale in Dhanmondi",
  "Office space in Motijheel",
];

export default function SagePage() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { role: 'sage', text: "Hi! I'm Sage 🌿 Tell me what kind of property you're looking for, and I'll find the best matches for you." }
  ]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchText) => {
    const q = searchText || query;
    if (!q.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: q }]);
    setQuery('');
    setLoading(true);
    setResults([]);

    try {
      // Parse the user query into API filters
      const params = new URLSearchParams();
      params.append('search', q);
      params.append('limit', '6');

      const res = await fetch(`${API}/api/properties?${params.toString()}`);
      const data = await res.json();
      const props = data?.data || [];

      if (props.length > 0) {
        setMessages(prev => [...prev, { role: 'sage', text: `I found ${props.length} properties matching your request! Here are the best picks:` }]);
        setResults(props);
      } else {
        setMessages(prev => [...prev, { role: 'sage', text: "I couldn't find exact matches for that query. Try adjusting your description, or browse all properties on the Explore page." }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'sage', text: "Sorry, I'm having trouble connecting right now. Please make sure the server is running and try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="p-2 rounded-lg border border-gray-200 hover:border-brand-primary/40 transition-colors">
            <ArrowLeft className="w-5 h-5 text-brand-text" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-heading text-xl font-bold text-brand-text">Sage</h1>
              <p className="text-xs text-green-600 font-medium">Your AI Home Guide</p>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="glass-card p-6 bg-white/80 mb-6 min-h-[300px]">
          <div className="space-y-4 mb-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-brand-primary text-white rounded-tr-none' 
                    : 'bg-gray-50 border border-gray-100 text-brand-text rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-50 border border-gray-100 p-3 rounded-2xl rounded-tl-none flex items-center gap-2 text-sm text-gray-500">
                  <LoaderCircle className="w-4 h-4 animate-spin" /> Sage is thinking...
                </div>
              </div>
            )}
          </div>

          {/* Suggestion Chips */}
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => { setQuery(s); handleSearch(s); }}
                  className="px-3 py-1.5 text-xs font-medium rounded-full border border-brand-primary/20 text-brand-primary bg-brand-primary/5 hover:bg-brand-primary/10 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe your dream property..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-3 text-sm text-brand-text placeholder-gray-400 outline-none focus:ring-2 ring-brand-primary/20 focus:border-brand-primary/30"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center text-white hover:bg-brand-primary/90 transition-colors disabled:opacity-50 flex-shrink-0"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div>
            <h2 className="font-heading text-xl font-bold text-brand-text mb-4">Sage's Picks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map(prop => <PropertyCard key={prop._id} property={prop} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
