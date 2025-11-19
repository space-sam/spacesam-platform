import { google } from "googleapis";
import { prisma } from "@/lib/db";

export async function getGoogleCalendarClient(userId: string) {
  // Get user's Google OAuth tokens
  const account = await prisma.account.findFirst({
    where: {
      userId,
      provider: "google",
    },
  });

  if (!account || !account.access_token) {
    throw new Error("Google 계정이 연결되지 않았습니다.");
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.NEXTAUTH_URL}/api/auth/callback/google`
  );

  oauth2Client.setCredentials({
    access_token: account.access_token,
    refresh_token: account.refresh_token,
  });

  return google.calendar({ version: "v3", auth: oauth2Client });
}

export async function createMeetingWithGoogleMeet(
  userId: string,
  meetingData: {
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    attendeeEmails: string[];
  }
) {
  try {
    const calendar = await getGoogleCalendarClient(userId);

    const event = {
      summary: meetingData.title,
      description: meetingData.description,
      start: {
        dateTime: meetingData.startTime.toISOString(),
        timeZone: "Asia/Seoul",
      },
      end: {
        dateTime: meetingData.endTime.toISOString(),
        timeZone: "Asia/Seoul",
      },
      attendees: meetingData.attendeeEmails.map((email) => ({ email })),
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 30 },
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: "all",
    });

    const meetLink = response.data.conferenceData?.entryPoints?.find(
      (entry) => entry.entryPointType === "video"
    )?.uri;

    return {
      eventId: response.data.id,
      meetLink: meetLink || null,
      htmlLink: response.data.htmlLink,
    };
  } catch (error: any) {
    console.error("Google Meet creation error:", error);
    throw new Error(`Google Meet 생성 실패: ${error.message}`);
  }
}

export async function cancelGoogleMeeting(userId: string, eventId: string) {
  try {
    const calendar = await getGoogleCalendarClient(userId);

    await calendar.events.delete({
      calendarId: "primary",
      eventId,
      sendUpdates: "all",
    });

    return { success: true };
  } catch (error: any) {
    console.error("Google Meet cancellation error:", error);
    throw new Error(`미팅 취소 실패: ${error.message}`);
  }
}
