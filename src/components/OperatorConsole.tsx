import React, { useState } from 'react';
import { TowerNode, WifiVoucher, SupportTicket, SubscriberAccount } from '../types';
import { 
  Radio, ShieldCheck, Battery, Sun, Users, Activity, Printer, Plus, 
  CheckCircle, AlertTriangle, RefreshCcw, DollarSign, Wrench, Search
} from 'lucide-react';

interface OperatorConsoleProps {
  towers: TowerNode[];
  vouchers: WifiVoucher[];
  tickets: SupportTicket[];
  subscriber: SubscriberAccount;
  onGenerateVouchers: (count: number, duration: string, price: number) => void;
  onResolveTicket: (ticketId: string) => void;
}

export const OperatorConsole: React.FC<OperatorConsoleProps> = ({
  towers,
  vouchers,
  tickets,
  subscriber,
  onGenerateVouchers,
  onResolveTicket,
}) => {
  const [activeTab, setActiveTab] = useState<'towers' | 'vouchers' | 'tickets' | 'finances'>('towers');
  const [voucherDuration, setVoucherDuration] = useState<string>('২৪ ঘণ্টা');
  const [voucherPrice, setVoucherPrice] = useState<number>(30);
  const [voucherCount, setVoucherCount] = useState<number>(5);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleGenerate = () => {
    onGenerateVouchers(voucherCount, voucherDuration, voucherPrice);
    setSuccessNotice(`সফলভাবে ${voucherCount}টি নতুন ভাউচার কার্ড (${voucherDuration} - ৳${voucherPrice}) তৈরি করা হয়েছে!`);
    setTimeout(() => setSuccessNotice(null), 4000);
  };

  const totalRevenue = vouchers.filter(v => v.status === 'used').reduce((acc, v) => acc + v.price, 14250);

  return (
    <div className="space-y-6 pb-12">
      
      {/* NOC Header */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-teal-500/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center space-x-2 text-teal-300 text-sm font-semibold mb-1">
              <Activity className="w-4 h-4" />
              <span>সেরা লিংক নেটওয়ার্ক অপারেশন সেন্টার (NOC)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              গ্রাম ইন্টারনেট অপারেটর কনসোল
            </h1>
            <p className="text-slate-200 text-xs sm:text-sm mt-1">
              সোলার রিপিটার, ওয়াই-ফাই টোকেন ডিস্ট্রিবিউশন এবং ফিল্ড সাপোর্ট টিকিট রিয়েল-টাইম মনিটরিং।
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/20">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-xs font-semibold text-emerald-200">সব ৪টি মেস নোড অনলাইন</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 border-b border-white/10 pb-4">
          {[
            { id: 'towers', label: 'টাওয়ার ও নোডসমূহ', icon: Radio },
            { id: 'vouchers', label: 'ভাউচার ও টোকেন', icon: ShieldCheck },
            { id: 'tickets', label: 'ফিল্ড সাপোর্ট টিকিট', icon: Wrench },
            { id: 'finances', label: 'রাজস্ব ও কালেকশন', icon: DollarSign },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20 border border-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {successNotice && (
        <div className="bg-teal-50 border border-teal-300 text-teal-800 px-4 py-3 rounded-xl flex items-center space-x-2 animate-bounce shadow-sm">
          <CheckCircle className="w-5 h-5 text-teal-600" />
          <span className="font-medium">{successNotice}</span>
        </div>
      )}

      {/* Tab 1: Tower & Nodes */}
      {activeTab === 'towers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {towers.map((tower) => {
            const isWarning = tower.status === 'warning';
            return (
              <div 
                key={tower.id}
                className={`bg-white border rounded-2xl p-6 shadow-sm relative overflow-hidden ${
                  isWarning ? 'border-amber-300 bg-amber-50/30' : 'border-slate-200'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs text-slate-400 font-mono">{tower.id}</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">{tower.name}</h3>
                    <p className="text-xs text-slate-500">{tower.location}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold border flex items-center space-x-1 ${
                    isWarning 
                      ? 'bg-amber-100 text-amber-800 border-amber-200' 
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${isWarning ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'}`}></span>
                    <span className="capitalize">{tower.status === 'online' ? 'অনলাইন' : 'সতর্কতা'}</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-slate-100 my-4 text-xs">
                  <div>
                    <span className="text-slate-500 flex items-center mb-1">
                      <Battery className="w-3.5 h-3.5 text-teal-600 mr-1" />
                      ব্যাটারি
                    </span>
                    <span className={`font-bold text-base ${tower.batteryPercent < 50 ? 'text-amber-600' : 'text-slate-900'}`}>
                      {tower.batteryPercent}%
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 flex items-center mb-1">
                      <Sun className="w-3.5 h-3.5 text-amber-500 mr-1" />
                      সোলার ভোল্ট
                    </span>
                    <span className="font-bold text-base text-slate-900">{tower.solarVoltage}V</span>
                  </div>
                  <div>
                    <span className="text-slate-500 flex items-center mb-1">
                      <Users className="w-3.5 h-3.5 text-emerald-600 mr-1" />
                      গ্রাহক সংখ্যা
                    </span>
                    <span className="font-bold text-base text-slate-900">{tower.activeClients}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 flex items-center mb-1">
                      <Activity className="w-3.5 h-3.5 text-blue-600 mr-1" />
                      ব্যান্ডউইথ
                    </span>
                    <span className="font-bold text-base text-slate-900">{tower.throughputMbps} Mbps</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>আপলিংক ল্যাটেন্সি: <strong className="text-emerald-600">{tower.uplinkLatencyMs} ms</strong></span>
                  <button className="text-teal-700 hover:text-teal-900 font-semibold flex items-center space-x-1">
                    <RefreshCcw className="w-3.5 h-3.5" />
                    <span>পিং ডায়াগনস্টিকস</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Vouchers & Tokens */}
      {activeTab === 'vouchers' && (
        <div className="space-y-6">
          {/* Generator Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center">
              <Printer className="w-5 h-5 text-teal-600 mr-2" />
              ওয়াই-ফাই ভাউচার ও স্ক্র্যাচ কার্ড জেনারেটর (গ্রামের দোকানদারদের জন্য)
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              গ্রামের মুদি দোকান বা এজেন্টদের মাধ্যমে বিক্রির জন্য ঘণ্টা বা দিনভিত্তিক পাস তৈরি করুন।
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-xs text-slate-600 font-medium block mb-1">পাস বা মেয়াদ</label>
                <select 
                  value={voucherDuration}
                  onChange={(e) => setVoucherDuration(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-sm"
                >
                  <option value="২৪ ঘণ্টা">২৪ ঘণ্টা (৳৩০)</option>
                  <option value="৭ দিন">৭ দিন (৳১৫০)</option>
                  <option value="৩০ দিন">৩০ দিন (৳৭৫০)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-600 font-medium block mb-1">মূল্য (টাকা)</label>
                <input 
                  type="number"
                  value={voucherPrice}
                  onChange={(e) => setVoucherPrice(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-slate-600 font-medium block mb-1">পরিমাণ (কয়টি)</label>
                <input 
                  type="number"
                  value={voucherCount}
                  onChange={(e) => setVoucherCount(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-sm"
                  min="1"
                  max="50"
                />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-md shadow-teal-600/20 transition flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>ভাউচার তৈরি করুন</span>
            </button>
          </div>

          {/* Vouchers Table */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4">সক্রিয় ও ব্যবহৃত ভাউচার তালিকা</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-500 border-b border-slate-200">
                    <th className="pb-3">ভাউচার কোড</th>
                    <th className="pb-3">মেয়াদ</th>
                    <th className="pb-3">মূল্য</th>
                    <th className="pb-3">স্ট্যাটাস</th>
                    <th className="pb-3">তৈরির তারিখ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {vouchers.map((v, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="py-3 font-mono font-bold text-teal-700">{v.code}</td>
                      <td className="py-3">{v.duration}</td>
                      <td className="py-3 font-semibold text-slate-900">৳{v.price}</td>
                      <td className="py-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          v.status === 'available'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}>
                          {v.status === 'available' ? 'সক্রিয়' : 'ব্যবহৃত'}
                        </span>
                      </td>
                      <td className="py-3 text-slate-500">{v.generatedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Field Support Tickets */}
      {activeTab === 'tickets' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 mb-2">গ্রাহক সাপোর্ট ও টেকনিশিয়ান ডিসপ্যাচ</h3>
          <p className="text-xs text-slate-500 mb-4">ক্যাবল কাটা, স্লো ইন্টারনেট এবং রাউটার সমস্যার রিপোর্ট পরিচালনা করুন।</p>

          <div className="space-y-3">
            {tickets.map((t) => (
              <div key={t.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-teal-700">{t.id}</span>
                    <span className="text-xs bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200">{t.issueType.replace('_', ' ')}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      t.status === 'resolved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {t.status === 'resolved' ? 'সমাধানকৃত' : 'চলমান'}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm text-slate-900">{t.subscriberName} — <span className="text-slate-500 font-normal">{t.village}</span></h4>
                  <p className="text-xs text-slate-600">{t.description}</p>
                  <p className="text-[11px] text-teal-700 font-medium">দায়িত্বে: {t.assignedTech || 'অনির্ধারিত'} • {t.createdAt}</p>
                </div>

                {t.status !== 'resolved' && (
                  <button
                    onClick={() => onResolveTicket(t.id)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition whitespace-nowrap"
                  >
                    সমাধান সম্পন্ন
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Revenue & Collection */}
      {activeTab === 'finances' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <span className="text-xs text-slate-500 block mb-1">মোট মাসিক রাজস্ব (Revenue)</span>
            <div className="text-3xl font-extrabold text-emerald-600">৳{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-slate-500 mt-2">গত মাসের তুলনায় ১৮% বেশি</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <span className="text-xs text-slate-500 block mb-1">সক্রিয় মাসিক গ্রাহক পরিবার</span>
            <div className="text-3xl font-extrabold text-teal-700">৩২৪ পরিবার</div>
            <p className="text-xs text-slate-500 mt-2">সময়মতো বিল পরিশোধ ৯৪%</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <span className="text-xs text-slate-500 block mb-1">ওয়াই-ফাই ভাউচার বিক্রি</span>
            <div className="text-3xl font-extrabold text-amber-600">৳৩,৪৫০</div>
            <p className="text-xs text-slate-500 mt-2">৬টি গ্রামের মুদি দোকানের মাধ্যমে</p>
          </div>
        </div>
      )}

    </div>
  );
};
