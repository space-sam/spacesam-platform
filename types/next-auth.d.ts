import { UserRole, FreelancerAvailability } from "@prisma/client";
import { DefaultSession } from "next-auth";
import { Decimal } from "@prisma/client/runtime/library";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      clientProfile?: {
        id: string;
        userId: string;
        company?: string | null;
        companySize?: string | null;
        industry?: string | null;
        bio?: string | null;
        createdAt: Date;
        updatedAt: Date;
      } | null;
      freelancerProfile?: {
        id: string;
        userId: string;
        bio?: string | null;
        skills: string[];
        hourlyRate?: Decimal | null;
        portfolio: string[];
        availability: FreelancerAvailability;
        experience?: string | null;
        education?: string | null;
        location?: string | null;
        createdAt: Date;
        updatedAt: Date;
      } | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    accessToken?: string;
  }
}
