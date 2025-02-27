import React from "react";
import SectionTitleLinkAsLoadingButton from "../core/SectionHeader";
import URLS from "@/lib/urls";
import { I_ItemWithImage } from "@/lib/types";
import Image from "next/image";
import { services } from "@/lib/constants";
import SectionHeader from "../core/SectionHeader";

const Services = () => {
  return (
    <div className="mx-64">
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
    <div className="flex flex-col items-center border-2 border-dashed">
      <Image
        src={service.imgUrl}
        alt={`Image for ${service.label}`}
        width={100}
        height={100}
      />
      <h3>{service.label}</h3>
      <p>{service.description}</p>
    </div>
  );
};

export default Services;
