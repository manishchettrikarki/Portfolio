import type {
  NavLink,
  SocialLink,
  ShortInfoItem,
  CounterItem,
  Skill,
  ResumeItem,
  Testimonial,
  PortfolioItem,
  PortfolioFilter,
  BlogsItem,
} from "@/types";

// ─── Site ─────────────────────────────────────────────────────────────────────
export const siteConfig = {
  name: "Dibya Guragain",
  role: "Quality Assurance Engineer | Associate Project Manager",
  tagline:
    "Delivering high-quality software through data-driven QA, Agile practices, and business-focused solutions.",
  email: "guragain11dibya@gmail.com",
  phone: "+977 9862054267",
  location: "Biratnagar, Nepal",
  cvFile: "/cv.pdf",
  social: [
    {
      icon: "linkedin",
      url: "https://linkedin.com/in/dibyaguragain",
      label: "LinkedIn",
    },
    {
      icon: "github",
      url: "https://github.com",
      label: "GitHub",
    },
  ] satisfies SocialLink[],
};

// ─── Nav ──────────────────────────────────────────────────────────────────────
export const navLinks: NavLink[] = [
  { label: "Home", section: "home" },
  { label: "About", section: "about" },
  { label: "Portfolio", section: "portfolio" },
  { label: "BLOGS", section: "blogs" },
  { label: "Contact", section: "contact" },
];

// ─── About ────────────────────────────────────────────────────────────────────
export const aboutBio =
  "I am Dibya Guragain, a Computer Engineer and Quality Assurance professional with hands-on experience in Agile environments, QA strategy, and business development. I specialize in requirement analysis, defect lifecycle management, and data validation while ensuring alignment between technical execution and business goals. I am passionate about improving product quality, optimizing processes, and continuously learning emerging technologies.";

// ─── Short Info ───────────────────────────────────────────────────────────────
export const shortInfo: ShortInfoItem[] = [
  { label: "Residence", value: "Nepal" },
  { label: "Address", value: "Biratnagar, Nepal" },
  { label: "Freelance", value: "Available" },
  {
    label: "Email",
    value: "guragain11dibya@gmail.com",
    href: "mailto:guragain11dibya@gmail.com",
  },
  {
    label: "Phone",
    value: "+9779862054267",
    href: "tel:+9779862054267",
  },
];

// ─── Counters ────────────────────────────────────────────────────────────────
export const counters: CounterItem[] = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 15, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Quality Assurance Accuracy" },
  { value: 6, suffix: "+", label: "Certifications & Achievements" },
];

// ─── Skills ──────────────────────────────────────────────────────────────────
export const skills: Skill[] = [
  { name: "Quality Assurance & Testing", value: 90 },
  { name: "Agile / Scrum Methodology", value: 88 },
  { name: "JIRA & Metrics Tracking", value: 85 },
  { name: "Data Validation & Analysis", value: 87 },
  { name: "Business Development", value: 80 },
  { name: "Stakeholder Communication", value: 85 },
];

export const skillList = [
  "Sprint Planning & Management",
  "Defect Tracking",
  "Root Cause Analysis",
  "Test Case Design",
  "QA Reporting",
  "Process Optimization",
  "Cross-functional Collaboration",
  "Client Communication",
];

// ─── Experience ──────────────────────────────────────────────────────────────
export const experience: ResumeItem[] = [
  {
    period: "February 2025 – Present",
    title: "Quality Assurance Engineer | Associate Project Manager",
    subtitle: "3Bird (Remote)",
    description:
      "Lead QA processes and Agile project coordination by analyzing sprint metrics, managing backlogs, and ensuring high-quality product delivery. Improved team efficiency through data-driven insights, root cause analysis, and process optimization.",
  },
  {
    period: "December 2023 – February 2025",
    title: "Business Development Executive | QA Analyst",
    subtitle: "Avishkaram Technologies",
    description:
      "Performed quality assurance across web, mobile, and Microsoft add-ins while managing client communication and business development activities. Delivered detailed reports, improved defect tracking, and enhanced product quality through structured testing processes.",
  },
];

// ─── Education ───────────────────────────────────────────────────────────────
export const education: ResumeItem[] = [
  {
    period: "2017 – 2022",
    title: "Bachelor of Engineering (Computer Engineering)",
    subtitle: "Purbanchal University of Science, Engineering and Technology",
    description:
      "Focused on software engineering, system design, and computing fundamentals with hands-on project experience.",
  },
];

// ─── Testimonials ────────────────────────────────────────────────────────────
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Product Manager",
    role: "3Bird",
    text: "Dibya consistently delivers high-quality results and ensures smooth coordination between QA and development teams.",
  },
  {
    id: "2",
    name: "Client",
    role: "Avishkaram Technologies",
    text: "Clear communication, strong QA insights, and a business-focused mindset made Dibya a valuable contributor to our projects.",
  },
  {
    id: "3",
    name: "Team Member",
    role: "Developer",
    text: "Excellent at identifying issues early and improving workflows with practical solutions.",
  },
];

// ─── Portfolio ───────────────────────────────────────────────────────────────
export const portfolioFilters: PortfolioFilter[] = [
  { label: "All", value: "all" },
  { label: "QA Projects", value: "qa" },
  { label: "Web Apps", value: "web" },
  { label: "Research", value: "research" },
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "QA Automation & Reporting System",
    category: "qa",
    categoryLabel: "QA Project",
    type: "image",
    client: "3Bird",
    date: "2025",
    description:
      "Developed QA workflows, dashboards, and reporting mechanisms to track sprint performance and defects, improving delivery quality.",
    technologies: ["JIRA", "Agile", "QA Metrics"],
  },
  {
    id: "2",
    title: "Web Application Testing Suite",
    category: "web",
    categoryLabel: "Web App",
    type: "image",
    client: "Avishkaram Technologies",
    date: "2024",
    description:
      "Conducted full-cycle testing for web applications ensuring performance, usability, and reliability across platforms.",
    technologies: ["Manual Testing", "Test Cases", "Bug Tracking"],
  },
  {
    id: "3",
    title: "Microsoft Add-in QA Project",
    category: "qa",
    categoryLabel: "QA Project",
    type: "image",
    client: "Enterprise Client",
    date: "2024",
    description:
      "Validated functionality and usability of Microsoft add-ins through detailed testing and reporting processes.",
    technologies: ["QA", "Data Validation", "Reporting"],
  },
];

// ─── blogs ─────────────────────────────────────────────────────────────────────
export const blogsItem: BlogsItem[] = [
  {
    id: "1",
    slug: "improving-qa-efficiency-with-agile-metrics",
    title: "Improving QA Efficiency with Agile Metrics",
    excerpt:
      "How tracking sprint metrics and defect trends can significantly improve software delivery.",
    date: "2025",
    category: "Quality Assurance",
    author: "Dibya Guragain",
    readTime: "5 min read",
    quote:
      "Quality is not just testing — it's a continuous process of improvement and measurement.",
    tags: ["QA", "Agile", "Metrics"],
    content: `<p>Tracking sprint metrics such as velocity, burndown charts, and defect rates allows teams to identify inefficiencies early and improve overall delivery performance.</p>`,
  },
  {
    id: "2",
    slug: "bridging-qa-and-business-goals",
    title: "Bridging QA and Business Goals",
    excerpt:
      "Why QA professionals should understand business objectives for better product outcomes.",
    date: "2024",
    category: "Business",
    author: "Dibya Guragain",
    readTime: "6 min read",
    quote:
      "The best QA engineers think beyond bugs — they think about business value.",
    tags: ["QA", "Business", "Agile"],
    content: `<p>Aligning QA processes with business goals ensures that testing efforts contribute directly to product success and user satisfaction.</p>`,
  },
];

// ─── Admin ────────────────────────────────────────────────────────────────────
export const ADMIN_SESSION_KEY = "portfolio_admin_session";
export const ADMIN_DATA_KEY = "portfolio_admin_data";

export const ADMIN_SECTIONS = [
  { id: "site", label: "Site Info", icon: "user" },
  { id: "about", label: "About", icon: "file-text" },
  { id: "skills", label: "Skills", icon: "bar-chart" },
  { id: "experience", label: "Experience", icon: "briefcase" },
  { id: "education", label: "Education", icon: "book" },
  { id: "testimonials", label: "Testimonials", icon: "message" },
  { id: "portfolio", label: "Portfolio", icon: "grid" },
  { id: "blogs", label: "Blogs", icon: "newspaper" },
] as const;

export type AdminSectionId = (typeof ADMIN_SECTIONS)[number]["id"];

// ─── Defaults ────────────────────────────────────────────────────────────────
export const DEFAULT_SITE_CONFIG = siteConfig;
export const DEFAULT_ABOUT_BIO = aboutBio;
export const DEFAULT_SHORT_INFO = shortInfo;
export const DEFAULT_COUNTERS = counters;
export const DEFAULT_SKILLS = skills;
export const DEFAULT_SKILL_LIST = skillList;
export const DEFAULT_EXPERIENCE = experience;
export const DEFAULT_EDUCATION = education;
export const DEFAULT_TESTIMONIALS = testimonials;
export const DEFAULT_PORTFOLIO_ITEMS = portfolioItems;
export const DEFAULT_BLOGS_ITEMS = blogsItem;
