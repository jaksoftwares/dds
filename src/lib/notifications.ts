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
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
            <h2 style="color: #2563EB;">${email.subject}</h2>
            <p style="white-space: pre-wrap;">${email.body}</p>
            ${link ? `<a href="${link}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #2563EB; color: #fff; text-decoration: none; border-radius: 5px;">View Details</a>` : ""}
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Error sending email via Postmark:", emailError);
    }
  }
}
