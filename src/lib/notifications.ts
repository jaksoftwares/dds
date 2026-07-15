import * as postmark from "postmark";
import { createClient } from "./supabase/server";

const postmarkClient = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN as string);

interface NotificationPayload {
  userId: string;
  title: string;
  message: string;
  link?: string;
  email?: {
    to: string;
    subject: string;
    body: string;
  };
}

export async function sendNotification({ userId, title, message, link, email }: NotificationPayload) {
  const supabase = await createClient();

  // 1. In-App Notification (Supabase)
  const { error: dbError } = await supabase.from("notifications").insert({
    user_id: userId,
    title,
    message,
    link,
    is_read: false,
  });

  if (dbError) {
    console.error("Error creating in-app notification:", dbError);
  }

  // 2. Email Notification (Postmark)
  if (email) {
    try {
      await postmarkClient.sendEmail({
        From: process.env.ADMIN_EMAIL as string,
        To: email.to,
        Subject: email.subject,
        TextBody: email.body,
        HtmlBody: `
          <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #F1F2F6; border-radius: 8px; color: #010028; border-top: 5px solid #FF5004;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #27187D; margin: 0; font-size: 24px;">Dovepeak Digital Solutions</h1>
            </div>
            <div style="background-color: #ffffff; padding: 25px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
              <h2 style="color: #27187D; margin-top: 0;">${email.subject}</h2>
              <p style="white-space: pre-wrap; line-height: 1.6; color: #333;">${email.body}</p>
              ${link ? `<div style="text-align: center; margin-top: 30px;"><a href="${link}" style="display: inline-block; padding: 12px 25px; background-color: #FF5004; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; text-transform: uppercase; font-size: 14px;">View Details</a></div>` : ""}
            </div>
            <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
              <p>&copy; ${new Date().getFullYear()} Dovepeak Digital Solutions. All rights reserved.</p>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Error sending email via Postmark:", emailError);
    }
  }
}
