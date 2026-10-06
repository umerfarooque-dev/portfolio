import { PrismaClient } from '@prisma/client';
import { projects, getProjectStack } from '../src/data/projects';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Clear existing data to prevent duplicates
  await prisma.service.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.education.deleteMany();

  for (const p of projects) {
    const stack = getProjectStack(p);
    
    // Safely parse arrays to JSON strings
    const tags = p.tags ? JSON.stringify(p.tags) : '[]';
    const scope = p.scope ? JSON.stringify(p.scope) : '[]';
    const techStack = p.techStack ? JSON.stringify(p.techStack) : '[]';
    const features = p.features ? JSON.stringify(p.features) : '[]';
    const gallery = p.gallery ? JSON.stringify(p.gallery) : '[]';

    const project = await prisma.project.upsert({
      where: { slug: p.id },
      update: {
        title: p.title,
        description: p.description,
        liveUrl: p.liveUrl,
        imageUrl: p.imageUrl,
        tags,
        stack,
        fullDescription: p.fullDescription,
        scope,
        techStack,
        features,
        duration: p.duration,
        role: p.role,
        category: p.category,
        gallery,
      },
      create: {
        slug: p.id,
        title: p.title,
        description: p.description,
        liveUrl: p.liveUrl,
        imageUrl: p.imageUrl,
        tags,
        stack,
        fullDescription: p.fullDescription,
        scope,
        techStack,
        features,
        duration: p.duration,
        role: p.role,
        category: p.category,
        gallery,
      },
    });
    console.log(`Upserted project: ${project.title}`);
  }

  // Seed Skills
  const skills = [
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", category: "Frontend" },
    { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg", category: "Backend" },
    { name: "WordPress", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-original.svg", category: "CMS" },
    { name: "Stripe", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/stripe/stripe-original.svg", category: "Payments" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", category: "Frontend" },
    { name: "SEO", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg", category: "Optimization" },
  ];

  for (const s of skills) {
    await prisma.skill.create({ data: s });
  }

  // Seed Services (About section)
  const services = [
    { title: "Full Stack Development", description: "Building robust applications with Laravel and React/Next.js, featuring RBAC and RESTful APIs.", icon: "Code2" },
    { title: "E-commerce & CMS", description: "Delivering 50+ production websites using WordPress, Shopify, and custom PHP frameworks.", icon: "ShoppingCart" },
    { title: "Payment Integration", description: "End-to-end Stripe and PayPal integration: checkout UI, webhooks, and automated flows.", icon: "Zap" },
    { title: "Performance Optimization", description: "Reducing bundle sizes by ~30% and improving Core Web Vitals for better SEO.", icon: "Cpu" },
    { title: "Custom Themes & Plugins", description: "Creating reusable frameworks that reduce development time by ~25%.", icon: "Layout" },
    { title: "System Migration", description: "Modernizing legacy jQuery projects into high-performance React.js SPAs.", icon: "RefreshCw" },
  ];

  for (const s of services) {
    await prisma.service.create({ data: s });
  }

  // Seed Education
  await prisma.education.create({
    data: {
      degree: "BS Information Technology",
      institution: "Sindh Agriculture University, Tandojam",
      period: "2019 - 2023",
      grade: "3.5+",
    }
  });

  // Seed Site Config
  await prisma.siteContent.upsert({
    where: { id: "site-settings" },
    update: {
      heroTitle: "Full-Stack Web Developer",
      heroDescription: "Specialized in E-commerce, SaaS, and Corporate solutions. Delivered 50+ production websites with custom Laravel & WordPress architectures.",
      aboutTitle: "About Me",
      aboutText1: "I am a Full-Stack Web Developer with 2+ years of hands-on experience at Tafsol Technology. I have a proven track record of delivering high-quality, scalable digital products using modern web patterns.",
      aboutText2: "From building custom Shopify storefronts to architecting Laravel admin dashboards like VADU, I focus on performance, security, and consistent on-time delivery.",
      github: "https://github.com/umerfarooque00786",
      linkedin: "https://www.linkedin.com/in/umer-farooq-296252272",
      email: "00.umer786@gmail.com",
      whatsapp: "+92 300 302 4283",
    },
    create: {
      id: "site-settings",
      heroTitle: "Full-Stack Web Developer",
      heroDescription: "Specialized in E-commerce, SaaS, and Corporate solutions. Delivered 50+ production websites with custom Laravel & WordPress architectures.",
      heroCtaText: "View My Projects",
      heroCtaUrl: "#projects",
      aboutTitle: "About Me",
      aboutText1: "I am a Full-Stack Web Developer with 2+ years of hands-on experience at Tafsol Technology. I have a proven track record of delivering high-quality, scalable digital products using modern web patterns.",
      aboutText2: "From building custom Shopify storefronts to architecting Laravel admin dashboards like VADU, I focus on performance, security, and consistent on-time delivery.",
      aboutImage: "/images/professional.png",
      resumeUrl: "/resume/Umer-Farooque-Resume.pdf",
      github: "https://github.com/umerfarooque00786",
      linkedin: "https://www.linkedin.com/in/umer-farooq-296252272",
      email: "00.umer786@gmail.com",
      whatsapp: "+92 300 302 4283",
    }
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
