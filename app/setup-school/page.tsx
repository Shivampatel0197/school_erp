import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SetupSchoolForm } from "@/components/dashboard/setup-school-form";

export const dynamic = "force-dynamic";

export default async function SetupSchoolPage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    redirect("/sign-in");
  }

  // If user already has a role, they shouldn't be here
  if (user?.publicMetadata?.role) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <SetupSchoolForm />
    </div>
  );
}
