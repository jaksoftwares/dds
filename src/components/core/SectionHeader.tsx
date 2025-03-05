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
    <div className="space-y-2 w-fit">
      <SectionTitleLinkAsLoadingButton href={href} label={label} />
      <h2 className="text-4xl text-customBlueDark font-semibold">{title}</h2>
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
    <LinkAsLoadingButton
      href={href}
      className="px-12 transition duration-300 rounded-4xl bg-customBlueLight text-customBlueDark font-semibold hover:bg-customBlueDark hover:text-customBlueLight rounded-md"
    >
      <div>{label}</div>
      <MoveRight />
    </LinkAsLoadingButton>
  );
};
