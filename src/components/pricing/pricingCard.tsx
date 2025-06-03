import React from "react";
import { IServiceWithPackages } from "@/lib/interfaces";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { FaCheck } from "react-icons/fa";

interface Props {
  service: IServiceWithPackages;
}

const ServicePricingCard: React.FC<Props> = ({ service }) => {
  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-indigo-800">{service.label}</h2>
        <p className="text-gray-600 mt-2 max-w-3xl mx-auto">{service.description}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {service.packages.map((pkg) => (
          <Card
            key={pkg.name}
            className={`p-6 rounded-xl shadow-md border transition hover:shadow-xl ${
              pkg.mostPopular ? "border-indigo-600 bg-indigo-50" : ""
            }`}
          >
            {pkg.mostPopular && (
              <Badge className="bg-indigo-600 text-white mb-2">
                Most Popular
              </Badge>
            )}
            <h3 className="text-xl font-bold mb-2 text-gray-800">{pkg.name}</h3>
            <p className="text-2xl font-semibold text-indigo-700 mb-4">{pkg.price}</p>
            <ul className="space-y-2">
              {pkg.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <FaCheck className="text-green-500 mr-2" /> {feature}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ServicePricingCard;
