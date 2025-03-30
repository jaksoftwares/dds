import ServicesContainer from "@/components/services/ServicesContainer";

const ServicesPage = () => {
  return (
    <div className="my-8 lg:my-16">
      <div className="bg-customBlueDark text-white text-center">
        <h1 className="text-5xl">Our Services</h1>
        <p>
          Smart, scalable, and innovative digital solutions tailored for
          business success.
        </p>
      </div>
      <ServicesContainer />
    </div>
  );
};

export default ServicesPage;
