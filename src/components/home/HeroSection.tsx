"use client";

import { useContactUsDialog } from "@/context/useContactUsModal";
import URLS from "@/lib/urls";
import Image from "next/image";
import LinkAsLoadingButton from "../core/LinkAsLoadingButton";
import LoadingButton from "../core/LoadingButton";

const HeroSection = () => {
  const { openContactUsDialog } = useContactUsDialog();

  return (
    <div className="relative py-16 px-6 md:py-32 md:px-20 lg:p-56">
      {/* Decorative Images - Maintain Relative Positioning */}
      <Image
        src="/hero-section/star.png"
        alt="Star"
        width={80}
        height={80}
        className="absolute left-[10%] top-[10%] sm:left-[34.5%] sm:top-[20%]"
      />

      <Image
        src="/hero-section/zigzags.png"
        alt="Zigzag lines"
        width={80}
        height={80}
        className="absolute left-[5%] bottom-[20%] sm:left-[29%] sm:bottom-[38%]"
      />

      <Image
        src="/hero-section/diagonals.png"
        alt="Diagonal lines"
        width={120}
        height={120}
        className="absolute right-[10%] top-[15%] sm:right-[27%] sm:top-[23%] -z-10"
      />

      {/* Hero Content */}
      <div className="space-y-10 sm:space-y-16">
        <div className="text-center">
          <p className="text-sm sm:text-lg">
            We transform your vision into a digital masterpiece
          </p>
          <p className="text-3xl sm:text-4xl md:text-6xl font-semibold">
            Growth through Smart Solutions
          </p>
        </div>

        {/* Buttons - Stack on Mobile, Align on Larger Screens */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <LinkAsLoadingButton
            href={URLS.portfolio}
            variant="outline"
            className="px-6 py-2 border-primary text-primary hover:bg-primary hover:text-white transition duration-300"
          >
            View our work
          </LinkAsLoadingButton>
          <LoadingButton className="px-6 py-2" onClick={openContactUsDialog}>
            Get in Touch
          </LoadingButton>
        </div>
      </div>

      <ServicesPurpleStrip />
    </div>
  );
};

export default HeroSection;

const ServicesPurpleStrip = () => {
  return <div className="mt-10 h-2 bg-purple-600 w-full"></div>;
};
