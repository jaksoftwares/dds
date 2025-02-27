"use client";
import React from "react";
import SectionHeader from "../core/SectionHeader";
import URLS from "@/lib/urls";
import { I_Testimonial } from "@/lib/types";
import Image from "next/image";
import { testimonials } from "@/lib/constants";
import EmblaCarousel from "../core/EmblaCarousel";

const Testimonials = () => {
  // Sample testimonial data

  return (
    <div className="py-12 px-4">
      <SectionHeader
        href={URLS.testimonials}
        label="TESTIMONIALS"
        title="What our clients say about us"
      />
      <div className="flex justify-center mt-8">
        <EmblaCarousel
          items={testimonials}
          CardComponent={TestimonialItemCard}
        />
      </div>
    </div>
  );
};

interface TestimonialItemProps extends I_Testimonial {}

const TestimonialItemCard: React.FC<TestimonialItemProps> = ({
  description,
  imgUrl,
  label,
  rating,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 max-w-md text-center">
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 relative rounded-full overflow-hidden bg-gray-800">
          <Image src={imgUrl} alt={label} fill style={{ objectFit: "cover" }} />
        </div>
      </div>
      <div className="flex justify-center mb-4">{renderStars(rating)}</div>
      <p className="text-gray-700 mb-4">{description}</p>
      <h3 className="font-bold uppercase">{label}</h3>
    </div>
  );
};

const renderStars = (rating: number) => {
  return Array(rating)
    .fill(0)
    .map((_, index) => (
      <svg
        key={index}
        className="w-6 h-6 text-orange-500 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ));
};

export default Testimonials;
