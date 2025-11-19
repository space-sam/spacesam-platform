import { getCurrentUser } from "@/lib/auth/config";
import { redirect } from "next/navigation";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <DashboardNav user={user} />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
