import PlaceHolderServiceSVG from "@/../public/services/placeholder-service.svg";
import { ourServices } from "@/lib/constants";
import { I_OurService as ServiceCardProps } from "@/lib/interfaces";
import Image from "next/image";
import { Card, CardDescription, CardHeader } from "../ui/card";

const ServicesContainer = () => {
  return (
    <div className="flex flex-col gap-y-4 px-12">
      {ourServices.map((s) => (
        <ServiceCard key={s.title} {...s} />
      ))}
    </div>
  );
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  icon: Icon,
  description,
}) => {
  return (
    <Card className="rounded-none flex flex-col md:flex-row max-w-6xl mx-auto p-0 gap-0">
      <div className="w-full md:w-1/3 aspect-[4/3] md:aspect-auto">
        <Image
          src={PlaceHolderServiceSVG}
          alt="Custom Icon"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-2/3 bg-gray-200 p-8 md:p-16 space-y-4">
        <CardHeader className="font-bold flex-row items-center px-0">
          <Icon className="w-6 h-6 text-gray-700" />
          <h1 className="text-lg lg:text-2xl">{title}</h1>
          </CardHeader>
          <CardDescription className="text-black lg:text-lg">
          {description}
        </CardDescription>
      </div>
    </Card>
  );
};

export default ServicesContainer;
