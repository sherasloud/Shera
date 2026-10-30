import React, { useState } from 'react';
import { X, Wrench, CheckCircle, AlertTriangle } from 'lucide-react';
import { SupportTicket } from '../types';

interface SupportTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitTicket: (ticket: SupportTicket) => void;
}

export const SupportTicketModal: React.FC<SupportTicketModalProps> = ({
  isOpen,
  onClose,
  onSubmitTicket,
}) => {
  const [issueType, setIssueType] = useState<'slow_speed' | 'cable_cut' | 'power_outage' | 'router_config'>('slow_speed');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket: SupportTicket = {
      id: `TKT-${Math.floor(Math.random() * 900) + 100}`,
      subscriberName: 'আনিসুর রহমান',
      village: 'মাধবপুর পূর্ব পাড়া',
      issueType,
      description,
      status: 'open',
      assignedTech: 'রহিম মিয়া (নিযুক্ত)',
      createdAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
    };
    onSubmitTicket(newTicket);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setDescription('');
      onClose();
    }, 2000);
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
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">ইন্টারনেট সমস্যার রিপোর্ট করুন</h3>
            <p className="text-xs text-slate-500">আমাদের স্থানীয় ফিল্ড টেকনিশিয়ান দ্রুত আপনার বাড়ি ভিজিট করবেন</p>
          </div>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-xl text-center space-y-2 my-4">
            <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-sm">সাপোর্ট টিকিট সফলভাবে জমা হয়েছে!</h4>
            <p className="text-xs text-slate-600">রহিম মিয়াকে আপনার এলাকার জন্য দায়িত্ব দেওয়া হয়েছে।</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-slate-600 font-medium block mb-1">সমস্যার ধরণ</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-amber-500"
              >
                <option value="slow_speed">ইন্টারনেট স্লো বা অতিরিক্ত ল্যাটেন্সি</option>
                <option value="cable_cut">ড্রপ ক্যাবল কাটা বা ক্ষতিগ্রস্ত (ঝড়/গাছের ডাল)</option>
                <option value="power_outage">রিপিটার টাওয়ার বা রাউটারে বিদ্যুৎ সমস্যা</option>
                <option value="router_config">ওয়াই-ফাই পাসওয়ার্ড বা রাউটার কনফিগারেশন</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-600 font-medium block mb-1">বিস্তারিত বিবরণ লিখুন</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="আপনার সমস্যাটি বিস্তারিত লিখুন..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 text-sm placeholder:text-slate-400 resize-none focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold py-3 rounded-xl text-sm shadow-md shadow-amber-600/20 transition"
            >
              টেকনিশিয়ান ডিসপ্যাচ করুন
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
