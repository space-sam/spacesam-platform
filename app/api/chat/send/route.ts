import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/config";
import { prisma } from "@/lib/db";
import { sendChatMessage } from "@/lib/pusher/server";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }

    const { projectId, content } = await request.json();

    if (!projectId || !content) {
      return NextResponse.json({ error: "필수 정보가 누락되었습니다." }, { status: 400 });
    }

    // Verify user has access to this project
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        OR: [
          { clientId: user.id },
          { freelancerId: user.id },
        ],
      },
    });

    if (!project) {
      return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
    }

    // Create chat message
    const message = await prisma.chatMessage.create({
      data: {
        projectId,
        senderId: user.id,
        content,
        attachments: [],
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    // Send real-time notification via Pusher
    await sendChatMessage(projectId, {
      id: message.id,
      senderId: message.senderId,
      senderName: message.sender.name || "User",
      senderImage: message.sender.image || undefined,
      content: message.content,
      createdAt: message.createdAt,
    });

    return NextResponse.json({ message });
  } catch (error) {
    console.error("Chat message error:", error);
    return NextResponse.json(
      { error: "메시지 전송 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
