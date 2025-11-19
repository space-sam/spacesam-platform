import { getCurrentUser } from "@/lib/auth/config";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { StatsCard } from "@/components/dashboard/stats-card";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { QuickActions } from "@/components/dashboard/quick-actions";
import {
  Briefcase,
  DollarSign,
  MessageSquare,
  Calendar,
  TrendingUp,
  Users,
} from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch dashboard data based on role
  let stats;
  let activities = [];

  if (user.role === "CLIENT") {
    // Client dashboard data
    const projects = await prisma.project.findMany({
      where: { clientId: user.id },
      include: {
        freelancer: true,
        chatMessages: {
          orderBy: { createdAt: "desc" },
          take: 5,
          include: { sender: true },
        },
      },
    });

    const activeProjects = projects.filter((p) => p.status === "IN_PROGRESS");
    const totalSpent = projects.reduce(
      (sum, p) => sum + parseFloat(p.budget.toString()),
      0
    );
    const unreadMessages = projects.reduce(
      (sum, p) => sum + p.chatMessages.filter((m) => m.senderId !== user.id).length,
      0
    );

    stats = {
      activeProjects: activeProjects.length,
      totalProjects: projects.length,
      totalSpent,
      unreadMessages,
    };

    // Build activities from recent messages
    projects.forEach((project) => {
      project.chatMessages.forEach((msg) => {
        if (msg.senderId !== user.id) {
          activities.push({
            id: msg.id,
            type: "message" as const,
            title: `${msg.sender.name}님이 메시지를 보냈습니다`,
            description: msg.content.substring(0, 100),
            timestamp: msg.createdAt,
            user: {
              name: msg.sender.name || "Unknown",
              image: msg.sender.image || undefined,
            },
            status: "success" as const,
          });
        }
      });
    });
  } else if (user.role === "FREELANCER") {
    // Freelancer dashboard data
    const projects = await prisma.project.findMany({
      where: { freelancerId: user.id },
      include: {
        client: true,
        chatMessages: {
          orderBy: { createdAt: "desc" },
          take: 5,
          include: { sender: true },
        },
      },
    });

    const activeProjects = projects.filter((p) => p.status === "IN_PROGRESS");
    const totalEarnings = projects
      .filter((p) => p.status === "COMPLETED")
      .reduce((sum, p) => sum + parseFloat(p.budget.toString()), 0);
    const unreadMessages = projects.reduce(
      (sum, p) => sum + p.chatMessages.filter((m) => m.senderId !== user.id).length,
      0
    );

    stats = {
      activeProjects: activeProjects.length,
      totalProjects: projects.length,
      totalEarnings,
      unreadMessages,
    };

    // Build activities
    projects.forEach((project) => {
      project.chatMessages.forEach((msg) => {
        if (msg.senderId !== user.id) {
          activities.push({
            id: msg.id,
            type: "message" as const,
            title: `${msg.sender.name}님이 메시지를 보냈습니다`,
            description: msg.content.substring(0, 100),
            timestamp: msg.createdAt,
            user: {
              name: msg.sender.name || "Unknown",
              image: msg.sender.image || undefined,
            },
            status: "success" as const,
          });
        }
      });
    });
  } else {
    // Unknown role, redirect to home
    redirect("/");
  }

  // Sort activities by timestamp
  activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  activities = activities.slice(0, 10); // Show only 10 most recent

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent">
            대시보드
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {user.role === "CLIENT"
              ? "프로젝트를 관리하고 프리랜서와 협업하세요"
              : "프로젝트 현황을 확인하고 클라이언트와 소통하세요"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title={user.role === "CLIENT" ? "활성 프로젝트" : "진행 중인 프로젝트"}
            value={stats.activeProjects}
            description={`총 ${stats.totalProjects}개 프로젝트`}
            icon={Briefcase}
            gradient="from-blue-500 to-cyan-500"
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title={user.role === "CLIENT" ? "총 지출" : "총 수익"}
            value={`₩${(user.role === "CLIENT" ? stats.totalSpent : stats.totalEarnings).toLocaleString()}`}
            description="누적 금액"
            icon={DollarSign}
            gradient="from-green-500 to-emerald-500"
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="안읽은 메시지"
            value={stats.unreadMessages}
            description="새 메시지 확인"
            icon={MessageSquare}
            gradient="from-purple-500 to-pink-500"
          />
          <StatsCard
            title="예정된 미팅"
            value={0}
            description="이번 주"
            icon={Calendar}
            gradient="from-orange-500 to-red-500"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions - Full width on mobile, 2 cols on desktop */}
          <div className="lg:col-span-2">
            <QuickActions role={user.role} />
          </div>

          {/* Activity Feed */}
          <div className="lg:col-span-1">
            <ActivityFeed activities={activities} />
          </div>
        </div>

        {/* Recent Projects Section */}
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-lg p-6 border-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {user.role === "CLIENT" ? "내 프로젝트" : "진행 중인 프로젝트"}
            </h2>
            <a
              href={user.role === "CLIENT" ? "/client/projects" : "/freelancer/projects"}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              전체 보기 →
            </a>
          </div>
          {stats.totalProjects === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 mb-4">
                <Briefcase className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                {user.role === "CLIENT"
                  ? "아직 생성한 프로젝트가 없습니다"
                  : "아직 할당된 프로젝트가 없습니다"}
              </p>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              {stats.totalProjects}개의 프로젝트 진행 중
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
