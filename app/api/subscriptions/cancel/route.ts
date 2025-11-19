import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/config";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }

    const { subscriptionId } = await request.json();

    const subscription = await prisma.subscription.findUnique({
      where: { id: subscriptionId },
    });

    if (!subscription || subscription.userId !== user.id) {
      return NextResponse.json({ error: "구독을 찾을 수 없습니다." }, { status: 404 });
    }

    // Update subscription status
    await prisma.subscription.update({
      where: { id: subscriptionId },
      data: {
        status: "CANCELLED",
        canceledAt: new Date(),
        autoRenewal: false,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscription cancellation error:", error);
    return NextResponse.json(
      { error: "구독 취소 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
