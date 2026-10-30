import React, { useState } from 'react';
import { UserRole, SubscriberAccount, SubscriberPlan, TowerNode, WifiVoucher, SupportTicket, CommunityNews } from './types';
import { INITIAL_SUBSCRIBER, INITIAL_PLANS, INITIAL_TOWERS, INITIAL_VOUCHERS, INITIAL_TICKETS, INITIAL_NEWS } from './mockData';
import { Navbar } from './components/Navbar';
import { SubscriberDashboard } from './components/SubscriberDashboard';
import { OperatorConsole } from './components/OperatorConsole';
import { VoucherModal } from './components/VoucherModal';
import { SpeedTestModal } from './components/SpeedTestModal';
import { SupportTicketModal } from './components/SupportTicketModal';
import { AiAssistantModal } from './components/AiAssistantModal';

export default function App() {
  const [role, setRole] = useState<UserRole>('subscriber');
  const [subscriber, setSubscriber] = useState<SubscriberAccount>(INITIAL_SUBSCRIBER);
  const [plans, setPlans] = useState<SubscriberPlan[]>(INITIAL_PLANS);
  const [towers, setTowers] = useState<TowerNode[]>(INITIAL_TOWERS);
  const [vouchers, setVouchers] = useState<WifiVoucher[]>(INITIAL_VOUCHERS);
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [news, setNews] = useState<CommunityNews[]>(INITIAL_NEWS);

  // Modal controls
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isSpeedTestOpen, setIsSpeedTestOpen] = useState(false);
  const [isVoucherOpen, setIsVoucherOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  const handleTopUp = (amount: number) => {
    setSubscriber(prev => ({
      ...prev,
      balance: prev.balance + amount,
    }));
  };

  const handleSelectPlan = (planId: string) => {
    const selected = plans.find(p => p.id === planId);
    if (selected) {
      setSubscriber(prev => ({
        ...prev,
        currentPlanId: planId,
      }));
    }
  };

  const handleGenerateVouchers = (count: number, duration: string, price: number) => {
    const newVouchers: WifiVoucher[] = Array.from({ length: count }).map(() => ({
      code: `SHERA-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      duration,
      price,
      status: 'available',
      generatedDate: new Date().toISOString().split('T')[0],
    }));
    setVouchers(prev => [...newVouchers, ...prev]);
  };

  const handleRedeemVoucher = (code: string) => {
    setVouchers(prev => prev.map(v => v.code === code ? { ...v, status: 'used' } : v));
  };

  const handleAddTicket = (ticket: SupportTicket) => {
    setTickets(prev => [ticket, ...prev]);
  };

  const handleResolveTicket = (ticketId: string) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'resolved' } : t));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      <Navbar
        role={role}
        setRole={setRole}
        onOpenAi={() => setIsAiOpen(true)}
        onOpenSpeedTest={() => setIsSpeedTestOpen(true)}
        onOpenVouchers={() => setIsVoucherOpen(true)}
        onOpenSupport={() => setIsSupportOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {role === 'subscriber' ? (
          <SubscriberDashboard
            subscriber={subscriber}
            plans={plans}
            news={news}
            onTopUp={handleTopUp}
            onSelectPlan={handleSelectPlan}
            onOpenSpeedTest={() => setIsSpeedTestOpen(true)}
            onOpenVouchers={() => setIsVoucherOpen(true)}
            onOpenSupport={() => setIsSupportOpen(true)}
          />
        ) : (
          <OperatorConsole
            towers={towers}
            vouchers={vouchers}
            tickets={tickets}
            subscriber={subscriber}
            onGenerateVouchers={handleGenerateVouchers}
            onResolveTicket={handleResolveTicket}
          />
        )}
      </main>

      {/* Modals */}
      <AiAssistantModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        subscriberContext={subscriber}
      />

      <SpeedTestModal
        isOpen={isSpeedTestOpen}
        onClose={() => setIsSpeedTestOpen(false)}
      />

      <VoucherModal
        isOpen={isVoucherOpen}
        onClose={() => setIsVoucherOpen(false)}
        vouchers={vouchers}
        onRedeem={handleRedeemVoucher}
      />

      <SupportTicketModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
        onSubmitTicket={handleAddTicket}
      />
    </div>
  );
}
