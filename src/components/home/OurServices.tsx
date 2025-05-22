import { ourServices } from "@/lib/constants";
import { I_OurService as ServiceCardProps } from "@/lib/interfaces";
import URLS from "@/lib/urls";
import SectionHeader from "../core/SectionHeader";
import { Card, CardDescription, CardHeader } from "../ui/card";

const OurServices = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 px-4 md:px-8 lg:mx-80 gap-4 lg:gap-8">
      <SectionHeader
        title="Our Services"
        href={URLS.services}
        label="SERVICES"
      />
      {ourServices.map((s) => (
        <ServiceCard {...s} key={s.title} />
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
    <Card className="px-4 hover:shadow-lg duration-300 cursor-pointer">
      <CardHeader className="font-bold flex-row items-center px-0">
        <Icon />
        <h1 className="text-lg lg:text-2xl">{title}</h1>
      </CardHeader>
      <CardDescription className="text-black lg:text-lg">
        {description}
      </CardDescription>
    </Card>
  );
};

export default OurServices;
