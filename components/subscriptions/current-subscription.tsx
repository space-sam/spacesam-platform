"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface CurrentSubscriptionProps {
  subscription: {
    id: string;
    plan: string;
    status: string;
    startDate: Date;
    endDate: Date | null;
    monthlyPrice: any;
    autoRenewal: boolean;
  };
}

export function CurrentSubscription({ subscription }: CurrentSubscriptionProps) {
  const handleCancelSubscription = async () => {
    if (!confirm("구독을 취소하시겠습니까?")) return;

    try {
      const response = await fetch("/api/subscriptions/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptionId: subscription.id }),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        alert("구독 취소에 실패했습니다.");
      }
    } catch (error) {
      alert("구독 취소 중 오류가 발생했습니다.");
    }
  };

  return (
    <Card className="border-2 border-primary">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Check className="w-5 h-5 text-green-500" />
          <span>현재 구독 중</span>
        </CardTitle>
        <CardDescription>활성 구독 정보</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">플랜</p>
            <p className="font-semibold">{subscription.plan}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">상태</p>
            <p className="font-semibold text-green-600">활성</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">월 요금</p>
            <p className="font-semibold">
              {subscription.monthlyPrice ? `₩${parseInt(subscription.monthlyPrice).toLocaleString()}` : "무료"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">다음 결제일</p>
            <p className="font-semibold">
              {subscription.endDate ? new Date(subscription.endDate).toLocaleDateString("ko-KR") : "-"}
            </p>
          </div>
        </div>

        {subscription.autoRenewal && (
          <div className="pt-4 border-t">
            <Button variant="destructive" onClick={handleCancelSubscription}>
              구독 취소
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
