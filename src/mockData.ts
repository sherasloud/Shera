import { SubscriberPlan, SubscriberAccount, TowerNode, WifiVoucher, SupportTicket, CommunityNews } from './types';

export const INITIAL_PLANS: SubscriberPlan[] = [
  {
    id: 'p1',
    name: 'Village Student Pack',
    speed: '10 Mbps',
    dataLimit: '150 GB',
    price: 350,
    validityDays: 30,
    category: 'student',
  },
  {
    id: 'p2',
    name: 'Home Fiber Unlimited',
    speed: '25 Mbps',
    dataLimit: 'Unlimited',
    price: 750,
    validityDays: 30,
    popular: true,
    category: 'home',
  },
  {
    id: 'p3',
    name: 'Farmer Weather & Net',
    speed: '15 Mbps',
    dataLimit: '250 GB',
    price: 500,
    validityDays: 30,
    category: 'farmer',
  },
  {
    id: 'p4',
    name: 'Village Bazaar Biz Pro',
    speed: '50 Mbps',
    dataLimit: 'Unlimited',
    price: 1500,
    validityDays: 30,
    category: 'business',
  },
  {
    id: 'p5',
    name: '24-Hour Hotspot Pass',
    speed: '20 Mbps',
    dataLimit: '10 GB',
    price: 30,
    validityDays: 1,
    category: 'student',
  }
];

export const INITIAL_SUBSCRIBER: SubscriberAccount = {
  id: 'SUB-8821',
  name: 'Anisur Rahman',
  phone: '+880 1712-345678',
  village: 'Madhabpur East Para, Node #3',
  currentPlanId: 'p2',
  expiryDate: '2026-11-28',
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
    name: 'Bazaar Central Repeater',
    location: 'Joypurhat Main Bazaar Roof',
    status: 'online',
    batteryPercent: 92,
    solarVoltage: 24.5,
    activeClients: 142,
    throughputMbps: 185.4,
    uplinkLatencyMs: 14,
  },
  {
    id: 'TOWER-02',
    name: 'Govt Primary School Node',
    location: 'School Hilltop Mast',
    status: 'online',
    batteryPercent: 88,
    solarVoltage: 23.8,
    activeClients: 96,
    throughputMbps: 110.2,
    uplinkLatencyMs: 18,
  },
  {
    id: 'TOWER-03',
    name: 'East Para Solar Relay',
    location: 'East Para Water Tank Pole',
    status: 'online',
    batteryPercent: 74,
    solarVoltage: 21.2,
    activeClients: 58,
    throughputMbps: 68.9,
    uplinkLatencyMs: 22,
  },
  {
    id: 'TOWER-04',
    name: 'West Canal Outpost',
    location: 'Canal Sluice Gate Mast',
    status: 'warning',
    batteryPercent: 45,
    solarVoltage: 18.1,
    activeClients: 24,
    throughputMbps: 22.4,
    uplinkLatencyMs: 38,
  }
];

export const INITIAL_VOUCHERS: WifiVoucher[] = [
  { code: 'SHERA-9921-ABCD', duration: '24 Hours', price: 30, status: 'available', generatedDate: '2026-10-28' },
  { code: 'SHERA-4412-XW90', duration: '7 Days', price: 150, status: 'available', generatedDate: '2026-10-29' },
  { code: 'SHERA-7719-MNH7', duration: '24 Hours', price: 30, status: 'used', generatedDate: '2026-10-25' },
  { code: 'SHERA-3382-KLP2', duration: '30 Days', price: 750, status: 'available', generatedDate: '2026-10-30' },
  { code: 'SHERA-5561-QWE8', duration: '7 Days', price: 150, status: 'available', generatedDate: '2026-10-30' },
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'TKT-101',
    subscriberName: 'Kamal Hossain',
    village: 'West Canal Bank',
    issueType: 'cable_cut',
    description: 'Dropping connection during heavy afternoon wind. Tree branch brushing overhead drop cable.',
    status: 'in_progress',
    assignedTech: 'Rahim Miah (Field Tech #2)',
    createdAt: '2026-10-29 14:20',
  },
  {
    id: 'TKT-102',
    subscriberName: 'Selina Begum',
    village: 'School Para',
    issueType: 'slow_speed',
    description: 'Wi-Fi router red LOS light blinking after last nights thunderstorm.',
    status: 'open',
    assignedTech: 'Pending Dispatch',
    createdAt: '2026-10-30 08:15',
  }
];

export const INITIAL_NEWS: CommunityNews[] = [
  {
    id: 'NEWS-1',
    title: 'Solar Inverter Maintenance Scheduled',
    category: 'notice',
    content: 'Tower #3 (East Para) solar backup battery upgrade scheduled for Friday 2 AM - 4 AM. Expect brief 10-minute micro-outages.',
    date: '2026-10-30',
    author: 'Shera Link NOC Team',
  },
  {
    id: 'NEWS-2',
    title: 'Local Paddy Market Prices (Joypurhat)',
    category: 'market',
    content: 'BR-29 Paddy: 1,350 BDT/maund. Swarna Paddy: 1,220 BDT/maund. Potato (Diamond): 450 BDT/sack.',
    date: '2026-10-30',
    author: 'Village Agri-Desk',
  },
  {
    id: 'NEWS-3',
    title: 'Weather Advisory: Clear Skies & Light Breeze',
    category: 'weather',
    content: 'Optimal signal conditions for wireless point-to-point links across all 4 village repeater towers today. Temperature 28°C.',
    date: '2026-10-30',
    author: 'Shera Weather Station',
  }
];
