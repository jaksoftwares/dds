import { SITE_CONFIG } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface SiteLogoProps {
  className?: string;
}

const SiteLogo: React.FC<SiteLogoProps> = ({ className }) => {
  return (
    <Image
      src={SITE_CONFIG.logoUrls.base}
      alt={`${SITE_CONFIG.name}'s Logo`}
      width={80}
      height={80}
      className={cn(className, "w-auto h-auto py-2 ")}
    />
  );
};

export default SiteLogo;
