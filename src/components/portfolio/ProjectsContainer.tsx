"use client";

import React, { useState } from "react";
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
import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "../ui/button";
import Image from "next/image";

const PROJECTS_PER_PAGE = 6;

const ProjectsContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);

  // Get projects for current page
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const endIndex = startIndex + PROJECTS_PER_PAGE;
  const currentProjects = projects.slice(startIndex, endIndex);

  // Handlers for pagination buttons
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {currentProjects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4">
        <Button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2"
        >
          Previous
        </Button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <Button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2"
        >
          Next
        </Button>
      </div>
    </>
  );
};

/** Minimal Project Card for Listing Page */
const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  overview,
  slug,
  imageUrl,
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
