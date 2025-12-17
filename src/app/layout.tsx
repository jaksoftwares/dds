import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { FaWhatsapp } from "react-icons/fa";

import { Footer, Header } from "@/components";
import ContactUsDialog from "@/components/home/ContactUsDialog";
import { ContactUsDialogProvider } from "@/context/useContactUsModal";
import LayoutVisibilityController from "@/components/core/LayoutVisibilityController";
import MainPaddingController from "@/components/core/MainPaddingController";
import "./globals.css";

// Load local fonts
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

// Metadata
export const metadata: Metadata = {
  title: "Dovepeak Digital Solutions",
  description:
    "DovePeak Digital is a tech-forward digital agency delivering innovative web, software, and automation solutions. Empowering businesses to grow with smart, scalable, and modern digital strategies.",
  icons: {
    icon: "/favicon.ico",
  },
};

// Layout component
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

          {/* Public site chrome: hidden on /admin via LayoutVisibilityController */}
          <LayoutVisibilityController>
            <Header />
          </LayoutVisibilityController>

          {/* Always render page content; padding is controlled per-route */}
          <MainPaddingController>{children}</MainPaddingController>

          <LayoutVisibilityController>
            <Footer />

            {/* WhatsApp Floating Button */}
            <a
              href="https://wa.me/254115749711"
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg transition-all"
              aria-label="Chat with us on WhatsApp"
            >
              <FaWhatsapp className="text-2xl" />
            </a>

            {/* Tawk.to Live Chat Script */}
            <Script id="tawk-to" strategy="afterInteractive">
              {`
                var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                (function(){
                  var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                  s1.async=true;
                  s1.src='https://embed.tawk.to/68443893706334190d7999f3/1it57q0ei';
                  s1.charset='UTF-8';
                  s1.setAttribute('crossorigin','*');
                  s0.parentNode.insertBefore(s1,s0);
                })();
              `}
            </Script>
          </LayoutVisibilityController>
        </ContactUsDialogProvider>
      </body>
    </html>
  );
}



// <!--Start of Tawk.to Script-->
// <script type="text/javascript">
// var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
// (function(){
// var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
// s1.async=true;