export type NavLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
};

export type Skill = {
  name: string;
  category: string;
};

// Brand constants
export const BRAND = {
  name: "Alex Mercer",
  initials: "AM",
  tagline: "Creative Developer",
  email: "hello@alexmercer.dev",
  github: "https://github.com/alexmercer",
  twitter: "https://twitter.com/alexmercer",
  linkedin: "https://linkedin.com/in/alexmercer",
} as const;

// Single source of truth for navigation
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const navCTA = {
  label: "Hire Me",
  href: "#contact",
};