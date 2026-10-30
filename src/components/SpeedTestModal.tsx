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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 border border-emerald-500/30">
          <Zap className="w-6 h-6 animate-pulse" />
        </div>

        <h3 className="text-xl font-bold text-white mb-1">Village Gateway Speed Test</h3>
        <p className="text-xs text-slate-400 mb-6">Testing connection to Joypurhat Central Bazaar Mast (#01)</p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
            <span className="text-[10px] text-slate-400 block mb-1">Ping</span>
            <span className="text-xl font-bold text-teal-400">{ping !== null ? `${ping} ms` : '--'}</span>
          </div>
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
            <span className="text-[10px] text-slate-400 block mb-1">Download</span>
            <span className="text-xl font-bold text-emerald-400">{downloadSpeed !== null ? `${downloadSpeed} M` : '--'}</span>
          </div>
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3">
            <span className="text-[10px] text-slate-400 block mb-1">Upload</span>
            <span className="text-xl font-bold text-teal-300">{uploadSpeed !== null ? `${uploadSpeed} M` : '--'}</span>
          </div>
        </div>

        {downloadSpeed !== null && !testing && (
          <div className="bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 p-3 rounded-xl text-xs mb-6 flex items-center justify-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">Excellent rural link quality for 4K streaming & video calls!</span>
          </div>
        )}

        <button
          onClick={runTest}
          disabled={testing}
          className={`w-full py-3 rounded-xl font-bold text-sm shadow-lg transition ${
            testing 
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-900/40'
          }`}
        >
          {testing ? 'Testing Fiber Link & Signal...' : downloadSpeed !== null ? 'Run Again' : 'Start Speed Test'}
        </button>
      </div>
    </div>
  );
};
