import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/config";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

// Create contract
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }

    const { projectId, title, content, documentUrl } = await request.json();

    if (!projectId || !title || !content) {
      return NextResponse.json({ error: "필수 정보가 누락되었습니다." }, { status: 400 });
    }

    // Verify user is the client of this project
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        clientId: user.id,
      },
    });

    if (!project) {
      return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
    }

    if (!project.freelancerId) {
      return NextResponse.json({ error: "프리랜서가 할당되지 않은 프로젝트입니다." }, { status: 400 });
    }

    const contract = await prisma.contract.create({
      data: {
        projectId,
        clientId: user.id,
        freelancerId: project.freelancerId,
        title,
        content,
        documentUrl,
        status: "PENDING_SIGNATURE",
      },
      include: {
        project: true,
        client: {
          select: { id: true, name: true, email: true },
        },
        freelancer: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json({ contract });
  } catch (error) {
    console.error("Contract creation error:", error);
    return NextResponse.json(
      { error: "계약서 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// Sign contract
export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
    }

    const { contractId, signature } = await request.json();

    if (!contractId || !signature) {
      return NextResponse.json({ error: "필수 정보가 누락되었습니다." }, { status: 400 });
    }

    const contract = await prisma.contract.findUnique({
      where: { id: contractId },
    });

    if (!contract) {
      return NextResponse.json({ error: "계약서를 찾을 수 없습니다." }, { status: 404 });
    }

    // Determine if user is client or freelancer
    const isClient = contract.clientId === user.id;
    const isFreelancer = contract.freelancerId === user.id;

    if (!isClient && !isFreelancer) {
      return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
    }

    // Update signature
    const updateData: {
      clientSignature?: string;
      clientSignedAt?: Date;
      freelancerSignature?: string;
      freelancerSignedAt?: Date;
    } = {};
    if (isClient) {
      updateData.clientSignature = signature;
      updateData.clientSignedAt = new Date();
    } else {
      updateData.freelancerSignature = signature;
      updateData.freelancerSignedAt = new Date();
    }

    // Check if both parties have signed
    const updatedContract = await prisma.contract.update({
      where: { id: contractId },
      data: updateData,
    });

    // If both signed, update status
    if (
      updatedContract.clientSignature &&
      updatedContract.freelancerSignature &&
      updatedContract.status === "PENDING_SIGNATURE"
    ) {
      await prisma.contract.update({
        where: { id: contractId },
        data: { status: "SIGNED" },
      });
    }

    return NextResponse.json({ success: true, contract: updatedContract });
  } catch (error) {
    console.error("Contract signing error:", error);
    return NextResponse.json(
      { error: "서명 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
