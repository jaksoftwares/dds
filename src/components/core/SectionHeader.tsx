import React from "react";
import LinkAsLoadingButton from "./LinkAsLoadingButton";
import RightArrow from "./RightArrow";

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
      {description && <p>{description}</p>}
    </div>
  );
};

export default SectionHeader;

interface SectionTitleLinkAsLoadingButtonProps {
  label: string;
  href?: string;
}

const SectionTitleLinkAsLoadingButton: React.FC<
  SectionTitleLinkAsLoadingButtonProps
> = ({ label, href }) => {
  if (!href) {
    return (
      <div className="inline-flex items-center px-4 rounded-full bg-customBlueLight text-customBlueDark font-semibold">
        {label}
      </div>
    );
  }

  return (
    <LinkAsLoadingButton
      href={href}
      className="transition px-4 duration-300 rounded-full bg-customBlueLight text-customBlueDark font-semibold hover:bg-customBlueBase hover:text-customBlueLight"
    >
      <div>{label}</div>
      <RightArrow />
    </LinkAsLoadingButton>
  );
};
