"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface SubscriptionPlansProps {
  currentPlan: string;
  userId?: string;
}

const plans = [
  {
    name: "FREE",
    displayName: "무료",
    price: 0,
    features: [
      "기본 프로젝트 관리",
      "월 5개 프로젝트 제한",
      "기본 채팅 기능",
      "표준 지원",
    ],
  },
  {
    name: "BASIC",
    displayName: "베이직",
    price: 29000,
    features: [
      "무제한 프로젝트",
      "실시간 채팅",
      "Google Meet 통합",
      "전자 계약서",
      "우선 지원",
    ],
    popular: true,
  },
  {
    name: "PRO",
    displayName: "프로",
    price: 59000,
    features: [
      "베이직의 모든 기능",
      "고급 분석 대시보드",
      "자동화 워크플로우",
      "팀 협업 기능",
      "전담 지원",
    ],
  },
  {
    name: "ENTERPRISE",
    displayName: "엔터프라이즈",
    price: 0,
    customPricing: true,
    features: [
      "프로의 모든 기능",
      "맞춤형 솔루션",
      "전용 서버",
      "SLA 보장",
      "24/7 전담 지원",
    ],
  },
];

export function SubscriptionPlans({ currentPlan }: SubscriptionPlansProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planName: string, price: number) => {
    if (planName === "ENTERPRISE") {
      window.location.href = "mailto:sales@spacesam.com?subject=Enterprise Plan Inquiry";
      return;
    }

    if (planName === "FREE") {
      // Downgrade to free
      try {
        setLoading(planName);
        const response = await fetch("/api/subscriptions/downgrade", {
          method: "POST",
        });

        if (response.ok) {
          router.refresh();
        } else {
          alert("플랜 변경에 실패했습니다.");
        }
      } catch {
        alert("오류가 발생했습니다.");
      } finally {
        setLoading(null);
      }
      return;
    }

    // Subscribe with Toss Payments
    try {
      setLoading(planName);

      const response = await fetch("/api/subscriptions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: planName,
          price,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "구독 처리 중 오류가 발생했습니다.");
        setLoading(null);
        return;
      }

      // Redirect to Toss Payments
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch {
      alert("구독 처리 중 오류가 발생했습니다.");
      setLoading(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {plans.map((plan) => (
        <Card
          key={plan.name}
          className={`relative ${
            plan.popular ? "border-2 border-primary shadow-lg" : ""
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                인기
              </span>
            </div>
          )}

          <CardHeader>
            <CardTitle>{plan.displayName}</CardTitle>
            <CardDescription className="text-2xl font-bold">
              {plan.customPricing ? (
                "맞춤 견적"
              ) : (
                <>
                  ₩{plan.price.toLocaleString()}
                  {plan.price > 0 && <span className="text-sm font-normal">/월</span>}
                </>
              )}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter>
            <Button
              className="w-full"
              variant={currentPlan === plan.name ? "outline" : plan.popular ? "default" : "secondary"}
              disabled={currentPlan === plan.name || loading === plan.name}
              onClick={() => handleSubscribe(plan.name, plan.price)}
            >
              {loading === plan.name
                ? "처리 중..."
                : currentPlan === plan.name
                ? "현재 플랜"
                : plan.customPricing
                ? "문의하기"
                : "시작하기"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
