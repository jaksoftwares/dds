"use client";

import React from "react";
import { usePathname } from "next/navigation";

interface MainPaddingControllerProps {
  children: React.ReactNode;
}

const MainPaddingController: React.FC<MainPaddingControllerProps> = ({
  children,
}) => {
  const pathname = usePathname();

  const isExcludedRoute = 
    pathname.startsWith("/admin") || 
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password");

  if (isExcludedRoute) {
    return <>{children}</>;
  }

  return <main className="pt-32 lg:pt-36">{children}</main>;
};

export default MainPaddingController;
