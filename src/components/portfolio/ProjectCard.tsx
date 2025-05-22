import { I_Project as ProjectCardProps } from '@/lib/interfaces';
import React from 'react';
import SitePreviewIframe from '../core/SitePreviewIframe';
import { Card, CardContent, CardTitle } from '../ui/card';

const ProjectCard: React.FC<ProjectCardProps> = ({
  challenge,
  link,
  imageUrl,
  overview,
  solution,
  testimonial,
  title,
}) => {
  return (
    <Card className="shadow-lg rounded-lg p-4">
      {/* Project Image */}
      <SitePreviewIframe siteUrl={link} imageUrl={imageUrl} iframeHeight="h-[500px]" />

      {/* Project Content */}
      <CardContent>
        <CardTitle className="text-4xl font-semibold">{title}</CardTitle>

        {/* Project Overview */}
        <div className="mt-4">
          <h4 className="text-xl text-primary">Project Overview</h4>
          <p className="text-gray-700 text-sm">{overview}</p>
        </div>

        {/* Challenge */}
        {challenge && (
          <div className="mt-4">
            <h4 className="text-xl text-primary">Challenge</h4>
            <p className="text-gray-700 text-sm">{challenge}</p>
          </div>
        )}

        {/* Solution */}
        {solution && (
          <div className="mt-4">
            <h4 className="text-xl text-primary">Solution</h4>
            <p className="text-gray-700 text-sm">{solution}</p>
          </div>
        )}

        {/* Testimonial */}
        {testimonial && (
          <blockquote className="mt-6 border-l-4 border-x-[#758BFB] bg-customBlueLight pl-4 italic text-gray-600">
            &apos;{testimonial.words}&apos;{/* Founder Info */}
            {testimonial?.founder && (
              <p className="mt-2 text-xl text-primary">
                <span className="text-gray-900">
                  {testimonial.founder.name}
                </span>{" "}
                <br />
                <span className="text-gray-500">
                  {testimonial.founder.position}, {testimonial.founder.company}
                </span>
              </p>
            )}
          </blockquote>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
