"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitFeedback(formData: FormData) {
  const type = formData.get("type") as string;
  const message = formData.get("message") as string;
  const ratingStr = formData.get("rating") as string;

  if (!type || !message) {
    return { error: "Type and message are required" };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  let rating = null;
  if (ratingStr) {
    rating = parseInt(ratingStr, 10);
  }

  const { error } = await supabase.from("client_feedbacks").insert({
    client_id: user.id,
    type,
    message,
    rating,
  });

  if (error) {
    console.error("Submit feedback error:", error);
    return { error: "Failed to submit feedback" };
  }

  revalidatePath("/dashboard/feedback");
  return { success: true };
}
