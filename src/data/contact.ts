import { servicePages } from "./services-pages";
import { SITE } from "./site";

export const CONTACT_LIMITS = { name: 120, email: 254, subject: 200, message: 5000 } as const;
export const CONTACT_SERVICES = servicePages.map(({ slug, name }) => ({ value: slug, label: name }));
export const CONTACT_CHANNELS = [
    { label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { label: "WhatsApp", value: SITE.phoneLabel, href: `https://wa.me/${SITE.whatsapp}` },
    { label: "LinkedIn", value: "LinkedIn profile", href: SITE.linkedin },
    { label: "GitHub", value: "GitHub profile", href: SITE.github },
];

export const CONTACT_COPY = {
    eyebrow: "Let’s work together",
    close: "Close enquiry",
    heading: "Let’s talk about your next project.",
    intro: "A web application, an AI-assisted workflow, connected business tools or a storefront improvement. Tell me what you want to build or automate.",
    availability: SITE.availability,
    directHeading: "Prefer a quick hello?",
    directIntro: "Reach me directly, or leave the details in the form. I usually reply within one working day.",
    locationLabel: "Based in",
    formLabel: "Project enquiry",
    formHeading: "What can I help you with?",
    formIntro: "Pick a service and share a little about the project. We can work out the details together.",
    name: "Your name", namePlaceholder: "How should I call you?",
    email: "Email address", emailPlaceholder: "you@company.com",
    service: "I’m interested in", servicePlaceholder: "Choose a service",
    subject: "Project name or website", subjectPlaceholder: "Your brand, website URL or a short title",
    message: "Tell me about your project", messagePlaceholder: "What are you building or improving? Share the goal, timeline and anything I should know.",
    optional: "Optional", required: "Required fields",
    submit: "Send project enquiry", submitting: "Sending your enquiry…",
    privacy: "Your details are only used to reply to this enquiry.",
    successHeading: "Thanks. Your enquiry is on its way.",
    successBody: "I’ll review the details and reply to your email. If you need to add something, you can reach me directly too.",
    sendAnother: "Send another enquiry",
    emailError: "Enter a valid email address so I can reply.",
    messageError: "Tell me a little about the project.",
    serviceError: "Choose the service you’re interested in.",
    nameError: "Please keep your name under 120 characters.",
    subjectError: "Please keep the project title under 200 characters.",
    messageLengthError: "Please keep the message under 5000 characters.",
    genericError: "Something went wrong. Please try again.",
    networkError: "Could not reach the server. Check your connection and try again.",
} as const;
