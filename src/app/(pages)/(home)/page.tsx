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
import React from "react";

const HomePage = () => {
  return (
    <main className="space-y-4">
      <HeroSection />

      <div className="space-y-32">
        <Services />
        <AboutUs />
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
