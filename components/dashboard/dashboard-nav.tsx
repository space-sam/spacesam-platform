"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  User,
  Briefcase,
  MessageSquare,
  Settings,
  LogOut,
  CreditCard,
  FileText
} from "lucide-react";

interface DashboardNavProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

export function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname();

  const clientNavItems = [
    { href: "/client/profile", label: "프로필", icon: User },
    { href: "/client/projects", label: "내 프로젝트", icon: Briefcase },
    { href: "/subscriptions", label: "구독 관리", icon: CreditCard },
    { href: "/settings", label: "설정", icon: Settings },
  ];

  const freelancerNavItems = [
    { href: "/freelancer/profile", label: "프로필", icon: User },
    { href: "/freelancer/projects", label: "프로젝트", icon: Briefcase },
    { href: "/subscriptions", label: "구독 관리", icon: CreditCard },
    { href: "/settings", label: "설정", icon: Settings },
  ];

  const navItems = user.role === "FREELANCER" ? freelancerNavItems : clientNavItems;

  return (
    <aside className="w-full md:w-64 bg-white dark:bg-gray-800 border-b md:border-r border-gray-200 dark:border-gray-700">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="text-xl font-bold">SpaceSam</span>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "User"}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user.name || "사용자"}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <div className="mt-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {user.role === "FREELANCER" ? "프리랜서" : "클라이언트"}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="w-5 h-5 mr-3" />
            로그아웃
          </Button>
        </div>
      </div>
    </aside>
  );
}
