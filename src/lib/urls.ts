const URLS = {
  // frontend
  home: "/",
  aboutUs: "/about-us",
  services: "/services",
  portfolio: "/portfolio",
  news: "/news",
  projectSlug: (projectSlug: string) => `/portfolio/${projectSlug}`,
  pricing: "/#pricing",
  testimonials: "/#testimonials",
  contactUs: "/#contact-us",
  blogs: "/blogs",
  process: "/#",
  contact: "/contact-us",
  
  // backend
  email: "/api/email",
  contactbackend: ""
};

export default URLS;
