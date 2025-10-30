"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MeshGradient } from "./mesh-gradient";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <MeshGradient />

      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100/80 dark:bg-white/10 backdrop-blur-xl border border-gray-300 dark:border-white/20 mb-8 animate-fade-in transition-colors duration-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 dark:bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500 dark:bg-purple-500"></span>
            </span>
            <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
              AI 기반 매칭 시스템 출시
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in-up">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
              프리랜서 매칭의
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              새로운 기준
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto animate-fade-in-up animation-delay-200 transition-colors duration-300">
            AI가 추천하는 최적의 프리랜서를 만나보세요.
            <br />
            프로젝트 관리부터 결제까지 한 번에.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up animation-delay-400">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-full shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 hover:scale-105"
            >
              <Link href="/register">무료로 시작하기</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-2 border-gray-300 dark:border-white/20 bg-gray-100/50 dark:bg-white/5 backdrop-blur-xl hover:bg-gray-200/50 dark:hover:bg-white/10 text-gray-900 dark:text-white px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
            >
              <Link href="#how-it-works">자세히 알아보기</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-600">
            {[
              { value: "10,000+", label: "활동 프리랜서" },
              { value: "5,000+", label: "완료된 프로젝트" },
              { value: "98%", label: "만족도" },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-gray-100/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 hover:bg-gray-200/80 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-gray-400 dark:border-white/30 flex items-start justify-center p-2 transition-colors duration-300">
          <div className="w-1 h-3 bg-gray-500 dark:bg-white/50 rounded-full animate-scroll transition-colors duration-300" />
        </div>
      </div>
    </section>
  );
}
