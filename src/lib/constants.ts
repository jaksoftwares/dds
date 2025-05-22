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
  I_WorkingHour,
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
    label: "Douglas Akhonya – Kellian Autogarage",
    description:
      "DDS built a professional online presence for our auto business, making it easier for customers to find and engage with us. Their expertise in digital solutions is unmatched!",
    rating: 5,
    imgUrl: "/testimonials/testimonial-1.png",
  },
  {
    label: "Victor Siero – Kids Beyond Limit",
    description:
      "The website and digital tools DDS developed have helped us reach more children and donors. Their commitment to quality and functionality is truly commendable.",
    rating: 5,
    imgUrl: "/testimonials/testimonial-1.png",
  },
  {
    label: "Dr. Eunice Njeri – JKUAT Social Robotics",
    description:
      "Our research and projects needed an intuitive digital platform, and DDS delivered exactly that. Their tech solutions have streamlined our processes and improved visibility.",
    rating: 5,
    imgUrl: "/testimonials/testimonial-1.png",
  },
  {
    label: "Apostle Arthur Likhakasi – Jesus Come Revival Ministries",
    description:
      "Our ministry needed a strong online presence to connect with people globally. DDS designed a beautiful and engaging website that has been a great blessing to us.",
    rating: 5,
    imgUrl: "/testimonials/testimonial-1.png",
  },
  {
    label: "Linda K., Digital Marketing Specialist",
    description:
      "The website DDS built for us is modern, fast, and highly optimized for SEO. We've seen a huge increase in organic traffic and conversions.",
    rating: 5,
    imgUrl: "/testimonials/testimonial-1.png",
  },
  {
    label: "Kevin B., Small Business Owner",
    description:
      "DDS provided end-to-end support for our cloud migration. Their professionalism and expertise made the process smooth and stress-free.",
    rating: 5,
    imgUrl: "/testimonials/testimonial-1.png",
  },
];

export const services: I_ItemWithImage[] = [
  {
    imgUrl: "/services/service-1.png",
    label: "Custom Website Development",
    description: `Professional Websites Built for Impact.
 From corporate sites to e-commerce stores, we design and develop high-performing, user-friendly websites tailored to your brand.`,
  },
  {
    imgUrl: "/services/service-1.png",
    label: "Digital Platform Development",
    description: `Powerful Online Platforms for Business Growth.
 We build robust platforms like e-commerce systems, LMS, CRM, and marketplaces to drive business efficiency and engagement.
`,
  },
  {
    imgUrl: "/services/service-1.png",
    label: "Software Development",
    description: `Custom Software for Business Optimization.
 Developing enterprise-grade software for workflow automation, inventory management, POS, and financial tools to streamline operations.`,
  },
  {
    imgUrl: "/services/service-1.png",
    label: "Mobile App Development",
    description: `Seamless & Scalable Mobile Solutions.
 We create intuitive Android, iOS, and hybrid applications for businesses, services, and on-demand platforms.`,
  },
  {
    imgUrl: "/services/service-1.png",
    label: "SaaS (Software as a Service) Solutions",
    description: `Cloud-Based Software for Scalability.
 We develop subscription-based, cloud-hosted software solutions to enhance productivity and streamline business operations.`,
  },
  {
    imgUrl: "/services/service-1.png",
    label: "Cloud Solutions & Hosting",
    description: `Secure & Scalable Cloud Infrastructure.
 Providing reliable cloud hosting, storage, backup, and disaster recovery services for businesses of all sizes.
`,
  },
  {
    imgUrl: "/services/service-1.png",
    label: "IT Infrastructure & Support",
    description: `Reliable IT Services for Business Stability.
 From network setup to server maintenance, we ensure your IT systems run smoothly and securely..
`,
  },
  {
    imgUrl: "/services/service-1.png",
    label: "UI/UX Design & Branding",
    description: `Crafting Engaging User Experiences.
 We design visually appealing and user-friendly interfaces while building strong, memorable brand identities.
`,
  },
  {
    imgUrl: "/services/service-1.png",
    label: "Digital Marketing & SEO",
    description: `Boosting Online Visibility & Engagement.
 With expert SEO, social media management, and paid advertising, we help businesses grow their digital presence.
`,
  },
  {
    imgUrl: "/services/service-1.png",
    label: "AI & Data Solutions",
    description: `Intelligent AI & Data-Driven Strategies.
 We develop AI-powered smart systems, data analytics tools, and machine learning solutions to enhance decision-making.
`,
  },
  {
    imgUrl: "/services/service-1.png",
    label: "Software for Local & Global Challenges",
    description: `Tech Solutions for Impact.
 We create custom software addressing community challenges, improving accessibility to services, education, and resources.
`,
  },
  {
    imgUrl: "/services/service-1.png",
    label: "Training & Consultancy",
    description: `Empowering Businesses & Individuals.
 Offering expert-led training in web development, SaaS, digital transformation, and strategic business growth.

`,
  },
];

export const projects: I_Project[] = [
  {
    title: "DDS Consulting",
    slug: "dds-consulting",
    link: "https://dds-consulting.vercel.app/",
    imageUrl: "/portfolio/dds-consulting.png",
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
    imageUrl: "/portfolio/living-spot.png",
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
    imageUrl: "/portfolio/study-room.png",  
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
    imageUrl: "/portfolio/auto-store.png", 
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
    link: "https://www.kidsbeyondlimit.com/",
    imageUrl: "/portfolio/kids-beyond-limit.png", 
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
    link: "https://kellianautogarage.vercel.app",
    imageUrl: "/portfolio/kellian-autogarage.png",  
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
  "Expertise & Innovation. A skilled team leveraging the latest technology trends.",
  "Tailored Solutions. Custom-built digital products designed to fit your business needs.",
  "Reliability & Scalability. Secure, high-performance systems that grow with your business.",
  "Client-Centered Approach. Dedicated support and collaboration to ensure success.",
  "End-to-End Services. From strategy to execution, we handle every aspect of your digital journey.",
];

export const projectLinks = projects.map((p) => p.link);

export const processes: I_ItemWithImage[] = [
  {
    imgUrl: "/processes/light-bulb.png",
    label: "Discovery and planning",
    description:
      "We begin by understanding your business needs, target audience, and project objectives. Through research and strategy sessions, we define the roadmap for a successful solution.",
  },
  {
    imgUrl: "/processes/web-design.png",
    label: "Design and Prototyping",
    description:
      "Our UI/UX designers create intuitive and visually appealing designs. Prototypes are developed to provide a clear vision of the final product, ensuring user-friendliness and functionality.",
  },
  {
    imgUrl: "/processes/web-programming.png",
    label: "Developing and Testing",
    description:
      "Our development team brings the design to life with clean, efficient, and scalable code. We conduct rigorous testing to ensure performance, security, and reliability.",
  },
  {
    imgUrl: "/processes/rocket-launch.png",
    label: "Launch and Support",
    description:
      "After final reviews and optimizations, we deploy the solution. Our support team remains available to ensure smooth operation, maintenance, and future enhancements.",
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

export const workingHours: I_WorkingHour[] = [
  {
    day: "Mon to Fri",
    time: "8:00 AM - 5:00 PM",
  },
  {
    day: "Saturday",
    time: "9:00 AM - 5:00 PM",
  },
  {
    day: "Sun",
    time: "Closed",
  },
];
