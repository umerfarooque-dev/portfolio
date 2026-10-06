import type { Project } from "./projects";

/**
 * React / Next.js application work — the "Custom" group in the work filters.
 * Separate from the storefront and WordPress catalogues so each group can be
 * edited without touching the others.
 */
export const customProjects: Project[] = [
  {
    id: "coach-huddle",
    title: "Coach Huddle",
    description: "Admin dashboard with full CRUD, protected routes and real-time notifications.",
    tagline: "A coaching back office that updates without a refresh.",
    liveUrl: "#",
    imageUrl: "",
    tags: ["Next.js", "WebSockets", "SSR"],
    stack: "nextjs",
    role: "Frontend Developer",
    category: "Admin Dashboard",
    fullDescription:
      "An administrative dashboard for coaching teams: full create/read/update/delete across every resource, route protection by role, and WebSocket-driven notifications so changes made by one user appear for the rest without a reload.",
    challenge:
      "Coaching staff worked from the same records at the same time, and the dashboard only refreshed when somebody hit reload. Two people editing a roster would silently overwrite each other, and nobody found out until a session had already been scheduled against the wrong data.",
    approach:
      "Put the resource list behind WebSockets so a change made by one user appears for everyone else immediately, and gated every route by role so the permission model was part of the architecture rather than a check bolted onto each page.",
    scope: ["CRUD across all resources", "Role-based protected routes", "WebSocket notifications", "Server-side rendering"],
    techStack: ["Next.js", "React", "WebSockets", "TypeScript"],
    features: ["Live notification feed", "Role-gated routing", "Server-rendered dashboard views", "Optimistic list updates"],
  },
  {
    id: "landlord-logic",
    title: "Landlord Logic",
    description: "E-commerce platform with Redux state, cart and checkout, and pre-rendered product pages.",
    tagline: "A property-tools storefront with a fully pre-rendered catalogue.",
    liveUrl: "https://landlord-logic-web.vercel.app/",
    imageUrl: "/projects/landlord-logic.webp",
    tags: ["Next.js", "Redux", "Auth"],
    stack: "nextjs",
    role: "Frontend Developer",
    category: "E-commerce",
    fullDescription:
      "An e-commerce build where product pages are pre-rendered for speed and search, with cart and checkout state held in Redux so it survives navigation, and authentication gating the account area.",
    challenge:
      "Cart state lived in component state, so moving between the catalogue and a product page lost it. Product pages were client-rendered, which meant they were slow on first paint and invisible to search.",
    approach:
      "Moved cart and checkout state into Redux so it survives navigation, and pre-rendered the product pages at build time so they arrive as HTML rather than as a loading spinner.",
    scope: ["Redux state architecture", "Cart and checkout flow", "Static product page generation", "Authentication"],
    techStack: ["Next.js", "React", "Redux", "TypeScript"],
    features: ["Persistent cart across routes", "Pre-rendered product pages", "Account authentication", "Checkout flow"],
  },
  {
    id: "newvana",
    title: "Newvana",
    description: "AI-driven reflection platform with secure auth and real-time listening.",
    tagline: "A reflection app that listens and responds as you speak.",
    liveUrl: "https://newvana.vercel.app/",
    imageUrl: "/projects/newvana.webp",
    tags: ["Next.js", "REST APIs", "Auth"],
    stack: "nextjs",
    role: "Frontend Developer",
    category: "Web Application",
    fullDescription:
      "A guided reflection product built on Next.js, with secure authentication and a real-time listening mode that streams input to the backend and renders responses as they arrive.",
    challenge:
      "The reflection flow is a conversation, and a conversation that waits for a complete response before showing anything feels broken. The first build sent a request and sat on it.",
    approach:
      "Switched to streamed responses so text appears as it arrives, and put authentication in front of the session so a reflection belongs to an account rather than a browser tab.",
    scope: ["Secure authentication", "Real-time listening interface", "REST API integration", "Session handling"],
    techStack: ["Next.js", "React", "REST APIs", "TypeScript"],
    features: ["Real-time listening mode", "Authenticated sessions", "Streamed responses", "Responsive layout"],
  },
  {
    id: "sansaino",
    title: "Sansaino",
    description: "Global talent marketplace with chat, milestone tracking and EOR compliance.",
    tagline: "Hiring across borders, with the compliance built in.",
    liveUrl: "#",
    imageUrl: "",
    tags: ["Next.js", "Payments", "Carousels"],
    stack: "nextjs",
    role: "Frontend Developer",
    category: "Marketplace",
    fullDescription:
      "A marketplace connecting companies with talent internationally: in-app chat, milestone-based project tracking, payment flows, and employer-of-record compliance steps folded into onboarding.",
    challenge:
      "Hiring across borders means the compliance steps are part of the product, not paperwork that happens afterwards. Dropping employer-of-record requirements into a final checkout screen lost people who had already done the work of finding a candidate.",
    approach:
      "Folded the compliance steps into onboarding where the context is, and tracked engagements as milestones so both sides can see what has been agreed, what is done and what is owed without asking.",
    scope: ["Marketplace UI", "In-app chat", "Milestone tracking", "Payment and EOR flows"],
    techStack: ["Next.js", "React", "TypeScript"],
    features: ["Real-time chat", "Milestone progress tracking", "Payment flow", "Compliance onboarding"],
  },
  {
    id: "dine-albania",
    title: "Dine Albania",
    description: "Dining discovery site with theme toggling, internationalisation and Google Maps.",
    tagline: "Restaurant discovery in two languages, mapped.",
    liveUrl: "https://armando-web.vercel.app/",
    imageUrl: "/projects/dine-albania.webp",
    tags: ["Next.js", "i18n", "Google Maps"],
    stack: "nextjs",
    role: "Frontend Developer",
    category: "Directory",
    fullDescription:
      "A dining discovery site with light and dark themes, full internationalisation, and Google Maps integration so venues can be browsed by location as well as by listing.",
    challenge:
      "A dining directory serves two languages and two ways of looking: people who browse a list and people who want to know what is nearby. Building the list first and adding a map later usually produces a map that does not agree with the list.",
    approach:
      "Modelled venues once and rendered them into both the listing and the map from the same source, with internationalised routing so each language has its own indexable URL rather than a query parameter.",
    scope: ["Internationalisation", "Light/dark theming", "Google Maps integration", "Venue listings"],
    techStack: ["Next.js", "React", "next-intl", "Google Maps API"],
    features: ["Language switching", "Theme toggle", "Map-based browsing", "Venue detail pages"],
  },
  {
    id: "dental-source",
    title: "Dental Source",
    description: "Order-management application with multi-step forms and file upload validation.",
    tagline: "Lab orders submitted right the first time.",
    liveUrl: "https://dental-source.vercel.app/en/login",
    imageUrl: "/projects/dental-source.webp",
    tags: ["Next.js", "File Upload", "Forms"],
    stack: "nextjs",
    role: "Frontend Developer",
    category: "Web Application",
    fullDescription:
      "An order-management tool for dental work: multi-step order forms that validate as they go, and file uploads checked for type and size before they reach the server.",
    challenge:
      "Lab orders were arriving incomplete — wrong file formats, missing fields, attachments too large to process. Every bad order became a phone call, and the fix was always the same information asked for a second time.",
    approach:
      "Broke the order into steps that validate as you go, and checked uploads for type and size on the client before the request and again on the server, so an order cannot be submitted in a state the lab cannot fulfil.",
    scope: ["Multi-step order forms", "Client and server validation", "File upload handling", "Authenticated access"],
    techStack: ["Next.js", "React", "TypeScript"],
    features: ["Step-by-step order flow", "Validated file uploads", "Saved draft orders", "Localised routes"],
  },
  {
    id: "improself",
    title: "Improself",
    description: "Marketing site built around GSAP animation and a fully responsive layout.",
    tagline: "A marketing site where the motion carries the pitch.",
    liveUrl: "https://zaki-web-seven.vercel.app/",
    imageUrl: "/projects/improself.webp",
    tags: ["React", "GSAP", "Responsive"],
    stack: "nextjs",
    role: "Frontend Developer",
    category: "Marketing Site",
    fullDescription:
      "A marketing site where scroll-driven GSAP animation does the storytelling, built to hold up from wide desktop down to small phones without losing the sequence.",
    challenge:
      "Scroll-driven storytelling usually means a desktop sequence that collapses into nonsense on a phone, and nothing at all for anyone who has asked their system to reduce motion.",
    approach:
      "Built the sequence with GSAP against breakpoints rather than pixel positions, so the story holds from wide desktop down to small phones, with a reduced-motion path that shows the same content without the movement.",
    scope: ["GSAP scroll animation", "Responsive layout system", "Component architecture"],
    techStack: ["React", "GSAP", "ScrollTrigger"],
    features: ["Scroll-triggered sequences", "Responsive from mobile to wide desktop", "Reduced-motion fallback"],
  },
];
