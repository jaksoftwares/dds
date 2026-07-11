"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitQuoteRequest(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const service = formData.get("service") as string;
  const budget = formData.get("budget") as string;
  const timeline = formData.get("timeline") as string;
  const urgency = formData.get("urgency") as string;
  const message = formData.get("message") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!service || !message || (!user && (!name || !email))) {
    return { error: "Missing required fields" };
  }

  const { error } = await supabase.from("quotes").insert({
    user_id: user?.id || null,
    name: name || user?.user_metadata?.full_name || null,
    email: email || user?.email || null,
    service,
    budget,
    timeline,
    urgency,
    message,
    status: "pending"
  });

  if (error) {
    return { error: error.message };
  }

  if (user) {
    revalidatePath("/dashboard/quotes");
  }
  return { success: true };
}
