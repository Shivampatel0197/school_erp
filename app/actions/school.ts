"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";

export async function registerSchool(formData: FormData) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("schoolName") as string;
  const address = formData.get("address") as string;
  const contactEmail = formData.get("contactEmail") as string;

  // 1. Create the school in Supabase
  const { data: school, error: schoolError } = await supabase
    .from("schools")
    .insert([{ name, address, contact_email: contactEmail }])
    .select()
    .single();

  if (schoolError || !school) {
    console.error("Error creating school:", schoolError);
    throw new Error("Failed to create school");
  }

  // 2. Create the user record in Supabase linked to the new school
  const { error: userError } = await supabase
    .from("users")
    .insert([
      {
        id: userId,
        school_id: school.id,
        role: "admin",
        name: `${user.firstName} ${user.lastName}`,
        email: user.emailAddresses[0].emailAddress,
      },
    ]);

  if (userError) {
    console.error("Error creating user:", userError);
    // Note: In a production app, you might want to rollback the school creation here
    throw new Error("Failed to create user record");
  }

  // 3. Update Clerk metadata with role and school_id
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      role: "admin",
      schoolId: school.id,
    },
  });

  // 4. Redirect to admin dashboard
  redirect("/admin");
}
