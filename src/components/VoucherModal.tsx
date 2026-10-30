import React, { useState } from 'react';
import { Wifi, ShieldCheck, X, CheckCircle, Ticket } from 'lucide-react';
import { WifiVoucher } from '../types';

interface VoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  vouchers: WifiVoucher[];
  onRedeem: (code: string) => void;
}

export const VoucherModal: React.FC<VoucherModalProps> = ({
  isOpen,
  onClose,
  vouchers,
  onRedeem,
}) => {
  const [inputCode, setInputCode] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleRedeemCode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = inputCode.trim().toUpperCase();
    const found = vouchers.find(v => v.code === cleanCode);

    if (!found) {
      setFeedback({ type: 'error', text: 'ভাউচার কোডটি সঠিক নয়। গ্রামের এজেন্টের সাথে যোগাযোগ করুন।' });
    } else if (found.status === 'used') {
      setFeedback({ type: 'error', text: 'এই ভাউচার কোডটি ইতিমধ্যে ব্যবহার করা হয়েছে!' });
    } else {
      onRedeem(cleanCode);
      setFeedback({ type: 'success', text: `সফলভাবে ${found.duration} পাস রিডিম হয়েছে! ইন্টারনেট উপভোগ করুন।` });
      setInputCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-900">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 p-1.5 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">ওয়াই-ফাই ভাউচার ও হটস্পট পাস</h3>
            <p className="text-xs text-slate-500">স্ক্র্যাচ কার্ড কোড দিয়ে তাৎক্ষণিক ইন্টারনেট সচল করুন</p>
          </div>
        </div>

        {feedback && (
          <div className={`p-3 rounded-xl mb-4 text-xs font-medium flex items-center space-x-2 ${
            feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>{feedback.text}</span>
          </div>
        )}

        <form onSubmit={handleRedeemCode} className="space-y-4 mb-6">
          <div>
            <label className="text-xs text-slate-600 font-medium block mb-1">১৬-সংখ্যার ভাউচার কোড দিন</label>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="যেমন: SHER-9921-ABCD"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 font-mono text-sm uppercase placeholder:text-slate-400 focus:outline-none focus:border-teal-500"
                required
              />
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition shadow-sm"
              >
                রিডিম
              </button>
            </div>
          </div>
        </form>

        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">গ্রামের এভেইলেবল ভাউচার পুল</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {vouchers.filter(v => v.status === 'available').map((v, i) => (
            <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex justify-between items-center text-xs">
              <div>
                <span className="font-mono font-bold text-teal-700 block">{v.code}</span>
                <span className="text-slate-500">{v.duration} অ্যাক্সেস</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-900 block">৳{v.price}</span>
                <button
                  onClick={() => {
                    setInputCode(v.code);
                  }}
                  className="text-emerald-700 hover:text-emerald-800 font-semibold mt-0.5 block"
                >
                  কোড বসান
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
