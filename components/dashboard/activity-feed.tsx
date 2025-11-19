"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  type: "message" | "project" | "payment" | "meeting";
  title: string;
  description: string;
  timestamp: Date;
  user?: {
    name: string;
    image?: string;
  };
  status?: "success" | "pending" | "warning";
}

interface ActivityFeedProps {
  activities: Activity[];
}

const activityColors = {
  message: "from-blue-500 to-cyan-500",
  project: "from-purple-500 to-pink-500",
  payment: "from-green-500 to-emerald-500",
  meeting: "from-orange-500 to-red-500",
};

const statusColors = {
  success: "bg-green-500",
  pending: "bg-yellow-500",
  warning: "bg-red-500",
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    if (minutes > 0) return `${minutes}분 전`;
    return "방금 전";
  };

  return (
    <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          최근 활동
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              아직 활동이 없습니다.
            </p>
          ) : (
            activities.map((activity, index) => (
              <div
                key={activity.id}
                className={cn(
                  "flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                  index !== activities.length - 1 && "border-b dark:border-gray-700"
                )}
              >
                {/* Activity Icon/Avatar */}
                <div className="relative">
                  {activity.user ? (
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={activity.user.image} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                        {activity.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div
                      className={cn(
                        "h-10 w-10 rounded-full bg-gradient-to-br flex items-center justify-center",
                        activityColors[activity.type]
                      )}
                    >
                      <span className="text-white text-lg">
                        {activity.type === "message" && "💬"}
                        {activity.type === "project" && "📁"}
                        {activity.type === "payment" && "💰"}
                        {activity.type === "meeting" && "📅"}
                      </span>
                    </div>
                  )}
                  {activity.status && (
                    <div
                      className={cn(
                        "absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white dark:border-gray-900",
                        statusColors[activity.status]
                      )}
                    />
                  )}
                </div>

                {/* Activity Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {getTimeAgo(activity.timestamp)}
                  </p>
                </div>

                {/* Activity Badge */}
                <Badge
                  variant="secondary"
                  className="capitalize bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  {activity.type}
                </Badge>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
