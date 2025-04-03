"use client";

import { useContactUsDialog } from "@/context/useContactUsModal";
import { navLinks, socialLinks } from "@/lib/constants";
import { Mail, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";
import { Input } from "../ui/input";
import LoadingButton from "./LoadingButton";

const Footer = () => {
  const { openContactUsDialog } = useContactUsDialog();

  return (
    <footer className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-8 md:py-16 lg:py-24 xl:py-32 bg-customBlueExtraDark text-white flex flex-col md:flex-row flex-wrap gap-8 md:justify-between">
      <div className="w-full md:w-1/2 lg:w-2/5 space-y-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
          DovePeak Digital Solutions
        </h2>
        <p>
          Dovepeak Digital Solutions – Delivering innovative, reliable, and
          scalable digital solutions to drive business success in a rapidly
          evolving world. From custom software to AI-powered systems, we empower
          businesses with technology that works.
        </p>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Got a Question?</h2>
          <p>Reach out to us today!</p>
          <LoadingButton
            className="text-lg md:text-xl lg:text-2xl px-4 md:px-6 lg:px-8 flex items-center gap-x-4"
            onClick={openContactUsDialog}
          >
            <MessageCircleQuestion className="inline-flex" />
            <span>Contact us</span>
          </LoadingButton>
        </div>
      </div>

      <div className="w-full md:w-auto">
        <h2 className="text-xl font-semibold mb-2 md:mb-4">Quick Links</h2>
        <ul className="space-y-2">
          {navLinks.map((n) => (
            <li key={n.href}>
              <Link href={n.href}>{n.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full md:w-auto lg:w-1/4 space-y-8 md:space-y-12">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Sign up for our Newsletter</h2>
          <p>Sign up to stay up to date with DDS</p>
          <div className="flex gap-x-2">
            <Input placeholder="Email" className="bg-white" />
            <LoadingButton className="bg-white text-xl">
              <Mail color="black" size={10} />
            </LoadingButton>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Follow us</h2>
          <ul className="flex gap-x-4">
            {socialLinks.map((s, index) => {
              const Icon = s.icon;
              return (
                <li key={index}>
                  <Link href={s.href}>
                    <Icon />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
