import {
  Facebook,
  Linkedin,
  Mail,
  MessageCircleCode,
  Paintbrush,
  Percent,
  SquareCode,
  TvMinimal,
} from "lucide-react";
import { PiTiktokLogo } from "react-icons/pi";
import {
  I_Blog,
  I_ItemWithImage,
  I_NavLink,
  I_OurService,
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
  { label: "Contact us", href: URLS.contactUs },
  // { label: "Blogs", href: URLS.blogs },
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
    title: "DDS Consulting",
    slug: "dds-consulting",
    link: "https://dds-consulting.vercel.app/",
    overview:
      "A professional consulting website showcasing services, expertise, and client success stories. Designed to establish credibility and attract potential clients in the consulting industry.",
    challenge:
      "Creating a sophisticated yet approachable digital presence that effectively communicates complex consulting services to diverse audiences.",
    solution:
      "Developed a clean, professional design with clear service breakdowns, case studies, and an intuitive contact system to facilitate client engagement.",
    testimonial: {
      words:
        "The website perfectly captures our professional ethos while making our services accessible to potential clients. It's been instrumental in our digital growth.",
      founder: {
        name: "Jane Smith",
        position: "Managing Partner",
        company: "DDS Consulting",
      },
    },
  },
  {
    title: "Living Spot",
    slug: "living-spot",
    link: "https://livingspot.vercel.app/",
    overview:
      "A modern real estate platform connecting homeowners with potential buyers and renters, featuring property listings with high-quality visuals and detailed information.",
    challenge:
      "Building an engaging platform that makes property searching intuitive while handling high-resolution images efficiently.",
    solution:
      "Implemented a responsive design with optimized image loading, advanced filtering options, and a user-friendly interface for seamless property browsing.",
    testimonial: {
      words:
        "Our conversion rates improved significantly after launching this platform. The clean design and fast performance keep users engaged.",
      founder: {
        name: "Michael Johnson",
        position: "CEO",
        company: "Living Spot",
      },
    },
  },
  {
    title: "Study Room",
    slug: "study-room",
    link: "https://studyroom-sepia.vercel.app/",
    overview:
      "An educational platform offering virtual study spaces, resource sharing, and collaborative tools for students and educators.",
    challenge:
      "Creating a digital environment that fosters focus and collaboration among remote learners.",
    solution:
      "Developed virtual study rooms with real-time collaboration features, resource libraries, and productivity tracking to enhance the online learning experience.",
    testimonial: {
      words:
        "This platform has transformed how our students interact and study together online. The features are perfectly tailored to academic needs.",
      founder: {
        name: "Sarah Williams",
        position: "Director",
        company: "Study Room",
      },
    },
  },
  {
    title: "AutoStore",
    slug: "autostore",
    link: "https://autostore-q6v3.vercel.app/",
    overview:
      "An e-commerce platform specializing in automotive parts and accessories, featuring comprehensive product catalogs and seamless purchasing.",
    challenge:
      "Managing a complex inventory system while maintaining fast performance and an intuitive shopping experience.",
    solution:
      "Built a robust e-commerce solution with advanced search, detailed product specifications, and integrated payment processing tailored for automotive enthusiasts.",
    testimonial: {
      words:
        "Our sales have doubled since launching this platform. The intuitive design makes it easy for customers to find exactly what they need.",
      founder: {
        name: "David Brown",
        position: "Founder",
        company: "AutoStore",
      },
    },
  },
  {
    title: "Kids Beyond Limit",
    slug: "kids-beyond-limit",
    link: "https://kids-beyond-limit.vercel.app/",
    overview:
      "An educational initiative focused on providing exceptional learning opportunities for children with special needs.",
    challenge:
      "Creating an inclusive digital platform that communicates effectively with both parents and educators while being accessible to all users.",
    solution:
      "Developed a warm, welcoming interface with clear information architecture, accessibility features, and resources for different learning needs.",
    testimonial: {
      words:
        "This website has helped us reach so many families who need our services. It represents our mission perfectly while being easy to navigate.",
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
      "A premium automotive service center website showcasing repair services, maintenance packages, and customer testimonials.",
    challenge:
      "Building trust online for a service-based business where customers need confidence in technical expertise.",
    solution:
      "Created a professional site highlighting certifications, service details, and customer success stories to establish credibility and transparency.",
    testimonial: {
      words:
        "Our appointment bookings increased by 40% after launching this website. Customers appreciate being able to see our work before visiting.",
      founder: {
        name: "Robert Kellian",
        position: "Owner",
        company: "Kellian Autogarage",
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

export const ourServices: I_OurService[] = [
  {
    title: "Custom Website Development",
    description:
      "From corporate sites to e-commerce stores, we design and develop high-performing, user-friendly websites tailored to your brand.",
    icon: SquareCode,
  },
  {
    title: "Digital Platform Development",
    description:
      "Powerful Online Platforms for Business GrowthWe build robust platforms like e-commerce systems, LMS, CRM, and marketplaces to drive business efficiency and engagement.",
    icon: TvMinimal,
  },
  {
    title: "UI/UX Design & Branding",
    description:
      "From corporate sites to e-commerce stores, we design and develop high-performing, user-friendly websites tailored to your brand.",
    icon: Paintbrush,
  },
  {
    title: "Digital Marketing & SEO",
    description:
      "From corporate sites to e-commerce stores, we design and develop high-performing, user-friendly websites tailored to your brand.",
    icon: Percent,
  },
  {
    title: "Training & Consultancy",
    description:
      "From corporate sites to e-commerce stores, we design and develop high-performing, user-friendly websites tailored to your brand.",
    icon: MessageCircleCode,
  },
];
