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
  
  // backend
  email: "/api/email",
  contact: ""
};

export default URLS;
