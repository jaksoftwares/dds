import { navLinks, socialLinks } from "@/lib/constants";
import Link from "next/link";
import React from "react";
import LinkAsLoadingButton from "./LinkAsLoadingButton";
import URLS from "@/lib/urls";
import { Mail, MessageCircleQuestion } from "lucide-react";
import { Input } from "../ui/input";
import LoadingButton from "./LoadingButton";

const Footer = () => {
  return (
    <footer className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-8 md:py-16 lg:py-24 xl:py-32 bg-customBlueExtraDark text-white flex flex-col md:flex-row flex-wrap gap-8 md:justify-between">
      <div className="w-full md:w-1/2 lg:w-2/5 space-y-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
          DovePeak Digital Solutions
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Integer nec odio. Praesent libero Mr Johnny Doe
        </p>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Got a Question?</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
          <LinkAsLoadingButton
            href={URLS.contactUs}
            className="text-lg md:text-xl lg:text-2xl px-4 md:px-6 lg:px-8"
          >
            <MessageCircleQuestion />
            <span>Contact us</span>
          </LinkAsLoadingButton>
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
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
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
