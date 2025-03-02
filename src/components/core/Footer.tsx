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
    <footer className="px-64 py-32 bg-blue-950 text-white flex justify-between">
      <div className="w-2/5 space-y-8">
        <h2 className="text-4xl font-semibold">DovePeak Digital Solutions</h2>
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
            className="text-2xl py-8 px-12"
          >
            <MessageCircleQuestion />
            <span>Contact us</span>
          </LinkAsLoadingButton>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Quick Links</h2>

        <ul className="space-y-2">
          {navLinks.map((n) => (
            <li key={n.href}>
              <Link href={n.href}>{n.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-12">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Sign up for our Newsletter</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>

          <div className="flex  gap-x-2">
            <Input placeholder="Email" className="bg-white" />
            <LoadingButton className="bg-white text-xl">
              <Mail color="black" size={10} />
            </LoadingButton>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Follow us</h2>

          <ul className="flex gap-x-4">
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <li>
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
