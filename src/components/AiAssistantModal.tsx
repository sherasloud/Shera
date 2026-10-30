import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, Loader2 } from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscriberContext: any;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  subscriberContext,
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: 'Namaskar! I am Shera AI, your village network assistant. How can I help you with your Shera Link connection today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, context: subscriberContext }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { sender: 'ai', text: 'Sorry, I encountered an error connecting to the Shera Link network brain.' }]);
      }
    } catch {
      setMessages(prev => [...prev, { sender: 'ai', text: 'Network error. Please check your connection and try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-teal-500/30 rounded-2xl max-w-lg w-full h-[550px] flex flex-col shadow-2xl relative overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-slate-800/80 p-4 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Shera AI Network Assistant</h3>
              <p className="text-[10px] text-emerald-400">Powered by Gemini 3.8 Flash</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white bg-slate-700/50 p-1.5 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/60">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-start space-x-2.5 ${
                m.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
                  m.sender === 'ai'
                    ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white'
                    : 'bg-slate-700 text-slate-200'
                }`}
              >
                {m.sender === 'ai' ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
              </div>
              <div
                className={`max-w-[78%] p-3 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'ai'
                    ? 'bg-slate-800 text-slate-200 border border-slate-700/80'
                    : 'bg-emerald-600 text-white shadow'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center space-x-2 text-slate-400 text-xs py-2">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
              <span>Shera AI is analyzing network diagnostics...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Ask about your speed, router setup, or plan..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white p-2.5 rounded-xl transition shadow"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
