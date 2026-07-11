"use client";

import React from "react";
import { usePathname } from "next/navigation";

interface LayoutVisibilityControllerProps {
  children: React.ReactNode;
}

const LayoutVisibilityController: React.FC<LayoutVisibilityControllerProps> = ({
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
    return null;
  }

  return <>{children}</>;
};

export default LayoutVisibilityController;
