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

  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <div className="min-h-screen">{children}</div>;
  }

  return <main className="pt-32 lg:pt-36">{children}</main>;
};

export default MainPaddingController;
