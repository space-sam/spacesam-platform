import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/config";
import { prisma } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const dynamic = 'force-dynamic';

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }

    if (user.role !== UserRole.FREELANCER) {
      return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
    }

    const data = await request.json();
    const { bio, skills, hourlyRate, portfolio, availability, experience, education, location } = data;

    const updatedProfile = await prisma.freelancerProfile.update({
      where: { userId: user.id },
      data: {
        bio,
        skills,
        hourlyRate: hourlyRate ? parseFloat(hourlyRate) : null,
        portfolio,
        availability,
        experience,
        education,
        location,
      },
    });

    return NextResponse.json({ profile: updatedProfile });
  } catch (error) {
    console.error("Freelancer profile update error:", error);
    return NextResponse.json(
      { error: "프로필 업데이트 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
