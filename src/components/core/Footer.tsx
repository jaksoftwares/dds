import { navLinks, socialLinks } from "@/lib/constants";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <div>
        <h2>DovePeak Digital Solutions</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
          odio. Praesent libero. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Integer nec odio. Praesent libero Mr Johnny Doe
        </p>
      </div>

      <div>
        <h2>Got a Question?</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
      </div>

      <div>
        <h2>Quick Links</h2>

        <ul>
          {navLinks.map((n) => (
            <li key={n.href}>
              <Link href={n.href}>{n.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div>
          <h2>Sign up for our Newsletter</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
        </div>

        <div>
          <h2>Follow us</h2>

          <ul>
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
