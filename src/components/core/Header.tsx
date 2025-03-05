import React from "react";
import SiteLogo from "./SiteLogo";
import NavLinkContainer from "./NavLinkContainer";
import LoadingButton from "./LoadingButton";

const Header = () => {
  return (
    <header className="px-16">
      <nav>
        <ul className="flex justify-between items-center">
          <li className="flex gap-x-2">
            <SiteLogo className="grayscale" width={250} height={250} />
          </li>
          <NavLinkContainer />
          <LoadingButton>Get a quote</LoadingButton>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
