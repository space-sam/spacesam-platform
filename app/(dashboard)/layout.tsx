// import { getCurrentUser } from "@/lib/auth/config";
// import { redirect } from "next/navigation";
import { TopNav } from "@/components/layout/top-nav";

export const dynamic = 'force-dynamic';

// Demo user for testing - TODO: Replace with actual auth
const DEMO_USER = {
  id: "demo-user-123",
  name: "테스트 사용자",
  email: "demo@spacesam.com",
  role: "CLIENT" as const,
  image: null,
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // DEMO MODE: Comment out authentication
  // const user = await getCurrentUser();
  // if (!user) {
  //   redirect("/login");
  // }

  // Use demo user
  const user = DEMO_USER;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <TopNav user={user} />
      <main className="p-6 md:p-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
