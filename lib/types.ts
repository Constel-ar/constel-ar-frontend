export type UserRole = "beneficiary" | "donor" | "admin";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatar?: string;
  onboardingCompleted: boolean;
  interests: Category[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Beneficiary extends User {
  role: "beneficiary";
  organizationName: string;
  address: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  website?: string;
  twitter?: string;
  verified: boolean;
  walletAddress?: string;
}

export interface Donor extends User {
  role: "donor";
  totalDonated: number;
  donationsCount: number;
  favoriteCategories: string[];
}

export interface Admin extends User {
  role: "admin";
  permissions: string[];
}

export interface Campaign {
  id: string;
  beneficiaryId: string;
  title: string;
  description: string;
  category: string;
  goalAmount: number;
  minDonation: number;
  currentAmount: number;
  images: string[];
  status: "draft" | "pending" | "active" | "completed" | "cancelled";
  location: string;
  createdAt: Date;
  updatedAt: Date;
  milestones: Milestone[];
  beneficiary?: Beneficiary;
}

export interface Milestone {
  id: string;
  campaignId: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  order: number;
  status:
    | "pending"
    | "active"
    | "completed"
    | "evidence_submitted"
    | "approved";
  evidenceUrl?: string;
  evidenceDescription?: string;
  completedAt?: Date;
  approvedAt?: Date;
}

export interface Donation {
  id: string;
  campaignId: string;
  donorId: string;
  amount: number;
  message?: string;
  anonymous: boolean;
  createdAt: Date;
  campaign?: Campaign;
  donor?: Donor;
}

export const CATEGORIES = [
  "Educación",
  "Salud",
  "Medio Ambiente",
  "Pobreza",
  "Emergencias",
  "Derechos Humanos",
  "Animales",
  "Tecnología",
  "Arte y Cultura",
  "Deportes",
] as const;

export type Category = (typeof CATEGORIES)[number];
