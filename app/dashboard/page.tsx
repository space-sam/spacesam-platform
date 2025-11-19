import { getCurrentUser } from "@/lib/auth/config";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Redirect based on user role
  if (user.role === "CLIENT") {
    redirect("/client/projects");
  } else if (user.role === "FREELANCER") {
    redirect("/freelancer/projects");
  } else {
    // For any other roles (e.g., ADMIN), redirect to a default page
    redirect("/");
  }
}
