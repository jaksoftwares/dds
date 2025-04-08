import {
  AboutUs,
  HeroSection,
  Portfolio,
  Process,
  ScheduleConsulation,
  Testimonials
} from "@/components";
import ContactUs from "@/components/home/ContactUs";
import OurServices from "@/components/home/OurServices";

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <div className="space-y-32">
        <AboutUs />
        <OurServices />
        <Portfolio />
        <Process />
        <Testimonials />
        <ScheduleConsulation />
      </div>
      {/* <Explore /> */}
      <ContactUs />
    </main>
  );
};

export default HomePage;
