"use client";

import React from "react";
import { servicesWithPackages } from "@/lib/data/service-packages";
import ServicePricingCard from "@/components/pricing/pricingCard";

const PricingPage = () => {
  return (
    <div className="px-6 md:px-12 lg:px-20 py-10 space-y-14">
      <h1 className="text-4xl font-bold text-center mb-8">
        Dovepeak Service Pricing
      </h1>

      {servicesWithPackages.map((service) => (
        <ServicePricingCard key={service.label} service={service} />
      ))}
    </div>
  );
};

export default PricingPage;
