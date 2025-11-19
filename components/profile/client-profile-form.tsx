"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Save } from "lucide-react";

interface ClientProfile {
  id: string;
  company: string | null;
  companySize: string | null;
  industry: string | null;
  bio: string | null;
}

interface ClientProfileFormProps {
  profile: ClientProfile;
  userId: string;
}

export function ClientProfileForm({ profile, userId }: ClientProfileFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    company: profile.company || "",
    companySize: profile.companySize || "",
    industry: profile.industry || "",
    bio: profile.bio || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/profile/client", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "프로필 업데이트 중 오류가 발생했습니다.");
        return;
      }

      setSuccess(true);
      router.refresh();
    } catch (error) {
      setError("프로필 업데이트 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>회사 정보</CardTitle>
          <CardDescription>회사 및 업무 정보를 입력하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company">회사명</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="회사명을 입력하세요"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companySize">회사 규모</Label>
              <Input
                id="companySize"
                value={formData.companySize}
                onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                placeholder="예: 10-50명"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">업종</Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                placeholder="예: IT, 제조, 금융"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">소개</Label>
            <textarea
              id="bio"
              className="w-full min-h-[100px] px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="회사 또는 본인에 대한 간단한 소개를 입력하세요"
            />
          </div>
        </CardContent>
      </Card>

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

      <Button type="submit" size="lg" disabled={isLoading} className="w-full md:w-auto">
        <Save className="w-4 h-4 mr-2" />
        {isLoading ? "저장 중..." : "프로필 저장"}
      </Button>
    </form>
  );
}
