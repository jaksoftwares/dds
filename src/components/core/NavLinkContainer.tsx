"use client";

import { navLinks } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinkContainer = () => {
  const pathname = usePathname();

  return (
    <li className="flex gap-x-24">
      {navLinks.map(({ label, href }) => {
        const isActive = pathname === href;

        return (
          <Link
            href={href}
            key={href}
            className={`relative py-2 text-sm font-medium transition-colors ${
              isActive ? "text-primary" : "text-gray-700 hover:text-primary"
            }`}
          >
            {label}
            {isActive && (
              <span className="absolute left-0 bottom-0 h-0.5 w-full bg-primary" />
            )}
          </Link>
        );
      })}
    </li>
  );
};

export default NavLinkContainer;
