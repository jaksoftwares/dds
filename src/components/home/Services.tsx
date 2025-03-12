import { services } from "@/lib/constants";
import { I_ItemWithImage } from "@/lib/interfaces";
import URLS from "@/lib/urls";
import Image from "next/image";
import React from "react";
import SectionHeader from "../core/SectionHeader";

const Services = () => {
  return (
    <div className="mx-80 space-y-12">
      <SectionHeader
        title="What's in it for you?"
        href={URLS.services}
        label="SERVICES"
      />

      <div className="grid grid-cols-2 gap-8">
        {services.map((s) => (
          <ServiceCard service={s} key={s.imgUrl} />
        ))}
      </div>
    </div>
  );
};

interface ServiceCardProps {
  service: I_ItemWithImage;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="flex flex-col items-center border-2 border-black border-dashed py-24">
      <Image
        src={service.imgUrl}
        alt={`Image for ${service.label}`}
        width={100}
        height={100}
      />
      <h3 className="text-2xl font-semibold">{service.label}</h3>
      <p className="w-1/2 text-center">{service.description}</p>
    </div>
  );
};

export default Services;
