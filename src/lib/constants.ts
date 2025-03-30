import { Facebook, Linkedin, Mail } from "lucide-react";
import { PiTiktokLogo } from "react-icons/pi";
import {
  I_Blog,
  I_ItemWithImage,
  I_NavLink,
  I_Project,
  I_SocialLink,
  I_Testimonial,
} from "./interfaces";
import URLS from "./urls";

export const navLinks: I_NavLink[] = [
  { label: "Home", href: URLS.home },
  { label: "About us", href: URLS.aboutUs },
  { label: "Services", href: URLS.services },
  { label: "Portfolio", href: URLS.portfolio },
  // { label: "Pricing", href: URLS.pricing },
  // { label: "Contact us", href: URLS.contactUs },
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

export const projects: I_Project[] = [
  {
    title: "Kids Beyond Limit",
    slug: "kids-beyond-limit",
    link: "https://kids-beyond-limit.vercel.app/",
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.",
    challenge:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Lorem ipsum dolor sit amet.",
    solution:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
    testimonial: {
      words:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.",
      founder: {
        name: "John Doe",
        position: "Founder",
        company: "Kids Beyond Limit",
      },
    },
  },
  {
    title: "Kids Beyond Limit",
    slug: "kids-beyond-limit",
    link: "https://kids-beyond-limit.vercel.app/",
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.",
    challenge:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Lorem ipsum dolor sit amet.",
    solution:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
    testimonial: {
      words:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.",
      founder: {
        name: "John Doe",
        position: "Founder",
        company: "Kids Beyond Limit",
      },
    },
  },
  {
    title: "Kellian Autogarage",
    slug: "kellian-autogarage",
    link: "https://kellian-autogarage.vercel.app",
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.",
    challenge:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Lorem ipsum dolor sit amet.",
    solution:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
    testimonial: {
      words:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.",
      founder: {
        name: "John Doe",
        position: "Founder",
        company: "Kids Beyond Limit",
      },
    },
  },
  {
    title: "Kellian Autogarage",
    slug: "kellian-autogarage",
    link: "https://kellian-autogarage.vercel.app",
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.",
    challenge:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Lorem ipsum dolor sit amet.",
    solution:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
    testimonial: {
      words:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.",
      founder: {
        name: "John Doe",
        position: "Founder",
        company: "Kids Beyond Limit",
      },
    },
  },
];

export const whyChooseUs = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero",
];

export const projectLinks = projects.map((p) => p.link);

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
    href: "/blogs/agentic-ai-reshaping-industries",
    imageUrl: "https://source.unsplash.com/600x400/?technology,ai",
    title: "Agentic AI: Reshaping Industries in 2025",
  },
  {
    href: "/blogs/quantum-computing-breakthroughs",
    imageUrl: "https://source.unsplash.com/600x400/?technology,quantum",
    title: "Quantum Computing Breakthroughs: What to Expect",
  },
  {
    href: "/blogs/5g-advanced-transforming-connectivity",
    imageUrl: "https://source.unsplash.com/600x400/?technology,5g",
    title: "5G-Advanced: Transforming Connectivity in 2025",
  },
];

export const socialLinks: I_SocialLink[] = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/profile.php?id=61572925386626",
  },
  {
    icon: PiTiktokLogo,
    href: "https://www.tiktok.com/@dovepeakdigital?lang=en",
  },
  {
    icon: Mail,
    href: "dds@gmail.com",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/dovepeak-digital-solutions/",
  },
];
