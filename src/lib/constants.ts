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
  { label: "Pricing", href: URLS.pricing },
  { label: "Contact us", href: URLS.contact },
  // { label: "Blogs", href: URLS.blogs },
  { label: "News", href: URLS.news },
];

export const testimonials: I_Testimonial[] = [
  {
    label: "Douglas Akhonya – Kellian Autogarage",
    description:
      "DDS built a professional online presence for our auto business, making it easier for customers to find and engage with us. Their expertise in digital solutions is unmatched!",
    rating: 5,
    imgUrl: "/testimonials/douglas-akhonya.jpg",
  },
  {
    label: "Victor Siero – Kids Beyond Limit",
    description:
      "The website and digital tools DDS developed have helped us reach more children and donors. Their commitment to quality and functionality is truly commendable.",
    rating: 5,
    imgUrl: "/testimonials/victor-siero.jpg",
  },
  {
    label: "Dr. Eunice Njeri – JKUAT Social Robotics",
    description:
      "Our research and projects needed an intuitive digital platform, and DDS delivered exactly that. Their tech solutions have streamlined our processes and improved visibility.",
    rating: 5,
    imgUrl: "/testimonials/eunice-njeri.jpg",
  },
  {
    label: "Apostle Arthur Likhakasi – Jesus Come Revival Ministries",
    description:
      "Our ministry needed a strong online presence to connect with people globally. DDS designed a beautiful and engaging website that has been a great blessing to us.",
    rating: 5,
    imgUrl: "/testimonials/apostle-arthur.jpg",
  },

];

export const services: I_ItemWithImage[] = [
  {
    imgUrl: "Globe",
    label: "Custom Website Development",
    description: `Professional Websites Built for Impact.
 From corporate sites to e-commerce stores, we design and develop high-performing, user-friendly websites tailored to your brand.`,
  },
  {
    imgUrl: "LayoutGrid",
    label: "Digital Platform Development",
    description: `Powerful Online Platforms for Business Growth.
 We build robust platforms like e-commerce systems, LMS, CRM, and marketplaces to drive business efficiency and engagement.`,
  },
  {
    imgUrl: "Code2",
    label: "Software Development",
    description: `Custom Software for Business Optimization.
 Developing enterprise-grade software for workflow automation, inventory management, POS, and financial tools to streamline operations.`,
  },
  {
    imgUrl: "Smartphone",
    label: "Mobile App Development",
    description: `Seamless & Scalable Mobile Solutions.
 We create intuitive Android, iOS, and hybrid applications for businesses, services, and on-demand platforms.`,
  },
  {
    imgUrl: "CloudCog",
    label: "SaaS (Software as a Service) Solutions",
    description: `Cloud-Based Software for Scalability.
 We develop subscription-based, cloud-hosted software solutions to enhance productivity and streamline business operations.`,
  },
  {
    imgUrl: "Server",
    label: "Cloud Solutions & Hosting",
    description: `Secure & Scalable Cloud Infrastructure.
 Providing reliable cloud hosting, storage, backup, and disaster recovery services for businesses of all sizes.`,
  },
  {
    imgUrl: "ShieldCheck",
    label: "IT Infrastructure & Support",
    description: `Reliable IT Services for Business Stability.
 From network setup to server maintenance, we ensure your IT systems run smoothly and securely.`,
  },
  {
    imgUrl: "Palette",
    label: "UI/UX Design & Branding",
    description: `Crafting Engaging User Experiences.
 We design visually appealing and user-friendly interfaces while building strong, memorable brand identities.`,
  },
  {
    imgUrl: "TrendingUp",
    label: "Digital Marketing & SEO",
    description: `Boosting Online Visibility & Engagement.
 With expert SEO, social media management, and paid advertising, we help businesses grow their digital presence.`,
  },
  {
    imgUrl: "BrainCircuit",
    label: "AI & Data Solutions",
    description: `Intelligent AI & Data-Driven Strategies.
 We develop AI-powered smart systems, data analytics tools, and machine learning solutions to enhance decision-making.`,
  },
  {
    imgUrl: "GlobeSearch",
    label: "Software for Local & Global Challenges",
    description: `Tech Solutions for Impact.
 We create custom software addressing community challenges, improving accessibility to services, education, and resources.`,
  },
  {
    imgUrl: "GraduationCap",
    label: "Training & Consultancy",
    description: `Empowering Businesses & Individuals.
 Offering expert-led training in web development, SaaS, digital transformation, and strategic business growth.`,
  },
];

export const projects: I_Project[] = [
  {
  "title": "ConnectMtaani",
  "slug": "connectmtaani",
  "link": "https://connectmtaani.vercel.app",
  "imageUrl": "/portfolio/connectmtaani.png",
  "overview": "ConnectMtaani is Kenya’s premier platform connecting job seekers and employers in the informal sector. It simplifies hiring by providing access to a diverse network of skilled professionals across multiple industries, ensuring fast, affordable, and reliable connections.",
  "challenge": "The informal labor market in Kenya is fragmented, making it difficult for employers to find reliable workers quickly and for job seekers to access consistent opportunities.",
  "solution": "Developed a user-friendly platform that allows employers to post jobs for free and access a nationwide pool of qualified professionals. The platform handles background checks, insurance, and payments, offering a hassle-free experience for both employers and workers.",
  "testimonial": {
    "words": "ConnectMtaani helped us find skilled workers on short notice. The process was quick and the quality was excellent.",
    "founder": {
      "name": "Jane Muthoni",
      "position": "HR Manager",
      "company": "BuildRight Ltd"
    }
  }
},
{
  "title": "Dovepeak Institute of Technology (DIT)",
  "slug": "dovepeak-institute-of-technology",
  "link": "https://dit-jak-devs-projects.vercel.app/",
  "imageUrl": "/portfolio/dovepeak-institute.png",
  "overview": "Dovepeak Institute of Technology (DIT) is a forward-thinking institution committed to nurturing the next generation of tech professionals. They provide high-quality, accessible, and practical IT education tailored to meet the evolving needs of the digital world. Their mission is to empower learners with relevant skills through flexible hybrid learning models, experienced tutors, and hands-on training.",
  "challenge": "Bridging the gap between theoretical knowledge and practical skills in the rapidly evolving tech industry, while making education accessible and affordable.",
  "solution": "Developed a comprehensive platform offering specialized courses in web development, UI/UX design, and website management. The curriculum emphasizes hands-on projects, real-world applications, and hybrid learning models to cater to diverse learning needs.",
  "testimonial": {
    "words": "DIT's approach to practical training has significantly boosted our students' confidence and employability. The hybrid model ensures flexibility without compromising on quality.",
    "founder": {
      "name": "Samuel Mwangi",
      "position": "Director",
      "company": "Dovepeak Institute of Technology"
    }
  }
},
{
  "title": "SmartTraffic AI",
  "slug": "smarttraffic-ai",
  "link": "https://smarttraffic-ai.vercel.app/",
  "imageUrl": "/portfolio/smarttraffic-ai.png",
  "overview": "SmartTraffic AI is an intelligent traffic management platform that leverages artificial intelligence and real-time data to optimize urban mobility. It enhances traffic flow, reduces congestion, and improves road safety through adaptive traffic signals, real-time monitoring, and predictive analytics.",
  "challenge": "Urban areas face increasing traffic congestion, leading to longer commute times, higher accident rates, and elevated carbon emissions. Traditional traffic management systems lack the adaptability to respond to real-time traffic conditions.",
  "solution": "Implemented AI-powered traffic lights that dynamically adjust to current traffic conditions, integrated real-time monitoring through AI-enhanced cameras and sensors, and developed predictive analytics to forecast congestion and suggest optimized routes. These solutions collectively improve traffic flow, enhance safety, and reduce environmental impact.",
  "testimonial": {
    "words": "Since integrating SmartTraffic AI, our city's traffic flow has improved significantly, with noticeable reductions in commute times and accidents.",
    "founder": {
      "name": "Alex Johnson",
      "position": "Director of Transportation",
      "company": "Metro City Council"
    }
  }
},
{
  "title": "Tripatite Interiors",
  "slug": "tripatite-interiors",
  "link": "https://tripatiteinteriors.vercel.app/",
  "imageUrl": "/portfolio/tripatite-interiors.png",
  "overview": "Tripatite Interiors is a premium interior design firm based in Kenya, specializing in transforming residential and commercial spaces into functional and aesthetically pleasing environments. Their services encompass residential and commercial interior design, interior styling and decor, custom furniture and finishes, renovations and remodeling, space optimization, 3D interior visualization, and consultations.",
  "challenge": "Clients often struggle to find a comprehensive interior design solution that combines creativity, functionality, and personalized service to transform their spaces effectively.",
  "solution": "Tripatite Interiors offers a holistic approach to interior design, providing end-to-end services from conceptualization to execution. Their team of experts works closely with clients to understand their needs and preferences, delivering customized solutions that enhance both the functionality and aesthetics of the space.",
  "testimonial": {
    "words": "Tripatite Interiors transformed our office space into something truly amazing. Their attention to detail and professionalism were top-notch.",
    "founder": {
      "name": "John Doe",
      "position": "CEO",
      "company": "XYZ Corp."
    }
  }
},
{
  "title": "Lapi-Cure",
  "slug": "lapi-cure",
  "link": "https://lapicure.vercel.app/",
  "imageUrl": "/portfolio/lapi-cure.png",
  "overview": "Lapi-Cure is an affordable laptop insurance platform in Kenya, offering protection against theft, accidental damage, power surges, and liquid spills for just KES 100 per month. The platform simplifies the insurance process, making it accessible and straightforward for users.",
  "challenge": "Many laptop owners in Kenya lack affordable and accessible insurance options, leaving their devices vulnerable to common risks like theft and accidental damage.",
  "solution": "Developed a user-friendly platform that allows users to easily sign up, upload their laptop details, and get insured for a minimal monthly fee. The process is streamlined to encourage more users to protect their devices without the hassle of traditional insurance procedures.",
  "testimonial": {
    "words": "Lapi-Cure made it incredibly easy to insure my laptop. The peace of mind it offers for just KES 100 a month is unbeatable.",
    "founder": {
      "name": "Samuel Otieno",
      "position": "Founder",
      "company": "Lapi-Cure"
    }
  }
},
{
  "title": "Helpicent",
  "slug": "helpicent",
  "link": "https://helpicent.vercel.app/",
  "imageUrl": "/portfolio/helpicent.png",
  "overview": "Helpicent is a global education fundraising platform that connects international donors with underprivileged children in Kenya. The platform facilitates secure donations, transparent impact tracking, and direct communication between donors and beneficiaries, aiming to transform lives through education.",
  "challenge": "Bridging the gap between international donors and underprivileged children in Kenya, ensuring transparency, trust, and effective communication in the donation process.",
  "solution": "Developed a user-friendly platform that offers secure donation processing, real-time impact updates, and direct communication channels. This approach fosters trust and ensures that donors can see the tangible effects of their contributions.",
  "testimonial": {
    "words": "Helpicent has transformed my child's future. The transparency and care they provide are unparalleled.",
    "founder": {
      "name": "Amina",
      "position": "Parent",
      "company": "Beneficiary Family"
    }
  }
},
{
  "title": "Highrise School",
  "slug": "highrise-school",
  "link": "https://highrise-school.vercel.app/",
  "imageUrl": "/portfolio/highrise-school.png",
  "overview": "Highrise School is a private academic institution in Nairobi, Kenya, dedicated to fostering excellence in academics, discipline, and co-curricular activities. The school offers a supportive environment that nurtures students' growth, preparing them to become responsible and successful individuals.",
  "challenge": "Establishing a strong academic foundation while instilling discipline and promoting co-curricular engagement in a supportive environment.",
  "solution": "Developed a comprehensive educational program that emphasizes academic excellence, discipline, and co-curricular activities. The school provides a safe and inclusive environment that fosters student growth and development.",
  "testimonial": {
    "words": "Highrise School has provided me with an excellent education and a supportive environment to grow both academically and personally.",
    "founder": {
      "name": "John Doe",
      "position": "Student",
      "company": "Highrise School"
    }
  }
},
{
  "title": "CompDock",
  "slug": "compdock",
  "link": "https://compdock.vercel.app/",
  "imageUrl": "/portfolio/compdock.png",
  "overview": "CompDock is a Kenyan-based e-commerce platform specializing in high-quality computer accessories, laptops, and tech essentials. The platform offers a curated selection of products, including gaming gear, monitors, and networking equipment, catering to tech enthusiasts and professionals alike.",
  "challenge": "Navigating the crowded e-commerce landscape to provide a seamless shopping experience for tech products, ensuring product authenticity, competitive pricing, and timely delivery.",
  "solution": "Developed a user-friendly online store with intuitive navigation, detailed product descriptions, and secure payment options. Implemented features like limited-time offers, customer testimonials, and brand partnerships to build trust and encourage purchases.",
  "testimonial": {
    "words": "CompDock made it so easy to find the right monitor for my coding setup. The quality and delivery were excellent!",
    "founder": {
      "name": "Jane M.",
      "position": "Software Developer",
      "company": "Freelancer"
    }
  }
},
{
  "title": "Jasiri",
  "slug": "jasiri",
  "link": "https://jasiri.vercel.app/",
  "imageUrl": "/portfolio/jasiri.png",
  "overview": "Jasiri is a creative agency that empowers visionaries—students, entrepreneurs, NGOs, and startups—to craft compelling, fundable, and investor-ready projects. Through design, strategy, and storytelling, Jasiri transforms ideas into bold, bankable pitches.",
  "challenge": "Many aspiring entrepreneurs and organizations struggle to present their ideas effectively to potential investors, donors, or stakeholders, often lacking the necessary tools and guidance to create impactful pitches.",
  "solution": "Jasiri offers a suite of services including custom pitch deck creation, proposal writing, pitch training, brand identity development, and strategic mentorship. By providing tailored support, Jasiri helps clients articulate their visions clearly and confidently.",
  "testimonial": {
    "words": "Working with Jasiri was a game-changer. Their expertise turned our concept into a compelling pitch that resonated with investors.",
    "founder": {
      "name": "Alex Mwangi",
      "position": "Founder",
      "company": "GreenTech Innovations"
    }
  }
},

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

export const newsArticles = [
{
  title: "Dovepeak Launches the Dovepeak Digital Challenge",
  slug: "dovepeak-digital-challenge-2025",
  imageUrl: "/news/dovepeak-digital-challenge.png",
  date: "May 28, 2025",
  excerpt:
    "The Dovepeak Digital Challenge is now live — offering two lucky businesses a free professionally designed website, domain, and hosting. All participants also get a 25% discount. Apply before June 30th!",
  content: `
    <p>The <strong>Dovepeak Digital Challenge 2025</strong> is Dovepeak’s latest initiative aimed at empowering small and growing businesses with the digital tools they need to thrive in today’s online-first economy.</p>
    <p>Through this challenge, <strong>two winners</strong> will receive:</p>
    <ul>
      <li>✅ A fully branded and responsive website</li>
      <li>✅ Free domain name registration for 1 year</li>
      <li>✅ One-year free hosting on a secure platform</li>
    </ul>
    <p><strong>Every applicant</strong> also benefits with an exclusive <strong>25% discount</strong> on our web packages — just for participating!</p>
    <p>🗓️ <strong>Deadline:</strong> June 20, 2025<br />
    🏆 <strong>Winners Announced:</strong> June 30, 2025</p>

    <div style="margin: 30px 0; padding: 20px; background: #f0f8ff; border-left: 6px solid #007acc; border-radius: 8px;">
      <h3 style="margin-top: 0;">🚀 Ready to Elevate Your Digital Presence?</h3>
      <p style="font-size: 18px; margin: 10px 0;"><strong>Don't miss your chance to win a custom website for FREE!</strong></p>
      <a href="https://forms.gle/PwQ2JrcWRLLWfHEG8" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 12px 24px; background-color: #007acc; color: #fff; font-weight: bold; border-radius: 5px; text-decoration: none; transition: background-color 0.3s;">
        👉 Apply Now – Join the Dovepeak Digital Challenge 2025
      </a>
    </div>

    <p>Let Dovepeak Digital Solutions help your business shine online.</p>
  `
},
{
  title: "Dovepeak Launches the AutoStore Project",
  slug: "dovepeak-autostore-launch",
  imageUrl: "/news/dovepeak-autostore-launch.png",
  date: "June 3, 2025",
  excerpt:
    "Dovepeak Digital Solutions unveils AutoStore — a modern digital platform built to revolutionize the car spare parts industry in Kenya. The platform connects customers with quality spare parts quickly and reliably.",
  content: `
    <p><strong>Dovepeak Digital Solutions</strong> is proud to announce the launch of <strong>AutoStore</strong> — an innovative web platform that streamlines the way individuals and garages access high-quality car spare parts in Kenya.</p>
    
    <p>AutoStore is designed with speed, simplicity, and trust in mind, helping car owners and mechanics find exactly what they need — hassle-free. Whether you're looking for specific vehicle parts or just exploring, AutoStore provides an intuitive experience with verified listings.</p>

    <ul>
      <li>🚗 Browse thousands of car spare parts</li>
      <li>📦 Seamless ordering and delivery process</li>
      <li>🔧 Tailored for garages, auto shops, and everyday car owners</li>
    </ul>

    <p>With the AutoStore platform, Dovepeak continues to push forward its mission of transforming traditional businesses through smart, user-friendly digital tools.</p>

    <div style="margin: 30px 0; padding: 20px; background: #f8fafd; border-left: 6px solid #198754; border-radius: 8px;">
      <h3 style="margin-top: 0;">🔍 Explore AutoStore Now</h3>
      <p style="font-size: 18px; margin: 10px 0;"><strong>Find genuine car parts fast and reliably — all in one place.</strong></p>
      <a href="https://autostore-q6v3.vercel.app/" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 12px 24px; background-color: #198754; color: #fff; font-weight: bold; border-radius: 5px; text-decoration: none; transition: background-color 0.3s;">
        🚀 Visit AutoStore Platform
      </a>
    </div>

    <p>This launch marks another bold step in Dovepeak’s journey to empower industries through technology.</p>
  `
},
{
  title: "Dovepeak Officially Launches CompDock",
  slug: "dovepeak-compdock-launch",
  imageUrl: "/news/dovepeak-compdock-launch.png",
  date: "June 3, 2025",
  excerpt:
    "CompDock is Dovepeak’s newly launched online marketplace for laptops, computers, and IT accessories — built to serve students, professionals, and businesses with reliable tech solutions.",
  content: `
    <p><strong>Dovepeak Digital Solutions</strong> proudly launches <strong>CompDock</strong> — a smart and efficient digital marketplace tailored for Kenya's growing tech needs.</p>

    <p>Whether you're a student looking for an affordable laptop, a professional upgrading your workstation, or a business sourcing bulk accessories — <strong>CompDock</strong> provides a seamless experience for discovering and purchasing trusted IT products.</p>

    <ul>
      <li>💻 Wide selection of laptops, desktops, and accessories</li>
      <li>🛒 Smooth, user-friendly online shopping experience</li>
      <li>🔐 Reliable vendors and secure checkout</li>
    </ul>

    <p>Built with quality, speed, and accessibility in mind, CompDock aims to become the go-to digital marketplace for computing products across Kenya and beyond.</p>

    <div style="margin: 30px 0; padding: 20px; background: #f8fafd; border-left: 6px solid #0d6efd; border-radius: 8px;">
      <h3 style="margin-top: 0;">🖥️ Shop on CompDock Today</h3>
      <p style="font-size: 18px; margin: 10px 0;"><strong>Find your next laptop or essential accessories with ease and confidence.</strong></p>
      <a href="https://compdock.vercel.app/" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 12px 24px; background-color: #0d6efd; color: #fff; font-weight: bold; border-radius: 5px; text-decoration: none; transition: background-color 0.3s;">
        🛍️ Visit CompDock Marketplace
      </a>
    </div>

    <p>With CompDock, Dovepeak continues to drive digital commerce forward — supporting students, startups, and tech lovers alike.</p>
  `
},
{
  title: "Dovepeak Launches Dovepeak Institute of Technology (DIT)",
  slug: "dovepeak-institute-of-technology-launch",
  imageUrl: "/news/dovepeak-institute-launch.png",
  date: "June 3, 2025",
  excerpt:
    "Dovepeak proudly introduces Dovepeak Institute of Technology — a dynamic learning institution offering hands-on, industry-driven training in web development, design, and digital technologies.",
  content: `
    <p><strong>Dovepeak Institute of Technology (DIT)</strong> is officially live — a modern tech-focused institution built to shape the next generation of digital professionals.</p>

    <p>At DIT, students receive in-depth training in high-demand IT fields including <strong>Web Development</strong>, <strong>Design</strong>, <strong>UI/UX</strong>, and <strong>Digital Strategy</strong>. With a blend of hands-on projects and guided mentorship, DIT empowers learners to confidently enter the digital workforce.</p>

    <ul>
      <li>🧑‍🏫 Expert-led training with practical industry experience</li>
      <li>💼 Career-focused learning paths in tech & innovation</li>
      <li>🖥️ State-of-the-art learning platform with student dashboards</li>
      <li>🌍 Hybrid model: Online & Physical sessions available</li>
    </ul>

    <p>Whether you're a student exploring the digital world, a graduate building real-world skills, or a professional looking to upskill — <strong>DIT is your launchpad</strong>.</p>

    <div style="margin: 30px 0; padding: 20px; background: #f1f9f4; border-left: 6px solid #198754; border-radius: 8px;">
      <h3 style="margin-top: 0;">🎓 Enroll with DIT Today</h3>
      <p style="font-size: 18px; margin: 10px 0;"><strong>Start your journey in tech with real mentorship, projects, and support.</strong></p>
      <a href="https://dit-jak-devs-projects.vercel.app/" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 12px 24px; background-color: #198754; color: #fff; font-weight: bold; border-radius: 5px; text-decoration: none; transition: background-color 0.3s;">
        🚀 Explore DIT & Apply Now
      </a>
    </div>

    <p><strong>Dovepeak Institute of Technology</strong> represents Dovepeak's ongoing mission to not just build digital solutions — but to cultivate the talent that powers them.</p>
  `
}

];


export const whyChooseUs = [
  "Expertise & Innovation. A skilled team leveraging the latest technology trends.",
  "Tailored Solutions. Custom-built digital products designed to fit your business needs.",
  "Reliability & Scalability. Secure, high-performance systems that grow with your business.",
  "Client-Centered Approach. Dedicated support and collaboration to ensure success.",
  "End-to-End Services. From strategy to execution, we handle every aspect of your digital journey.",
];

export const projectLinks = projects.map((p) => ({
  siteUrl: p.link,
  imageUrl: p.imageUrl,
}));

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
    href: "#",
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
