import {
  AboutUs,
  Explore,
  HeroSection,
  Portfolio,
  Process,
  ScheduleConsulation,
  Services,
  Testimonials,
} from "@/components";
import OurServices from "@/components/home/OurServices";

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <div className="space-y-32">
        <Services />
        <AboutUs />
        <OurServices />
        <Portfolio />
        <Process />
        <Testimonials />
        <ScheduleConsulation />
      </div>
      <Explore />
    </main>
  );
};

export default HomePage;
