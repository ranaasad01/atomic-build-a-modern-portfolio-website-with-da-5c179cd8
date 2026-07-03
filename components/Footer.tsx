"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin, Mail, ArrowUp } from 'lucide-react';
import { navLinks, BRAND } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socials = [
    { icon: Github, href: BRAND.github, label: "GitHub" },
    { icon: Twitter, href: BRAND.twitter, label: "Twitter" },
    { icon: Linkedin, href: BRAND.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${BRAND.email}`, label: "Email" },
  ];

  return (
    <footer className="relative border-t border-white/5 bg-[#0a0a0a]">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="max-w-6xl mx-auto px-6 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div variants={fadeInUp} className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center text-xs font-bold font-syne text-white shadow-[0_0_16px_rgba(168,85,247,0.3)]">
                {BRAND.initials}
              </div>
              <span className="font-syne font-semibold text-white/80">
                {BRAND.name}
              </span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              {t("footer.tagline")}
            </p>
          </motion.div>

          {/* Nav links */}
          <motion.div variants={fadeInUp}>
            <p className="text-xs font-medium text-white/30 uppercase tracking-widest mb-4">
              {t("footer.navigation")}
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {t(`nav.${link.label.toLowerCase()}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Socials */}
          <motion.div variants={fadeInUp}>
            <p className="text-xs font-medium text-white/30 uppercase tracking-widest mb-4">
              {t("footer.connect")}
            </p>
            <div className="flex flex-col gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-sm text-white/50 hover:text-white transition-colors duration-200 group w-fit"
                >
                  <Icon
                    size={14}
                    className="text-white/30 group-hover:text-purple-400 transition-colors duration-200"
                  />
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5"
        >
          <p className="text-xs text-white/25">
            {t("footer.copyright", { year: "2025", name: BRAND.name })}
          </p>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors duration-200 group"
            aria-label="Scroll to top"
          >
            {t("footer.backToTop")}
            <ArrowUp
              size={12}
              className="group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </motion.button>
        </motion.div>
      </motion.div>
    </footer>
  );
}