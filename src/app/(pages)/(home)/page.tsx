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
    <>
      <HeroSection />
      <Services />
      <AboutUs />
      <Portfolio />
      <Process />
      <Testimonials />
      <ScheduleConsulation />
      <Explore />
    </>
  );
};

export default HomePage;
