import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

// Supabase client setup
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Validation schema
const quoteSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().or(z.literal("")),
  reason: z.enum(["general", "quote", "consultation"]),
  service: z.string().optional().or(z.literal("")),
  budget: z.string().optional().or(z.literal("")),
  timeline: z.string().optional().or(z.literal("")),
  urgency: z.enum(["low", "medium", "high"]).optional(),
  preferredContactMethod: z.string().optional().or(z.literal("")),
  preferredContactDetails: z.string().optional().or(z.literal("")),
  date: z.string().optional().or(z.literal("")),
  message: z.string().min(10),
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate input
    const parsed = quoteSchema.parse(data);

    // Insert into Supabase
    const { error } = await supabase.from("quotes").insert({
      name: parsed.name,
      email: parsed.email,
      phone: parsed.phone || null,
      reason: parsed.reason,
      service: parsed.service || null,
      budget: parsed.budget || null,
      timeline: parsed.timeline || null,
      urgency: parsed.urgency || null,
      preferred_contact_method: parsed.preferredContactMethod || null,
      preferred_contact_details: parsed.preferredContactDetails || null,
      date: parsed.date || null,
      message: parsed.message,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { message: "Failed to save quote info" },
        { status: 500 }
      );
    }

    // Setup email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!, // Consistent with your working route
      },
    });

    // Confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER!,
      to: parsed.email,
      subject: "DDS - Quote Request Confirmation",
      html: `
        <p>Hi ${parsed.name},</p>
        <p>Thank you for reaching out to DDS for a quote. We’ve received your request and will get back to you shortly.</p>
        <p>Best regards,<br/>DDS Team</p>
      `,
    });

    // Admin notification email
    const adminEmailBody = `
      <h2>New Quote / Contact Request</h2>
      <p><strong>Name:</strong> ${parsed.name}</p>
      <p><strong>Email:</strong> ${parsed.email}</p>
      <p><strong>Phone:</strong> ${parsed.phone || "N/A"}</p>
      <p><strong>Reason:</strong> ${parsed.reason}</p>
      <p><strong>Service:</strong> ${parsed.service || "N/A"}</p>
      <p><strong>Budget:</strong> ${parsed.budget || "N/A"}</p>
      <p><strong>Timeline:</strong> ${parsed.timeline || "N/A"}</p>
      <p><strong>Urgency:</strong> ${parsed.urgency || "N/A"}</p>
      <p><strong>Preferred Contact Method:</strong> ${parsed.preferredContactMethod || "N/A"}</p>
      <p><strong>Preferred Contact Details:</strong> ${parsed.preferredContactDetails || "N/A"}</p>
      <p><strong>Preferred Consultation Date:</strong> ${parsed.date || "N/A"}</p>
      <p><strong>Message:</strong></p>
      <p>${parsed.message}</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER!,
      to: process.env.EMAIL_USER!, // Admin inbox
      subject: "New Quote / Contact Request Received",
      html: adminEmailBody,
    });

    return NextResponse.json({ message: "Quote request submitted successfully" });
  } catch (error) {
    const err = error as Error;
    console.error("Error in quote submission handler:", err);
    return NextResponse.json(
      { message: err.message || "Failed to process request" },
      { status: 400 }
    );
  }
}
