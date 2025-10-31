"use client";

import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "김민준",
    role: "스타트업 CEO",
    content:
      "AI 매칭 덕분에 프로젝트에 딱 맞는 프리랜서를 빠르게 찾았어요. 프로젝트 관리 기능도 정말 편리합니다.",
    avatar: "🧑",
    rating: 5,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "박서연",
    role: "프리랜서 디자이너",
    content:
      "안정적인 결제 시스템과 체계적인 프로젝트 관리로 안심하고 일할 수 있어요. 클라이언트와의 소통도 원활합니다.",
    avatar: "👩",
    rating: 5,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "이준호",
    role: "IT 기업 대표",
    content:
      "여러 프로젝트를 동시에 관리하기 좋아요. 슬랙 연동으로 실시간 알림을 받을 수 있어서 놓치는 일이 없습니다.",
    avatar: "👨",
    rating: 5,
    gradient: "from-pink-500 to-rose-500",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-black dark:via-blue-950/20 dark:to-black transition-colors duration-300" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              고객 후기
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
            실제 사용자들의 생생한 경험을 들어보세요
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group relative p-8 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-500 hover:scale-105 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-8 leading-relaxed transition-colors duration-300">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-2xl`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>

              {/* Corner decoration */}
              <div
                className={`absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br ${testimonial.gradient} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500`}
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
