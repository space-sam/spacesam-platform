"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, Save } from "lucide-react";

import { Decimal } from "@prisma/client/runtime/library";

interface FreelancerProfile {
  id: string;
  bio: string | null;
  skills: string[];
  hourlyRate: Decimal | string | number | null;
  portfolio: string[];
  availability: string;
  experience: string | null;
  education: string | null;
  location: string | null;
}

interface FreelancerProfileFormProps {
  profile: FreelancerProfile;
  userId?: string;
}

export function FreelancerProfileForm({ profile }: FreelancerProfileFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    bio: profile.bio || "",
    hourlyRate: profile.hourlyRate?.toString() || "",
    availability: profile.availability || "AVAILABLE",
    experience: profile.experience || "",
    education: profile.education || "",
    location: profile.location || "",
  });

  const [skills, setSkills] = useState<string[]>(profile.skills || []);
  const [newSkill, setNewSkill] = useState("");

  const [portfolio, setPortfolio] = useState<string[]>(profile.portfolio || []);
  const [newPortfolioUrl, setNewPortfolioUrl] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleAddPortfolio = () => {
    if (newPortfolioUrl.trim() && !portfolio.includes(newPortfolioUrl.trim())) {
      setPortfolio([...portfolio, newPortfolioUrl.trim()]);
      setNewPortfolioUrl("");
    }
  };

  const handleRemovePortfolio = (urlToRemove: string) => {
    setPortfolio(portfolio.filter((url) => url !== urlToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/profile/freelancer", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          skills,
          portfolio,
          hourlyRate: formData.hourlyRate ? parseFloat(formData.hourlyRate) : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "프로필 업데이트 중 오류가 발생했습니다.");
        return;
      }

      setSuccess(true);
      router.refresh();
    } catch {
      setError("프로필 업데이트 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>기본 정보</CardTitle>
          <CardDescription>프로필의 기본 정보를 입력하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bio">자기소개</Label>
            <textarea
              id="bio"
              className="w-full min-h-[100px] px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="자신의 전문성과 경력을 소개해주세요"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">시급 (원)</Label>
              <Input
                id="hourlyRate"
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                placeholder="50000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">가용성</Label>
              <Select
                value={formData.availability}
                onValueChange={(value) => setFormData({ ...formData, availability: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AVAILABLE">가능</SelectItem>
                  <SelectItem value="BUSY">바쁨</SelectItem>
                  <SelectItem value="UNAVAILABLE">불가</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">위치</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="서울, 대한민국"
            />
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle>기술 스택</CardTitle>
          <CardDescription>보유하고 있는 기술을 추가하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
              placeholder="예: React, Node.js, Python"
            />
            <Button type="button" onClick={handleAddSkill} size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 hover:text-blue-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Portfolio */}
      <Card>
        <CardHeader>
          <CardTitle>포트폴리오</CardTitle>
          <CardDescription>작업물이나 프로젝트 URL을 추가하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              value={newPortfolioUrl}
              onChange={(e) => setNewPortfolioUrl(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddPortfolio())}
              placeholder="https://github.com/username/project"
            />
            <Button type="button" onClick={handleAddPortfolio} size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {portfolio.map((url) => (
              <div
                key={url}
                className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700"
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline truncate"
                >
                  {url}
                </a>
                <button
                  type="button"
                  onClick={() => handleRemovePortfolio(url)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Experience & Education */}
      <Card>
        <CardHeader>
          <CardTitle>경력 및 학력</CardTitle>
          <CardDescription>경력과 학력 정보를 입력하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="experience">경력</Label>
            <textarea
              id="experience"
              className="w-full min-h-[100px] px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              placeholder="주요 경력 사항을 입력하세요"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="education">학력</Label>
            <textarea
              id="education"
              className="w-full min-h-[100px] px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              placeholder="학력 사항을 입력하세요"
            />
          </div>
        </CardContent>
      </Card>

      {/* Messages */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg">
          프로필이 성공적으로 업데이트되었습니다!
        </div>
      )}

      {/* Submit Button */}
      <Button type="submit" size="lg" disabled={isLoading} className="w-full md:w-auto">
        <Save className="w-4 h-4 mr-2" />
        {isLoading ? "저장 중..." : "프로필 저장"}
      </Button>
    </form>
  );
}
