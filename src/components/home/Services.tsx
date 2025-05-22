// components/Services.tsx
import { services } from "@/lib/constants";
import { I_ItemWithImage } from "@/lib/interfaces";
import Image from "next/image";
import React from "react";

const Services = () => {
  return (
    <section
      className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16"
      id="services"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((s, i) => (
          <ServiceCard service={s} key={i} />
        ))}
      </div>
    </section>
  );
};

interface ServiceCardProps {
  service: I_ItemWithImage;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center p-8 space-y-4">
      <div className="bg-customBlueLight p-4 rounded-full">
        <Image
          src={service.imgUrl}
          alt={service.label}
          width={64}
          height={64}
          className="object-contain"
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-customBlue transition duration-200">
        {service.label}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {service.description}
      </p>
    </div>
  );
};

export default Services;
