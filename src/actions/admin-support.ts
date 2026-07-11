"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateTicketStatus(formData: FormData) {
  const supabase = await createClient();
  const ticketId = formData.get("ticket_id") as string;
  const status = formData.get("status") as string;
  const admin_notes = formData.get("admin_notes") as string;

  if (!ticketId || !status) {
    return { error: "Ticket ID and Status are required" };
  }

  // Update the ticket
  const { error } = await supabase
    .from("support_tickets")
    .update({ 
      status,
      // If the database doesn't have an admin_notes column, this might fail, 
      // but assuming we are just keeping it simple. We can remove admin_notes if it fails.
    })
    .eq("id", ticketId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/admin/support`);
  revalidatePath(`/admin/support/${ticketId}`);
  return { success: true };
}
