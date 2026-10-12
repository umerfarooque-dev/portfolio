export interface NavLink {
    name: string;
    href: string;
}

/**
 * Header navigation.
 *
 * Every entry points at a real route. The menu used to mix pages with home-page
 * anchors (`/#process`, `/#showcase`, `/#faq`, `/#contact`), which meant that
 * from anywhere other than the home page those items threw you back to it — and
 * "Contact" went to the home-page section even though a /contact page existed.
 *
 * Showcase and FAQ stay as home-page sections; they are reachable by scrolling,
 * and neither has enough content to carry a page of its own yet.
 */
export const navLinks: NavLink[] = [
    { name: "Work", href: "/work" },
    { name: "Services", href: "/services" },
    { name: "Process", href: "/process" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Resume", href: "/resume/Umer-Farooque-Resume.pdf" },
];
