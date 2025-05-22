import React from "react";
import SectionHeader from "../core/SectionHeader";
import URLS from "@/lib/urls";
import SitePreviewIframe from "../core/SitePreviewIframe";
import { projectLinks } from "@/lib/constants";
import Image from "next/image";

const Portfolio = () => {
  return (
    <div className="relative w-full px-6 lg:px-0">
      {/* Decorative Image - Stays in position for large screens, adjusts for small */}
      <Image
        src="/portfolio/diced-dots.png"
        alt="Decoration"
        width={200}
        height={200}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 sm:left-[10%] sm:translate-x-0 -z-50"
      />

      <div className="w-full max-w-screen-xl mx-auto space-y-8 lg:space-y-12 lg:mx-80">
        {/* Section Header */}
        <SectionHeader
          title="Our Recent Work"
          description="Check out a collection of our most recent works"
          href={URLS.portfolio}
          label="PORTFOLIO"
        />

        {/* Responsive Grid - Large screens stay same, smaller screens stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectLinks.map(({ siteUrl, imageUrl }) => (
             <SitePreviewIframe siteUrl={siteUrl} imageUrl={imageUrl} key={siteUrl} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
