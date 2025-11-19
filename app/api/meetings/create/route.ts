import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/config";
import { prisma } from "@/lib/db";
import { createMeetingWithGoogleMeet } from "@/lib/google/calendar";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }

    const { title, description, scheduledAt, duration, attendeeIds } = await request.json();

    if (!title || !scheduledAt || !duration) {
      return NextResponse.json({ error: "필수 정보가 누락되었습니다." }, { status: 400 });
    }

    const startTime = new Date(scheduledAt);
    const endTime = new Date(startTime.getTime() + duration * 60 * 1000);

    // Get attendee emails
    const attendees = await prisma.user.findMany({
      where: {
        id: {
          in: attendeeIds || [],
        },
      },
      select: {
        id: true,
        email: true,
      },
    });

    const attendeeEmails = attendees.map((a) => a.email).filter((e): e is string => !!e);

    // Create Google Meet
    const { eventId, meetLink } = await createMeetingWithGoogleMeet(user.id, {
      title,
      description: description || "",
      startTime,
      endTime,
      attendeeEmails,
    });

    // Save meeting to database
    const meeting = await prisma.meeting.create({
      data: {
        title,
        description,
        scheduledAt: startTime,
        duration,
        googleMeetLink: meetLink,
        googleEventId: eventId,
        organizerId: user.id,
        attendees: {
          connect: attendees.map((a) => ({ id: a.id })),
        },
      },
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        attendees: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ meeting });
  } catch (error: any) {
    console.error("Meeting creation error:", error);
    return NextResponse.json(
      { error: error.message || "미팅 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
