import React, { useState } from 'react';
import { SubscriberAccount, SubscriberPlan, CommunityNews } from '../types';
import { 
  Wifi, Zap, Calendar, HardDrive, Signal, RefreshCw, Smartphone, 
  CheckCircle, ArrowUpRight, ShieldCheck, Newspaper, CloudSun, MapPin, 
  HelpCircle, CreditCard, ChevronRight
} from 'lucide-react';

interface SubscriberDashboardProps {
  subscriber: SubscriberAccount;
  plans: SubscriberPlan[];
  news: CommunityNews[];
  onTopUp: (amount: number) => void;
  onSelectPlan: (planId: string) => void;
  onOpenSpeedTest: () => void;
  onOpenVouchers: () => void;
  onOpenSupport: () => void;
}

export const SubscriberDashboard: React.FC<SubscriberDashboardProps> = ({
  subscriber,
  plans,
  news,
  onTopUp,
  onSelectPlan,
  onOpenSpeedTest,
  onOpenVouchers,
  onOpenSupport,
}) => {
  const [topUpAmount, setTopUpAmount] = useState<number>(350);
  const [selectedGateway, setSelectedGateway] = useState<'bkash' | 'nagad' | 'card'>('bkash');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const currentPlan = plans.find(p => p.id === subscriber.currentPlanId) || plans[1];
  
  const handleRecharge = () => {
    onTopUp(topUpAmount);
    setSuccessMsg(`সফলভাবে ৳${topUpAmount} (${selectedGateway.toUpperCase()}) এর মাধ্যমে রিচার্জ করা হয়েছে!`);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const usagePercent = Math.min(100, Math.round((subscriber.dataUsedGB / subscriber.dataTotalGB) * 100));

  return (
    <div className="space-y-6 pb-12">
      
      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-emerald-500/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center space-x-2 text-emerald-300 text-sm font-semibold mb-1">
              <MapPin className="w-4 h-4" />
              <span>{subscriber.village}</span>
              <span className="bg-emerald-500/30 text-emerald-200 text-xs px-2 py-0.5 rounded-full">আইডি: {subscriber.id}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              স্বাগতম, {subscriber.name}!
            </h1>
            <p className="text-slate-200 text-sm mt-1">
              আপনার গ্রামের ফাইবার ইন্টারনেট সংযোগ সচল ও স্থিতিশীল রয়েছে। টাওয়ার নোড #{subscriber.towerId.replace('TOWER-', '')} থেকে নিরবচ্ছিন্ন ব্যান্ডউইথ পাওয়া যাচ্ছে।
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onOpenSpeedTest}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-4 py-2.5 rounded-xl flex items-center space-x-2 shadow-lg shadow-emerald-500/30 transition"
            >
              <Zap className="w-4 h-4" />
              <span>স্পিড টেস্ট করুন</span>
            </button>
            <button
              onClick={onOpenVouchers}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-4 py-2.5 rounded-xl flex items-center space-x-2 transition backdrop-blur-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>ওয়াই-ফাই ভাউচার</span>
            </button>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-xl flex items-center space-x-2 animate-bounce shadow-sm">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Active Plan & Quick Top-Up */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Current Plan Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-600">বর্তমান প্যাকেজ (Subscription)</span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">{currentPlan.name}</h3>
              </div>
              <span className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1 rounded-full font-semibold border border-emerald-200 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>সক্রিয়</span>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-slate-100 my-4">
              <div>
                <span className="text-xs text-slate-500 block">ইন্টারনেট স্পিড</span>
                <span className="text-lg font-bold text-slate-900 flex items-center mt-0.5">
                  <Wifi className="w-4 h-4 text-emerald-600 mr-1.5" />
                  {currentPlan.speed}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">সিগন্যাল শক্তি</span>
                <span className="text-lg font-bold text-emerald-600 flex items-center mt-0.5">
                  <Signal className="w-4 h-4 mr-1.5" />
                  {subscriber.signalDbm} dBm
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">মেয়াদ শেষ</span>
                <span className="text-lg font-bold text-slate-900 flex items-center mt-0.5">
                  <Calendar className="w-4 h-4 text-teal-600 mr-1.5" />
                  {subscriber.expiryDate}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">অ্যাকাউন্ট ব্যালেন্স</span>
                <span className="text-lg font-bold text-amber-600 mt-0.5 block">
                  ৳{subscriber.balance}
                </span>
              </div>
            </div>

            {/* Data Usage Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-600 font-medium">
                <span className="flex items-center">
                  <HardDrive className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  এ মাসের ডেটা ব্যবহার
                </span>
                <span>{subscriber.dataUsedGB} জিবি / {subscriber.dataTotalGB === 999 ? 'আনলিমিটেড' : `${subscriber.dataTotalGB} জিবি`}</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(5, usagePercent)}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 text-right">আনলিমিটেড গ্রাম্য মেস নেটওয়ার্কে ফেয়ার ইউজেস পলিসি (FUP) প্রযোজ্য।</p>
            </div>
          </div>

          {/* Quick Top-Up / Mobile Money Simulation */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center">
              <Smartphone className="w-5 h-5 text-emerald-600 mr-2" />
              দ্রুত রিচার্জ ও অ্যাকাউন্ট টপ-আপ
            </h3>
            <p className="text-slate-500 text-xs mb-4">
              বিকাশ, নগদ বা ব্যাংক কার্ডের মাধ্যমে তাৎক্ষণিক ব্যালেন্স যোগ করুন।
            </p>

            <div className="space-y-4">
              {/* Select Gateway */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'bkash', name: 'বিকাশ (bKash)', color: 'border-pink-300 bg-pink-50 text-pink-700' },
                  { id: 'nagad', name: 'নগদ (Nagad)', color: 'border-orange-300 bg-orange-50 text-orange-700' },
                  { id: 'card', name: 'কার্ড / ইউপিআই', color: 'border-teal-300 bg-teal-50 text-teal-700' },
                ].map((gw) => (
                  <button
                    key={gw.id}
                    onClick={() => setSelectedGateway(gw.id as any)}
                    className={`p-3 rounded-xl border text-sm font-semibold flex flex-col items-center justify-center transition ${
                      selectedGateway === gw.id
                        ? `${gw.color} ring-2 ring-emerald-500 shadow-sm`
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mb-1" />
                    <span>{gw.name}</span>
                  </button>
                ))}
              </div>

              {/* Amount Selector */}
              <div>
                <label className="text-xs text-slate-500 font-medium block mb-2">রিচার্জের পরিমাণ নির্বাচন করুন</label>
                <div className="grid grid-cols-4 gap-2">
                  {[150, 350, 500, 750].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setTopUpAmount(amt)}
                      className={`py-2.5 rounded-xl font-bold text-sm border transition ${
                        topUpAmount === amt
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      ৳{amt}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleRecharge}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3 rounded-xl shadow-md shadow-emerald-600/20 transition flex items-center justify-center space-x-2"
              >
                <span>৳{topUpAmount} পেমেন্ট করুন ({selectedGateway.toUpperCase()})</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Available Upgrade Plans */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">গ্রামের ফাইবার ইন্টারনেট প্যাকেজসমূহ</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {plans.filter(p => p.id !== 'p5').map((plan) => {
                const isCurrent = plan.id === subscriber.currentPlanId;
                return (
                  <div 
                    key={plan.id}
                    className={`border rounded-xl p-4 flex flex-col justify-between transition ${
                      isCurrent 
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-sm' 
                        : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-slate-900">{plan.name}</h4>
                        {plan.popular && (
                          <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200 font-semibold">
                            সবচেয়ে জনপ্রিয়
                          </span>
                        )}
                      </div>
                      <div className="text-2xl font-extrabold text-emerald-600 mb-2">
                        ৳{plan.price} <span className="text-xs text-slate-500 font-normal">/ {plan.validityDays} দিন</span>
                      </div>
                      <div className="space-y-1 text-xs text-slate-600 mb-4">
                        <div className="flex items-center">
                          <Wifi className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                          <span>গতি: {plan.speed}</span>
                        </div>
                        <div className="flex items-center">
                          <HardDrive className="w-3.5 h-3.5 text-teal-600 mr-1.5" />
                          <span>ডেটা: {plan.dataLimit}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectPlan(plan.id)}
                      disabled={isCurrent}
                      className={`w-full py-2 rounded-lg text-xs font-semibold transition ${
                        isCurrent
                          ? 'bg-emerald-100 text-emerald-800 cursor-default'
                          : 'bg-white hover:bg-emerald-600 hover:text-white text-slate-700 border border-slate-200 shadow-sm'
                      }`}
                    >
                      {isCurrent ? 'বর্তমান প্যাকেজ' : 'প্যাকেজ পরিবর্তন করুন'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right 1 Col: Community News, Weather & Quick Help */}
        <div className="space-y-6">
          
          {/* Village Community Board */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center">
              <Newspaper className="w-4 h-4 text-emerald-600 mr-2" />
              গ্রামের নোটিশ ও তথ্য বোর্ড
            </h3>

            <div className="space-y-4">
              {news.map((item) => (
                <div key={item.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-slate-500">{item.date}</span>
                  </div>
                  <h4 className="font-semibold text-sm text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Weather & Tower Status Widget */}
          <div className="bg-gradient-to-br from-white to-emerald-50/50 border border-emerald-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center">
                <CloudSun className="w-4 h-4 text-amber-500 mr-2" />
                জয়পুরহাট আবহাওয়া ও টাওয়ার
              </h4>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-100 px-2 py-0.5 rounded-full">পরিষ্কার ২৮° সে</span>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">যুক্ত টাওয়ার নোড</span>
                <span className="font-semibold text-slate-900">বাজার কেন্দ্রীয় (T-01)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">আপলিংক ল্যাটেন্সি</span>
                <span className="font-semibold text-emerald-600">১৪ মিলিঃসে (অতি দ্রুত)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">সোলার ব্যাটারি ব্যাকআপ</span>
                <span className="font-semibold text-teal-600">৯২% (১৪ ঘণ্টা বাকি)</span>
              </div>
            </div>
          </div>

          {/* Need Help Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900">ইন্টারনেট সংযোগে সমস্যা হচ্ছে?</h4>
            <p className="text-xs text-slate-500">
              ক্যাবল কাটা বা স্লো গতির সমস্যা হলে আমাদের ফিল্ড টেকনিশিয়ান টিমকে জানান।
            </p>
            <button
              onClick={onOpenSupport}
              className="w-full bg-slate-100 hover:bg-slate-200 text-amber-800 font-semibold py-2.5 rounded-xl text-xs border border-amber-200 transition"
            >
              সাপোর্ট টিকিট খুলুন
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
