"use client";

import { navLinks } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinksContainer = () => {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map(({ label, href }) => {
        const isActive = pathname === href;
        return (
          <li key={href} className="list-none">
            <Link
              href={href}
              className={`block py-2 text-sm font-medium transition-colors ${
                isActive ? "text-primary" : "text-gray-700 hover:text-primary"
              }`}
            >
              {label}
              {isActive && (
                <span className="block h-0.5 w-full bg-primary mt-1" />
              )}
            </Link>
          </li>
        );
      })}
    </>
  );
};
export default NavLinksContainer;
