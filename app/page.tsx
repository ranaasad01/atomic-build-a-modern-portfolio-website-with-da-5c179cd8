"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Mail, Star, Code, Layout, Terminal, Sparkles, Check, ArrowUp, Eye, Heart, Activity, FileCode } from 'lucide-react';
import { BRAND } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { useTranslations } from "next-intl";

// ─── Inline data ────────────────────────────────────────────────────────────

const projects = [
  {
    id: "1",
    title: "Luminary Design System",
    description:
      "A comprehensive component library built for scale. 120+ accessible components, dark mode first, with full Storybook documentation and automated visual regression testing.",
    tags: ["React", "TypeScript", "Storybook", "Radix UI"],
    image: "https://cdn.prod.website-files.com/5e60642a30fed6e8bad55789/5f374060a5fdcb0681140afc_LDC_meta-image-2.png",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "2",
    title: "Orbit Analytics Dashboard",
    description:
      "Real-time SaaS analytics platform processing 2M+ events per day. Custom charting engine, WebSocket live updates, and a multi-tenant permission model.",
    tags: ["Next.js", "Recharts", "Prisma", "PostgreSQL"],
    image: "https://i.ytimg.com/vi/glCQ5z3yMno/maxresdefault.jpg",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "3",
    title: "Pulse E-Commerce Platform",
    description:
      "Headless commerce storefront with edge-rendered product pages, AI-powered search, and a custom checkout flow that cut drop-off by 34%.",
    tags: ["Next.js", "Shopify", "Algolia", "Stripe"],
    image: "https://www.macrohype.com/wp-content/uploads/2025/07/Pulse-E-Commerce-Summit-2025.jpg",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
];

const skills = [
  { name: "React & Next.js", category: "Frontend", level: 96 },
  { name: "TypeScript", category: "Language", level: 93 },
  { name: "Node.js & APIs", category: "Backend", level: 88 },
  { name: "UI / UX Design", category: "Design", level: 85 },
  { name: "PostgreSQL", category: "Database", level: 82 },
  { name: "DevOps & CI/CD", category: "Infrastructure", level: 78 },
];

const services = [
  {
    icon: Layout,
    title: "Product Design",
    description:
      "From wireframes to polished interfaces. I craft experiences that feel intuitive and look exceptional, with a focus on accessibility and conversion.",
  },
  {
    icon: Code,
    title: "Full-Stack Development",
    description:
      "End-to-end engineering with modern stacks. Clean, tested, and documented code that scales with your business and your team.",
  },
  {
    icon: Terminal,
    title: "Performance Engineering",
    description:
      "Audits, optimizations, and architectural improvements. I turn slow, fragile apps into fast, resilient products your users love.",
  },
  {
    icon: Sparkles,
    title: "AI Integration",
    description:
      "Practical AI features that add real value. Semantic search, generative UI, smart recommendations — built thoughtfully into your product.",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO at Luminary",
    avatar: "https://www.lizard.global/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Flizardwebsite%2Fimage%2Fupload%2Fv1742208119%2Flizard_website2025%2F7_types_of_AI_integration_80eefdf8e9.png&w=3840&q=75&dpl=dpl_GDqv4mtjr9PTFX7t3k9HEpwC9HoF",
    quote:
      "Alex delivered a design system that our team of 30 engineers adopted in weeks. The quality of the code and documentation was unlike anything we had seen from a freelancer.",
    stars: 5,
  },
  {
    name: "Marcus Webb",
    role: "Founder at Orbit",
    avatar: "https://static.www.nfl.com/image/private/t_headshot_desktop/league/aewahyauhdstskbbuq43",
    quote:
      "We went from a broken prototype to a production-ready dashboard in eight weeks. Alex's ability to move fast without cutting corners is genuinely rare.",
    stars: 5,
  },
  {
    name: "Priya Nair",
    role: "Product Lead at Pulse",
    avatar: "https://media.licdn.com/dms/image/v2/D5622AQE3NpM1FP01Yg/feedshare-shrink_800/B56Zf4pvKcGUAg-/0/1752223383746?e=2147483647&v=beta&t=C11dC6M36dpAKpcbBRMtusPrnkgE-cNJfHc93ZNpFoQ",
    quote:
      "The new checkout flow Alex built reduced our drop-off rate by 34%. That single project paid for itself many times over in the first quarter.",
    stars: 5,
  },
];

const stats = [
  { value: "60+", label: "Projects shipped" },
  { value: "34%", label: "Avg. conversion lift" },
  { value: "8", label: "Years of experience" },
  { value: "99%", label: "Client satisfaction" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/8 text-purple-400 text-xs font-medium tracking-widest uppercase font-inter">
      {children}
    </span>
  );
}

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120 * index);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-white/70 font-inter">{name}</span>
        <span className="text-xs text-purple-400 font-medium font-inter">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: mounted ? `${level}%` : `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeOut", delay: index * 0.08 }}
          className="h-full rounded-full bg-gradient-to-r from-purple-600 to-purple-400"
        />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.article
      variants={fadeInUp}
      whileHover={shouldReduce ? {} : { y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative flex flex-col rounded-2xl border border-white/6 bg-white/3 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_32px_-8px_rgba(0,0,0,0.4)] hover:border-purple-500/20 hover:shadow-[0_1px_2px_rgba(0,0,0,0.2),0_16px_48px_-8px_rgba(168,85,247,0.12)] transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-white/5">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/80 via-transparent to-transparent" />
        {project.featured && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-purple-500/90 text-white text-xs font-medium font-inter backdrop-blur-sm">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div>
          <h3 className="font-syne font-semibold text-lg text-white mb-2 leading-snug">
            {project.title}
          </h3>
          <p className="text-sm text-white/50 leading-relaxed font-inter">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 text-xs text-white/50 font-inter"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-2 border-t border-white/5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-purple-400 transition-colors duration-200 font-inter"
            >
              <Eye size={13} />
              Live demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors duration-200 font-inter"
            >
              <Github size={13} />
              Source
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Contact form state ──────────────────────────────────────────────────────

function ContactForm() {
  const t = useTranslations();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center gap-4 py-16 text-center"
      >
        <div className="w-14 h-14 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
          <Check size={24} className="text-purple-400" />
        </div>
        <h3 className="font-syne font-semibold text-xl text-white">
          {t("contact.successTitle")}
        </h3>
        <p className="text-white/50 text-sm font-inter max-w-xs">
          {t("contact.successMessage")}
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="text-xs text-white/40 font-medium font-inter uppercase tracking-wider">
            {t("contact.nameLabel")}
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Jane Smith"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white text-sm font-inter placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all duration-200"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-white/40 font-medium font-inter uppercase tracking-wider">
            {t("contact.emailLabel")}
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="jane@company.com"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white text-sm font-inter placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all duration-200"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs text-white/40 font-medium font-inter uppercase tracking-wider">
          {t("contact.messageLabel")}
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder={t("contact.messagePlaceholder")}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white text-sm font-inter placeholder:text-white/20 focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all duration-200 resize-none"
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full py-3.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-medium font-inter text-sm transition-all duration-200 shadow-[0_0_24px_rgba(168,85,247,0.3)] hover:shadow-[0_0_36px_rgba(168,85,247,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
      >
        {t("contact.sendButton")}
      </motion.button>
    </form>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations();
  const shouldReduce = useReducedMotion();

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
          <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-800/8 blur-[80px]" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel>
                <Activity size={11} />
                {t("hero.available")}
              </SectionLabel>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-syne font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-balance"
            >
              {t("hero.headline1")}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200">
                {t("hero.headline2")}
              </span>
              {t("hero.headline3")}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base md:text-lg text-white/50 leading-relaxed font-inter max-w-lg text-pretty"
            >
              {t("hero.subtext")}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-2">
              <Link
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-medium font-inter text-sm transition-all duration-200 shadow-[0_0_24px_rgba(168,85,247,0.35)] hover:shadow-[0_0_40px_rgba(168,85,247,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                {t("hero.ctaPrimary")}
                <ArrowRight size={15} />
              </Link>
              <Link
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/4 hover:bg-white/8 text-white/80 hover:text-white font-medium font-inter text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                {t("hero.ctaSecondary")}
              </Link>
            </motion.div>

            {/* Social links */}
            <motion.div variants={fadeInUp} className="flex items-center gap-4 pt-2">
              {[
                { icon: Github, href: BRAND.github, label: "GitHub" },
                { icon: Twitter, href: BRAND.twitter, label: "Twitter" },
                { icon: Linkedin, href: BRAND.linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/8 bg-white/4 hover:bg-white/10 hover:border-white/16 flex items-center justify-center text-white/40 hover:text-white transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: visual card stack */}
          <motion.div
            variants={shouldReduce ? fadeIn : slideInRight}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Main card */}
            <div className="relative w-full max-w-sm">
              <div className="rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm p-6 shadow-[0_1px_2px_rgba(0,0,0,0.3),0_24px_64px_-12px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center font-syne font-bold text-sm text-white shadow-[0_0_16px_rgba(168,85,247,0.5)]">
                    AM
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white font-syne">{BRAND.name}</p>
                    <p className="text-xs text-purple-400 font-inter">{BRAND.tagline}</p>
                  </div>
                  <span className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400 font-inter">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Open to work
                  </span>
                </div>

                {/* Code snippet */}
                <div className="rounded-xl bg-[#0a0a0a] border border-white/5 p-4 font-mono text-xs leading-relaxed mb-5">
                  <span className="text-purple-400">const</span>
                  <span className="text-white"> developer </span>
                  <span className="text-white/40">= </span>
                  <span className="text-white">{"{"}</span>
                  <br />
                  <span className="text-white/30 pl-4">name: </span>
                  <span className="text-emerald-400">&quot;Alex Mercer&quot;</span>
                  <span className="text-white/30">,</span>
                  <br />
                  <span className="text-white/30 pl-4">focus: </span>
                  <span className="text-emerald-400">&quot;Full-Stack&quot;</span>
                  <span className="text-white/30">,</span>
                  <br />
                  <span className="text-white/30 pl-4">available: </span>
                  <span className="text-purple-400">true</span>
                  <br />
                  <span className="text-white">{"}"}</span>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { v: "60+", l: "Projects" },
                    { v: "8yr", l: "Experience" },
                    { v: "99%", l: "Satisfaction" },
                  ].map(({ v, l }) => (
                    <div
                      key={l}
                      className="rounded-xl bg-white/4 border border-white/6 p-3 text-center"
                    >
                      <p className="font-syne font-bold text-base text-white">{v}</p>
                      <p className="text-xs text-white/40 font-inter mt-0.5">{l}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={shouldReduce ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -right-6 px-3 py-2 rounded-xl bg-[#1a1a1a] border border-white/8 shadow-[0_8px_24px_rgba(0,0,0,0.4)] flex items-center gap-2"
              >
                <FileCode size={13} className="text-purple-400" />
                <span className="text-xs text-white/70 font-inter">Next.js 14</span>
              </motion.div>

              {/* Floating badge 2 */}
              <motion.div
                animate={shouldReduce ? {} : { y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-5 -left-6 px-3 py-2 rounded-xl bg-[#1a1a1a] border border-white/8 shadow-[0_8px_24px_rgba(0,0,0,0.4)] flex items-center gap-2"
              >
                <Heart size={13} className="text-pink-400" />
                <span className="text-xs text-white/70 font-inter">Crafted with care</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-white/20 font-inter tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={shouldReduce ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────── */}
      <section className="border-y border-white/5 bg-white/2 py-10 px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map(({ value, label }) => (
            <motion.div
              key={label}
              variants={fadeInUp}
              className="flex flex-col items-center text-center gap-1"
            >
              <span className="font-syne font-bold text-3xl md:text-4xl text-white">
                {value}
              </span>
              <span className="text-sm text-white/40 font-inter">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── About ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image side */}
          <motion.div
            variants={shouldReduce ? fadeIn : slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-sm mx-auto lg:mx-0 shadow-[0_1px_2px_rgba(0,0,0,0.3),0_32px_80px_-16px_rgba(0,0,0,0.6)]">
              <img
                src="https://vignette.wikia.nocookie.net/non-aliencreatures/images/e/e4/Alex_Mercer.jpg/revision/latest?cb=20110203194041"
                alt="Alex Mercer, Creative Developer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/60 via-transparent to-transparent" />
              {/* Overlay badge */}
              <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-[#0f0f0f]/80 backdrop-blur-md border border-white/8 p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <Code size={16} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white font-syne">8 years building</p>
                  <p className="text-xs text-white/40 font-inter">products people love</p>
                </div>
              </div>
            </div>
            {/* Decorative ring */}
            <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full border border-purple-500/15 pointer-events-none" />
            <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full border border-white/5 pointer-events-none" />
          </motion.div>

          {/* Copy side */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel>{t("about.label")}</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-syne font-bold text-4xl md:text-5xl leading-tight tracking-tight text-balance"
            >
              {t("about.headline")}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-white/50 leading-relaxed font-inter text-pretty"
            >
              {t("about.body1")}
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-white/50 leading-relaxed font-inter text-pretty"
            >
              {t("about.body2")}
            </motion.p>

            {/* Checklist */}
            <motion.ul variants={staggerContainer} className="space-y-3 pt-2">
              {[
                t("about.check1"),
                t("about.check2"),
                t("about.check3"),
                t("about.check4"),
              ].map((item) => (
                <motion.li
                  key={item}
                  variants={fadeInUp}
                  className="flex items-center gap-3 text-sm text-white/60 font-inter"
                >
                  <span className="w-5 h-5 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <Check size={11} className="text-purple-400" />
                  </span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeInUp} className="pt-2">
              <a
                href={`mailto:${BRAND.email}`}
                className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 font-medium font-inter transition-colors duration-200"
              >
                <Mail size={14} />
                {BRAND.email}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/2 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col items-center text-center gap-4 mb-16"
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel>{t("services.label")}</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-syne font-bold text-4xl md:text-5xl tracking-tight text-balance max-w-2xl"
            >
              {t("services.headline")}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-white/50 font-inter max-w-xl text-pretty leading-relaxed"
            >
              {t("services.subtext")}
            </motion.p>
          </motion.div>

          {/* Bento grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                variants={scaleIn}
                whileHover={shouldReduce ? {} : { y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`relative rounded-2xl border border-white/6 bg-white/3 p-8 flex gap-5 shadow-[0_1px_2px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.3)] hover:border-purple-500/20 transition-all duration-300 ${i === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="w-11 h-11 rounded-xl bg-purple-500/12 border border-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <service.icon size={20} className="text-purple-400" />
                </div>
                <div>
                  <h3 className="font-syne font-semibold text-lg text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed font-inter">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Projects ─────────────────────────────────────────────────────── */}
      <section id="projects" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
          >
            <div className="flex flex-col gap-4">
              <motion.div variants={fadeInUp}>
                <SectionLabel>{t("projects.label")}</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeInUp}
                className="font-syne font-bold text-4xl md:text-5xl tracking-tight text-balance"
              >
                {t("projects.headline")}
              </motion.h2>
            </div>
            <motion.p
              variants={fadeInUp}
              className="text-white/50 font-inter max-w-sm text-pretty leading-relaxed md:text-right"
            >
              {t("projects.subtext")}
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <a
              href={BRAND.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 bg-white/4 hover:bg-white/8 text-white/70 hover:text-white text-sm font-medium font-inter transition-all duration-200"
            >
              <Github size={15} />
              {t("projects.viewAll")}
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────────────────────── */}
      <section id="skills" className="py-24 px-6 bg-white/2 border-y border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left: copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel>{t("skills.label")}</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-syne font-bold text-4xl md:text-5xl tracking-tight text-balance"
            >
              {t("skills.headline")}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-white/50 font-inter leading-relaxed text-pretty"
            >
              {t("skills.subtext")}
            </motion.p>

            {/* Tech pills */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 pt-2">
              {[
                "React", "Next.js", "TypeScript", "Node.js",
                "PostgreSQL", "Prisma", "Tailwind CSS", "Figma",
                "Docker", "AWS", "Vercel", "GraphQL",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-xs text-white/50 font-inter hover:text-white/80 hover:border-white/16 transition-colors duration-200 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: skill bars */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-6"
          >
            {skills.map((skill, i) => (
              <motion.div key={skill.name} variants={fadeInUp}>
                <SkillBar name={skill.name} level={skill.level} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col items-center text-center gap-4 mb-16"
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel>{t("testimonials.label")}</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-syne font-bold text-4xl md:text-5xl tracking-tight text-balance max-w-2xl"
            >
              {t("testimonials.headline")}
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t_item, i) => (
              <motion.div
                key={t_item.name}
                variants={scaleIn}
                whileHover={shouldReduce ? {} : { y: -5 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex flex-col gap-5 rounded-2xl border border-white/6 bg-white/3 p-7 shadow-[0_1px_2px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.3)] hover:border-purple-500/15 transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t_item.stars }).map((_, si) => (
                    <Star key={si} size={13} className="text-purple-400 fill-purple-400" />
                  ))}
                </div>

                <p className="text-sm text-white/60 leading-relaxed font-inter flex-1 text-pretty">
                  &ldquo;{t_item.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-white/8 border border-white/10 flex-shrink-0">
                    <img
                      src={t_item.avatar}
                      alt={t_item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const el = e.currentTarget as HTMLImageElement;
                        el.style.display = "none";
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white font-syne">{t_item.name}</p>
                    <p className="text-xs text-white/40 font-inter">{t_item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────────────── */}
      <section id="contact" className="py-28 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left: info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeInUp}>
              <SectionLabel>{t("contact.label")}</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-syne font-bold text-4xl md:text-5xl tracking-tight text-balance"
            >
              {t("contact.headline")}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-white/50 font-inter leading-relaxed text-pretty"
            >
              {t("contact.subtext")}
            </motion.p>

            {/* Contact details */}
            <motion.div variants={staggerContainer} className="flex flex-col gap-4 pt-2">
              {[
                { icon: Mail, label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
                { icon: Github, label: "GitHub", value: "github.com/alexmercer", href: BRAND.github },
                { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/alexmercer", href: BRAND.linkedin },
              ].map(({ icon: Icon, label, value, href }) => (
                <motion.a
                  key={label}
                  variants={fadeInUp}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/6 bg-white/3 hover:border-purple-500/20 hover:bg-white/5 transition-all duration-200 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-purple-500/12 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={15} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-white/30 font-inter uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-sm text-white/70 group-hover:text-white font-inter transition-colors duration-200">{value}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            variants={shouldReduce ? fadeIn : slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="rounded-2xl border border-white/6 bg-white/3 p-8 shadow-[0_1px_2px_rgba(0,0,0,0.15),0_16px_48px_-8px_rgba(0,0,0,0.4)]"
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </main>
  );
}