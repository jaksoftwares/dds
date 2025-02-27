import React from "react";
import { ArrowBigLeft } from "lucide-react";
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

const SectionTitleLinkAsLoadingButton: React.FC<SectionTitleLinkAsLoadingButtonProps> = ({
  label,
  href,
}) => {
  return (
    <LinkAsLoadingButton href={href}>
      <div>{label}</div>
      <ArrowBigLeft />
    </LinkAsLoadingButton>
  );
};
