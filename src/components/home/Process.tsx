import { processes } from "@/lib/constants";
import { I_ItemWithImage } from "@/lib/interfaces";
import URLS from "@/lib/urls";
import Image from "next/image";
import React from "react";
import SectionHeader from "../core/SectionHeader";

const Process = () => {
  return (
    <div className="relative mx-4 lg:mx-80 flex flex-col items-center">
      {/* Section header */}
      <SectionHeader
        title="Our Working Process"
        label="PROCESS"
        href={URLS.process}
      />

      {/* Process timeline container */}
      <div className="relative w-full mt-12">
        {/* Horizontal line (desktop) */}
        <div className="absolute top-[50px] left-0 right-0 h-[2px] bg-[repeating-linear-gradient(to_right,black_0px,black_6px,transparent_6px,transparent_10px)] hidden lg:block w-4/5 mx-auto" />

        {/* Vertical line (mobile) */}
        <div className="absolute top-[50px] bottom-[50px] left-[50px] w-[2px] bg-[repeating-linear-gradient(to_bottom,black_0px,black_6px,transparent_6px,transparent_10px)] lg:hidden" />

        {/* Process items */}
        <ul className="grid grid-cols-1 lg:grid-cols-4 gap-y-12 lg:gap-x-4">
          {processes.map((process) => (
            <ProcessItem key={process.imgUrl} process={process} />
          ))}
        </ul>
      </div>
    </div>
  );
};

const ProcessItem: React.FC<{ process: I_ItemWithImage }> = ({ process }) => {
  return (
    <li className="relative flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0">
      {/* Circle with icon */}
      <div className="relative z-10 flex-shrink-0 w-[100px] h-[100px] rounded-full bg-white flex items-center justify-center">
        <Image
          src={process.imgUrl}
          alt={process.label}
          width={100}
          height={100}
        />
      </div>

      {/* Content */}
      <div className="flex-1 lg:mt-6 lg:text-center max-w-[300px] lg:max-w-none">
        <h3 className="text-lg font-bold">{process.label}</h3>
        <p className="mt-2 text-sm lg:text-base">{process.description}</p>
      </div>
    </li>
  );
};

export default Process;
