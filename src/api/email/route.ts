import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const {
      fullName,
      phoneNumber,
      email,
      notes = "No additional notes provided.",
      contactPreference,
    } = body;

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
      from: `"Booking Service" <info@kidsbeyondlimit.com>`,
      to: process.env.EMAIL_USER,
      subject: `New DDS email from ${fullName}`,
      text: `
                You have received a email from the DDS Website!

                Full Name: ${fullName}
                Phone Number: ${phoneNumber}
                Email: ${email}
                Contact Preference: ${contactPreference}
                Notes: ${notes}
            `,
      html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #333; font-size: 24px; margin-bottom: 16px;">New Booking Request</h2>
                <p style="margin: 8px 0;"><strong style="color: #555;">Full Name:</strong> ${fullName}</p>
                <p style="margin: 8px 0;"><strong style="color: #555;">Phone Number:</strong> ${phoneNumber}</p>
                <p style="margin: 8px 0;"><strong style="color: #555;">Email:</strong> ${email}</p>
                <p style="margin: 8px 0;"><strong style="color: #555;">Contact Preference:</strong> ${contactPreference}</p>
                <p style="margin: 8px 0;"><strong style="color: #555;">Notes:</strong> ${notes}</p>
            </div>
            `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to send email:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid form data", errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Failed to send email" },
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
