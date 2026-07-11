import { NextRequest, NextResponse } from "next/server";
import * as postmark from "postmark";
import { createClient as createSupabaseAdmin } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

// Supabase admin client
const supabaseAdmin = createSupabaseAdmin(
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
    const parsed = quoteSchema.parse(data);

    // Get user session to attach user_id if logged in
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const user_id = user?.id || null;

    // Insert into Supabase
    const { error } = await supabaseAdmin.from("quotes").insert({
      user_id,
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
      return NextResponse.json({ message: "Failed to save quote info" }, { status: 500 });
    }

    // Initialize Postmark client
    const postmarkClient = new postmark.ServerClient(
      process.env.POSTMARK_API_TOKEN || "fake-token"
    );

    // Support contact info (adjust as needed)
    const supportPhone = "+254 114749711";
    const supportEmail = "dovepeakdigital@gmail.com";

    // -----------------------
    // 📧 CLIENT & ADMIN EMAILS
    // -----------------------
    try {
      await postmarkClient.sendEmail({
        From: "sales@dovepeakdigital.com",
        To: parsed.email,
        ReplyTo: "sales@dovepeakdigital.com",
        Subject: `Thank You, ${parsed.name} – We've Received Your Request at Dovepeak Digital Solutions`,
        HtmlBody: `
          <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <img src="${process.env.NEXT_PUBLIC_SITE_URL}/core/logo-base.png" alt="Dovepeak Digital Solutions" style="max-height: 40px;" />
            </div>
            <h2 style="color: #ea580c; border-bottom: 2px solid #ea580c; padding-bottom: 10px;">Hello ${parsed.name},</h2>
            <p>Thank you for reaching out to <strong>Dovepeak Digital Solutions</strong>. We have received your <strong>${parsed.reason.charAt(0).toUpperCase() + parsed.reason.slice(1)}</strong> request and are reviewing the details carefully.</p>

            <h3 style="margin-top: 25px; color: #ea580c;">Summary of Your Request</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tbody>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Service</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${parsed.service || "Not specified"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Budget</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${parsed.budget || "Not specified"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Timeline</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${parsed.timeline || "Not specified"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Urgency</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${parsed.urgency ? parsed.urgency.charAt(0).toUpperCase() + parsed.urgency.slice(1) : "Not specified"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Preferred Contact</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">
                    ${parsed.preferredContactMethod || "N/A"}${parsed.preferredContactDetails ? ` - ${parsed.preferredContactDetails}` : ""}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Preferred Date</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${parsed.date || "Not specified"}</td>
                </tr>
              </tbody>
            </table>

            <h3 style="color: #ea580c;">Your Message</h3>
            <blockquote style="background-color:#fff7ed; padding: 15px; border-left: 4px solid #ea580c; font-style: italic; margin-bottom: 25px;">
              ${parsed.message}
            </blockquote>

            <p>We aim to respond within <strong>24–48 hours</strong>. If your request is urgent, please contact our support team directly:</p>
            <ul>
              <li>Phone: <a href="tel:${supportPhone.replace(/\D/g, '')}" style="color:#ea580c;">${supportPhone}</a></li>
              <li>Email: <a href="mailto:${supportEmail}" style="color:#ea580c;">${supportEmail}</a></li>
            </ul>

            <p>Thank you for choosing <strong>Dovepeak Digital Solutions</strong>. We look forward to assisting you!</p>

            <p style="margin-top: 40px;">Best regards,<br />
            <strong>The Dovepeak Digital Solutions Team</strong></p>

            <hr style="border:none; border-top:1px solid #eee; margin-top: 40px;" />

            <small style="color: #888;">Please do not reply directly to this automated email.</small>
          </div>
        `,
      });

      await postmarkClient.sendEmail({
        From: "system@dovepeakdigital.com",
        To: process.env.ADMIN_EMAIL!,
        ReplyTo: parsed.email,
        Subject: `New ${parsed.reason.toUpperCase()} Submission from ${parsed.name}`,
        HtmlBody: `
          <div style="font-family: Arial, sans-serif; color: #222; max-width: 600px; margin: auto; padding: 20px;">
            <div style="margin-bottom: 20px;">
              <img src="${process.env.NEXT_PUBLIC_SITE_URL}/core/logo-base.png" alt="Dovepeak Digital Solutions" style="max-height: 40px;" />
            </div>
            <h2 style="color: #ea580c; border-bottom: 3px solid #ea580c; padding-bottom: 8px;">New Form Submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tbody>
                <tr>
                  <td style="padding: 8px; font-weight: bold; border: 1px solid #ddd; width: 40%;">Name</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${parsed.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold; border: 1px solid #ddd;">Email</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${parsed.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold; border: 1px solid #ddd;">Phone</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${parsed.phone || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold; border: 1px solid #ddd;">Reason</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${parsed.reason.charAt(0).toUpperCase() + parsed.reason.slice(1)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold; border: 1px solid #ddd;">Service Interested In</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${parsed.service || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold; border: 1px solid #ddd;">Budget</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${parsed.budget || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold; border: 1px solid #ddd;">Timeline</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${parsed.timeline || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold; border: 1px solid #ddd;">Urgency</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${parsed.urgency ? parsed.urgency.charAt(0).toUpperCase() + parsed.urgency.slice(1) : "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold; border: 1px solid #ddd;">Preferred Contact Method</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">
                    ${parsed.preferredContactMethod || "N/A"}${parsed.preferredContactDetails ? ` - ${parsed.preferredContactDetails}` : ""}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold; border: 1px solid #ddd;">Preferred Date</td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${parsed.date || "N/A"}</td>
                </tr>
              </tbody>
            </table>

            <h3 style="margin-top: 20px; color: #ea580c;">Message</h3>
            <p style="background-color:#fff7ed; padding: 15px; border-left: 4px solid #ea580c; white-space: pre-wrap;">${parsed.message}</p>

            <hr style="margin-top: 30px; border:none; border-top:1px solid #ccc;" />
            <p style="font-size: 0.85rem; color: #555;">Received on: ${new Date().toLocaleString()}</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send emails:", emailError);
      // Still return 200 because DB insert worked
    }

    return NextResponse.json({ message: "Quote request sent successfully" }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation failed", errors: error.errors }, { status: 422 });
    }
    console.error("Unexpected error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
