import ProjectCard from "@/components/portfolio/ProjectCard";
import { projects } from "@/lib/constants";
import { notFound } from "next/navigation";

interface ProjectSlugPageProps {
  params: { projectSlug: string };
}

const ProjectSlugPage: React.FC<ProjectSlugPageProps> = ({ params }) => {
  const { projectSlug } = params;

  const project = projects.find((p) => p.slug === projectSlug);

  if (!project) {
    notFound();
  }

  return <ProjectCard {...project} />;
};

export default ProjectSlugPage;
