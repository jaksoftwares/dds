// lib/data/service-packages.ts

import { IServiceWithPackages } from "@/lib/interfaces";

export const servicesWithPackages: IServiceWithPackages[] = [
  {
  label: "Custom Website Development",
  imgUrl: "Globe",
  description: `Professional websites tailored for businesses, organizations, and entrepreneurs. We specialize in building high-performing, user-friendly websites that align with your brand and drive results.`,
  packages: [
    {
      name: "Starter Website",
      price: "KES 15,000",
      description: "Perfect for individuals or startups needing an online presence.",
      features: [
        "Up to 5 Pages (Home, About, Services, Contact, etc.)",
        "Modern Responsive Design",
        "Basic On-Page SEO Setup",
        "Contact Form with Email Notifications",
        "Social Media Links Integration",
        "1 Revision Cycle",
        "Delivery in 5–7 Days"
      ]
    },
    {
      name: "Business Website",
      price: "KES 35,000",
      mostPopular: true,
      description: "Ideal for growing businesses seeking professionalism and scalability.",
      features: [
        "Up to 12 Custom Pages",
        "Content Management System (e.g., WordPress, Sanity)",
        "Advanced SEO Optimization",
        "Live Chat & WhatsApp Integration",
        "Google Analytics & Meta Pixel Integration",
        "Newsletter Signup Integration (Mailchimp, etc.)",
        "Performance & Speed Optimization",
        "2 Revision Cycles",
        "Delivery in 7–10 Days"
      ]
    },
    {
      name: "E-commerce Website",
      price: "KES 60,000+",
      description: "Full-featured online store for businesses ready to sell products online.",
      features: [
        "Product Catalog (Unlimited Products)",
        "Shopping Cart & Secure Checkout",
        "Multiple Payment Gateways (e.g., M-Pesa, Card)",
        "Customer Accounts & Order Management",
        "Inventory & Coupon Management",
        "Admin Dashboard",
        "Email Notifications for Orders",
        "Mobile Optimized Interface",
        "Training on How to Manage Store",
        "Delivery in 10–15 Days"
      ]
    }
  ]
},
 {
  label: "Mobile App Development",
  imgUrl: "Smartphone",
  description: `We craft intuitive, scalable, and high-performance mobile applications tailored for startups, businesses, and enterprise needs. Whether native or hybrid, our apps are built for engagement and functionality.`,
  packages: [
    {
      name: "Basic App",
      price: "KES 50,000",
      description: "Great for MVPs, prototypes, or simple utility apps.",
      features: [
        "1 Platform (Android or iOS)",
        "Simple User Interface",
        "API/Data Integration (1–2 Endpoints)",
        "Splash Screen & Branding",
        "Basic App Submission Guidance",
        "Delivery in 10–14 Days"
      ]
    },
    {
      name: "Standard App",
      price: "KES 90,000",
      mostPopular: true,
      description: "Best for businesses needing robust functionality and user engagement.",
      features: [
        "Cross-Platform (Android & iOS)",
        "User Authentication & Profiles",
        "Push Notifications",
        "Integration with APIs (up to 5)",
        "Google Maps or Location Services",
        "Firebase or Supabase Backend",
        "Analytics Integration",
        "Delivery in 14–20 Days"
      ]
    },
    {
      name: "Advanced App",
      price: "KES 150,000+",
      description: "Ideal for startups and enterprises seeking feature-rich, scalable apps.",
      features: [
        "Custom Features (e.g., Bookings, Chat, Payments)",
        "Real-Time Data & Live Updates",
        "Admin Dashboard or CMS Integration",
        "Advanced Security & Role Management",
        "Cloud Functions & Background Services",
        "Performance Optimization",
        "Scalable Architecture",
        "Ongoing Maintenance Options",
        "Delivery in 20–30+ Days"
      ]
    }
  ]
},
{
  label: "Digital Platform Development",
  imgUrl: "LayoutGrid",
  description: `Powerful Online Platforms for Business Growth. We build robust platforms like e-commerce systems, LMS, CRM, and marketplaces to drive business efficiency and engagement.`,
  packages: [
    {
      name: "Standard Platform",
      price: "KES 90,000+",
      description: "Perfect for small businesses or startups launching their first digital platform.",
      features: [
        "Core Features (e.g., User Roles, Dashboards)",
        "Basic Admin Panel",
        "Up to 2 Integrated Modules (e.g., Products, Orders)",
        "Mobile Responsive Design",
        "Authentication & Authorization",
        "Delivery in 3–4 Weeks"
      ]
    },
    {
      name: "Business Platform",
      price: "KES 150,000+",
      mostPopular: true,
      description: "Best for growing businesses needing customized functionality and integrations.",
      features: [
        "Multi-User Role System",
        "Advanced Admin Panel & Reports",
        "Up to 5 Integrated Modules (e.g., CRM, Inventory, LMS)",
        "API Integrations (e.g., M-Pesa, Email)",
        "SEO & Performance Optimization",
        "Custom Branding & UI/UX",
        "Delivery in 4–6 Weeks"
      ]
    },
    {
      name: "Enterprise Platform",
      price: "KES 250,000+",
      description: "Tailored for large organizations and startups seeking full-scale digital platforms.",
      features: [
        "Fully Custom Architecture",
        "Unlimited Modules & Scalability",
        "Real-Time Capabilities (Sockets, Live Updates)",
        "Custom Workflows & Automations",
        "Admin + Super Admin Panels",
        "Advanced Analytics & Data Insights",
        "Multi-Tenant or White-Label Support",
        "Cloud Hosting & Deployment Support",
        "Delivery in 6–10+ Weeks"
      ]
    }
  ]
},
{
  label: "Software Development",
  imgUrl: "Code2",
  description: `Custom Software for Business Optimization. Developing enterprise-grade software for workflow automation, inventory management, POS, and financial tools to streamline operations.`,
  packages: [
    {
      name: "Essential Software",
      price: "KES 80,000+",
      description: "Ideal for SMEs looking to automate key business functions such as inventory management or point-of-sale systems with a tailored solution.",
      features: [
        "Single-Module System (e.g., Inventory Management, POS)",
        "Custom Business Logic",
        "User Authentication",
        "Simple Dashboard & Reporting",
        "Local or Cloud Deployment",
        "Delivery in 3–4 Weeks"
      ]
    },
    {
      name: "Professional Suite",
      price: "KES 140,000+",
      mostPopular: true,
      description: "Perfect for growing businesses needing multi-functional systems like CRM, inventory, sales tracking, and invoicing to streamline operations.",
      features: [
        "Multi-Module System (e.g., Inventory + Sales + CRM + User Management)",
        "Role-Based Access Control",
        "Advanced Dashboards & Analytics",
        "PDF/Excel Report Generation",
        "API Integration (e.g., Payment Gateways, SMS Services)",
        "Cloud Deployment & Maintenance Guide",
        "Delivery in 5–7 Weeks"
      ]
    },
    {
      name: "Enterprise System",
      price: "KES 220,000+",
      description: "Suited for large organizations requiring scalable software solutions like ERP, financial management, and workflow automation with advanced integrations.",
      features: [
        "Fully Custom Architecture",
        "Unlimited Modules & Advanced Workflows",
        "Real-Time Features (e.g., Stock Sync, Notifications)",
        "Audit Logs & Advanced User Permissions",
        "Third-Party Integrations (Accounting Software, ERP Systems, Payment Processors)",
        "Dedicated Admin & Super Admin Panels",
        "On-Premise or Cloud Hosting",
        "Delivery in 8–12 Weeks"
      ]
    }
  ]
},
{
  label: "SaaS (Software as a Service) Solutions",
  imgUrl: "CloudCog",
  description: `Cloud-Based Software for Scalability. We develop subscription-based, cloud-hosted software solutions to enhance productivity and streamline business operations.`,
  packages: [
    {
      name: "Startup SaaS",
      price: "KES 100,000+",
      description: "Ideal for startups launching their first cloud-based app with essential subscription management and core features.",
      features: [
        "Single-Tenant Architecture",
        "Basic User Management & Authentication",
        "Subscription Billing Integration (e.g., Stripe, PayPal)",
        "Core Application Features",
        "Cloud Hosting Setup (AWS, Azure, or GCP)",
        "Basic Analytics & Reporting",
        "Delivery in 4–6 Weeks"
      ],
    },
    {
      name: "Growth SaaS",
      price: "KES 180,000+",
      mostPopular: true,
      description: "Designed for growing businesses requiring multi-tenant architecture, advanced subscription features, and scalability.",
      features: [
        "Multi-Tenant Architecture",
        "Role-Based Access Control",
        "Advanced Billing & Payment Plans",
        "Usage Tracking & Quotas",
        "API Access for Integrations",
        "Dashboard with User Analytics",
        "Automated Email Notifications",
        "Cloud Infrastructure Monitoring & Scaling",
        "Delivery in 6–8 Weeks"
      ],
    },
    {
      name: "Enterprise SaaS",
      price: "KES 300,000+",
      description: "Comprehensive SaaS solutions for enterprises needing custom workflows, integrations, high availability, and compliance.",
      features: [
        "Custom Workflow Automation",
        "Single Sign-On (SSO) & Advanced Security",
        "Custom API Development & Integrations",
        "High Availability & Disaster Recovery",
        "Data Encryption & Compliance (e.g., GDPR, HIPAA)",
        "Dedicated Support & SLA",
        "Performance Optimization & Scalability",
        "Onboarding & Training Sessions",
        "Delivery in 10–14 Weeks"
      ],
    },
  ],
},
{
  label: "Cloud Solutions & Hosting",
  imgUrl: "Server",
  description: `Secure & Scalable Cloud Infrastructure. Providing reliable cloud hosting, storage, backup, and disaster recovery services for businesses of all sizes.`,
  packages: [
    {
      name: "Basic Cloud Hosting",
      price: "KES 10,000 / month",
      description: "Affordable, reliable cloud hosting for small websites and applications.",
      features: [
        "Shared Cloud Hosting",
        "50 GB Storage",
        "1 TB Bandwidth",
        "Daily Backups",
        "SSL Certificate",
        "24/7 Monitoring",
        "Basic Support",
      ],
    },
    {
      name: "Business Cloud Hosting",
      price: "KES 30,000 / month",
      mostPopular: true,
      description: "Robust hosting solution for medium businesses with increased resources and reliability.",
      features: [
        "Dedicated Virtual Private Server (VPS)",
        "200 GB SSD Storage",
        "5 TB Bandwidth",
        "Automated Daily Backups & Restore",
        "Advanced Security & Firewall",
        "Uptime SLA 99.9%",
        "Managed Support",
      ],
    },
    {
      name: "Enterprise Cloud Infrastructure",
      price: "KES 75,000+ / month",
      description: "Highly scalable, secure cloud infrastructure tailored for large enterprises and mission-critical apps.",
      features: [
        "Dedicated Cloud Servers & Clustering",
        "Unlimited Storage & Bandwidth Options",
        "Disaster Recovery & Failover Systems",
        "24/7 Premium Support & Monitoring",
        "Compliance & Security Audits",
        "Custom Network Architecture",
        "Cloud Migration & Optimization Services",
      ],
    },
  ],
},
{
  label: "Digital Marketing & SEO",
  imgUrl: "TrendingUp",
  description: `Boosting Online Visibility & Engagement. With expert SEO, social media management, and paid advertising, we help businesses grow their digital presence.`,
  packages: [
    {
      name: "Starter Marketing",
      price: "KES 15,000 / month",
      description: "Ideal for small businesses starting their digital marketing journey.",
      features: [
        "Basic SEO Audit & Optimization",
        "Content Calendar & Social Media Posting (2 platforms)",
        "Google My Business Setup",
        "Monthly Performance Report",
        "Email Support",
      ],
    },
    {
      name: "Growth Marketing",
      price: "KES 45,000 / month",
      mostPopular: true,
      description: "Comprehensive digital marketing with SEO, paid ads, and social engagement.",
      features: [
        "Advanced SEO (On-page & Off-page)",
        "Social Media Management (up to 4 platforms)",
        "Google Ads & Facebook Ads Campaigns",
        "Conversion Tracking & Analytics",
        "Monthly Strategy Calls",
        "Dedicated Account Manager",
      ],
    },
    {
      name: "Enterprise Marketing",
      price: "KES 90,000+ / month",
      description: "Full-scale digital marketing solution for large brands and enterprises.",
      features: [
        "Full SEO Suite (Technical, Local & International)",
        "Multi-channel Social Media Marketing",
        "Custom Paid Advertising Strategy",
        "Influencer Marketing & PR",
        "Detailed Analytics & Reporting",
        "24/7 Campaign Monitoring",
        "On-demand Creative Content Production",
      ],
    },
  ],
},
{
  label: "Training & Consultancy",
  imgUrl: "GraduationCap",
  description: `Empowering Businesses & Individuals. Offering expert-led training in web development, SaaS, digital transformation, and strategic business growth.`,
  packages: [
    {
      name: "Introductory Workshops",
      price: "KES 10,000 per session",
      description: "Hands-on sessions introducing key digital concepts and tools.",
      features: [
        "Basic Web Development Fundamentals",
        "Overview of SaaS & Cloud Technologies",
        "Digital Transformation Essentials",
        "Interactive Q&A",
        "Certificate of Completion",
      ],
    },
    {
      name: "Professional Training",
      price: "KES 40,000 per course",
      mostPopular: true,
      description: "Comprehensive training for professionals and teams to upskill.",
      features: [
        "In-depth Web Development Bootcamp",
        "SaaS Product Design & Implementation",
        "Digital Strategy & Business Growth",
        "Hands-on Projects & Case Studies",
        "Post-training Support & Resources",
      ],
    },
    {
      name: "Consultancy & Strategy",
      price: "KES 100,000+ per engagement",
      description: "Tailored consultancy for digital transformation and business optimization.",
      features: [
        "Business Needs Assessment",
        "Custom Digital Strategy Development",
        "Process Optimization & Automation",
        "Change Management Support",
        "Ongoing Advisory & Monitoring",
      ],
    },
  ],
},
{
  label: "AI & Data Solutions",
  imgUrl: "BrainCircuit",
  description: `Intelligent AI & Data-Driven Strategies. We develop AI-powered smart systems, data analytics tools, and machine learning solutions to enhance decision-making.`,
  packages: [
    {
      name: "AI Starter Package",
      price: "KES 80,000",
      description: "Entry-level AI solutions to automate simple tasks and gain insights.",
      features: [
        "Basic Machine Learning Models",
        "Data Cleaning & Preprocessing",
        "Simple Predictive Analytics",
        "Automated Reporting",
        "Integration Support",
      ],
    },
    {
      name: "Advanced AI Solutions",
      price: "KES 200,000+",
      mostPopular: true,
      description: "Custom AI models and advanced data analytics for complex challenges.",
      features: [
        "Deep Learning & Neural Networks",
        "Natural Language Processing (NLP)",
        "Computer Vision Applications",
        "Real-time Data Processing",
        "Dashboard & Visualization Tools",
        "Model Training & Optimization",
      ],
    },
    {
      name: "AI Consulting & Strategy",
      price: "KES 150,000+",
      description: "Expert consultancy to develop AI strategies and implementation roadmaps.",
      features: [
        "AI Readiness Assessment",
        "Custom AI Strategy Development",
        "Data Infrastructure Planning",
        "Change Management Support",
        "Ongoing Monitoring & Improvement",
      ],
    },
  ],
},
{
  label: "IT Infrastructure & Support",
  imgUrl: "ShieldCheck",
  description: `Reliable IT Services for Business Stability. From network setup to server maintenance, we ensure your IT systems run smoothly and securely.`,
  packages: [
    {
      name: "Basic IT Setup",
      price: "KES 25,000",
      description: "Fundamental network and hardware setup for small offices and startups.",
      features: [
        "Network Installation & Configuration",
        "Workstation Setup",
        "Basic Security Setup",
        "Hardware Installation",
        "Initial Troubleshooting",
      ],
    },
    {
      name: "Managed IT Support",
      price: "KES 70,000/month",
      mostPopular: true,
      description: "Comprehensive ongoing IT support and monitoring for growing businesses.",
      features: [
        "24/7 Network Monitoring",
        "Server Maintenance & Updates",
        "Security Patching & Antivirus Management",
        "User Support & Helpdesk",
        "Backup & Recovery Solutions",
      ],
    },
    {
      name: "Enterprise Infrastructure",
      price: "KES 150,000+",
      description: "Advanced infrastructure design and implementation for large organizations.",
      features: [
        "Data Center Setup & Management",
        "Cloud Infrastructure Integration",
        "Advanced Security & Firewall Configuration",
        "Disaster Recovery Planning",
        "Performance Optimization",
        "Virtualization & Load Balancing",
      ],
    },
  ],
}

];
