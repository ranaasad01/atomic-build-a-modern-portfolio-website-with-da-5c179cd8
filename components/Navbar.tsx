"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from 'lucide-react';
import { navLinks, navCTA, BRAND } from "@/lib/data";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (pathname === "/" && href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0f0f0f]/90 backdrop-blur-xl border-b border-white/5 shadow-[0_1px_0_rgba(255,255,255,0.04)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center text-xs font-bold font-syne tracking-tight text-white shadow-[0_0_16px_rgba(168,85,247,0.4)]"
            >
              {BRAND.initials}
            </motion.div>
            <span className="font-syne font-semibold text-sm text-white/80 group-hover:text-white transition-colors duration-200">
              {BRAND.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={getLinkHref(link.href)}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="relative px-4 py-2 text-sm text-white/50 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 font-inter"
              >
                {t(`nav.${link.label.toLowerCase()}`)}
              </Link>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href={getLinkHref(navCTA.href)}
              onClick={(e) => handleAnchorClick(e, navCTA.href)}
              className="hidden md:inline-flex items-center px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-400 text-white text-sm font-medium font-inter transition-all duration-200 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_28px_rgba(168,85,247,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f0f]"
            >
              {t("nav.cta")}
            </Link>

            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#0f0f0f]/95 backdrop-blur-xl border-b border-white/5 md:hidden"
          >
            <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="block px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200 font-inter"
                  >
                    {t(`nav.${link.label.toLowerCase()}`)}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.2 }}
                className="pt-2 border-t border-white/5 mt-2"
              >
                <Link
                  href={getLinkHref(navCTA.href)}
                  onClick={(e) => handleAnchorClick(e, navCTA.href)}
                  className="block px-4 py-3 text-sm text-center bg-purple-500 hover:bg-purple-400 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  {t("nav.cta")}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}