"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "../ui/button";
import URLS from "@/lib/urls";
import { I_Project as ProjectCardProps } from "@/lib/interfaces";

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  overview,
  slug,
  imageUrl,
  testimonial,
}) => {
  return (
    <Card
      className="
        shadow-lg rounded-lg p-6
        bg-white
        transform transition-transform duration-300
        hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03]
        cursor-pointer
        flex flex-col
        "
    >
      {/* Project Image */}
      <div className="w-full h-[250px] relative rounded-lg overflow-hidden mb-5 drop-shadow-md">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg transition-transform duration-500 ease-in-out hover:scale-105"
          priority={true}
        />
      </div>

      {/* Project Content */}
      <CardContent className="p-0 flex flex-col flex-grow">
        <CardTitle className="text-2xl font-bold mb-3 text-gray-900">
          {title}
        </CardTitle>

        <CardDescription className="text-gray-700 mb-4 leading-relaxed line-clamp-4">
          {overview}
        </CardDescription>

        {/* Optional Testimonial */}
        {testimonial && testimonial.words && (
          <blockquote className="border-l-4 border-indigo-500 bg-indigo-50 pl-4 italic text-indigo-700 mb-4 transition-colors duration-300 hover:bg-indigo-100">
            &quot;{testimonial.words}&quot;
            {testimonial.founder && (
              <footer className="mt-2 text-indigo-900 font-semibold">
                — {testimonial.founder.name}, {testimonial.founder.position}
              </footer>
            )}
          </blockquote>
        )}

        {/* View Details Button */}
        <Button
          className="
            w-full mt-auto
            bg-indigo-600 hover:bg-indigo-700
            text-white font-semibold
            shadow-md
            transition-shadow duration-300
            hover:shadow-lg
            flex justify-center items-center gap-2
            "
        >
          <Link href={URLS.projectSlug(slug)} className="flex items-center gap-2">
            <span>View Details</span> <FaArrowRightLong />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
