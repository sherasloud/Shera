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
      setFeedback({ type: 'error', text: 'Invalid voucher code. Please check with your village agent.' });
    } else if (found.status === 'used') {
      setFeedback({ type: 'error', text: 'This voucher has already been redeemed!' });
    } else {
      onRedeem(cleanCode);
      setFeedback({ type: 'success', text: `Successfully redeemed ${found.duration} pass! Enjoy high-speed Wi-Fi.` });
      setInputCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-teal-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Wi-Fi Vouchers & Hotspot Passes</h3>
            <p className="text-xs text-slate-400">Redeem scratch card code or purchase instant access</p>
          </div>
        </div>

        {feedback && (
          <div className={`p-3 rounded-xl mb-4 text-xs font-medium flex items-center space-x-2 ${
            feedback.type === 'success' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-red-500/20 text-red-300 border border-red-500/40'
          }`}>
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            <span>{feedback.text}</span>
          </div>
        )}

        <form onSubmit={handleRedeemCode} className="space-y-4 mb-6">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Enter 16-Character Voucher Code</label>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="e.g. SHER-9921-ABCD"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono text-sm uppercase placeholder:text-slate-500"
                required
              />
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition shadow"
              >
                Redeem
              </button>
            </div>
          </div>
        </form>

        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Available Vouchers in Village Pool</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {vouchers.filter(v => v.status === 'available').map((v, i) => (
            <div key={i} className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 flex justify-between items-center text-xs">
              <div>
                <span className="font-mono font-bold text-teal-300 block">{v.code}</span>
                <span className="text-slate-400">{v.duration} Access</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-white block">৳{v.price}</span>
                <button
                  onClick={() => {
                    setInputCode(v.code);
                  }}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold mt-0.5 block"
                >
                  Use Code
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
