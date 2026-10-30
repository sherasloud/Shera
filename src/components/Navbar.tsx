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
    <header className="bg-white text-slate-900 sticky top-0 z-40 border-b border-emerald-500/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-500/20">
            <Wifi className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                সেরা লিংক (Shera Link)
              </span>
              <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
                গ্রামের ইন্টারনেট
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">গ্রামীণ জনপদ ও বাজারের বিশ্বস্ত ইন্টারনেট সেবা</p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="hidden md:flex items-center space-x-3 text-sm">
          <button
            onClick={onOpenSpeedTest}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-emerald-700 px-3 py-1.5 rounded-lg border border-slate-200 transition font-medium"
          >
            <Radio className="w-4 h-4" />
            <span>স্পিড টেস্ট</span>
          </button>
          
          <button
            onClick={onOpenVouchers}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-teal-700 px-3 py-1.5 rounded-lg border border-slate-200 transition font-medium"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>ওয়াই-ফাই ভাউচার</span>
          </button>

          <button
            onClick={onOpenSupport}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-amber-700 px-3 py-1.5 rounded-lg border border-slate-200 transition font-medium"
          >
            <Bell className="w-4 h-4" />
            <span>সমস্যা জানান</span>
          </button>
        </div>

        {/* Role Switcher & AI Assistant */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenAi}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white px-3.5 py-1.5 rounded-lg font-medium shadow-md shadow-emerald-600/20 transition"
          >
            <Sparkles className="w-4 h-4 text-emerald-100" />
            <span className="hidden sm:inline">সেরা এআই (AI)</span>
          </button>

          {/* Role Toggle Switch */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
            <button
              onClick={() => setRole('subscriber')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                role === 'subscriber'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>গ্রাহক</span>
            </button>
            <button
              onClick={() => setRole('operator')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                role === 'operator'
                  ? 'bg-teal-600 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>অপারেটর (NOC)</span>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};
