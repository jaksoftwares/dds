import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("M-Pesa callback received:", JSON.stringify(body));

    const result = body?.Body?.stkCallback;

    if (!result) {
      console.error("Invalid M-Pesa callback payload", body);
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    const {
      MerchantRequestID,
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
      CallbackMetadata,
    } = result;

    let amount: number | null = null;
    let mpesaReceipt: string | null = null;
    let phone: string | null = null;
    let transactionDate: string | null = null;

    if (CallbackMetadata?.Item && Array.isArray(CallbackMetadata.Item)) {
      for (const item of CallbackMetadata.Item) {
        if (item.Name === "Amount") amount = item.Value;
        if (item.Name === "MpesaReceiptNumber") mpesaReceipt = item.Value;
        if (item.Name === "PhoneNumber") phone = String(item.Value);
        if (item.Name === "TransactionDate")
          transactionDate = String(item.Value);
      }
    }

    const status = ResultCode === 0 ? "SUCCESS" : "FAILED";

    const { error } = await supabase
      .from("payments")
      .update({
        status,
        mpesa_receipt: mpesaReceipt,
        amount,
        customer_phone: phone,
        transaction_date: transactionDate,
        raw_callback: body,
      })
      .eq("checkout_request_id", CheckoutRequestID);

    if (error) {
      console.error("Supabase payment update error:", error);
    }

    return NextResponse.json({ message: "Callback processed" }, { status: 200 });
  } catch (err) {
    console.error("Error handling M-Pesa callback:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
