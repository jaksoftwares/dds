import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { from_name, from_email, message } = body;

    if (!from_name || !from_email || !message) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // Save message to Supabase
    const { error } = await supabase.from("contact_messages").insert([
      { from_name, from_email, message },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { message: "Failed to save message." },
        { status: 500 }
      );
    }

    // Setup email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    });

    // 1. Confirmation email to user WITHOUT their message content
await transporter.sendMail({
  from: process.env.EMAIL_USER!,
  to: from_email,
  subject: "DDS Contact Confirmation",
  html: `
    <p>Hi ${from_name},</p>
    <p>Thanks for getting in touch with DDS. We’ve received your message and will respond shortly.</p>
    <p>Warm regards,<br/>DDS Team</p>
  `,
});

// 2. Notification email to admin WITH full message details
await transporter.sendMail({
  from: process.env.EMAIL_USER!,
  to: process.env.EMAIL_USER!, // admin email
  subject: "New DDS Contact Message",
  html: `
    <p><strong>New contact message received:</strong></p>
    <p><strong>Name:</strong> ${from_name}</p>
    <p><strong>Email:</strong> ${from_email}</p>
    <p><strong>Message:</strong><br/>${message}</p>
  `,
});

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Unhandled error:", err);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
