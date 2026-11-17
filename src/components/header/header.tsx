"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, ArrowUpRight, Copy, Check, Globe } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import { cn } from "@/shared/lib/cn";
import { useLanguage } from "@/shared/context/language-context";
import { type Language } from "@/config/translations";

const languages: { code: Language; label: string }[] = [
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
  { code: "az", label: "AZE" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { lang, setLang, t, openLinkedInModal } = useLanguage();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Robust body scroll lock
  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  // Close on Escape or Window Resize
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCopyPhone = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(siteConfig.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  // Home click handler: Always scrolls to the very top on Main page
  const handleHomeClick = (e: React.MouseEvent) => {
    setIsOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      document.body.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      router.push("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        document.documentElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        document.body.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }, 50);
    }
  };

  // Get In Touch click handler: scrolls to contact section on home, or routes to /contacts
  const handleGetInTouchClick = (e: React.MouseEvent) => {
    setIsOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push("/contacts");
      }
    } else {
      router.push("/contacts");
    }
  };

  const navItems = [
    { label: t.nav.home, href: "/", isHome: true },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.projects, href: "/projects" },
    { label: t.nav.contact, href: "/contacts" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || isOpen
          ? "bg-[#0a0a0b]/92 backdrop-blur-md border-b border-border/60 shadow-lg shadow-black/25"
          : "bg-transparent"
      )}
    >
      <nav className="container flex items-center justify-between h-16 md:h-20">
        {/* Brand / Logo (clicking it also scrolls to top on main page) */}
        <Link
          href="/"
          onClick={handleHomeClick}
          className="relative z-[60] flex items-center gap-2 group"
          aria-label="Home"
        >
          <div className="w-8 h-8 rounded-md bg-accent/15 border border-accent/40 flex items-center justify-center font-mono font-bold text-accent text-sm group-hover:scale-105 group-hover:bg-accent/25 transition-transform duration-200">
            C
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground group-hover:text-accent transition-colors duration-200">
            {siteConfig.name}
            <span className="text-accent ml-0.5">.</span>
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground bg-secondary/80 rounded border border-border/40">
            Frontend
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-1 bg-secondary/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/40">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                {item.isHome ? (
                  <button
                    type="button"
                    onClick={handleHomeClick}
                    className={cn(
                      "relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 block",
                      isActive
                        ? "text-accent font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-accent/10 border border-accent/30 -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 block",
                      isActive
                        ? "text-accent font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-accent/10 border border-accent/30 -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        {/* Right Side: Language Switcher & Get in Touch CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher Pill */}
          <div className="flex items-center p-1 bg-secondary/50 border border-border/60 rounded-lg text-xs font-mono">
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLang(l.code)}
                className={cn(
                  "px-2 py-1 rounded transition-all duration-150 font-semibold",
                  lang === l.code
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Phone quick call */}
          <a
            href={siteConfig.phoneUrl}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
            title="Call Camal"
          >
            <Phone size={13} className="text-accent" />
            <span>{siteConfig.phone}</span>
          </a>

          {/* Working Get In Touch CTA */}
          <button
            type="button"
            onClick={handleGetInTouchClick}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-all duration-200 shadow-sm shadow-accent/20 active:scale-95"
          >
            {t.nav.getInTouch}
          </button>
        </div>

        {/* Mobile Right Controls: Language + Hamburger */}
        <div className="flex items-center gap-2 md:hidden relative z-[60]">
          {/* Mobile Language Switcher Mini */}
          <div className="flex items-center p-0.5 bg-secondary/80 border border-border/70 rounded-md text-[11px] font-mono">
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLang(l.code)}
                className={cn(
                  "px-1.5 py-0.5 rounded transition-all",
                  lang === l.code
                    ? "bg-accent text-accent-foreground font-bold"
                    : "text-muted-foreground"
                )}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md text-foreground hover:bg-secondary/60 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <div className="w-5 h-4 flex flex-col justify-between items-center relative">
              <span
                className={cn(
                  "w-full h-0.5 bg-foreground rounded-full transition-all duration-300 transform origin-center",
                  isOpen && "translate-y-[7px] rotate-45 bg-accent"
                )}
              />
              <span
                className={cn(
                  "w-full h-0.5 bg-foreground rounded-full transition-all duration-300",
                  isOpen && "opacity-0 scale-x-0"
                )}
              />
              <span
                className={cn(
                  "w-full h-0.5 bg-foreground rounded-full transition-all duration-300 transform origin-center",
                  isOpen && "-translate-y-[7px] -rotate-45 bg-accent"
                )}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 h-[100dvh] w-full z-50 bg-[#0a0a0b]/98 backdrop-blur-2xl md:hidden flex flex-col justify-between pt-20 pb-8 px-6 overflow-y-auto"
          >
            {/* Top Language Select in Drawer */}
            <div className="flex items-center justify-between pb-3 border-b border-border/40">
              <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                <Globe size={14} className="text-accent" />
                <span>Language / Язык:</span>
              </div>
              <div className="flex items-center p-1 bg-secondary/80 border border-border/70 rounded-lg text-xs font-mono">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLang(l.code)}
                    className={cn(
                      "px-2.5 py-1 rounded transition-all font-semibold",
                      lang === l.code
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col space-y-2 mt-4">
              {navItems.map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.05 + idx * 0.05,
                      ease: [0.25, 0.4, 0.25, 1],
                    }}
                  >
                    {item.isHome ? (
                      <button
                        type="button"
                        onClick={handleHomeClick}
                        className={cn(
                          "w-full flex items-center justify-between p-3.5 rounded-lg text-2xl font-bold transition-all duration-200 text-left",
                          isActive
                            ? "text-accent bg-accent/10 border border-accent/25"
                            : "text-foreground/80 hover:text-foreground hover:bg-secondary/40"
                        )}
                      >
                        <span>{item.label}</span>
                        <ArrowUpRight
                          size={18}
                          className={cn(
                            "transition-transform",
                            isActive ? "text-accent" : "text-muted-foreground/40"
                          )}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center justify-between p-3.5 rounded-lg text-2xl font-bold transition-all duration-200",
                          isActive
                            ? "text-accent bg-accent/10 border border-accent/25"
                            : "text-foreground/80 hover:text-foreground hover:bg-secondary/40"
                        )}
                      >
                        <span>{item.label}</span>
                        <ArrowUpRight
                          size={18}
                          className={cn(
                            "transition-transform",
                            isActive ? "text-accent" : "text-muted-foreground/40"
                          )}
                        />
                      </Link>
                    )}
                  </motion.div>
                );
              })}

              {/* Mobile Get in Touch Action */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleGetInTouchClick}
                  className="w-full py-3.5 px-4 rounded-xl bg-accent text-accent-foreground font-semibold text-center text-sm shadow-md shadow-accent/20 active:scale-98 transition-all"
                >
                  {t.nav.getInTouch}
                </button>
              </div>
            </nav>

            {/* Quick Contact & Info Card inside Mobile Drawer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-6 pt-5 border-t border-border/50 space-y-4"
            >
              <div className="bg-secondary/40 border border-border/60 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>DIRECT CONTACT</span>
                  <span className="flex items-center gap-1.5 text-accent">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    Available
                  </span>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <a
                    href={siteConfig.phoneUrl}
                    className="flex items-center gap-2.5 text-sm font-semibold text-foreground hover:text-accent transition-colors"
                  >
                    <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center text-accent">
                      <Phone size={14} />
                    </div>
                    <span>{siteConfig.phone}</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="p-2 text-muted-foreground hover:text-accent transition-colors rounded-md"
                    title="Copy phone"
                    aria-label="Copy phone number"
                  >
                    {copied ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
                  </button>
                </div>

                {/* Email */}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors pt-1 border-t border-border/30"
                >
                  <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center text-accent">
                    <Mail size={14} />
                  </div>
                  <span className="truncate">{siteConfig.email}</span>
                </a>
              </div>

              {/* Social links */}
              <div className="flex items-center justify-between px-2 text-xs font-mono text-muted-foreground">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  GitHub
                </a>
                <span>•</span>
                <a
                  href={siteConfig.links.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  Telegram
                </a>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    openLinkedInModal();
                  }}
                  className="hover:text-accent transition-colors"
                >
                  LinkedIn
                </button>
                <span>•</span>
                <span>Baku</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
