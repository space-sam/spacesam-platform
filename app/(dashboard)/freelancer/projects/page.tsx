import { getCurrentUser, requireAuth } from "@/lib/auth/config";
import { prisma } from "@/lib/db";
import { UserRole } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default async function FreelancerProjectsPage() {
  const user = await requireAuth(UserRole.FREELANCER);

  const projects = await prisma.project.findMany({
    where: {
      freelancerId: user.id,
    },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      _count: {
        select: {
          chatMessages: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">내 프로젝트</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          진행 중인 프로젝트를 관리하세요
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle className="line-clamp-1">{project.title}</CardTitle>
              <CardDescription className="line-clamp-2">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">상태</span>
                <span className="font-medium">{project.status}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">예산</span>
                <span className="font-medium">₩{parseInt(project.budget.toString()).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">클라이언트</span>
                <span className="font-medium">{project.client.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">메시지</span>
                <span className="font-medium">{project._count.chatMessages}개</span>
              </div>
              {project.deadline && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">마감일</span>
                  <span className="font-medium">
                    {new Date(project.deadline).toLocaleDateString("ko-KR")}
                  </span>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/projects/${project.id}`}>프로젝트 보기</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}

        {projects.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">아직 할당된 프로젝트가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
