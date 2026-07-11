import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Left side - Branded panel (Hidden on small screens) */}
      <div className="hidden md:flex flex-col justify-between w-full md:w-1/2 lg:w-5/12 bg-customOrange text-white p-12">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium hover:text-orange-200 transition-colors mb-12">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to website
          </Link>
          <Image 
            src="/core/logo-base-grayscale.png" 
            alt="DovePeak Logo" 
            width={120} 
            height={60} 
            className="mb-8"
          />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Empowering your digital growth.
          </h1>
          <p className="text-orange-100 text-lg max-w-md leading-relaxed">
            {SITE_CONFIG.name} provides tech-forward web, software, and automation solutions. Access your client portal to track projects, request services, and manage your business all in one place.
          </p>
        </div>
        <div className="text-sm text-orange-200">
          © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
        </div>
      </div>

      {/* Right side - Form container */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 relative overflow-y-auto">
        {/* Mobile back link */}
        <div className="md:hidden w-full max-w-md mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to website
          </Link>
        </div>
        <div className="w-full max-w-md w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
