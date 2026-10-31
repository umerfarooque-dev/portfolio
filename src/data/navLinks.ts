export interface NavLink {
    name: string;
    href: string;
}

export const START_PROJECT_LINK: NavLink = { name: "Start project", href: "/contact" };

/** Shared page navigation; Showcase and Free Assessment have dedicated routes. */
export const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/work" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Showcase", href: "/showcase" },
    { name: "About", href: "/about" },
    { name: "Free Assessment", href: "/free-speed-audit" },
    { name: "Contact", href: "/contact" },
];
