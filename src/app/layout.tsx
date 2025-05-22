import type { Metadata } from "next";
import localFont from "next/font/local";

import { Footer, Header } from "@/components";
import ContactUsDialog from "@/components/home/ContactUsDialog";
import { ContactUsDialogProvider } from "@/context/useContactUsModal";
import "./globals.css";

const geistSans = localFont({
  src: "./../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dove Peak Digital",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ContactUsDialogProvider>
          <ContactUsDialog />
          <Header />
          <main className="mt-32 md:mt-0">{children}</main>
          <Footer />
        </ContactUsDialogProvider>
      </body>
    </html>
  );
}
