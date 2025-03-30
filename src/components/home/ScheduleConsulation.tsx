"use client";

import { useContactUsDialog } from "@/context/useContactUsModal";
import Image from "next/image";
import { PiStarFourFill } from "react-icons/pi";
import { LoadingButton } from "..";

const ScheduleConsulation = () => {
  const { openContactUsDialog } = useContactUsDialog();

  return (
    <div className="bg-custom-gradient text-white py-8">
      {/* Mobile layout */}
      <div className="lg:hidden px-4 md:px-8 flex flex-col items-center">
        <div className="space-y-4 text-center">
          <h3 className="text-3xl md:text-4xl">
            Ready to bring your ideas to life?
          </h3>
          <p className="text-base md:text-lg">
            Let&apos;s see how custom solutions can help you reach your business
            goals
          </p>

          <LoadingButton
            onClick={openContactUsDialog}
            className="flex items-center justify-center gap-2 group mx-auto"
          >
            <PiStarFourFill className="text-xl md:text-2xl transition-transform duration-500 group-hover:animate-spin inline-flex" />
            <span className="text-base md:text-lg">
              Schedule a free consultation
            </span>
          </LoadingButton>
        </div>
        <div className="mt-8">
          <Image
            src={"/schedule-consultation/market-launch.png"}
            alt={"Market launch"}
            width={400}
            height={400}
            className="w-full max-w-xs md:max-w-sm"
          />
        </div>
      </div>

      {/* Desktop layout - exact same as the original */}
      <div className="hidden lg:flex items-center justify-between mx-80">
        <div className="space-y-4">
          <h3 className="text-5xl">Ready to bring your ideas to life?</h3>
          <p className="text-lg w-2/3">
            Let&apos;s see how custom solutions can help you reach your business
            goals
          </p>

          <LoadingButton
            onClick={openContactUsDialog}
            className="flex items-center justify-center gap-2 group"
          >
            <PiStarFourFill className="text-xl md:text-2xl transition-transform duration-500 group-hover:animate-spin inline-flex" />
            <span className="text-base md:text-lg">
              Schedule a free consultation
            </span>
          </LoadingButton>
        </div>
        <Image
          src={"/schedule-consultation/market-launch.png"}
          alt={"Market launch"}
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default ScheduleConsulation;
