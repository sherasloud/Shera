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
      text: 'নমস্কার! আমি সেরা এআই (Shera AI), আপনার গ্রামের ইন্টারনেট সহকারী। আজকের সংযোগ বা প্যাকেজ সংক্রান্ত যেকোনো সমস্যায় আমি আপনাকে কীভাবে সাহায্য করতে পারি?',
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
        setMessages(prev => [...prev, { sender: 'ai', text: 'দুঃখিত, সেরা লিংক নেটওয়ার্ক ব্রেইনের সাথে সংযোগ স্থাপন করতে সমস্যা হচ্ছে।' }]);
      }
    } catch {
      setMessages(prev => [...prev, { sender: 'ai', text: 'নেটওয়ার্ক ত্রুটি। দয়া করে আপনার সংযোগ চেক করুন।' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full h-[550px] flex flex-col shadow-2xl relative overflow-hidden text-slate-900">
        
        {/* Modal Header */}
        <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">সেরা এআই নেটওয়ার্ক সহকারী</h3>
              <p className="text-[10px] text-emerald-600 font-medium">জেমিনি ৩.৮ ফ্লাশ দ্বারা চালিত</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 bg-slate-200/60 p-1.5 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
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
                    : 'bg-slate-300 text-slate-700'
                }`}
              >
                {m.sender === 'ai' ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
              </div>
              <div
                className={`max-w-[78%] p-3 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'ai'
                    ? 'bg-white text-slate-800 border border-slate-200 shadow-sm'
                    : 'bg-emerald-600 text-white shadow-sm'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center space-x-2 text-slate-500 text-xs py-2">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
              <span>সেরা এআই নেটওয়ার্ক ডায়াগনস্টিকস বিশ্লেষণ করছে...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
          <input
            type="text"
            placeholder="আপনার গতি, রাউটার সেটআপ বা প্যাকেজ সম্পর্কে জিজ্ঞাসা করুন..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white p-2.5 rounded-xl transition shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
