"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createInvoice(formData: FormData) {
  const supabase = await createClient();
  const client_id = formData.get("client_id") as string;
  const project_id = formData.get("project_id") as string;
  const description = formData.get("description") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const due_date = formData.get("due_date") as string;
  const status = formData.get("status") as string;

  if (!client_id || !description || isNaN(amount)) {
    return { error: "Client, description, and amount are required" };
  }

  const { error } = await supabase.from("invoices").insert({
    client_id,
    project_id: project_id || null,
    description,
    amount,
    due_date: due_date || null,
    status: status || "pending",
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/admin/financials`);
  return { success: true };
}

export async function updateInvoiceStatus(formData: FormData) {
  const supabase = await createClient();
  const invoiceId = formData.get("invoice_id") as string;
  const status = formData.get("status") as string;

  if (!invoiceId || !status) {
    return { error: "Invoice ID and status are required" };
  }

  const { error } = await supabase
    .from("invoices")
    .update({ status })
    .eq("id", invoiceId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/admin/financials`);
  return { success: true };
}
