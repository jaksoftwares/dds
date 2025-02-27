import React from "react";
import SectionHeader from "../core/SectionHeader";
import URLS from "@/lib/urls";
import SitePreviewIframe from "../core/SitePreviewIframe";
import { projectLinks } from "@/lib/constants";

const Portfolio = () => {
  return (
    <div className="mx-64">
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
  );
};

export default Portfolio;
