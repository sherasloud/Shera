import React, { useState } from 'react';
import { X, Zap, Radio, Signal, CheckCircle } from 'lucide-react';

interface SpeedTestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpeedTestModal: React.FC<SpeedTestModalProps> = ({ isOpen, onClose }) => {
  const [testing, setTesting] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState<number | null>(null);
  const [uploadSpeed, setUploadSpeed] = useState<number | null>(null);
  const [ping, setPing] = useState<number | null>(null);

  if (!isOpen) return null;

  const runTest = () => {
    setTesting(true);
    setDownloadSpeed(null);
    setUploadSpeed(null);
    setPing(null);

    setTimeout(() => {
      setPing(Math.floor(Math.random() * 8) + 12); // 12-20 ms
    }, 800);

    setTimeout(() => {
      setDownloadSpeed(Number((Math.random() * 10 + 22.4).toFixed(1))); // ~25-32 Mbps
    }, 1800);

    setTimeout(() => {
      setUploadSpeed(Number((Math.random() * 5 + 18.2).toFixed(1))); // ~18-23 Mbps
      setTesting(false);
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-center text-slate-900">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-100 p-1.5 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 border border-emerald-200">
          <Zap className="w-6 h-6 animate-pulse" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-1">গ্রাম গেটওয়ে স্পিড টেস্ট</h3>
        <p className="text-xs text-slate-500 mb-6">জয়পুরহাট কেন্দ্রীয় বাজার টাওয়ারের সাথে সংযোগ যাচাই করা হচ্ছে</p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
            <span className="text-[10px] text-slate-500 block mb-1">পিং (Ping)</span>
            <span className="text-xl font-bold text-teal-700">{ping !== null ? `${ping} ms` : '--'}</span>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
            <span className="text-[10px] text-slate-500 block mb-1">ডাউনলোড</span>
            <span className="text-xl font-bold text-emerald-600">{downloadSpeed !== null ? `${downloadSpeed} M` : '--'}</span>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
            <span className="text-[10px] text-slate-500 block mb-1">আপলোড</span>
            <span className="text-xl font-bold text-teal-600">{uploadSpeed !== null ? `${uploadSpeed} M` : '--'}</span>
          </div>
        </div>

        {downloadSpeed !== null && !testing && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3 rounded-xl text-xs mb-6 flex items-center justify-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">৪কে ভিডিও স্ট্রিমিং ও স্পষ্ট ভিডিও কলের জন্য চমৎকার গতি রয়েছে!</span>
          </div>
        )}

        <button
          onClick={runTest}
          disabled={testing}
          className={`w-full py-3 rounded-xl font-bold text-sm shadow-md transition ${
            testing 
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' 
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/20'
          }`}
        >
          {testing ? 'ফাইবার লিংক টেস্ট চলছে...' : downloadSpeed !== null ? 'আবার টেস্ট করুন' : 'স্পিড টেস্ট শুরু করুন'}
        </button>
      </div>
    </div>
  );
};
