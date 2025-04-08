import { Services } from "@/components";

const ServicesPage = () => {
  return (
    <div className="space-y-8 lg:space-y-16">
      <div className="bg-customBlueDark text-white text-center py-32">
        <h1 className="text-5xl">Our Services</h1>
        <p>
          Smart, scalable, and innovative digital solutions tailored for
          business success.
        </p>
      </div>
      <Services />
    </div>
  );
};

export default ServicesPage;
