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
    setSuccessMsg(`Successfully added ৳${topUpAmount} via ${selectedGateway.toUpperCase()}! Balance updated.`);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const usagePercent = Math.min(100, Math.round((subscriber.dataUsedGB / subscriber.dataTotalGB) * 100));

  return (
    <div className="space-y-6 pb-12">
      
      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-emerald-500/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 text-sm font-semibold mb-1">
              <MapPin className="w-4 h-4" />
              <span>{subscriber.village}</span>
              <span className="bg-emerald-500/25 text-emerald-300 text-xs px-2 py-0.5 rounded-full">ID: {subscriber.id}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome back, {subscriber.name}!
            </h1>
            <p className="text-slate-300 text-sm mt-1">
              Your village fiber connection is stable. Tower relay #{subscriber.towerId.replace('TOWER-', '')} is operating at optimal bandwidth.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onOpenSpeedTest}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-4 py-2.5 rounded-xl flex items-center space-x-2 shadow-lg shadow-emerald-600/30 transition"
            >
              <Zap className="w-4 h-4" />
              <span>Run Speed Test</span>
            </button>
            <button
              onClick={onOpenVouchers}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-teal-300 font-medium px-4 py-2.5 rounded-xl flex items-center space-x-2 transition"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Wi-Fi Vouchers</span>
            </button>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500 text-emerald-300 px-4 py-3 rounded-xl flex items-center space-x-2 animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Active Plan & Quick Top-Up */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Current Plan Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">Current Subscription</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{currentPlan.name}</h3>
              </div>
              <span className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full font-semibold border border-emerald-500/30 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active</span>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-slate-800 my-4">
              <div>
                <span className="text-xs text-slate-400 block">Download Speed</span>
                <span className="text-lg font-bold text-white flex items-center mt-0.5">
                  <Wifi className="w-4 h-4 text-emerald-400 mr-1.5" />
                  {currentPlan.speed}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Signal Strength</span>
                <span className="text-lg font-bold text-emerald-400 flex items-center mt-0.5">
                  <Signal className="w-4 h-4 mr-1.5" />
                  {subscriber.signalDbm} dBm
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Valid Until</span>
                <span className="text-lg font-bold text-white flex items-center mt-0.5">
                  <Calendar className="w-4 h-4 text-teal-400 mr-1.5" />
                  {subscriber.expiryDate}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Account Balance</span>
                <span className="text-lg font-bold text-amber-400 mt-0.5 block">
                  ৳{subscriber.balance}
                </span>
              </div>
            </div>

            {/* Data Usage Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span className="flex items-center">
                  <HardDrive className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                  Monthly Data Usage
                </span>
                <span className="font-semibold">{subscriber.dataUsedGB} GB / {subscriber.dataTotalGB === 999 ? 'Unlimited' : `${subscriber.dataTotalGB} GB`}</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.max(5, usagePercent)}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 text-right">Fair usage policy applies for unlimited rural mesh nodes.</p>
            </div>
          </div>

          {/* Quick Top-Up / Mobile Money Simulation */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center">
              <Smartphone className="w-5 h-5 text-emerald-400 mr-2" />
              Quick Recharge & Top-Up
            </h3>
            <p className="text-slate-400 text-xs mb-4">
              Instant balance addition via rural mobile financial services or local agent cash.
            </p>

            <div className="space-y-4">
              {/* Select Gateway */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'bkash', name: 'bKash Pay', color: 'border-pink-500/50 bg-pink-500/10 text-pink-300' },
                  { id: 'nagad', name: 'Nagad MFS', color: 'border-orange-500/50 bg-orange-500/10 text-orange-300' },
                  { id: 'card', name: 'Debit Card / UPI', color: 'border-teal-500/50 bg-teal-500/10 text-teal-300' },
                ].map((gw) => (
                  <button
                    key={gw.id}
                    onClick={() => setSelectedGateway(gw.id as any)}
                    className={`p-3 rounded-xl border text-sm font-semibold flex flex-col items-center justify-center transition ${
                      selectedGateway === gw.id
                        ? `${gw.color} ring-2 ring-emerald-500`
                        : 'border-slate-800 bg-slate-800/50 text-slate-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mb-1" />
                    <span>{gw.name}</span>
                  </button>
                ))}
              </div>

              {/* Amount Selector */}
              <div>
                <label className="text-xs text-slate-400 block mb-2">Select Top-Up Amount (BDT / INR)</label>
                <div className="grid grid-cols-4 gap-2">
                  {[150, 350, 500, 750].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setTopUpAmount(amt)}
                      className={`py-2.5 rounded-xl font-bold text-sm border transition ${
                        topUpAmount === amt
                          ? 'bg-emerald-600 border-emerald-500 text-white shadow'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      ৳{amt}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleRecharge}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-900/50 transition flex items-center justify-center space-x-2"
              >
                <span>Pay ৳{topUpAmount} with {selectedGateway.toUpperCase()}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Available Upgrade Plans */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4">Available Village Fiber Plans</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {plans.filter(p => p.id !== 'p5').map((plan) => {
                const isCurrent = plan.id === subscriber.currentPlanId;
                return (
                  <div 
                    key={plan.id}
                    className={`border rounded-xl p-4 flex flex-col justify-between transition ${
                      isCurrent 
                        ? 'border-emerald-500 bg-emerald-950/20' 
                        : 'border-slate-800 bg-slate-800/40 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-white">{plan.name}</h4>
                        {plan.popular && (
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                            Most Popular
                          </span>
                        )}
                      </div>
                      <div className="text-2xl font-extrabold text-emerald-400 mb-2">
                        ৳{plan.price} <span className="text-xs text-slate-400 font-normal">/ {plan.validityDays} days</span>
                      </div>
                      <div className="space-y-1 text-xs text-slate-300 mb-4">
                        <div className="flex items-center">
                          <Wifi className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
                          <span>Speed: {plan.speed}</span>
                        </div>
                        <div className="flex items-center">
                          <HardDrive className="w-3.5 h-3.5 text-teal-400 mr-1.5" />
                          <span>Data: {plan.dataLimit}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectPlan(plan.id)}
                      disabled={isCurrent}
                      className={`w-full py-2 rounded-lg text-xs font-semibold transition ${
                        isCurrent
                          ? 'bg-emerald-500/20 text-emerald-300 cursor-default'
                          : 'bg-slate-800 hover:bg-emerald-600 text-white border border-slate-700'
                      }`}
                    >
                      {isCurrent ? 'Current Plan' : 'Switch Plan'}
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
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-base font-bold text-white mb-4 flex items-center">
              <Newspaper className="w-4 h-4 text-emerald-400 mr-2" />
              Village Community Board
            </h3>

            <div className="space-y-4">
              {news.map((item) => (
                <div key={item.id} className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/25 text-emerald-300">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-slate-400">{item.date}</span>
                  </div>
                  <h4 className="font-semibold text-sm text-white">{item.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Weather & Tower Status Widget */}
          <div className="bg-gradient-to-br from-slate-900 to-emerald-950/40 border border-emerald-500/20 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-white flex items-center">
                <CloudSun className="w-4 h-4 text-amber-400 mr-2" />
                Joypurhat Weather & Relay
              </h4>
              <span className="text-xs text-emerald-400 font-medium">Clear Sky 28°C</span>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Connected Tower</span>
                <span className="font-semibold text-white">Bazaar Central (T-01)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800">
                <span className="text-slate-400">Uplink Latency</span>
                <span className="font-semibold text-emerald-400">14 ms (Ultra Fast)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">Solar Battery Backup</span>
                <span className="font-semibold text-teal-400">92% (14h remaining)</span>
              </div>
            </div>
          </div>

          {/* Need Help Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-white">Facing Connection Drop?</h4>
            <p className="text-xs text-slate-400">
              Report cable cuts or slow speed instantly to our village field technician team.
            </p>
            <button
              onClick={onOpenSupport}
              className="w-full bg-slate-800 hover:bg-slate-700 text-amber-300 font-semibold py-2.5 rounded-xl text-xs border border-amber-500/30 transition"
            >
              Open Support Ticket
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
