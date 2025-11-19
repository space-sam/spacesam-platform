import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile https://www.googleapis.com/auth/calendar",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("이메일과 비밀번호를 입력해주세요.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("존재하지 않는 사용자입니다.");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("비밀번호가 일치하지 않습니다.");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      // If signing in with Google OAuth
      if (account?.provider === "google") {
        // Store the access token and refresh token for Google Calendar API
        if (account.access_token) {
          await prisma.account.update({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
            data: {
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
            },
          });
        }
      }
      return true;
    },
    async session({ session }) {
      if (session.user) {
        // Add custom fields to session
        const dbUser = await prisma.user.findUnique({
          where: { email: session.user.email || undefined },
          include: {
            clientProfile: true,
            freelancerProfile: true,
          },
        });

        if (dbUser) {
          session.user.id = dbUser.id;
          session.user.role = dbUser.role;
          session.user.clientProfile = dbUser.clientProfile;
          session.user.freelancerProfile = dbUser.freelancerProfile;
        }
      }
      return session;
    },
    async jwt({ token, account }) {
      // User data is already in token from session callback

      // Store access token in JWT for Google Calendar API
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }

      return token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

// Helper to get current user from server component
export async function getCurrentUser() {
  try {
    const { getServerSession } = await import("next-auth");
    const session = await getServerSession(authOptions);
    return session?.user || null;
  } catch {
    return null;
  }
}

// Helper to require authentication
export async function requireAuth(requiredRole?: UserRole) {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("인증이 필요합니다.");
  }

  if (requiredRole && user.role !== requiredRole) {
    throw new Error("권한이 없습니다.");
  }

  return user;
}
