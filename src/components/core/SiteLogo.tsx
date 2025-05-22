import { SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface SiteLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const SiteLogo: React.FC<SiteLogoProps> = ({ className, width, height }) => {
  return (
    <Image
      src={SITE_CONFIG.logoUrls.base}
      alt={`${SITE_CONFIG.name}'s Logo`}
      width={width}
      height={height}
      className={cn(className, "w-auto h-auto py-2 ")}
    />
  );
};

export default SiteLogo;
