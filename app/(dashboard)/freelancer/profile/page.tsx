import { getCurrentUser, requireAuth } from "@/lib/auth/config";
import { prisma } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { FreelancerProfileForm } from "@/components/profile/freelancer-profile-form";

export default async function FreelancerProfilePage() {
  const user = await requireAuth(UserRole.FREELANCER);

  const profile = await prisma.freelancerProfile.findUnique({
    where: { userId: user.id },
  });

  if (!profile) {
    // Create profile if it doesn't exist
    await prisma.freelancerProfile.create({
      data: {
        userId: user.id,
        skills: [],
        portfolio: [],
      },
    });
    redirect("/freelancer/profile");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">프로필 관리</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          프로필을 완성하여 더 많은 프로젝트 기회를 얻으세요
        </p>
      </div>

      <FreelancerProfileForm profile={profile} userId={user.id} />
    </div>
  );
}
