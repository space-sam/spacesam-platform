"use client";

const steps = [
  {
    number: "01",
    title: "프로젝트 등록",
    description:
      "프로젝트 내용, 예산, 마감일을 입력하여 프로젝트를 등록하세요.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    number: "02",
    title: "AI 매칭",
    description:
      "AI가 프로젝트에 적합한 프리랜서를 자동으로 추천해드립니다.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    number: "03",
    title: "제안서 검토",
    description: "프리랜서들의 제안서를 검토하고 최적의 인재를 선택하세요.",
    gradient: "from-rose-500 to-orange-500",
  },
  {
    number: "04",
    title: "프로젝트 시작",
    description:
      "계약 체결 후 프로젝트를 시작하고 실시간으로 진행 상황을 확인하세요.",
    gradient: "from-orange-500 to-amber-500",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/30 dark:bg-purple-500/20 rounded-full blur-3xl transition-colors duration-300" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-300/30 dark:bg-pink-500/20 rounded-full blur-3xl transition-colors duration-300" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              어떻게 작동하나요?
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
            간단한 4단계로 프로젝트를 시작하세요
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="relative p-8 rounded-3xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-500 hover:scale-105 overflow-hidden">
                  {/* Gradient background on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  <div className="relative z-10">
                    {/* Number with gradient */}
                    <div className="mb-6">
                      <span
                        className={`text-7xl font-bold bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent`}
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>

                  {/* Decorative gradient orb */}
                  <div
                    className={`absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br ${step.gradient} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500`}
                  />
                </div>

                {/* Connecting line (hidden on last item and mobile) */}
                {index < steps.length - 1 && index % 2 === 0 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 dark:from-white/20 to-transparent transition-colors duration-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
