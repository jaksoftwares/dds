import React from "react";
import GetInTouch from "@/components/home/ContactUs";

const ContactPage = () => {
  return (
    <main className="">
      {/* Hero Section */}
      <section className="w-full bg-muted py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground">
            Reach out to us for any inquiries, support, or feedback. We&apos;re here to help.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <GetInTouch />
    </main>
  );
};

export default ContactPage;

export const metadata = {
  title: "Contact Us | Reach out for Support",
  description: "Get in touch with us for any inquiries or support.",
  keywords: ["contact", "support", "inquiries", "get in touch"],
  openGraph: {
    title: "Contact Us | Reach out for Support",
    description: "Reach out to us for any inquiries or support you need.",
    url: "https://dovepeakdigital.vercel.app/contact-us",
    type: "website",
    images: [
      {
        url: "https://dovepeakdigital.vercel.app/images/contact-us.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Us",
      },
    ],
  },
};

export const dynamic = "force-dynamic";
