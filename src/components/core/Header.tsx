"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useContactUsDialog } from "@/context/useContactUsModal";
import { Menu } from "lucide-react";
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

        {/* CTA Button - Visible only on lg screens and above */}
        <div className="hidden lg:block">
          <LoadingButton onClick={openContactUsDialog}>
            Get a quote
          </LoadingButton>
        </div>

        {/* Mobile Menu Button (ShadCN Sheet Trigger) */}
        <Sheet>
          <SheetTrigger className="lg:hidden p-2">
            <Menu size={24} />
          </SheetTrigger>
          <SheetContent side="right" className="p-6 flex flex-col gap-4">
            <NavLinksContainer />
            <LoadingButton className="w-full" onClick={openContactUsDialog}>
              Get a quote
            </LoadingButton>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Header;
