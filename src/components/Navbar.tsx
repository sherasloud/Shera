import React from 'react';
import { Wifi, ShieldCheck, UserCheck, Bot, Bell, Radio, Sparkles } from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  onOpenAi: () => void;
  onOpenSpeedTest: () => void;
  onOpenVouchers: () => void;
  onOpenSupport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  role,
  setRole,
  onOpenAi,
  onOpenSpeedTest,
  onOpenVouchers,
  onOpenSupport,
}) => {
  return (
    <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-emerald-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/30">
            <Wifi className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl tracking-wide bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
                Shera Link
              </span>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 font-medium">
                Village ISP
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Connecting Rural Households & Markets</p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="hidden md:flex items-center space-x-3 text-sm">
          <button
            onClick={onOpenSpeedTest}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 px-3 py-1.5 rounded-lg border border-slate-700 transition"
          >
            <Radio className="w-4 h-4" />
            <span>Speed Test</span>
          </button>
          
          <button
            onClick={onOpenVouchers}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 px-3 py-1.5 rounded-lg border border-slate-700 transition"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Wi-Fi Vouchers</span>
          </button>

          <button
            onClick={onOpenSupport}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 px-3 py-1.5 rounded-lg border border-slate-700 transition"
          >
            <Bell className="w-4 h-4" />
            <span>Report Issue</span>
          </button>
        </div>

        {/* Role Switcher & AI Assistant */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenAi}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white px-3.5 py-1.5 rounded-lg font-medium shadow-md shadow-emerald-900/40 transition"
          >
            <Sparkles className="w-4 h-4 text-emerald-200" />
            <span className="hidden sm:inline">Shera AI</span>
          </button>

          {/* Role Toggle Switch */}
          <div className="bg-slate-800 p-1 rounded-xl flex items-center border border-slate-700">
            <button
              onClick={() => setRole('subscriber')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                role === 'subscriber'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Subscriber</span>
            </button>
            <button
              onClick={() => setRole('operator')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                role === 'operator'
                  ? 'bg-teal-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Operator NOC</span>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};
