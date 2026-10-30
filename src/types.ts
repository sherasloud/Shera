export type UserRole = 'subscriber' | 'operator';

export interface SubscriberPlan {
  id: string;
  name: string;
  speed: string; // e.g. "15 Mbps"
  dataLimit: string; // e.g. "500 GB" or "Unlimited"
  price: number; // in BDT / INR
  validityDays: number;
  popular?: boolean;
  category: 'home' | 'student' | 'farmer' | 'business';
}

export interface SubscriberAccount {
  id: string;
  name: string;
  phone: string;
  village: string;
  currentPlanId: string;
  expiryDate: string;
  dataUsedGB: number;
  dataTotalGB: number;
  signalDbm: number; // e.g. -58
  towerId: string;
  status: 'active' | 'suspended' | 'pending';
  balance: number;
}

export interface TowerNode {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'warning' | 'offline';
  batteryPercent: number;
  solarVoltage: number;
  activeClients: number;
  throughputMbps: number;
  uplinkLatencyMs: number;
}

export interface WifiVoucher {
  code: string;
  duration: string;
  price: number;
  status: 'available' | 'used';
  generatedDate: string;
}

export interface SupportTicket {
  id: string;
  subscriberName: string;
  village: string;
  issueType: 'slow_speed' | 'cable_cut' | 'power_outage' | 'billing' | 'router_config';
  description: string;
  status: 'open' | 'in_progress' | 'resolved';
  assignedTech?: string;
  createdAt: string;
}

export interface CommunityNews {
  id: string;
  title: string;
  category: 'weather' | 'market' | 'notice' | 'advisory';
  content: string;
  date: string;
  author: string;
}
