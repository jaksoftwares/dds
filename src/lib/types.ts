import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";

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
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  href: string;
}
