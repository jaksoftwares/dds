import { NextResponse } from "next/server";
import { createClient as createSupabaseAdmin } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import * as postmark from "postmark";

const supabaseAdmin = createSupabaseAdmin(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Support & Company Info Constants
const SUPPORT_PHONE = "+254 115749711";
const SUPPORT_EMAIL = "dovepeakdigital@gmail.com";
const LIVE_CHAT_URL = "https://dovepeak.com/chat";
const COMPANY_WEBSITE = "https://www.dovepeakdigital.com";
const COMPANY_NAME = "Dovepeak Digital Solutions";
const COMPANY_ADDRESS = "00100-346200, Juja, Kenya";
const SOCIAL_LINKS = {
  twitter: "https://twitter.com/dovepeakgigital",
  facebook: "https://facebook.com/dovepeak",
  linkedin: "https://linkedin.com/company/dovepeak",
};

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

    // Get user session to attach user_id if logged in
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const user_id = user?.id || null;

    // Save message to Supabase
    const { error } = await supabaseAdmin.from("contact_messages").insert([
      { user_id, from_name, from_email, message },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { message: "Failed to save message." },
        { status: 500 }
      );
    }

    // Initialize Postmark client
    const postmarkClient = new postmark.ServerClient(
      process.env.POSTMARK_SERVER_TOKEN || "fake-token"
    );

    try {
      // Confirmation email to client
      await postmarkClient.sendEmail({
        From: process.env.EMAIL_USER!, // Must be a verified Sender Signature in Postmark
        To: from_email,
        Subject: `Thank you for contacting ${COMPANY_NAME}`,
        HtmlBody: `
          <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5; max-width: 600px; margin: auto;">
            <p>Dear ${from_name},</p>
            <p>Thank you for reaching out to <strong>${COMPANY_NAME}</strong>. We have received your message and one of our team members will respond to you as soon as possible.</p>
            
            <p>If your inquiry is urgent or you need immediate assistance, please contact our support team via one of the following methods:</p>
            <ul>
              <li>📞 Phone: <a href="tel:${SUPPORT_PHONE}">${SUPPORT_PHONE}</a></li>
              <li>📧 Email: <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a></li>
              <li>💬 Live Chat: <a href="${LIVE_CHAT_URL}" target="_blank" rel="noopener noreferrer">Chat with us</a></li>
            </ul>

            <p>For more information about our services, please visit our website: <a href="${COMPANY_WEBSITE}" target="_blank" rel="noopener noreferrer">${COMPANY_WEBSITE}</a></p>

            <p>Best regards,<br /><strong>The ${COMPANY_NAME} Team</strong></p>

            <hr style="border:none; border-top:1px solid #eee; margin:20px 0;">

            <p style="font-size: 0.9em; color: #666;">
              ${COMPANY_NAME} | ${COMPANY_ADDRESS}<br />
              Phone: ${SUPPORT_PHONE} | Email: ${SUPPORT_EMAIL}<br />
              Follow us on
              <a href="${SOCIAL_LINKS.twitter}" target="_blank" rel="noopener noreferrer">Twitter</a>,
              <a href="${SOCIAL_LINKS.facebook}" target="_blank" rel="noopener noreferrer">Facebook</a>,
              <a href="${SOCIAL_LINKS.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </p>

            <small>Please do not reply directly to this automated email.</small>
        </div>
        `,
      });

      // Detailed notification email to admin
      const adminEmailBody = `
        <div style="font-family: Arial, sans-serif; color: #222;">
          <h2 style="color: #004080;">New Contact Message Received</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; border: 1px solid #ddd;">Name:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${from_name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border: 1px solid #ddd;">Email:</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${from_email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border: 1px solid #ddd;">Message:</td>
              <td style="padding: 8px; border: 1px solid #ddd; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; font-size: 0.9em; color: #555;">This message was submitted through the ${COMPANY_NAME} contact form.</p>
        </div>
      `;

      await postmarkClient.sendEmail({
        From: process.env.EMAIL_USER!, // Must be a verified Sender Signature
        To: process.env.EMAIL_USER!, // Admin email
        ReplyTo: from_email,
        Subject: `📩 New Contact Message from ${from_name}`,
        HtmlBody: adminEmailBody,
      });
    } catch (emailError) {
      console.error("Failed to send email notifications:", emailError);
      // We still return 200 because the database insertion succeeded
    }

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
