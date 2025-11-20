"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, MessageSquare, Calendar, Briefcase, FileText, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickAction {
  title: string;
  description: string;
  icon: typeof Plus;
  href: string;
  gradient: string;
}

interface QuickActionsProps {
  role: "CLIENT" | "FREELANCER";
}

const clientActions: QuickAction[] = [
  {
    title: "새 프로젝트",
    description: "프로젝트를 생성하고 프리랜서를 찾으세요",
    icon: Plus,
    href: "/client/projects",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "메시지",
    description: "프리랜서와 채팅하기",
    icon: MessageSquare,
    href: "/projects",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "미팅 예약",
    description: "Google Meet으로 미팅 잡기",
    icon: Calendar,
    href: "/meetings",
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "구독 관리",
    description: "플랜 업그레이드 및 결제",
    icon: CreditCard,
    href: "/subscriptions",
    gradient: "from-green-500 to-emerald-500",
  },
];

const freelancerActions: QuickAction[] = [
  {
    title: "프로젝트 찾기",
    description: "새로운 프로젝트 기회 탐색",
    icon: Briefcase,
    href: "/freelancer/projects",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "메시지",
    description: "클라이언트와 소통하기",
    icon: MessageSquare,
    href: "/projects",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "계약서",
    description: "진행 중인 계약 확인",
    icon: FileText,
    href: "/contracts",
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "프로필 수정",
    description: "포트폴리오 업데이트",
    icon: Plus,
    href: "/freelancer/profile",
    gradient: "from-green-500 to-emerald-500",
  },
];

export function QuickActions({ role }: QuickActionsProps) {
  const actions = role === "CLIENT" ? clientActions : freelancerActions;

  return (
    <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          빠른 작업
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions.map((action) => (
            <Link key={action.title} href={action.href}>
              <div className="group relative p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
                {/* Gradient background on hover */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300",
                    action.gradient
                  )}
                />

                <div className="relative flex items-start space-x-4">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br shadow-md",
                      action.gradient
                    )}
                  >
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {action.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
