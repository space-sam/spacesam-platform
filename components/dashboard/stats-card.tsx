"use client";

import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  gradient?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  gradient = "from-blue-500 to-purple-600",
}: StatsCardProps) {
  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Gradient background overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-5 dark:opacity-10",
          gradient
        )}
      />

      <div className="relative p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {value}
            </p>
            {description && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {description}
              </p>
            )}
            {trend && (
              <div className="mt-2 flex items-center text-sm">
                <span
                  className={cn(
                    "font-medium",
                    trend.isPositive
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  )}
                >
                  {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                </span>
                <span className="ml-2 text-gray-500 dark:text-gray-400">
                  vs last month
                </span>
              </div>
            )}
          </div>
          <div
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg",
              gradient
            )}
          >
            <Icon className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>
    </Card>
  );
}
