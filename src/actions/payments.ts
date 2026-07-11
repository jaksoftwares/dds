"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function processMockPayment(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const invoiceId = formData.get("invoice_id") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const method = formData.get("method") as string || "Credit Card (Mock)";

  if (!invoiceId || isNaN(amount)) {
    return { error: "Invoice ID and amount are required" };
  }

  // 1. Insert payment record
  const { error: paymentError } = await supabase.from("payments").insert({
    invoice_id: invoiceId,
    amount: amount,
    method: method,
    status: "completed"
  });

  if (paymentError) {
    return { error: paymentError.message };
  }

  // 2. Update invoice status to paid
  const { error: invoiceError } = await supabase
    .from("invoices")
    .update({ status: "paid" })
    .eq("id", invoiceId)
    .eq("client_id", user.id); // Ensure they own it

  if (invoiceError) {
    return { error: invoiceError.message };
  }

  revalidatePath("/dashboard/financials");
  return { success: true };
}
