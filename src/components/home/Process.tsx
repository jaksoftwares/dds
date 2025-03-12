import React from "react";
import SectionHeader from "../core/SectionHeader";
import URLS from "@/lib/urls";
import { I_ItemWithImage } from "@/lib/interfaces";
import Image from "next/image";
import { processes } from "@/lib/constants";

const Process = () => {
  return (
    <div className="relative mx-80 flex items-center  flex-col">
      <SectionHeader
        title="Our Working Process"
        label="PROCESS"
        href={URLS.process}
      />
      <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 w-[80%] h-0.5 bg-[repeating-linear-gradient(to_right,_black_0px,_black_30px,_transparent_30px,_transparent_50px)] -z-10" />
      <ul className="flex justify-between">
        {processes.map((p) => (
          <ProcessItem key={p.imgUrl} process={p} />
        ))}
      </ul>
    </div>
  );
};

interface ProcessItempProps {
  process: I_ItemWithImage;
}

const ProcessItem: React.FC<ProcessItempProps> = ({ process }) => {
  return (
    <li className="flex items-center justify-center flex-col text-center">
      <Image
        src={process.imgUrl}
        alt={`Image for ${process.label}`}
        width={100}
        height={100}
      />
      <h3 className="font-semibold">{process.label}</h3>
      <p>{process.description}</p>
    </li>
  );
};

export default Process;
