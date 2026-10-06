import { customProjects } from "./custom-projects";
import { storeProjects } from "./store-projects";

export type ProjectStack = "laravel" | "wordpress" | "shopify" | "nextjs";

export interface Project {
  id: string;
  title: string;
  description: string;
  liveUrl: string;
  imageUrl: string;
  tags?: string[];
  /** Override for Laravel/WordPress tab; if not set, derived from role */
  stack?: ProjectStack;
  // Detailed project information
  fullDescription?: string;
  scope?: string[];
  techStack?: string[];
  features?: string[];
  duration?: string;
  role?: string;
  category?: string;
  gallery?: string[];
  // Case Study fields
  tagline?: string;
  challenge?: string;
  approach?: string;
  results?: { value: string; label: string }[];
  codeUrl?: string;
}

const otherProjects: Project[] = [
  {
    id: "project-react-placeholder",
    title: "Project Name (React)",
    description: "Short one-line description of what it does.",
    liveUrl: "#",
    codeUrl: "#",
    imageUrl: "",
    tags: ["React", "Tailwind", "REST API"],
    stack: "nextjs",
    fullDescription: "A modern React web application designed with a sleek user interface, Tailwind CSS styling, and integration with REST APIs.",
    scope: ["Frontend architecture", "Responsive layout", "State management"],
    techStack: ["React", "Tailwind CSS", "JavaScript"],
    features: ["Interactive state", "Tailwind utility layout", "REST API integration"],
    duration: "2 weeks",
    role: "Frontend Developer",
    category: "Web Application"
  },
  {
    id: "project-nextjs-placeholder",
    title: "Project Name (Next.js)",
    description: "Short one-line description of what it does.",
    liveUrl: "#",
    codeUrl: "#",
    imageUrl: "",
    tags: ["Next.js", "TypeScript", "Auth"],
    stack: "nextjs",
    fullDescription: "A high-performance Next.js application built with TypeScript and featuring secure authentication mechanisms.",
    scope: ["Full Stack Development", "TypeScript configuration", "Auth setup"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Auth"],
    features: ["Server-Side Rendering", "TypeScript static checking", "Secure Auth integrations"],
    duration: "3 weeks",
    role: "Full Stack Developer",
    category: "SaaS Platform"
  },
  {
    id: "coffee-delivery",
    title: "Coffee Delivery",
    description: "A beautiful e-commerce platform for ordering coffee online.",
    liveUrl: "https://coffee-delivery-first.vercel.app/",
    imageUrl: "/projects/coffee-delivery.webp",
    tags: ["E-commerce", "Next.js", "Frontend"],
    stack: "nextjs",
    fullDescription: "Coffee Delivery is a modern e-commerce web application built with Next.js, allowing users to browse coffee varieties, add them to a shopping cart, and complete orders with a seamless user experience.",
    scope: [
      "Frontend development",
      "Shopping cart functionality",
      "Responsive design",
      "State management"
    ],
    techStack: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    features: [
      "Product catalog",
      "Cart management",
      "Checkout flow",
      "Responsive layout"
    ],
    duration: "1 month",
    role: "Frontend Developer",
    category: "E-commerce"
  },
  {
    id: "vadu",
    title: "VADU",
    description: "Connecting General Contractors with top-rated Sub-Contractors.",
    liveUrl: "https://vadu.io/",
    imageUrl: "",
    tags: ["Marketplace", "Laravel", "Contractors"],
    stack: "laravel",
    fullDescription: "VADU bridges trust between General Contractors and Sub-Contractors, providing transparency for both parties. A marketplace for services, top-rated professionals, and trending services—built to end fake reviews and help people find the right contractor.",
    scope: [
      "Marketplace platform development",
      "Service categories and listings",
      "Sub-contractor onboarding and profiles",
      "Search and discovery",
      "Multi-language support (English, Spanish)"
    ],
    techStack: ["Laravel", "PHP", "MySQL", "Blade", "Tailwind CSS"],
    features: [
      "Top-rated sub-contractors of the month",
      "Service categories and trending services",
      "Contractor search and discovery",
      "Professional and customer FAQs",
      "User accounts and authentication"
    ],
    duration: "Ongoing",
    role: "Full Stack Developer",
    category: "Marketplace",
    tagline: "Connecting General Contractors with top-rated Sub-Contractors",
    challenge: "General Contractors struggled to find trusted, verified sub-contractors, often falling victim to fake reviews and lack of transparency. The marketplace needed a reliable rating system and clear service categorization to bridge this gap.",
    approach: "Built a robust marketplace using Laravel and MySQL. Implemented a custom onboarding flow for sub-contractors, an advanced review verification system, and a multilingual interface in English and Spanish for broad accessibility.",
    results: [
      { value: "[ADD METRIC]", label: "Increase in Contractor Connections" },
      { value: "[ADD METRIC]", label: "Reduction in Fake Reviews" },
      { value: "100%", label: "Verified Profile Directory" }
    ],
    codeUrl: ""
  },
  {
    id: "outriderx",
    title: "OutriderX",
    description: "Marketing platform built on a custom WordPress theme.",
    liveUrl: "https://outriderx.com/",
    imageUrl: "/projects/outriderx.webp",
    tags: ["WordPress", "Custom Theme", "PHP"],
    stack: "wordpress",
    role: "WordPress Developer",
    category: "Marketing Site",
    fullDescription: "A marketing site for OutriderX built on a custom WordPress theme, with reusable content blocks so the marketing team can build pages without a developer, and performance work to keep Core Web Vitals green.",
    challenge:
      "The marketing team could not ship a landing page without a developer. Every campaign meant a ticket, a deploy and a wait, so campaigns got planned around developer availability rather than around the market.",
    approach:
      "Built the theme as a set of reusable ACF blocks with real editor previews, so pages are composed from a controlled kit. The team builds and publishes on its own; the design stays consistent because the blocks enforce it.",
    scope: [
      "Custom WordPress theme development",
      "Reusable block and template system",
      "Responsive layout across breakpoints",
      "SEO and performance tuning",
      "Third-party marketing integrations"
    ],
    techStack: ["WordPress", "PHP", "JavaScript", "MySQL", "ACF"],
    features: [
      "Custom theme built from scratch",
      "Reusable content blocks for the marketing team",
      "SEO and Core Web Vitals tuning",
      "Third-party marketing tool integrations"
    ],
    duration: "3 months"
  },
  {
    id: "hqpt",
    title: "HQPT",
    description: "Premium fitness and training connection.",
    liveUrl: "https://hqpt.com/",
    imageUrl: "/projects/hqpt.webp",
    tags: ["Health", "Fitness"],
    fullDescription: "HQPT connects fitness enthusiasts with professional trainers, offering personalized training programs and nutrition guidance. The platform streamlines the entire fitness journey from goal setting to achievement tracking.",
    challenge:
      "A corporate site that kept accumulating plugins to cover gaps the theme could not. Each addition loaded more script on every page, and Core Web Vitals had drifted into the red on mobile.",
    approach:
      "Rebuilt the pieces that mattered as custom blocks, removed the plugins they replaced, and worked the remaining third-party scripts down to what actually needed to load before first render.",
    scope: [
      "User authentication and profile management",
      "Trainer-client matching algorithm",
      "Workout and nutrition plan creation",
      "Progress tracking and analytics",
      "Payment gateway integration"
    ],
    features: [
      "Personalized workout plans",
      "Video call integration for virtual training",
      "Progress tracking with charts",
      "Nutrition calculator and meal planning",
      "Booking and scheduling system"
    ],
    duration: "4 months",
    role: "Lead Web Developer",
    category: "Fitness & Health",
    stack: "wordpress"
  },
  {
    id: "themindfulc",
    title: "The Mindful C",
    description: "Mindfulness and coaching platform.",
    liveUrl: "https://themindfulc.com/",
    imageUrl: "/projects/themindfulc.webp",
    tags: ["Coaching", "Wellness"],
    fullDescription: "A comprehensive mindfulness and life coaching platform that helps users achieve mental clarity and personal growth through guided sessions, meditation, and one-on-one coaching.",
    challenge:
      "An editorial publication where the writing is the product, running on a template designed for a business brochure. Long reads were hard to read: measure too wide, hierarchy flat, images fighting the text.",
    approach:
      "Designed the typography first — measure, scale and rhythm — then built the theme around it, with Gutenberg blocks that give writers the layouts they actually use rather than a generic page builder.",
    scope: [
      "Content management system for courses",
      "Live session booking and management",
      "User progress tracking",
      "Community forum development",
      "Mobile-responsive design"
    ],
    features: [
      "Guided meditation library",
      "Live coaching sessions",
      "Progress journals and reflections",
      "Community discussion forums",
      "Personalized coaching programs"
    ],
    duration: "2 months",
    role: "WordPress Developer",
    category: "Wellness & Coaching"
  },
  {
    id: "refreshlifepro",
    title: "Refresh Life Pro",
    description: "Interactive lifestyle management tool.",
    liveUrl: "https://refreshlifepro.com/",
    imageUrl: "/projects/refreshlifepro.webp",
    tags: ["Lifestyle", "Web App"],
    fullDescription: "Refresh Life Pro is an all-in-one lifestyle management platform helping users organize their daily routines, set goals, and maintain work-life balance through smart scheduling and habit tracking.",
    scope: [
      "Goal setting and tracking system",
      "Habit formation tools",
      "Calendar integration",
      "Reminder and notification system",
      "Data visualization and insights"
    ],
    features: [
      "Smart goal tracking",
      "Habit streaks and reminders",
      "Calendar sync (Google, Outlook)",
      "Weekly/monthly insights",
      "Customizable dashboards"
    ],
    duration: "3 months",
    role: "Full Stack Developer",
    category: "Productivity",
    tagline: "Interactive lifestyle management and productivity tool",
    challenge: "Modern professionals struggle with work-life balance and daily routine organization. Existing apps were either too complex or lacked clean, motivating dashboards to track habits and goals in one place.",
    approach: "Developed a Next.js web application utilizing Tailwind CSS and React hooks for seamless state management. Built interactive calendar integrations and custom habit-tracking charts using a liquid glass dashboard.",
    results: [
      { value: "[ADD METRIC]", label: "Active Daily Users" },
      { value: "[ADD METRIC]", label: "Habits Tracked Weekly" },
      { value: "[ADD METRIC]", label: "Faster page loads via Next.js SSG" }
    ],
    codeUrl: ""
  },
  {
    id: "lampo",
    title: "Lampo Shop",
    description: "E-commerce solution for lighting.",
    liveUrl: "https://en.lamposhop.com/",
    imageUrl: "/projects/lampo.webp",
    tags: ["E-commerce", "Lighting"],
    fullDescription: "Lampo Shop is a premium e-commerce platform specializing in designer lighting solutions. Features include advanced product filtering, 3D product previews, and seamless checkout experience.",
    challenge:
      "One WooCommerce catalogue selling into several language markets. The usual answer is a separate site per language, which means the same product maintained in several places and going out of sync the first week.",
    approach:
      "Kept one catalogue and one source of truth, with translated content layered over it and localised routes and currency, so adding a product is one job rather than one per market.",
    scope: [
      "E-commerce platform development",
      "Product catalog with advanced filters",
      "Shopping cart and checkout flow",
      "Payment gateway integration",
      "Inventory management system"
    ],
    features: [
      "Advanced product search and filters",
      "Wishlist and favorites",
      "Multi-currency support",
      "Customer reviews and ratings",
      "Order tracking system"
    ],
    duration: "2 months",
    role: "Shopify Developer",
    category: "E-commerce",
    stack: "wordpress"
  },
  {
    id: "timeless",
    title: "Timeless Touch Ceramics",
    description: "Artisan ceramics showcase and store.",
    liveUrl: "https://www.timelesstouchceramics.com/",
    imageUrl: "/projects/timeless.webp",
    tags: ["Art", "Store"],
    fullDescription: "An elegant online gallery and store for handcrafted ceramic art pieces. The platform beautifully showcases artisan work while providing a smooth purchasing experience.",
    scope: [
      "Portfolio gallery design",
      "E-commerce functionality",
      "Artist story and about pages",
      "Custom product pages",
      "Blog integration"
    ],
    features: [
      "Beautiful product galleries",
      "Custom product variations",
      "Artist biography section",
      "Blog for ceramic techniques",
      "Secure checkout with multiple payment options"
    ],
    duration: "1.5 months",
    role: "WordPress & WooCommerce Developer",
    category: "E-commerce & Art"
  },
  {
    id: "anphie",
    title: "Anphie Jewels",
    description: "Luxury jewelry brand website.",
    liveUrl: "https://anphiejewels.com/",
    imageUrl: "/projects/anphie.webp",
    tags: ["Luxury", "Fashion"],
    fullDescription: "Anphie Jewels is a luxury jewelry e-commerce platform featuring high-end collections with stunning visuals, detailed product information, and premium user experience.",
    challenge:
      "Jewellery sells on detail — stone, setting, finish — and a stock product template reduces all of that to a gallery and a price. Customers were emailing to ask what the listing should already have told them.",
    approach:
      "Rebuilt the product page around the detail: material and specification surfaced inline, imagery given the room to carry the craft, and the variant structure changed so finish and size stopped fighting each other.",
    scope: [
      "Luxury brand website design",
      "High-resolution image galleries",
      "Product customization options",
      "Secure payment processing",
      "Customer account management"
    ],
    features: [
      "360° product views",
      "Virtual try-on feature",
      "Gift wrapping options",
      "Personalization services",
      "VIP customer portal"
    ],
    duration: "3 months",
    role: "Shopify Plus Developer",
    category: "Luxury E-commerce",
    stack: "wordpress"
  },
  {
    id: "rightways",
    title: "Rightways",
    description: "Corporate consulting and strategy.",
    liveUrl: "https://rightways.com/",
    imageUrl: "/projects/rightways.webp",
    tags: ["Corporate", "Strategies"],
    fullDescription: "Rightways is a corporate consulting firm's website showcasing their services, case studies, and thought leadership in business strategy and organizational development.",
    challenge:
      "Leads arrived by email with no structure, so nothing could be followed up reliably and nobody could say which service page produced which enquiry.",
    approach:
      "Put structured forms on each service page with validation and spam handling, and recorded the source with the submission so the enquiries are attributable rather than an undifferentiated inbox.",
    scope: [
      "Corporate website development",
      "Service pages and case studies",
      "Team member profiles",
      "Contact and inquiry forms",
      "Blog and resources section"
    ],
    features: [
      "Service portfolio showcase",
      "Client testimonials",
      "Case study library",
      "Team directory",
      "Resource center with whitepapers"
    ],
    duration: "2 months",
    role: "WordPress Developer",
    category: "Corporate Website"
  },
  {
    id: "taxformhero",
    title: "Tax Form Hero",
    description: "Automated tax form processing.",
    liveUrl: "https://taxformhero.com/",
    imageUrl: "/projects/taxformhero.webp",
    tags: ["Finance", "SaaS"],
    fullDescription: "Tax Form Hero automates the complex process of tax form generation and filing, making tax season stress-free for individuals and small businesses.",
    scope: [
      "Tax form automation system",
      "User data security and encryption",
      "PDF generation and e-filing",
      "Payment processing",
      "Customer support portal"
    ],
    features: [
      "Automated form filling",
      "Tax calculation engine",
      "E-filing integration",
      "Document storage and retrieval",
      "Multi-year tax history"
    ],
    duration: "5 months",
    role: "Full Stack Developer",
    category: "FinTech SaaS",
    tagline: "Automated tax form processing and FinTech SaaS",
    challenge: "Individuals and small businesses face stressful, error-prone manual tax filing processes. The application required a highly secure, automated solution to compile and file tax documents quickly.",
    approach: "Created a secure FinTech SaaS using Laravel, integrating advanced data encryption, automated PDF generation engines, and secure payment processing for filing fees.",
    results: [
      { value: "[ADD METRIC]", label: "Tax Forms Processed" },
      { value: "[ADD METRIC]", label: "Time Saved per User" },
      { value: "[ADD METRIC]", label: "Filing Accuracy Rate" }
    ],
    codeUrl: ""
  },
  {
    id: "khebrati",
    title: "Khebrati",
    description: "Professional expertise sharing platform.",
    liveUrl: "https://khebrati.com/",
    imageUrl: "/projects/khebrati.webp",
    tags: ["Education", "LMS"],
    fullDescription: "Khebrati connects professionals with learners, enabling knowledge sharing through courses, mentorship programs, and interactive workshops.",
    scope: [
      "Learning management system",
      "Course creation tools",
      "Video streaming integration",
      "Payment and subscription system",
      "Student progress tracking"
    ],
    features: [
      "Course marketplace",
      "Live video sessions",
      "Quizzes and assessments",
      "Certificates of completion",
      "Discussion forums"
    ],
    duration: "4 months",
    role: "Lead Developer",
    category: "EdTech Platform"
  },
  {
    id: "vara",
    title: "Vara Corp",
    description: "Enterprise corporate solutions.",
    liveUrl: "https://www.vara-corp.com/",
    imageUrl: "/projects/vara.webp",
    tags: ["Enterprise", "Solutions"],
    fullDescription: "Vara Corp provides enterprise-level corporate solutions with a focus on digital transformation and business process optimization.",
    scope: [
      "Enterprise website development",
      "Multi-language support",
      "Service catalog",
      "Client portal",
      "Resource library"
    ],
    features: [
      "Multi-language website",
      "Service request system",
      "Client testimonials",
      "News and updates blog",
      "Contact management"
    ],
    duration: "2.5 months",
    role: "WordPress Developer",
    category: "Enterprise Website"
  },
  {
    id: "xaigent",
    title: "Xaigent",
    description: "AI-driven business intelligence.",
    liveUrl: "https://xaigent.net/",
    imageUrl: "/projects/xaigent.webp",
    tags: ["AI", "Analytics"],
    fullDescription: "Xaigent leverages artificial intelligence to provide businesses with actionable insights, predictive analytics, and automated decision-making tools.",
    scope: [
      "AI dashboard development",
      "Data visualization",
      "API integrations",
      "Real-time analytics",
      "Machine learning model integration"
    ],
    features: [
      "Predictive analytics dashboard",
      "Custom AI models",
      "Real-time data processing",
      "Automated reporting",
      "API for third-party integrations"
    ],
    duration: "6 months",
    role: "Full Stack Developer",
    category: "AI & Analytics"
  },
  {
    id: "dokanat",
    title: "Dokanat",
    description: "Online marketplace platform.",
    liveUrl: "https://www.dokanat.com/",
    imageUrl: "/projects/dokanat.webp",
    tags: ["Marketplace", "Store"],
    fullDescription: "Dokanat is a comprehensive online marketplace connecting buyers and sellers across multiple categories with secure transactions and reliable delivery.",
    scope: [
      "Multi-vendor marketplace development",
      "Vendor dashboard",
      "Product listing and management",
      "Order processing system",
      "Review and rating system"
    ],
    features: [
      "Multi-vendor support",
      "Advanced search and filters",
      "Seller analytics",
      "Escrow payment system",
      "Dispute resolution"
    ],
    duration: "5 months",
    role: "Backend Developer",
    category: "Marketplace Platform"
  },
  {
    id: "hajiq",
    title: "Hajiq",
    description: "Pilgrimage services and logistics.",
    liveUrl: "https://hajiq.com/",
    imageUrl: "/projects/hajiq.webp",
    tags: ["Logistics", "Services"],
    fullDescription: "Hajiq provides comprehensive pilgrimage services including travel arrangements, accommodation booking, and guided tours for religious journeys.",
    scope: [
      "Booking management system",
      "Travel package creation",
      "Payment processing",
      "Customer communication portal",
      "Itinerary management"
    ],
    features: [
      "Package booking system",
      "Group management",
      "Travel itineraries",
      "Document management",
      "Customer support chat"
    ],
    duration: "3 months",
    role: "WordPress & WooCommerce Developer",
    category: "Travel & Services"
  },
  {
    id: "marisavaz",
    title: "Marisa Vaz",
    description: "Personal brand and portfolio.",
    liveUrl: "https://marisavaz.co.mz/home/en/home/",
    imageUrl: "/projects/marisavaz.webp",
    tags: ["Portfolio", "Creative"],
    fullDescription: "A stunning personal brand website showcasing professional achievements, portfolio work, and thought leadership in the industry.",
    scope: [
      "Personal branding website",
      "Portfolio showcase",
      "Blog integration",
      "Contact and inquiry system",
      "Multi-language support"
    ],
    features: [
      "Portfolio gallery",
      "Blog and articles",
      "Speaking engagements",
      "Media appearances",
      "Contact form"
    ],
    duration: "1.5 months",
    role: "WordPress Developer",
    category: "Personal Portfolio"
  },
  {
    id: "landology",
    title: "Landology",
    description: "Real estate and land development.",
    liveUrl: "https://landologyinc.com/",
    imageUrl: "/projects/landology.webp",
    tags: ["Real Estate", "Web"],
    fullDescription: "Landology specializes in land development and real estate investment, providing comprehensive property listings and development project showcases.",
    scope: [
      "Property listing platform",
      "Interactive map integration",
      "Project showcase pages",
      "Inquiry and lead management",
      "Virtual property tours"
    ],
    features: [
      "Property search with maps",
      "Virtual tours",
      "Investment calculator",
      "Project timelines",
      "Lead capture forms"
    ],
    duration: "4 months",
    role: "Full Stack Developer",
    category: "Real Estate",
    stack: "wordpress"
  },
  {
    id: "finalchoice",
    title: "Final Choice",
    description: "Consumer choice awards and rankings.",
    liveUrl: "https://www.finalchoice.ca/",
    imageUrl: "/projects/finalchoice.webp",
    tags: ["Directory", "Awards"],
    fullDescription: "Final Choice is a consumer choice awards platform that recognizes excellence in various industries through public voting and expert reviews.",
    scope: [
      "Voting system development",
      "Business directory",
      "Review and rating system",
      "Award categories management",
      "Results and analytics"
    ],
    features: [
      "Public voting system",
      "Business profiles",
      "Review submissions",
      "Award badges",
      "Winners showcase"
    ],
    duration: "3 months",
    role: "WordPress Developer",
    category: "Awards Platform"
  },
  {
    id: "rxdirect",
    title: "RX Direct",
    description: "Direct to consumer pharmacy services.",
    liveUrl: "https://rx-direct.co.uk/",
    imageUrl: "/projects/rxdirect.webp",
    tags: ["Health", "E-commerce"],
    fullDescription: "RX Direct provides direct-to-consumer pharmacy services with online prescription management, medication delivery, and health consultations.",
    scope: [
      "E-commerce pharmacy platform",
      "Prescription upload and verification",
      "Secure payment processing",
      "Order tracking system",
      "Customer health records"
    ],
    features: [
      "Prescription management",
      "Medication reminders",
      "Auto-refill options",
      "Health consultations",
      "Secure delivery tracking"
    ],
    duration: "3.5 months",
    role: "Shopify Developer",
    category: "Healthcare E-commerce",
    stack: "laravel"
  },
  {
    id: "easyrevie",
    title: "Easy Revie",
    description: "Review management system.",
    liveUrl: "https://easyrevie.sg/",
    imageUrl: "/projects/easyrevie.webp",
    tags: ["SaaS", "Business"],
    fullDescription: "Easy Revie is a comprehensive review management platform helping businesses collect, manage, and showcase customer reviews across multiple platforms.",
    scope: [
      "Review aggregation system",
      "Multi-platform integration",
      "Analytics dashboard",
      "Review response tools",
      "Widget generation"
    ],
    features: [
      "Multi-platform review sync",
      "Sentiment analysis",
      "Automated review requests",
      "Response templates",
      "Embeddable widgets"
    ],
    duration: "4 months",
    role: "Full Stack Developer",
    category: "SaaS Platform"
  },
  {
    id: "fulham",
    title: "Fulham Health",
    description: "Healthcare provider information.",
    liveUrl: "https://fulhamhealth.com/",
    imageUrl: "/projects/fulham.webp",
    tags: ["Healthcare", "Medical"],
    fullDescription: "Fulham Health provides comprehensive healthcare information, doctor directories, and appointment booking services for patients seeking quality medical care.",
    scope: [
      "Healthcare information portal",
      "Doctor directory and profiles",
      "Appointment booking system",
      "Patient resources library",
      "Contact and inquiry forms"
    ],
    features: [
      "Doctor search and profiles",
      "Online appointment booking",
      "Health articles and resources",
      "Patient testimonials",
      "Insurance information"
    ],
    duration: "2 months",
    role: "WordPress Developer",
    category: "Healthcare Website"
  },
  {
    id: "valuesofgolf",
    title: "Values of Golf",
    description: "Golfing community and values.",
    liveUrl: "https://www.valuesofgolf.com/",
    imageUrl: "/projects/valuesofgolf.webp",
    tags: ["Sports", "Community"],
    fullDescription: "Values of Golf is a community platform celebrating the sport's traditions, values, and culture while connecting golf enthusiasts worldwide.",
    scope: [
      "Community website development",
      "Content management system",
      "Member profiles and forums",
      "Event calendar",
      "Newsletter integration"
    ],
    features: [
      "Community forums",
      "Member directory",
      "Event listings",
      "Blog and articles",
      "Photo galleries"
    ],
    duration: "2 months",
    role: "WordPress Developer",
    category: "Community Website"
  }
];

/** Storefront work leads; the rest of the catalogue follows. */
export const projects: Project[] = [...storeProjects, ...customProjects, ...otherProjects];

/**
 * `otherProjects` carries two seeded template entries so the shape of a new
 * project is always visible in the file. They must never reach a public listing,
 * and this is the one place that rule is expressed.
 */
export const isShipped = (project: Project) => !project.id.includes("placeholder");

/** Use this, not `projects`, for anything a visitor can see. */
export const shippedProjects: Project[] = projects.filter(isShipped);

/** The three groups the work filters expose. */
export type ProjectGroup = "shopify" | "wordpress" | "custom";

export const PROJECT_GROUPS: { id: ProjectGroup; label: string }[] = [
  { id: "shopify", label: "Shopify" },
  { id: "wordpress", label: "WordPress" },
  { id: "custom", label: "Custom" },
];

/** Laravel and Next.js work both read as custom development. */
export function getProjectGroup(project: Project): ProjectGroup {
  const stack = getProjectStack(project);
  if (stack === "shopify") return "shopify";
  if (stack === "wordpress") return "wordpress";
  return "custom";
}

/** Laravel vs WordPress vs Shopify vs Next.js for tabs */
export function getProjectStack(project: Project): ProjectStack {
  if (project.stack) return project.stack;
  const r = project.role?.toLowerCase() ?? "";
  if (r.includes("wordpress")) return "wordpress";
  if (r.includes("shopify")) return "shopify";
  if (r.includes("next") || r.includes("react") || r.includes("frontend")) return "nextjs";
  return "laravel";
}
