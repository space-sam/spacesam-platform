import { getCurrentUser } from "@/lib/auth/config";
import { prisma } from "@/lib/db";
import { SubscriptionPlans } from "@/components/subscriptions/subscription-plans";
import { CurrentSubscription } from "@/components/subscriptions/current-subscription";

export default async function SubscriptionsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: user.id,
      status: "ACTIVE",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">구독 관리</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          구독 플랜을 선택하고 프리미엄 기능을 이용하세요
        </p>
      </div>

      {subscription && <CurrentSubscription subscription={subscription} />}

      <SubscriptionPlans currentPlan={subscription?.plan || "FREE"} userId={user.id} />
    </div>
  );
}
