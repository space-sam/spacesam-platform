import { getCurrentUser, requireAuth } from "@/lib/auth/config";
import { prisma } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { ClientProfileForm } from "@/components/profile/client-profile-form";

export default async function ClientProfilePage() {
  const user = await requireAuth(UserRole.CLIENT);

  const profile = await prisma.clientProfile.findUnique({
    where: { userId: user.id },
  });

  if (!profile) {
    // Create profile if it doesn't exist
    await prisma.clientProfile.create({
      data: {
        userId: user.id,
      },
    });
    redirect("/client/profile");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">프로필 관리</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          프로필을 완성하여 프리랜서와 효과적으로 협업하세요
        </p>
      </div>

      <ClientProfileForm profile={profile} userId={user.id} />
    </div>
  );
}
