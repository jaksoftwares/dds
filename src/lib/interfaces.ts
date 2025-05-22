import { LucideIcon, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { IconType } from "react-icons/lib";

export interface I_NavLink {
  label: string;
  href: string;
}

export interface I_ItemWithImage {
  imgUrl: string;
  label: string;
  description: string;
}
export interface I_Blog {
  title: string;
  href: string;
  imageUrl: string;
}

export interface I_Testimonial extends I_ItemWithImage {
  rating: number;
}

export interface I_SocialLink {
  icon:
    | ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >
    | IconType;
  href: string;
}

export interface I_Project {
  link: string;
  imageUrl: string;
  slug: string;
  title: string;
  overview: string;
  challenge: string;
  solution: string;
  testimonial: {
    words: string;
    founder: {
      name: string;
      position: string;
      company: string;
    };
  };
}

export interface I_OurService {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface I_WorkingHour {
  day: string;
  time: string;
}
