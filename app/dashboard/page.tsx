// import { getCurrentUser } from "@/lib/auth/config";
// import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import {
  Briefcase,
  MessageSquare,
  Calendar,
  CreditCard,
  User,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

export const dynamic = 'force-dynamic';

// DEMO MODE: Mock user data for testing UI without authentication
const DEMO_USER: {
  id: string;
  name: string;
  email: string;
  role: "CLIENT" | "FREELANCER";
  image: string | null;
} = {
  id: "demo-user-123",
  name: "테스트 사용자",
  email: "demo@spacesam.com",
  role: "CLIENT", // Change to "FREELANCER" to test freelancer view
  image: null,
};

export default async function DashboardPage() {
  // DEMO MODE: Comment out authentication checks
  // const user = await getCurrentUser();
  // if (!user) {
  //   redirect("/login");
  // }

  // Use demo user data instead
  const user = DEMO_USER;

  const isClient = user.role === "CLIENT";
  const isFreelancer = user.role === "FREELANCER";

  return (
    <div className="space-y-8">
        {/* Demo Mode Banner */}
        <Alert className="border-amber-500 bg-amber-50 dark:bg-amber-950/20">
          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            <span className="font-semibold">데모 모드</span> - 인증이 비활성화되었습니다. UI 테스트용입니다.
          </AlertDescription>
        </Alert>

        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-8 text-white shadow-2xl">
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                {isClient ? "클라이언트" : isFreelancer ? "프리랜서" : user.role}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold mb-2">
              환영합니다, {user.name || "사용자"}님!
            </h1>
            <p className="text-lg text-white/90">
              {isClient
                ? "프로젝트를 생성하고 최고의 프리랜서를 찾아보세요"
                : isFreelancer
                ? "새로운 프로젝트를 탐색하고 수익을 창출하세요"
                : "SpaceSam 플랫폼에 오신 것을 환영합니다"}
            </p>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">프로젝트</CardTitle>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">0</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {isClient ? "생성된 프로젝트" : "참여 중인 프로젝트"}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">메시지</CardTitle>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">0</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                안읽은 메시지
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {isClient ? "지출" : "수익"}
                </CardTitle>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">₩0</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                총 {isClient ? "지출" : "수익"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            빠른 시작
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isClient && (
              <>
                <Link href="/client/profile">
                  <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:shadow-lg transition-all cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            프로필 관리
                          </CardTitle>
                          <CardDescription>
                            프로필 정보를 업데이트하세요
                          </CardDescription>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>

                <Link href="/client/projects">
                  <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:shadow-lg transition-all cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            내 프로젝트
                          </CardTitle>
                          <CardDescription>
                            프로젝트를 관리하고 추적하세요
                          </CardDescription>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>

                <Link href="/subscriptions">
                  <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:shadow-lg transition-all cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                            구독 관리
                          </CardTitle>
                          <CardDescription>
                            플랜을 업그레이드하세요
                          </CardDescription>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>

                <Link href="/meetings">
                  <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:shadow-lg transition-all cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                            미팅 예약
                          </CardTitle>
                          <CardDescription>
                            Google Meet 미팅을 잡으세요
                          </CardDescription>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              </>
            )}

            {isFreelancer && (
              <>
                <Link href="/freelancer/profile">
                  <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:shadow-lg transition-all cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            프로필 관리
                          </CardTitle>
                          <CardDescription>
                            포트폴리오를 업데이트하세요
                          </CardDescription>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>

                <Link href="/freelancer/projects">
                  <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:shadow-lg transition-all cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            프로젝트 찾기
                          </CardTitle>
                          <CardDescription>
                            새로운 기회를 탐색하세요
                          </CardDescription>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>

                <Link href="/subscriptions">
                  <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:shadow-lg transition-all cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                            구독 관리
                          </CardTitle>
                          <CardDescription>
                            더 많은 기능을 사용하세요
                          </CardDescription>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>

                <Link href="/meetings">
                  <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:shadow-lg transition-all cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                            미팅 일정
                          </CardTitle>
                          <CardDescription>
                            클라이언트와 미팅하세요
                          </CardDescription>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Getting Started Guide */}
        <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">시작하기</CardTitle>
            <CardDescription>
              SpaceSam 플랫폼을 최대한 활용하는 방법
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isClient ? (
              <>
                <div className="flex items-start space-x-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold mt-1">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      프로필 작성
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      회사 정보와 요구사항을 입력하세요
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                  <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold mt-1">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      프로젝트 생성
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      새 프로젝트를 만들고 프리랜서를 초대하세요
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
                  <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold mt-1">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      협업 시작
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      채팅과 미팅으로 프리랜서와 소통하세요
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start space-x-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                  <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold mt-1">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      프로필 완성
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      포트폴리오와 기술 스택을 추가하세요
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                  <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold mt-1">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      프로젝트 탐색
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      관심있는 프로젝트를 찾고 지원하세요
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 rounded-lg bg-green-50 dark:bg-green-950/20">
                  <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold mt-1">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      수익 창출
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      프로젝트를 완료하고 수익을 받으세요
                    </p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
  );
}
