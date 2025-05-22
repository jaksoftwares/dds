import { Services } from "@/components";
import Image from "next/image";
import { BadgeCheck, BrainCircuit, Sparkles, Users } from "lucide-react";
import Link from "next/link";

const ServicesPage = () => {
  return (
    <div className="space-y-24">
      {/* Hero Header with Background Image */}
      <div className="relative text-white text-center py-32 px-4 overflow-hidden">
        <Image
          src="/hero-section/services-background.jpg" // Replace with your actual image path
          alt="DDS Services Background"
          fill
          className="object-cover object-center z-0"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

        <div className="relative z-20 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Services</h1>
          <p className="max-w-xl mx-auto text-lg text-gray-200">
            Smart, scalable, and innovative digital solutions tailored for business success.
          </p>
        </div>
      </div>
      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-6 space-y-16">
        <div>
          <h2 className="text-3xl font-bold text-center mb-4">What We Offer</h2>
          <p className="text-center max-w-2xl mx-auto text-gray-600">
            From strategy to execution, we offer a full suite of services to help you grow online with confidence.
          </p>
        </div>
        <Services />
      </section>

      {/* Our Process */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <h2 className="text-3xl font-bold">Our Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {[
              {
                step: "Discovery",
                desc: "We understand your goals, pain points, and target market.",
                icon: <BrainCircuit className="text-purple-600" size={32} />,
              },
              {
                step: "Strategy",
                desc: "We craft a custom digital strategy aligned with your vision.",
                icon: <Sparkles className="text-purple-600" size={32} />,
              },
              {
                step: "Execution",
                desc: "Our expert team builds and implements your solution.",
                icon: <BadgeCheck className="text-purple-600" size={32} />,
              },
              {
                step: "Support",
                desc: "We provide long-term maintenance, insights, and improvements.",
                icon: <Users className="text-purple-600" size={32} />,
              },
            ].map(({ step, desc, icon }) => (
              <div key={step} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition space-y-4">
                <div>{icon}</div>
                <h4 className="text-xl font-semibold">{step}</h4>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose DDS */}
      <section className="max-w-6xl mx-auto px-6 space-y-10 text-center">
        <h2 className="text-3xl font-bold">Why Choose DDS?</h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          We don’t just deliver digital products – we build digital success stories.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left mt-10">
          {[
            {
              title: "Expert Team",
              desc: "Our experienced team delivers quality with every line of code.",
              icon: <Users size={32} className="text-customBlue" />,
            },
            {
              title: "Creative Approach",
              desc: "We merge creativity and functionality for stunning results.",
              icon: <Sparkles size={32} className="text-purple-600" />,
            },
            {
              title: "Tailored Solutions",
              desc: "Every business is unique – so are our solutions.",
              icon: <BrainCircuit size={32} className="text-green-600" />,
            },
            {
              title: "Reliable Support",
              desc: "We’re your long-term partners, not just developers.",
              icon: <BadgeCheck size={32} className="text-yellow-600" />,
            },
          ].map(({ title, desc, icon }) => (
            <div
              key={title}
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition space-y-4"
            >
              <div>{icon}</div>
              <h4 className="text-lg font-semibold">{title}</h4>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

        {/* Final CTA */}
    <section className="relative text-white py-24 px-6 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/contact/it-contact.jpg" // Replace with your desired image
        alt="Background for call to action"
        fill
        priority
        className="object-cover object-center z-0"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-10" />

      {/* CTA Content */}
      <div className="relative z-20 max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold">
          Let’s Build Something Great
        </h2>
        <p className="text-lg sm:text-xl text-gray-300">
          Ready to elevate your business with cutting-edge digital solutions? Let DDS make it happen.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-customBlueDark font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition duration-300"
        >
          Contact Us Today
        </Link>
      </div>
    </section>

    </div>
  );
};

export default ServicesPage;
