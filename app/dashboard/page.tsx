import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardRedirect() {
  const { userId } = await auth();


  const user = await currentUser();
  const role = user?.publicMetadata?.role as string;

  if (role === 'admin') {
    redirect('/admin');
  } else if (role === 'teacher') {
    redirect('/teacher');
  } else if (role === 'student') {
    redirect('/student');
  } else if (role === 'parent') {
    redirect('/parent');
  }

  // Graceful fallback for unassigned users
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to EduSaaS</h1>
      <p className="text-muted-foreground max-w-md">
        Your account is currently pending role assignment. Please contact your school administrator to get access to your dashboard.
      </p>
    </div>
  );
}
