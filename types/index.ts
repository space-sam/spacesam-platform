// User Types
export enum UserRole {
  CLIENT = "CLIENT",
  FREELANCER = "FREELANCER",
  ADMIN = "ADMIN",
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientProfile extends User {
  role: UserRole.CLIENT;
  company?: string;
  companySize?: string;
  industry?: string;
}

export interface FreelancerProfile extends User {
  role: UserRole.FREELANCER;
  bio?: string;
  skills: string[];
  hourlyRate?: number;
  portfolio?: string[];
  availability: "AVAILABLE" | "BUSY" | "UNAVAILABLE";
}

// Project Types
export enum ProjectStatus {
  DRAFT = "DRAFT",
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  REVIEW = "REVIEW",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  clientId: string;
  freelancerId?: string;
  budget: number;
  deadline?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectMilestone {
  id: string;
  projectId: string;
  title: string;
  description: string;
  amount: number;
  dueDate: Date;
  completed: boolean;
}

// Payment Types
export enum PaymentStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export interface Payment {
  id: string;
  projectId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  tossPaymentKey?: string;
  tossOrderId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TossPaymentRequest {
  amount: number;
  orderId: string;
  orderName: string;
  customerName: string;
  customerEmail: string;
  successUrl: string;
  failUrl: string;
}

export interface TossPaymentResponse {
  paymentKey: string;
  orderId: string;
  status: string;
  approvedAt?: string;
}

// Slack Types
export interface SlackNotification {
  channel: string;
  text: string;
  blocks?: any[];
}

export interface SlackWebhookPayload {
  type: string;
  event: {
    type: string;
    user: string;
    text: string;
    channel: string;
    ts: string;
  };
}
