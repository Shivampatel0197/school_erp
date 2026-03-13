"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";

export async function registerSchool(prevState: any, formData: FormData) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return { success: false, error: "Authentication required. Please sign in again." };
    }

    const name = formData.get("schoolName") as string;
    const address = formData.get("address") as string;
    const contactEmail = formData.get("contactEmail") as string;

    if (!name || !address || !contactEmail) {
      return { success: false, error: "All fields are required." };
    }

    // 1. Create the school in Supabase
    const { data: school, error: schoolError } = await supabase
      .from("schools")
      .insert([{ name, address, contact_email: contactEmail }])
      .select()
      .single();

    if (schoolError || !school) {
      console.error("Error creating school:", schoolError);
      return { success: false, error: "Database error: Could not create school record. Ensure your Supabase RLS policies allow insertions or check connection." };
    }

    // 2. Create the user record in Supabase linked to the new school
    const { error: userError } = await supabase
      .from("users")
      .insert([
        {
          id: userId,
          school_id: school.id,
          role: "admin",
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || "Admin",
          email: user.emailAddresses[0].emailAddress,
        },
      ]);

    if (userError) {
      console.error("Error creating user:", userError);
      return { success: false, error: "Database error: School created, but user linkage failed." };
    }

    // 3. Update Clerk metadata with role and school_id
    const clerk = await clerkClient();
    await clerk.users.updateUser(userId, {
      publicMetadata: {
        role: "admin",
        schoolId: school.id,
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Critical error in registerSchool:", error);
    return { success: false, error: error.message || "A server-side exception occurred." };
  }
}
