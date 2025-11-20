"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  Briefcase,
  MessageSquare,
  User,
  CreditCard,
  LogOut,
  Menu,
  Moon,
  Sun,
  Settings,
  Bell,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TopNavProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: "CLIENT" | "FREELANCER" | "ADMIN";
  };
}

export function TopNav({ user }: TopNavProps) {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigation = [
    { name: "홈", href: "/dashboard", icon: Home },
    { name: "프로젝트", href: user?.role === "CLIENT" ? "/client/projects" : "/freelancer/projects", icon: Briefcase },
    { name: "채팅", href: "/chat", icon: MessageSquare },
    { name: "프로필", href: user?.role === "CLIENT" ? "/client/profile" : "/freelancer/profile", icon: User },
    { name: "구독", href: "/subscriptions", icon: CreditCard },
  ];

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-xl dark:bg-gray-950/80 dark:border-gray-800">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-2 rounded-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                SpaceSam
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "relative px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      )}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.name}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                      )}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex relative text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-950" />
            </Button>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="hidden sm:flex text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="hidden sm:flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Avatar className="h-8 w-8 ring-2 ring-white dark:ring-gray-800">
                    <AvatarImage src={user?.image || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.name || "사용자"}
                    </p>
                    <Badge
                      variant="secondary"
                      className="text-xs px-1.5 py-0 h-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 border-0"
                    >
                      {user?.role === "CLIENT" ? "클라이언트" : "프리랜서"}
                    </Badge>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name || "사용자"}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.email || "이메일"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={user?.role === "CLIENT" ? "/client/profile" : "/freelancer/profile"} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    프로필
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    설정
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/subscriptions" className="cursor-pointer">
                    <CreditCard className="mr-2 h-4 w-4" />
                    구독 관리
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="flex h-full flex-col">
                  {/* Mobile Header */}
                  <div className="border-b p-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12 ring-4 ring-white/50">
                        <AvatarImage src={user?.image || undefined} />
                        <AvatarFallback className="bg-white text-purple-600 text-lg">
                          {user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-white">{user?.name || "사용자"}</p>
                        <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                          {user?.role === "CLIENT" ? "클라이언트" : "프리랜서"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 overflow-y-auto py-6">
                    <nav className="space-y-1 px-3">
                      {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                          >
                            <div
                              className={cn(
                                "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                                isActive
                                  ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 text-blue-600 dark:text-blue-400"
                                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                              )}
                            >
                              <Icon className="h-5 w-5" />
                              <span className="font-medium">{item.name}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </nav>

                    <div className="mt-6 border-t pt-6 px-3 space-y-1">
                      <Link href="/settings" onClick={() => setMobileOpen(false)}>
                        <div className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
                          <Settings className="h-5 w-5" />
                          <span className="font-medium">설정</span>
                        </div>
                      </Link>
                      <button
                        onClick={toggleDarkMode}
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                      >
                        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        <span className="font-medium">
                          {isDark ? "라이트 모드" : "다크 모드"}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Mobile Footer */}
                  <div className="border-t p-4">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
                      onClick={() => setMobileOpen(false)}
                    >
                      <LogOut className="mr-2 h-5 w-5" />
                      로그아웃
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
