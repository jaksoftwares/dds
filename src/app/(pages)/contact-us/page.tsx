import React from "react";
import GetInTouch from "@/components/home/ContactUs";

const ContactPage = () => {
  return (
    <main className="">
      {/* Hero Section */}
      <section className="w-full py-24 px-6 text-center relative">
  {/* Background Image with Overlay */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/contact/contact.jpg')" }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-60" />
  </div>

  {/* Foreground Content */}
  <div className="relative z-10 max-w-4xl mx-auto space-y-6 text-white">
    <h1 className="text-4xl md:text-5xl font-bold">
      Contact Us
    </h1>
    <p className="text-lg">
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
