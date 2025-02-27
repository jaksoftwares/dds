import React from "react";
import SiteLogo from "./SiteLogo";
import NavLinkContainer from "./NavLinkContainer";
import LoadingButton from "./LoadingButton";

const Header = () => {
  return (
    <header>
      <nav>
        <ul className="flex justify-between items-center">
          <li className="flex gap-x-2">
            <SiteLogo className="grayscale" />
            <div>
              <h1 className="text-xl font-bold">DOVEPEAK</h1>
              <h1>Digital Solutions</h1>
            </div>
          </li>
          <NavLinkContainer />
          <LoadingButton>Get a quote</LoadingButton>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
