import React from "react";
import SectionHeader from "../core/SectionHeader";
import URLS from "@/lib/urls";
import SitePreviewIframe from "../core/SitePreviewIframe";
import { projectLinks } from "@/lib/constants";
import Image from "next/image";

const Portfolio = () => {
  return (
    <div className="space-y-12 relative">
      <Image
        src={"/portfolio/flower.png"}
        alt={"A flower-ish"}
        width={200}
        height={200}
        className="absolute right-[11%] top-[2%]"
      />

      <div className="mx-80">
        <SectionHeader
          title="Our Recent Work"
          description="Check out a collection of our most recent works"
          href={URLS.portfolio}
          label="PORTFOLIO"
        />

        <div className="grid grid-cols-2 gap-8">
          {projectLinks.map((p) => (
            <SitePreviewIframe siteUrl={p} />
          ))}
        </div>
      </div>

      <Image
        src={"/portfolio/diced-dots.png"}
        alt={"Decoration"}
        width={200}
        height={200}
        className="absolute left-[10%] bottom-0 -z-10"
      />
    </div>
  );
};

export default Portfolio;
