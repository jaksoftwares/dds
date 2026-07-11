"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useContactUsDialog } from "@/context/useContactUsModal";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoadingButton from "./LoadingButton";
import NavLinksContainer from "./NavLinksContainer";
import SiteLogo from "./SiteLogo";

const Header = () => {
  const { openContactUsDialog } = useContactUsDialog();

  return (
    <header className="px-6 md:px-16 py-4 bg-white shadow fixed top-0 left-0 w-full z-50">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <SiteLogo className="grayscale" width={150} height={150} />

        {/* Desktop Navigation - Visible only on lg screens and above */}
        <ul className="hidden lg:flex gap-x-12">
          <NavLinksContainer />
        </ul>

        {/* CTA Buttons - Visible only on lg screens and above */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" asChild className="text-slate-600 hover:text-customBlueExtraDark">
            <Link href="/login">Login</Link>
          </Button>
          <LoadingButton onClick={openContactUsDialog}>
            Get a quote
          </LoadingButton>
          <Button asChild className="bg-customOrange text-white hover:bg-orange-600">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button (ShadCN Sheet Trigger) */}
        <Sheet>
          <SheetTrigger className="lg:hidden p-2">
            <Menu size={24} />
          </SheetTrigger>
          <SheetContent side="right" className="p-6 flex flex-col gap-4">
            <NavLinksContainer />
            <div className="flex flex-col gap-3 mt-4">
              <Button variant="outline" asChild className="w-full">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="w-full bg-customOrange text-white hover:bg-orange-600">
                <Link href="/signup">Get Started</Link>
              </Button>
              <LoadingButton className="w-full" onClick={openContactUsDialog}>
                Get a quote
              </LoadingButton>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Header;
