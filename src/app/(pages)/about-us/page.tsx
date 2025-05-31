"use client";

import { Handshake, Lightbulb, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Process from "@/components/home/Process";

const teamMembers = [
  {
    name: "Joseph Kirika",
    role: "Founder & CEO",
    bio: "Visionary leader driving innovation and strategic growth at Dove Peak Digital.",
    image: "/about/Joseph-Kirika.jpg",
  },
  {
    name: "John Otieno",
    role: "Lead Developer",
    bio: "Expert full-stack developer specializing in scalable and robust web solutions.",
    image: "/about/lead-developer.jpg",
  },
  {
    name: "Grace Njeri",
    role: "UI/UX Designer",
    bio: "Crafting seamless user experiences and stunning interfaces for all our projects.",
    image: "/about/designer.jpg",
  },
  {
    name: "Samuel Kimani",
    role: "Digital Marketing Specialist",
    bio: "Driving brand awareness and digital campaigns that deliver measurable results.",
    image: "/about/marketing-dds.jpg",
  },
];

const AboutUsPage = () => {
  return (
    <div className="space-y-20">
     {/* Hero Section */}
    <section
      className="relative bg-cover bg-center text-white py-32 px-4"
      style={{ backgroundImage: "url('/about/about-2.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold">
          About Dove Peak Digital
        </h1>
        <p className="text-lg sm:text-xl text-gray-200 max-w-xl mx-auto text-justify">
          Empowering businesses with smart, scalable, and modern digital solutions that drive real growth.
        </p>
      </div>
    </section>

      {/* Who We Are */}
<section className="px-6 lg:px-24 flex flex-col-reverse lg:flex-row items-center gap-10 py-20 bg-white">
  <div className="lg:w-1/2 space-y-6">
    <h2 className="text-3xl font-bold text-customBlueDark">Who We Are</h2>
    <p className="text-gray-600 text-lg">
      Dove Peak Digital Solutions is a tech-driven digital agency located Off-Thika Road, Juja, Nairobi, Kenya. We specialize in delivering smart, scalable digital solutions including web development, software systems, and process automation.
    </p>
    <p className="text-gray-600 text-lg">
      We serve a broad client base and are well-equipped to handle both physical and remote engagements, ensuring flexibility and accessibility for businesses across different regions.
    </p>
    <p className="text-gray-600 text-lg">
      Our team of experienced professionals is dedicated to understanding your unique business needs and delivering tailored solutions that enhance efficiency, drive growth, and foster innovation.
      Our mission is to support business growth through innovative and efficient digital solutions in today’s evolving tech landscape.
    </p>
  </div>
  <div className="lg:w-1/2">
    <Image
      src="/about/team.jpg"
      alt="DDS team collaboration"
      width={600}
      height={400}
      className="rounded-2xl shadow-xl object-cover w-full h-auto"
    />
  </div>
</section>


      {/* What Drives Us */}
      <section className="bg-gray-100 py-20 px-6 lg:px-24">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h2 className="text-3xl font-bold text-customBlueDark">What Drives Us</h2>

          <div className="grid md:grid-cols-3 gap-10 text-center">
            {/* Innovation */}
            <div className="space-y-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center">
              <div className="text-customBlueDark mb-2">
                <Lightbulb className="w-10 h-10 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold">Innovation</h3>
              <p className="text-gray-600 text-justify">
                We embrace creativity and technology to build futuristic solutions that solve today’s business challenges.
              </p>
            </div>

            {/* Excellence */}
            <div className="space-y-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center">
              <div className="text-customBlueDark mb-2">
                <Star className="w-10 h-10 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold">Excellence</h3>
              <p className="text-gray-600 text-justify">
                We are obsessed with quality, ensuring everything we create is polished, purposeful, and results-driven.
              </p>
            </div>

            {/* Partnership */}
            <div className="space-y-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center">
              <div className="text-customBlueDark mb-2">
                <Handshake className="w-10 h-10 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold">Partnership</h3>
              <p className="text-gray-600 text-justify">
                We believe in long-term collaborations, growing alongside our clients as trusted digital partners.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Our Process */}
      <Process />

      {/* Testimonials */}

      {/* <section className="px-6 lg:px-24 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-customBlueDark">Our Process</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From idea to deployment, we keep your business goals at the center of everything.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            ["Discover", "Understanding your vision, users, and challenges."],
            ["Design", "Crafting intuitive interfaces and user experiences."],
            ["Develop", "Engineering robust, scalable digital solutions."],
            ["Deploy", "Launching with precision and continuous support."],
          ].map(([title, desc]) => (
            <div key={title} className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-customBlueDark text-white flex items-center justify-center mx-auto text-lg font-semibold">
                {title[0]}
              </div>
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Our Team */}
      <section className="px-6 lg:px-24">
        <div className="max-w-6xl mx-auto space-y-12 text-center">
          <h2 className="text-3xl font-bold text-customBlueDark">Meet Our Team</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            A passionate group of innovators, creators, and problem solvers committed to delivering excellence.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
            {teamMembers.map(({ name, role, bio, image }) => (
              <div
                key={name}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-customBlueDark mb-4">
                  <Image src={image} alt={`${name} photo`} fill style={{ objectFit: "cover" }} />
                </div>
                <h3 className="text-xl font-semibold text-customBlueDark">{name}</h3>
                <p className="text-sm italic text-gray-500 mb-3">{role}</p>
                <p className="text-gray-600 text-sm">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="relative bg-cover bg-center text-white py-20 px-6"
        style={{ backgroundImage: "url('/contact/it-contact.jpg')" }}
      >
        <div className="bg-black/60 absolute inset-0"></div>
        <div className="relative max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Let’s Build the Future Together</h2>
          <p className="text-lg text-gray-200">
            Partner with DDS to bring your vision to life with precision, creativity, and tech excellence.
          </p>
          <Link
            href="/#contact-us"
            className="inline-block bg-white text-customBlueDark font-medium px-6 py-3 rounded-full hover:bg-gray-100 transition"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
