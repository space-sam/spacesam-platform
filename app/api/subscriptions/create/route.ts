import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/config";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }

    const { plan, price } = await request.json();

    // Create order ID
    const orderId = `SUB_${user.id}_${Date.now()}`;

    // Create pending subscription
    const subscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        plan,
        status: "INACTIVE",
        monthlyPrice: price,
      },
    });

    // In a real implementation, you would integrate with Toss Payments Billing API
    // For now, we'll create a simple payment URL
    const checkoutUrl = `${process.env.NEXTAUTH_URL}/api/subscriptions/checkout?subscriptionId=${subscription.id}&plan=${plan}&price=${price}`;

    return NextResponse.json({ checkoutUrl, subscriptionId: subscription.id });
  } catch (error) {
    console.error("Subscription creation error:", error);
    return NextResponse.json(
      { error: "구독 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
