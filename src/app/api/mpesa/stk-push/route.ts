"use server";

import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const stkRequestSchema = z.object({
  phone: z
    .string()
    .min(9)
    .transform((val) => val.replace(/[^0-9]/g, ""))
    .refine((val) => val.startsWith("254") && val.length === 12, {
      message: "Phone must be in 2547XXXXXXXX format",
    }),
  amount: z
    .number()
    .int()
    .positive()
    .refine((val) => val >= 1, { message: "Amount must be at least 1 KES" }),
  accountReference: z.string().optional().default("DOVEPEAK-PAYMENT"),
  description: z.string().optional().default("Online payment"),
});

async function getMpesaToken() {
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) {
    throw new Error("M-Pesa credentials are not configured");
  }

  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

  const url =
    process.env.MPESA_ENV === "production"
      ? "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
      : "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("M-Pesa token error:", text);
    throw new Error("Failed to obtain M-Pesa access token");
  }

  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

function buildPassword(shortCode: string, passkey: string, timestamp: string) {
  return Buffer.from(`${shortCode}${passkey}${timestamp}`).toString("base64");
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = stkRequestSchema.parse({
      ...json,
      amount: Number(json.amount),
    });

    const shortCode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const callbackUrl =
      process.env.MPESA_CALLBACK_URL ||
      "https://dovepeakdigital.com/api/mpesa/callback";

    if (!shortCode || !passkey) {
      return NextResponse.json(
        { message: "Payment configuration missing on server." },
        { status: 500 }
      );
    }

    const accessToken = await getMpesaToken();

    const timestamp = new Date()
      .toISOString()
      .replace(/[-:TZ.]/g, "")
      .slice(0, 14);

    const password = buildPassword(shortCode, passkey, timestamp);

    const mpesaUrl =
      process.env.MPESA_ENV === "production"
        ? "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        : "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

    const payload = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: parsed.amount,
      PartyA: parsed.phone,
      PartyB: process.env.MPESA_PARTY_B || shortCode,
      PhoneNumber: parsed.phone,
      CallBackURL: callbackUrl,
      AccountReference: parsed.accountReference,
      TransactionDesc: parsed.description,
    };

    const res = await fetch(mpesaUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok || data.errorCode) {
      console.error("M-Pesa STK error:", data);
      return NextResponse.json(
        {
          success: false,
          message: data.errorMessage || "Failed to initiate payment.",
        },
        { status: 500 }
      );
    }

    const {
      MerchantRequestID,
      CheckoutRequestID,
      CustomerMessage,
    }: {
      MerchantRequestID: string;
      CheckoutRequestID: string;
      CustomerMessage?: string;
    } = data;

    // Persist initial payment record
    const { error } = await supabase.from("payments").insert({
      customer_phone: parsed.phone,
      amount: parsed.amount,
      account_reference: parsed.accountReference,
      status: "PENDING",
      merchant_request_id: MerchantRequestID,
      checkout_request_id: CheckoutRequestID,
    });

    if (error) {
      console.error("Supabase payment insert error:", error);
    }

    return NextResponse.json(
      {
        success: true,
        message: CustomerMessage || "STK push initiated.",
        checkoutRequestId: CheckoutRequestID,
        merchantRequestId: MerchantRequestID,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("STK push error:", err);

    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid data", errors: err.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Failed to initiate payment." },
      { status: 500 }
    );
  }
}
