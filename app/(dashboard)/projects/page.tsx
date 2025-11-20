"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Grid3x3,
  List,
  Search,
  Filter,
  Plus,
  Calendar,
  DollarSign,
  Users,
  Clock,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Demo projects
const DEMO_PROJECTS = [
  {
    id: "1",
    title: "웹사이트 리디자인 프로젝트",
    description: "회사 홈페이지 전체 리디자인 및 반응형 구현",
    client: {
      id: "client-1",
      name: "테스트 사용자",
      image: null,
    },
    freelancer: {
      id: "freelancer-1",
      name: "김프리랜서",
      image: null,
    },
    budget: 3000000,
    status: "IN_PROGRESS" as const,
    progress: 65,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    category: "디자인",
  },
  {
    id: "2",
    title: "모바일 앱 개발",
    description: "iOS/Android 크로스 플랫폼 쇼핑몰 앱 개발",
    client: {
      id: "client-1",
      name: "테스트 사용자",
      image: null,
    },
    freelancer: {
      id: "freelancer-2",
      name: "이개발자",
      image: null,
    },
    budget: 8000000,
    status: "IN_PROGRESS" as const,
    progress: 40,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    category: "개발",
  },
  {
    id: "3",
    title: "데이터베이스 최적화",
    description: "대용량 데이터 처리 성능 개선 및 쿼리 최적화",
    client: {
      id: "client-1",
      name: "테스트 사용자",
      image: null,
    },
    freelancer: {
      id: "freelancer-3",
      name: "박디비",
      image: null,
    },
    budget: 2500000,
    status: "COMPLETED" as const,
    progress: 100,
    deadline: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60),
    category: "개발",
  },
  {
    id: "4",
    title: "마케팅 콘텐츠 제작",
    description: "소셜 미디어 마케팅을 위한 콘텐츠 기획 및 제작",
    client: {
      id: "client-1",
      name: "테스트 사용자",
      image: null,
    },
    freelancer: null,
    budget: 1500000,
    status: "PENDING" as const,
    progress: 0,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    category: "마케팅",
  },
  {
    id: "5",
    title: "브랜드 아이덴티티 디자인",
    description: "로고, 명함, 브로셔 등 브랜드 전반 디자인",
    client: {
      id: "client-1",
      name: "테스트 사용자",
      image: null,
    },
    freelancer: {
      id: "freelancer-4",
      name: "최디자이너",
      image: null,
    },
    budget: 4000000,
    status: "IN_PROGRESS" as const,
    progress: 80,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21),
    category: "디자인",
  },
];

type ViewMode = "grid" | "list";
type StatusFilter = "all" | "PENDING" | "IN_PROGRESS" | "COMPLETED";

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const getStatusBadge = (status: string) => {
    const variants = {
      PENDING: { label: "대기중", className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300" },
      IN_PROGRESS: { label: "진행중", className: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" },
      COMPLETED: { label: "완료", className: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" },
    };
    return variants[status as keyof typeof variants] || variants.PENDING;
  };

  const getDaysRemaining = (deadline: Date) => {
    const days = Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (days < 0) return "마감";
    if (days === 0) return "오늘";
    return `${days}일 남음`;
  };

  const filteredProjects = DEMO_PROJECTS.filter((project) => {
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || project.category === categoryFilter;
    return matchesStatus && matchesSearch && matchesCategory;
  });

  const stats = {
    total: DEMO_PROJECTS.length,
    pending: DEMO_PROJECTS.filter(p => p.status === "PENDING").length,
    inProgress: DEMO_PROJECTS.filter(p => p.status === "IN_PROGRESS").length,
    completed: DEMO_PROJECTS.filter(p => p.status === "COMPLETED").length,
  };

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              프로젝트
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              진행 중인 프로젝트를 관리하세요
            </p>
          </div>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            새 프로젝트
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">전체</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">대기중</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pending}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">진행중</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inProgress}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">완료</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 bg-white dark:bg-gray-900 shadow-lg">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="프로젝트 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="상태" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 상태</SelectItem>
                  <SelectItem value="PENDING">대기중</SelectItem>
                  <SelectItem value="IN_PROGRESS">진행중</SelectItem>
                  <SelectItem value="COMPLETED">완료</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="카테고리" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체 카테고리</SelectItem>
                  <SelectItem value="디자인">디자인</SelectItem>
                  <SelectItem value="개발">개발</SelectItem>
                  <SelectItem value="마케팅">마케팅</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects */}
        <div className={cn(
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        )}>
          {filteredProjects.map((project) => {
            const statusBadge = getStatusBadge(project.status);
            const daysRemaining = getDaysRemaining(project.deadline);

            if (viewMode === "grid") {
              return (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg hover:shadow-xl transition-all cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge className={statusBadge.className}>
                          {statusBadge.label}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {project.category}
                        </Badge>
                      </div>
                      <CardTitle className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </CardTitle>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {project.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {project.freelancer && (
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={project.freelancer.image || undefined} />
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
                                {project.freelancer.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {project.freelancer.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">프리랜서</p>
                            </div>
                          </div>
                        )}

                        {project.status === "IN_PROGRESS" && (
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-600 dark:text-gray-400">진행률</span>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {project.progress}%
                              </span>
                            </div>
                            <Progress value={project.progress} className="h-2" />
                          </div>
                        )}

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {(project.budget / 10000).toFixed(0)}만원
                          </div>
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <Calendar className="h-4 w-4 mr-1" />
                            {daysRemaining}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            } else {
              return (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          {project.freelancer && (
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={project.freelancer.image || undefined} />
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                                {project.freelancer.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {project.title}
                              </h3>
                              <Badge className={statusBadge.className}>
                                {statusBadge.label}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {project.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                              {project.description}
                            </p>
                            {project.status === "IN_PROGRESS" && (
                              <div className="flex items-center space-x-4">
                                <Progress value={project.progress} className="h-2 flex-1 max-w-xs" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {project.progress}%
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="text-center">
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                              <DollarSign className="h-4 w-4 mr-1" />
                              {(project.budget / 10000).toFixed(0)}만원
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                              <Calendar className="h-4 w-4 mr-1" />
                              {daysRemaining}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            }
          })}
        </div>

        {filteredProjects.length === 0 && (
          <Card className="border-0 bg-white dark:bg-gray-900">
            <CardContent className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 mb-4">
                <Filter className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                프로젝트가 없습니다
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                검색 조건을 변경하거나 새 프로젝트를 생성하세요
              </p>
            </CardContent>
          </Card>
        )}
      </div>
  );
}
