import React from "react";
import SectionHeader from "../core/SectionHeader";
import URLS from "@/lib/urls";
import { I_ItemWithImage } from "@/lib/interfaces";
import Image from "next/image";
import { processes } from "@/lib/constants";

const Process = () => {
  return (
    <div className="relative mx-4 lg:mx-80 flex items-center flex-col">
      {/* Section header with title and link */}
      <SectionHeader
        title="Our Working Process"
        label="PROCESS"
        href={URLS.process}
      />

      {/* Dashed horizontal line for large screens (hidden on small screens) */}
      <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 w-[80%] h-0.5 bg-[repeating-linear-gradient(to_right,_black_0px,_black_30px,_transparent_30px,_transparent_50px)] -z-10 lg:block hidden" />

      {/* Dashed vertical line for small screens */}
      <div className="lg:hidden absolute top-[20%] bottom-[10%] left-[13%] md:left-[28%] w-0.5 bg-[repeating-linear-gradient(to_bottom,_black_0px,_black_30px,_transparent_30px,_transparent_50px)] -z-10" />

      {/* Process steps */}
      <ul className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8">
        {processes.map((p, index) => (
          <ProcessItem key={p.imgUrl} process={p} index={index} />
        ))}
      </ul>
    </div>
  );
};

interface ProcessItemProps {
  process: I_ItemWithImage;
  index: number;
}

const ProcessItem: React.FC<ProcessItemProps> = ({ process }) => {
  return (
    <li className="flex flex-row lg:flex-col items-center md:items-center text-left lg:text-center gap-4 lg:gap-0 relative">
      {/* Process step icon */}
      <div className="relative z-10 flex-shrink-0">
        <Image
          src={process.imgUrl}
          alt={`Image for ${process.label}`}
          width={100}
          height={100}
        />
      </div>

      {/* Process step text */}
      <div className="max-w-xs">
        <h3 className="font-semibold">{process.label}</h3>
        <p>{process.description}</p>
      </div>
    </li>
  );
};

export default Process;
