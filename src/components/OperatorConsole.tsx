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
  const [voucherDuration, setVoucherDuration] = useState<string>('24 Hours');
  const [voucherPrice, setVoucherPrice] = useState<number>(30);
  const [voucherCount, setVoucherCount] = useState<number>(5);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleGenerate = () => {
    onGenerateVouchers(voucherCount, voucherDuration, voucherPrice);
    setSuccessNotice(`Successfully generated ${voucherCount} new voucher cards (${voucherDuration} - ৳${voucherPrice})!`);
    setTimeout(() => setSuccessNotice(null), 4000);
  };

  const totalRevenue = vouchers.filter(v => v.status === 'used').reduce((acc, v) => acc + v.price, 14250);

  return (
    <div className="space-y-6 pb-12">
      
      {/* NOC Header */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-950 to-emerald-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-teal-500/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center space-x-2 text-teal-400 text-sm font-semibold mb-1">
              <Activity className="w-4 h-4" />
              <span>Shera Link Network Operations Center (NOC)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Village Operator Console
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Real-time monitoring of solar repeaters, Wi-Fi token distribution, and field support tickets across Joypurhat hubs.
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-800">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-xs font-semibold text-emerald-300">All 4 Mesh Nodes Online</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 border-b border-slate-800 pb-4">
          {[
            { id: 'towers', label: 'Tower & Nodes', icon: Radio },
            { id: 'vouchers', label: 'Vouchers & Tokens', icon: ShieldCheck },
            { id: 'tickets', label: 'Field Support Tickets', icon: Wrench },
            { id: 'finances', label: 'Revenue & Collection', icon: DollarSign },
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
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
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
        <div className="bg-teal-500/10 border border-teal-500 text-teal-300 px-4 py-3 rounded-xl flex items-center space-x-2 animate-bounce">
          <CheckCircle className="w-5 h-5 text-teal-400" />
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
                className={`bg-slate-900 border rounded-2xl p-6 shadow-lg relative overflow-hidden ${
                  isWarning ? 'border-amber-500/40 bg-amber-950/10' : 'border-slate-800'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs text-slate-400 font-mono">{tower.id}</span>
                    <h3 className="text-lg font-bold text-white mt-0.5">{tower.name}</h3>
                    <p className="text-xs text-slate-400">{tower.location}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold border flex items-center space-x-1 ${
                    isWarning 
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${isWarning ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`}></span>
                    <span className="capitalize">{tower.status}</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-slate-800 my-4 text-xs">
                  <div>
                    <span className="text-slate-400 flex items-center mb-1">
                      <Battery className="w-3.5 h-3.5 text-teal-400 mr-1" />
                      Battery
                    </span>
                    <span className={`font-bold text-base ${tower.batteryPercent < 50 ? 'text-amber-400' : 'text-white'}`}>
                      {tower.batteryPercent}%
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 flex items-center mb-1">
                      <Sun className="w-3.5 h-3.5 text-amber-400 mr-1" />
                      Solar V
                    </span>
                    <span className="font-bold text-base text-white">{tower.solarVoltage}V</span>
                  </div>
                  <div>
                    <span className="text-slate-400 flex items-center mb-1">
                      <Users className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                      Clients
                    </span>
                    <span className="font-bold text-base text-white">{tower.activeClients}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 flex items-center mb-1">
                      <Activity className="w-3.5 h-3.5 text-blue-400 mr-1" />
                      Throughput
                    </span>
                    <span className="font-bold text-base text-white">{tower.throughputMbps} Mbps</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span>Uplink Latency: <strong className="text-emerald-400">{tower.uplinkLatencyMs} ms</strong></span>
                  <button className="text-teal-400 hover:text-teal-300 font-semibold flex items-center space-x-1">
                    <RefreshCcw className="w-3.5 h-3.5" />
                    <span>Ping Diagnostics</span>
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
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center">
              <Printer className="w-5 h-5 text-teal-400 mr-2" />
              Batch Wi-Fi Voucher Generator (For Local Grocery Shops)
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Generate scratch card codes for hourly or daily hotspot passes to distribute via village shop agents.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Duration / Pass Type</label>
                <select 
                  value={voucherDuration}
                  onChange={(e) => setVoucherDuration(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm"
                >
                  <option value="24 Hours">24 Hours (৳30)</option>
                  <option value="7 Days">7 Days (৳150)</option>
                  <option value="30 Days">30 Days (৳750)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Price per Voucher (BDT)</label>
                <input 
                  type="number"
                  value={voucherPrice}
                  onChange={(e) => setVoucherPrice(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Quantity to Generate</label>
                <input 
                  type="number"
                  value={voucherCount}
                  onChange={(e) => setVoucherCount(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm"
                  min="1"
                  max="50"
                />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-lg shadow-teal-900/40 transition flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Generate Voucher Batch</span>
            </button>
          </div>

          {/* Vouchers Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-base font-bold text-white mb-4">Active & Used Scratch Vouchers</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800">
                    <th className="pb-3">Voucher Code</th>
                    <th className="pb-3">Duration</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Generated Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {vouchers.map((v, i) => (
                    <tr key={i} className="hover:bg-slate-800/40">
                      <td className="py-3 font-mono font-bold text-teal-300">{v.code}</td>
                      <td className="py-3">{v.duration}</td>
                      <td className="py-3 font-semibold text-white">৳{v.price}</td>
                      <td className="py-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          v.status === 'available'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}>
                          {v.status}
                        </span>
                      </td>
                      <td className="py-3 text-slate-400">{v.generatedDate}</td>
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
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
          <h3 className="text-base font-bold text-white mb-2">Subscriber Support & Technician Dispatch</h3>
          <p className="text-xs text-slate-400 mb-4">Manage cable damage reports, slow speed complaints, and router disconnections.</p>

          <div className="space-y-3">
            {tickets.map((t) => (
              <div key={t.id} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-teal-400">{t.id}</span>
                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">{t.issueType.replace('_', ' ')}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      t.status === 'resolved' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {t.status}
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm text-white">{t.subscriberName} — <span className="text-slate-400 font-normal">{t.village}</span></h4>
                  <p className="text-xs text-slate-300">{t.description}</p>
                  <p className="text-[11px] text-teal-300">Assigned: {t.assignedTech || 'Unassigned'} • {t.createdAt}</p>
                </div>

                {t.status !== 'resolved' && (
                  <button
                    onClick={() => onResolveTicket(t.id)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow transition whitespace-nowrap"
                  >
                    Mark Resolved
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
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <span className="text-xs text-slate-400 block mb-1">Total Monthly Revenue</span>
            <div className="text-3xl font-extrabold text-emerald-400">৳{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-slate-400 mt-2">+18% compared to last month</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <span className="text-xs text-slate-400 block mb-1">Active Monthly Subscribers</span>
            <div className="text-3xl font-extrabold text-teal-300">324 Households</div>
            <p className="text-xs text-slate-400 mt-2">94% collection rate on time</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
            <span className="text-xs text-slate-400 block mb-1">Hotspot Voucher Sales</span>
            <div className="text-3xl font-extrabold text-amber-400">৳3,450</div>
            <p className="text-xs text-slate-400 mt-2">Sold via 6 village grocery agents</p>
          </div>
        </div>
      )}

    </div>
  );
};
