import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import {
  I_NavLink,
  I_ItemWithImage,
  I_Testimonial,
  I_Blog,
  I_SocialLink,
} from "./types";
import URLS from "./urls";

export const navLinks: I_NavLink[] = [
  { label: "Home", href: URLS.home },
  { label: "About us", href: URLS.aboutUs },
  { label: "Services", href: URLS.services },
  { label: "Portfolio", href: URLS.portfolio },
  { label: "Pricing", href: URLS.pricing },
  { label: "Contact us", href: URLS.contactUs },
  { label: "Blogs", href: URLS.blogs },
];

export const testimonials: I_Testimonial[] = [
  {
    label: "MR JOHNNY DOE",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero",
    rating: 5,
    imgUrl: "/testimonials/testimonial-1.png",
  },
  {
    label: "MR JOHNNY DOE",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero",
    rating: 5,
    imgUrl: "/testimonials/testimonial-1.png",
  },
  {
    label: "MR JOHNNY DOE",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero",
    rating: 5,
    imgUrl: "/testimonials/testimonial-1.png",
  },
  {
    label: "MR JOHNNY DOE",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero",
    rating: 5,
    imgUrl: "/testimonials/testimonial-1.png",
  },
  {
    label: "MR JOHNNY DOE",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero",
    rating: 5,
    imgUrl: "/testimonials/testimonial-1.png",
  },
  {
    label: "MR JOHNNY DOE",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero",
    rating: 5,
    imgUrl: "/testimonials/testimonial-1.png",
  },
  {
    label: "MR JOHNNY DOE",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero",
    rating: 5,
    imgUrl: "/testimonials/testimonial-1.png",
  },
  {
    label: "MR JOHNNY DOE",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero",
    rating: 5,
    imgUrl: "/testimonials/testimonial-1.png",
  },
  {
    label: "MR JOHNNY DOE",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero",
    rating: 5,
    imgUrl: "/testimonials/testimonial-1.png",
  },
  {
    label: "MR JOHNNY DOE",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero",
    rating: 5,
    imgUrl: "/testimonials/testimonial-1.png",
  },
];

export const services: I_ItemWithImage[] = [
  {
    imgUrl: "/services/service-1.png",
    label: "Custom Website Development",
    description:
      "Modern, responsive, and SEO-optimized websites tailored to your brand.",
  },
  {
    imgUrl: "/services/service-1.png",
    label: "Custom Website Development",
    description:
      "Modern, responsive, and SEO-optimized websites tailored to your brand.",
  },
  {
    imgUrl: "/services/service-1.png",
    label: "Custom Website Development",
    description:
      "Modern, responsive, and SEO-optimized websites tailored to your brand.",
  },
  {
    imgUrl: "/services/service-1.png",
    label: "Custom Website Development",
    description:
      "Modern, responsive, and SEO-optimized websites tailored to your brand.",
  },
];

export const projects = [];

export const whyChooseUs = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero",
];

export const projectLinks = [
  "https://kellian-autogarage.vercel.app/",
  "https://kellian-autogarage.vercel.app/",
];

export const processes: I_ItemWithImage[] = [
  {
    imgUrl: "/processes/light-bulb.png",
    label: "Discovery & planning",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero",
  },
  {
    imgUrl: "/processes/web-design.png",
    label: "Design and Prototyping",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero",
  },
  {
    imgUrl: "/processes/web-programming.png",
    label: "Developing & Testing",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero",
  },
  {
    imgUrl: "/processes/rocket-launch.png",
    label: "Launch and Support",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero",
  },
];

export const blogs: I_Blog[] = [
  {
    href: URLS.blogs,
    imageUrl: "/blogs/blog-1.png",
    title: "Latest Technology trends you should know about",
  },
  {
    href: URLS.blogs,
    imageUrl: "/blogs/blog-1.png",
    title: "Latest Technology trends you should know about",
  },
  {
    href: URLS.blogs,
    imageUrl: "/blogs/blog-1.png",
    title: "Latest Technology trends you should know about",
  },
];

export const socialLinks: I_SocialLink[] = [
  {
    icon: Facebook,
    href: "",
  },
  {
    icon: Instagram,
    href: "",
  },
  {
    icon: Mail,
    href: "",
  },
  {
    icon: Linkedin,
    href: "",
  },
];
