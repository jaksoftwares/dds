import { MoveRight } from "lucide-react";
import React from "react";
import LinkAsLoadingButton from "./LinkAsLoadingButton";

interface SectionHeaderProps extends SectionTitleLinkAsLoadingButtonProps {
  title: string;
  description?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  href,
  label,
}) => {
  return (
    <div>
      <SectionTitleLinkAsLoadingButton href={href} label={label} />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default SectionHeader;

interface SectionTitleLinkAsLoadingButtonProps {
  label: string;
  href: string;
}

const SectionTitleLinkAsLoadingButton: React.FC<
  SectionTitleLinkAsLoadingButtonProps
> = ({ label, href }) => {
  return (
    <LinkAsLoadingButton href={href} className="px-8 rounded-4xl">
      <div>{label}</div>
      <MoveRight />
    </LinkAsLoadingButton>
  );
};
