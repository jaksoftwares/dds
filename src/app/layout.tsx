import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";

import { Footer, Header } from "@/components";
import ContactUsDialog from "@/components/home/ContactUsDialog";
import { ContactUsDialogProvider } from "@/context/useContactUsModal";
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
          <Header />

          {/* Main content with consistent top padding */}
          <main className="pt-32 lg:pt-36">{children}</main>

          <Footer />
        </ContactUsDialogProvider>

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
// s1.src='https://embed.tawk.to/68443893706334190d7999f3/1it57q0ei';
// s1.charset='UTF-8';
// s1.setAttribute('crossorigin','*');
// s0.parentNode.insertBefore(s1,s0);
// })();
// </script>
// <!--End of Tawk.to Script-->