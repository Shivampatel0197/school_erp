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

  // If no role is assigned, this is likely a new principal signed up from landing page
  redirect('/setup-school');
}
