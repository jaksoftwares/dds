"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createTicket(formData: FormData) {
  const subject = formData.get("subject") as string;
  const description = formData.get("description") as string;
  const priority = formData.get("priority") as string;

  if (!subject || !description) {
    return { error: "Subject and description are required" };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase.from("support_tickets").insert({
    client_id: user.id,
    subject,
    description,
    priority: priority || "normal",
  });

  if (error) {
    console.error("Create ticket error:", error);
    return { error: "Failed to create ticket" };
  }

  revalidatePath("/dashboard/support");
  return { success: true };
}
