import { navLinks } from "@/lib/constants";
import Link from "next/link";

const NavLinkContainer = () => {
  return (
    <li className="flex gap-x-8">
      {navLinks.map(({ label, href }) => (
        <Link href={href} key={href}>
          {label}
        </Link>
      ))}
    </li>
  );
};

export default NavLinkContainer;
