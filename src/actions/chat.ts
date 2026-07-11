"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function sendMessage(formData: FormData) {
  const message = formData.get("message") as string;

  if (!message || message.trim() === "") {
    return { error: "Message cannot be empty" };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Find an admin to send the message to
  const { data: admin } = await supabase
    .from("profiles")
    .select("id")
    .eq("role", "admin")
    .limit(1)
    .single();

  if (!admin) {
    return { error: "No support agents available right now." };
  }

  const { error } = await supabase.from("chats").insert({
    sender_id: user.id,
    receiver_id: admin.id,
    message: message.trim(),
  });

  if (error) {
    console.error("Send message error:", error);
    return { error: "Failed to send message" };
  }

  revalidatePath("/dashboard/chat");
  return { success: true };
}
