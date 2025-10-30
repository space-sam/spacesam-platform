"use client";

import { Card } from "@/components/ui/card";
import { Sparkles, FolderKanban, CreditCard, MessageSquare } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Smart Matching",
    subtitle: "AI 매칭",
    description:
      "AI가 프로젝트 요구사항을 분석하여 최적의 프리랜서를 추천합니다.",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
  },
  {
    icon: FolderKanban,
    title: "Project Management",
    subtitle: "프로젝트 관리",
    description:
      "마일스톤 설정부터 진행 상황 추적까지 프로젝트를 체계적으로 관리하세요.",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    subtitle: "토스 페이먼츠",
    description:
      "토스 페이먼츠로 안전하고 빠른 결제를 경험하세요. 에스크로 서비스 제공.",
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-500/10 to-rose-500/10",
  },
  {
    icon: MessageSquare,
    title: "Slack Integration",
    subtitle: "슬랙 연동",
    description:
      "프로젝트 알림을 슬랙으로 실시간 수신하여 빠르게 대응하세요.",
    gradient: "from-violet-500 to-purple-500",
    bgGradient: "from-violet-500/10 to-purple-500/10",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50/30 to-white dark:from-black dark:via-purple-950/20 dark:to-black transition-colors duration-300" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              강력한 기능들
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
            프리랜서 매칭부터 프로젝트 완료까지 필요한 모든 것
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group relative p-8 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-500 hover:scale-105 overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p
                    className={`text-sm font-semibold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent mb-4`}
                  >
                    {feature.subtitle}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Corner decoration */}
                <div
                  className={`absolute -bottom-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br ${feature.gradient} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500`}
                />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
