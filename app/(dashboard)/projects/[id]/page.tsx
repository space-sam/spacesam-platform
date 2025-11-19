import { getCurrentUser } from "@/lib/auth/config";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { ChatRoom } from "@/components/chat/chat-room";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const project = await prisma.project.findFirst({
    where: {
      id: params.id,
      OR: [
        { clientId: user.id },
        { freelancerId: user.id },
      ],
    },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      freelancer: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      contracts: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });

  if (!project) {
    redirect("/dashboard");
  }

  // Get chat messages
  const messages = await prisma.chatMessage.findMany({
    where: {
      projectId: project.id,
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
    orderBy: {
      createdAt: "asc",
    },
  });

  const formattedMessages = messages.map((msg) => ({
    id: msg.id,
    senderId: msg.senderId,
    senderName: msg.sender.name || "User",
    senderImage: msg.sender.image || undefined,
    content: msg.content,
    createdAt: msg.createdAt,
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{project.description}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href={user.role === "CLIENT" ? "/client/projects" : "/freelancer/projects"}>
              목록으로
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Details */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>프로젝트 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">상태</p>
                <p className="font-semibold">{project.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">예산</p>
                <p className="font-semibold">₩{parseInt(project.budget.toString()).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">마감일</p>
                <p className="font-semibold">
                  {project.deadline ? new Date(project.deadline).toLocaleDateString("ko-KR") : "미정"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>참여자</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-2">클라이언트</p>
                <div className="flex items-center space-x-2">
                  {project.client.image ? (
                    <Image
                      src={project.client.image}
                      alt={project.client.name || "Client"}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  )}
                  <div>
                    <p className="font-medium">{project.client.name}</p>
                    <p className="text-sm text-gray-500">{project.client.email}</p>
                  </div>
                </div>
              </div>

              {project.freelancer && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">프리랜서</p>
                  <div className="flex items-center space-x-2">
                    {project.freelancer.image ? (
                      <Image
                        src={project.freelancer.image}
                        alt={project.freelancer.name || "Freelancer"}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
                    )}
                    <div>
                      <p className="font-medium">{project.freelancer.name}</p>
                      <p className="text-sm text-gray-500">{project.freelancer.email}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {project.contracts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>계약서</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">{project.contracts[0].title}</p>
                  <p className="text-sm text-gray-500">
                    상태: {project.contracts[0].status}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Chat */}
        <div className="lg:col-span-2">
          <ChatRoom
            projectId={project.id}
            currentUserId={user.id}
            initialMessages={formattedMessages}
          />
        </div>
      </div>
    </div>
  );
}
