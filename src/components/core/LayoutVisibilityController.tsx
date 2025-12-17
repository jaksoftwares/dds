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

  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return null;
  }

  return <>{children}</>;
};

export default LayoutVisibilityController;
