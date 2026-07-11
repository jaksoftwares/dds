import React from "react";
import Link from "next/link";
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
      <div className="hidden md:flex flex-col justify-between w-full md:w-1/2 lg:w-5/12 bg-customBlueExtraDark text-white p-12">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium hover:text-customBlueBase transition-colors mb-12">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to website
          </Link>
          <div className="w-16 h-16 bg-white text-customBlueExtraDark rounded-xl flex items-center justify-center mb-8 shadow-lg">
            <span className="font-bold text-2xl tracking-tighter">DDS</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Empowering your digital growth.
          </h1>
          <p className="text-customBlueBase text-lg max-w-md leading-relaxed">
            {SITE_CONFIG.name} provides tech-forward web, software, and automation solutions. Access your client portal to track projects, request services, and manage your business all in one place.
          </p>
        </div>
        <div className="text-sm text-customBlueBase/60">
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
