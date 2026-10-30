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
      subscriberName: 'Anisur Rahman',
      village: 'Madhabpur East Para',
      issueType,
      description,
      status: 'open',
      assignedTech: 'Rahim Miah (Assigned)',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Report Village Connection Issue</h3>
            <p className="text-xs text-slate-400">Our local field technician will be dispatched promptly</p>
          </div>
        </div>

        {submitted ? (
          <div className="bg-emerald-500/10 border border-emerald-500 text-emerald-300 p-4 rounded-xl text-center space-y-2 my-4">
            <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="font-bold text-sm">Ticket Submitted Successfully!</h4>
            <p className="text-xs text-slate-300">Rahim Miah has been notified and is assigned to your household.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Issue Category</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm"
              >
                <option value="slow_speed">Slow Internet Speed / High Ping</option>
                <option value="cable_cut">Drop Cable Damaged (Tree branch / wind)</option>
                <option value="power_outage">Repeater Tower / Router Power Outage</option>
                <option value="router_config">Wi-Fi Router Password / PPPoE Setup</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Detailed Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what you are experiencing..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm placeholder:text-slate-500 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold py-3 rounded-xl text-sm shadow-lg shadow-amber-950/50 transition"
            >
              Dispatch Field Technician
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
