import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// Updated Schema to Match Form Fields
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  reason: z.enum(["general", "quote", "consultation"]),
  budget: z.string().optional(),
  date: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { name, email, reason, budget, date, message } =
      contactSchema.parse(body);

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `"Dove Peak Digital Website" ${process.env.NEXT_PUBLIC_SITE_URL}`,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Reason for Contact: ${reason}
        ${reason === "quote" ? `Estimated Budget: ${budget}` : ""}
        ${reason === "consultation" ? `Preferred Date: ${date}` : ""}
        Message: ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #333; font-size: 24px; margin-bottom: 16px;">New Contact Form Submission</h2>
          <p style="margin: 8px 0;"><strong style="color: #555;">Name:</strong> ${name}</p>
          <p style="margin: 8px 0;"><strong style="color: #555;">Email:</strong> ${email}</p>
          <p style="margin: 8px 0;"><strong style="color: #555;">Reason for Contact:</strong> ${reason}</p>
          ${
            reason === "quote"
              ? `<p style="margin: 8px 0;"><strong style="color: #555;">Estimated Budget:</strong> ${budget}</p>`
              : ""
          }
          ${
            reason === "consultation"
              ? `<p style="margin: 8px 0;"><strong style="color: #555;">Preferred Date:</strong> ${date}</p>`
              : ""
          }
          <p style="margin: 8px 0;"><strong style="color: #555;">Message:</strong> ${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to send contact email:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Please confirm the information in the form and try again.",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message:
          "An error occurred while sending your message. Please try again.",
      },
      { status: 500 }
    );
  }
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
