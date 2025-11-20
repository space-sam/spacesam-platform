"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Camera,
  Upload,
  Plus,
  X,
  Edit,
  Save,
  Briefcase,
  GraduationCap,
  Star,
  MapPin,
  Mail,
  Phone,
  Globe,
  Github,
  Calendar,
  DollarSign,
  Award,
  Code,
  ZoomIn,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Demo user - TODO: Replace with actual user data from auth
const DEMO_USER = {
  id: "demo-user-123",
  name: "김프리랜서",
  email: "freelancer@spacesam.com",
  role: "FREELANCER" as const,
  image: null,
};

// Demo profile data - TODO: Replace with actual profile data from database
const DEMO_PROFILE = {
  bio: "10년 경력의 풀스택 개발자입니다. React, Node.js, Python을 주로 사용하며, 사용자 중심의 웹 애플리케이션 개발을 전문으로 합니다.",
  location: "서울, 대한민국",
  hourlyRate: 50000,
  phone: "010-1234-5678",
  website: "https://myportfolio.com",
  github: "github.com/freelancer",
  linkedin: "linkedin.com/in/freelancer",
  skills: [
    "React", "Next.js", "TypeScript", "Node.js", "Python",
    "PostgreSQL", "MongoDB", "AWS", "Docker", "Git"
  ],
  experience: [
    {
      id: "1",
      title: "시니어 풀스택 개발자",
      company: "테크 스타트업",
      period: "2020 - 현재",
      description: "웹 애플리케이션 설계 및 개발, 팀 리딩",
    },
    {
      id: "2",
      title: "프론트엔드 개발자",
      company: "디지털 에이전시",
      period: "2017 - 2020",
      description: "React 기반 대시보드 및 관리자 패널 개발",
    },
    {
      id: "3",
      title: "주니어 개발자",
      company: "소프트웨어 회사",
      period: "2014 - 2017",
      description: "웹 서비스 유지보수 및 신규 기능 개발",
    },
  ],
  education: [
    {
      id: "1",
      degree: "컴퓨터공학 학사",
      school: "한국대학교",
      period: "2010 - 2014",
    },
  ],
  portfolio: [
    {
      id: "1",
      title: "전자상거래 플랫폼",
      description: "Next.js와 Stripe를 활용한 풀스택 쇼핑몰",
      image: null,
      tags: ["Next.js", "TypeScript", "Stripe"],
    },
    {
      id: "2",
      title: "프로젝트 관리 도구",
      description: "실시간 협업이 가능한 칸반 보드",
      image: null,
      tags: ["React", "Node.js", "Socket.io"],
    },
    {
      id: "3",
      title: "데이터 분석 대시보드",
      description: "비즈니스 인사이트를 제공하는 분석 도구",
      image: null,
      tags: ["React", "D3.js", "Python"],
    },
  ],
  certifications: [
    {
      id: "1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2022",
    },
    {
      id: "2",
      name: "Google Cloud Professional",
      issuer: "Google",
      date: "2021",
    },
  ],
};

export default function FreelancerProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(DEMO_PROFILE);
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((s) => s !== skill),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        <CardContent className="relative pt-0 pb-6">
          {/* Profile Photo */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
            <div className="flex items-end space-x-4">
              <div className="relative group">
                <Avatar className="h-32 w-32 ring-4 ring-white dark:ring-gray-900">
                  <AvatarImage src={DEMO_USER.image || undefined} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-4xl">
                    {DEMO_USER.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <button className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="h-8 w-8 text-white" />
                  </button>
                )}
              </div>
              <div className="pb-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {DEMO_USER.name}
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                    프리랜서
                  </Badge>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm font-medium">4.9</span>
                    <span className="ml-1 text-xs text-gray-500">(127 리뷰)</span>
                  </div>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "default" : "outline"}
              className={cn(
                "mt-4 md:mt-0 mb-2",
                isEditing && "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              )}
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  저장
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  프로필 수정
                </>
              )}
            </Button>
          </div>

          {/* Bio */}
          <div className="mb-6">
            {isEditing ? (
              <Textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="min-h-[100px]"
                placeholder="자기소개를 입력하세요..."
              />
            ) : (
              <p className="text-gray-700 dark:text-gray-300">{profile.bio}</p>
            )}
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="h-4 w-4" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Mail className="h-4 w-4" />
              <span>{DEMO_USER.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Phone className="h-4 w-4" />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <DollarSign className="h-4 w-4" />
              <span>시간당 ₩{profile.hourlyRate.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400">
              <Globe className="h-4 w-4" />
              <a href={`https://${profile.website}`} className="hover:underline">
                {profile.website}
              </a>
            </div>
            <div className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400">
              <Github className="h-4 w-4" />
              <a href={`https://${profile.github}`} className="hover:underline">
                GitHub
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Skills */}
          <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="h-5 w-5" />
                <span>기술 스택</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 text-blue-700 dark:text-blue-300 border-0"
                  >
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-2 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    placeholder="새 스킬 추가..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  />
                  <Button onClick={addSkill} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Portfolio */}
          <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>포트폴리오</span>
                </CardTitle>
                {isEditing && (
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    추가
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.portfolio.map((item) => (
                  <Dialog key={item.id}>
                    <DialogTrigger asChild>
                      <button className="group relative overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                        <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                          <Upload className="h-12 w-12 text-gray-400 dark:text-gray-600" />
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ZoomIn className="h-8 w-8 text-white" />
                        </div>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>{item.title}</DialogTitle>
                        <DialogDescription>{item.description}</DialogDescription>
                      </DialogHeader>
                      <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center">
                        <Upload className="h-24 w-24 text-gray-400 dark:text-gray-600" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {profile.portfolio.map((item) => (
                  <div key={item.id} className="border-l-2 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>경력</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {profile.experience.map((exp, index) => (
                  <div key={exp.id} className="relative">
                    {index !== profile.experience.length - 1 && (
                      <div className="absolute left-2 top-8 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />
                    )}
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 ring-4 ring-white dark:ring-gray-900 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {exp.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {exp.company}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{exp.period}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Education */}
          <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GraduationCap className="h-5 w-5" />
                <span>학력</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.education.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {edu.degree}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {edu.school}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{edu.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card className="border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>자격증</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.certifications.map((cert) => (
                  <div key={cert.id} className="border-l-2 border-green-500 pl-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {cert.name}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {cert.issuer}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{cert.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="border-0 bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">통계</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">완료한 프로젝트</span>
                  <span className="text-xl font-bold">47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">활동 기간</span>
                  <span className="text-xl font-bold">10년</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">재고용률</span>
                  <span className="text-xl font-bold">95%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
