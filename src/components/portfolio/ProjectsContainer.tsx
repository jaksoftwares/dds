"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { projects } from "@/lib/constants";
import { I_Project as ProjectCardProps } from "@/lib/interfaces";
import URLS from "@/lib/urls";
import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "../ui/button";
import Image from "next/image";

const ProjectsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </div>
  );
};

/** Minimal Project Card for Listing Page */
const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  overview,
  slug,
  link,
  imageUrl
}) => {
  return (
    <Card className="shadow-lg rounded-lg p-4">
      {/* Project Thumbnail Image */}
      <div className="w-full h-[250px] relative rounded-md overflow-hidden mb-4">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>

      {/* Project Content */}
      <CardContent className="w-full overflow-hidden">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription>{overview}</CardDescription>

        {/* View Details Button */}
        <Button className="my-4 w-full">
          <Link
            href={URLS.projectSlug(slug)}
            className="text-center font-medium flex gap-x-2 items-center"
          >
            <span>View Details</span>
            <FaArrowRightLong />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectsContainer;
