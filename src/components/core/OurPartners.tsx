"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const partners = [
  { name: "JKUAT", logo: "/partners/jkuat.jpg", url: "https://www.jkuat.ac.ke" },
  { name: "Kellian", logo: "/partners/kellian.jpg", url: "https://www.kellianenterprise.com" },
  { name: "KBL", logo: "/partners/kids-beyond-limit.jpg", url: "https://www.kidsbeyondlimit.com" },
  { name: "Social Robotics", logo: "/partners/jkuat-social-roboticss.jpg", url: "https://www.jkuatsocialroboticslab.com" },
  { name: "livingspot", logo: "/partners/livingspot.jpg", url: "https://www.livingspot.vercel.app" },
  { name: "Tripatite", logo: "/partners/tripatite.jpg", url: "https://www.tripatiteinteriors.vercel.app" },
];

const Partners = () => {
  return (
    <div className="w-full bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto text-center space-y-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Our Trusted Partners
          </h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            We collaborate with industry-leading organizations to deliver quality and innovation.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-center">
          {partners.map(({ name, logo, url }, index) => (
            <motion.a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-lg transition transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Image
                src={logo}
                alt={name}
                width={160}
                height={100}
                className="object-contain h-20 w-auto grayscale hover:grayscale-0 transition duration-300"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
