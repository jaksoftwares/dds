import React from "react";
import SectionHeader from "../core/SectionHeader";
import URLS from "@/lib/urls";
import SitePreviewIframe from "../core/SitePreviewIframe";
import { projectLinks } from "@/lib/constants";
import Image from "next/image";

const Portfolio = () => {
  const featuredProjects = projectLinks.slice(0, 4);

  return (
    <div className="relative w-full px-4 sm:px-6">
      <Image
        src="/portfolio/diced-dots.png"
        alt="Decoration"
        width={200}
        height={200}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 sm:left-[10%] sm:translate-x-0 -z-50"
      />

      <div className="w-full max-w-screen-xl mx-auto space-y-8 lg:space-y-12">
        <SectionHeader
          title="Our Recent Work"
          description="Check out a collection of our most recent works"
          href={URLS.portfolio}
          label="PORTFOLIO"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map(({ siteUrl, imageUrl }) => (
            <SitePreviewIframe siteUrl={siteUrl} imageUrl={imageUrl} key={siteUrl} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
