import { SubscriberPlan, SubscriberAccount, TowerNode, WifiVoucher, SupportTicket, CommunityNews } from './types';

export const INITIAL_PLANS: SubscriberPlan[] = [
  {
    id: 'p1',
    name: 'ছাত্র-ছাত্রী প্যাক (Student Pack)',
    speed: '১০ এমবিপিএস (10 Mbps)',
    dataLimit: '১৫০ জিবি',
    price: 350,
    validityDays: 30,
    category: 'student',
  },
  {
    id: 'p2',
    name: 'হোম ফাইবার আনলিমিটেড (Home Unlimited)',
    speed: '২৫ এমবিপিএস (25 Mbps)',
    dataLimit: 'আনলিমিটেড',
    price: 750,
    validityDays: 30,
    popular: true,
    category: 'home',
  },
  {
    id: 'p3',
    name: 'কৃষক আবহাওয়া ও ইন্টারনেট প্যাক',
    speed: '১৫ এমবিপিএস (15 Mbps)',
    dataLimit: '২৫০ জিবি',
    price: 500,
    validityDays: 30,
    category: 'farmer',
  },
  {
    id: 'p4',
    name: 'বাজার বিজনেস প্রো (Biz Pro)',
    speed: '৫০ এমবিপিএস (50 Mbps)',
    dataLimit: 'আনলিমিটেড',
    price: 1500,
    validityDays: 30,
    category: 'business',
  },
  {
    id: 'p5',
    name: '২৪-ঘণ্টা হটস্পট পাস (Hotspot Pass)',
    speed: '২০ এমবিপিএস (20 Mbps)',
    dataLimit: '১০ জিবি',
    price: 30,
    validityDays: 1,
    category: 'student',
  }
];

export const INITIAL_SUBSCRIBER: SubscriberAccount = {
  id: 'SUB-৮৮২১',
  name: 'আনিসুর রহমান',
  phone: '+৮৮০ ১৭১২-৩৪৫৬৭৮',
  village: 'মাধবপুর পূর্ব পাড়া, নোড #৩',
  currentPlanId: 'p2',
  expiryDate: '২০২৬-১১-২৮',
  dataUsedGB: 342.5,
  dataTotalGB: 999, // Unlimited representation
  signalDbm: -56,
  towerId: 'TOWER-03',
  status: 'active',
  balance: 450,
};

export const INITIAL_TOWERS: TowerNode[] = [
  {
    id: 'TOWER-01',
    name: 'বাজার কেন্দ্রীয় রিপিটার',
    location: 'জয়পুরহাট প্রধান বাজার ছাদ',
    status: 'online',
    batteryPercent: 92,
    solarVoltage: 24.5,
    activeClients: 142,
    throughputMbps: 185.4,
    uplinkLatencyMs: 14,
  },
  {
    id: 'TOWER-02',
    name: 'সরকারি প্রাথমিক বিদ্যালয় নোড',
    location: 'স্কুল পাহাড় চূড়া মাস্ট',
    status: 'online',
    batteryPercent: 88,
    solarVoltage: 23.8,
    activeClients: 96,
    throughputMbps: 110.2,
    uplinkLatencyMs: 18,
  },
  {
    id: 'TOWER-03',
    name: 'পূর্ব পাড়া সোলার রিলে',
    location: 'পূর্ব পাড়া পানির ট্যাংকি পোল',
    status: 'online',
    batteryPercent: 74,
    solarVoltage: 21.2,
    activeClients: 58,
    throughputMbps: 68.9,
    uplinkLatencyMs: 22,
  },
  {
    id: 'TOWER-04',
    name: 'পশ্চিম খাল আউটপোস্ট',
    location: 'খাল স্লুইস গেট মাস্ট',
    status: 'warning',
    batteryPercent: 45,
    solarVoltage: 18.1,
    activeClients: 24,
    throughputMbps: 22.4,
    uplinkLatencyMs: 38,
  }
];

export const INITIAL_VOUCHERS: WifiVoucher[] = [
  { code: 'SHERA-৯৯২১-ABCD', duration: '২৪ ঘণ্টা', price: 30, status: 'available', generatedDate: '২০২৬-১০-২৮' },
  { code: 'SHERA-৪৪১২-XW90', duration: '৭ দিন', price: 150, status: 'available', generatedDate: '২০২৬-১০-২৯' },
  { code: 'SHERA-৭৭১৯-MNH7', duration: '২৪ ঘণ্টা', price: 30, status: 'used', generatedDate: '২০২৬-১০-২৫' },
  { code: 'SHERA-৩৩১৮-KLP2', duration: '৩০ দিন', price: 750, status: 'available', generatedDate: '২০২৬-১০-৩০' },
  { code: 'SHERA-৫৫৬১-QWE8', duration: '৭ দিন', price: 150, status: 'available', generatedDate: '২০২৬-১০-৩০' },
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'TKT-১০১',
    subscriberName: 'কমল হোসেন',
    village: 'পশ্চিম খাল পাড়',
    issueType: 'cable_cut',
    description: 'দুপুরের ঝড়ে গাছের ডাল লেগে ড্রপ ক্যাবলে সমস্যা হচ্ছে। ইন্টারনেটে সংযোগ কেটে যাচ্ছে।',
    status: 'in_progress',
    assignedTech: 'রহিম মিয়া (ফিল্ড টেকনিশিয়ান #২)',
    createdAt: '২০২৬-১০-২৯ ১৪:২০',
  },
  {
    id: 'TKT-১০২',
    subscriberName: 'সেলিনা বেগম',
    village: 'স্কুল পাড়া',
    issueType: 'slow_speed',
    description: 'গত রাতের কালবৈশাখী ঝড়ের পর ওয়াই-ফাই রাউটারে লাল লস (LOS) বাতি জ্বলছে।',
    status: 'open',
    assignedTech: 'টিম অপেক্ষমাণ',
    createdAt: '২০২৬-১০-৩০ ০৮:১৫',
  }
];

export const INITIAL_NEWS: CommunityNews[] = [
  {
    id: 'NEWS-১',
    title: 'সোলার ইনভার্টার ও ব্যাটারি রক্ষণাবেক্ষণ',
    category: 'notice',
    content: 'টাওয়ার #৩ (পূর্ব পাড়া) সোলার ব্যাকআপ ব্যাটারি আপডেট কাজের জন্য শুক্রবার রাত ২টা - ৪টা পর্যন্ত ১০ মিনিট সংযোগ বিচ্ছিন্ন থাকতে পারে।',
    date: '২০২৬-১০-৩০',
    author: 'সেরা লিংক এনওসি টিম',
  },
  {
    id: 'NEWS-২',
    title: 'জয়পুরহাট স্থানীয় ধানের বাজার দর',
    category: 'market',
    content: 'বিআর-২৯ ধান: ১,৩৫0 টাকা/মণ। স্বর্ণা ধান: ১,২২০ টাকা/মণ। ডায়মন্ড আলু: ৪৫০ টাকা/বস্তা।',
    date: '২০২৬-১০-৩০',
    author: 'গ্রাম কৃষি তথ্য ডেস্ক',
  },
  {
    id: 'NEWS-৩',
    title: 'আবহাওয়া বার্তা: পরিষ্কার আকাশ ও মৃদু বাতাস',
    category: 'weather',
    content: 'আজ জয়পুরহাটের ৪টি গ্রাম্য রিপিটার টাওয়ারের পয়েন্ট-টু-পয়েন্ট ওয়্যারলেস লিঙ্কের জন্য আবহাওয়া অত্যন্ত অনুকূল। তাপমাত্রা ২৮° সে।',
    date: '২০২৬-১০-৩০',
    author: 'সেরা আবহাওয়া স্টেশন',
  }
];
