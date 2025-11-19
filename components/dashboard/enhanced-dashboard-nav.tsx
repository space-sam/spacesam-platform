"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  User,
  Briefcase,
  Settings,
  LogOut,
  CreditCard,
  Home,
  MessageSquare,
  FileText,
  Calendar,
  Bell,
  ChevronDown,
} from "lucide-react";

interface DashboardNavProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
  unreadMessages?: number;
  notifications?: number;
}

export function EnhancedDashboardNav({
  user,
  unreadMessages = 0,
  notifications = 0,
}: DashboardNavProps) {
  const pathname = usePathname();

  const clientNavItems = [
    { href: "/dashboard", label: "대시보드", icon: Home, badge: 0 },
    { href: "/client/projects", label: "내 프로젝트", icon: Briefcase, badge: 0 },
    { href: "/projects", label: "메시지", icon: MessageSquare, badge: unreadMessages },
    { href: "/contracts", label: "계약서", icon: FileText, badge: 0 },
    { href: "/meetings", label: "미팅", icon: Calendar, badge: 0 },
    { href: "/subscriptions", label: "구독 관리", icon: CreditCard, badge: 0 },
  ];

  const freelancerNavItems = [
    { href: "/dashboard", label: "대시보드", icon: Home, badge: 0 },
    { href: "/freelancer/projects", label: "프로젝트", icon: Briefcase, badge: 0 },
    { href: "/projects", label: "메시지", icon: MessageSquare, badge: unreadMessages },
    { href: "/contracts", label: "계약서", icon: FileText, badge: 0 },
    { href: "/meetings", label: "미팅", icon: Calendar, badge: 0 },
    { href: "/subscriptions", label: "구독 관리", icon: CreditCard, badge: 0 },
  ];

  const navItems = user.role === "FREELANCER" ? freelancerNavItems : clientNavItems;

  return (
    <aside className="w-full md:w-72 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-850 dark:to-gray-900 border-b md:border-r border-gray-200/50 dark:border-gray-700/50">
      <div className="flex flex-col h-full">
        {/* Header with gradient */}
        <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                SpaceSam
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Freelance Platform
              </p>
            </div>
          </Link>
        </div>

        {/* User Info Card */}
        <div className="p-4">
          <div className="relative p-4 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg">
            <div className="relative flex items-center space-x-3">
              <Avatar className="h-12 w-12 border-2 border-white dark:border-gray-900 shadow-md">
                <AvatarImage src={user.image || undefined} />
                <AvatarFallback className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                  {user.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {user.name || "사용자"}
                </p>
                <p className="text-xs text-white/80 truncate">{user.email}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 rounded-full"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                {user.role === "FREELANCER" ? "프리랜서" : "클라이언트"}
              </Badge>
              {notifications > 0 && (
                <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                  <Bell className="h-3 w-3 text-white" />
                  <span className="text-xs text-white font-medium">
                    {notifications}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation with modern styling */}
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "group relative flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                  )}

                  <div className="flex items-center space-x-3">
                    <Icon
                      className={cn(
                        "w-5 h-5 transition-transform group-hover:scale-110",
                        isActive && "text-white"
                      )}
                    />
                    <span>{item.label}</span>
                  </div>

                  {/* Badge for notifications */}
                  {item.badge > 0 && (
                    <Badge
                      className={cn(
                        "h-5 min-w-[20px] px-1.5 text-xs",
                        isActive
                          ? "bg-white text-blue-600"
                          : "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0"
                      )}
                    >
                      {item.badge > 99 ? "99+" : item.badge}
                    </Badge>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Settings and Logout */}
        <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50 space-y-2">
          <Link href="/settings">
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
            >
              <Settings className="w-5 h-5 mr-3" />
              설정
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl"
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
