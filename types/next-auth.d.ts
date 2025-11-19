import { UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      clientProfile?: {
        id: string;
        company?: string | null;
        companySize?: string | null;
        industry?: string | null;
        bio?: string | null;
      } | null;
      freelancerProfile?: {
        id: string;
        bio?: string | null;
        skills: string[];
        hourlyRate?: string | null;
        portfolio: string[];
        availability: string;
        experience?: string | null;
        education?: string | null;
        location?: string | null;
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
