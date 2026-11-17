"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github, Send, Phone, Mail, Check, Copy, Sparkles, Terminal } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/shared/context/language-context";

export function Hero() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const { t, openLinkedInModal } = useLanguage();

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      if (type === "email") {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
    }
  };

  const handleConnectClick = (e: React.MouseEvent) => {
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      e.preventDefault();
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[95dvh] flex items-center overflow-hidden pt-20 pb-16">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Dynamic ambient accents */}
      <div className="absolute top-1/4 right-[5%] w-[450px] h-[450px] bg-accent/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 left-[10%] w-[350px] h-[350px] bg-accent/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text, Intro, CTAs */}
          <div className="lg:col-span-7">
            {/* Status & Name Badges */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-wrap items-center gap-2.5 mb-6"
            >
              {/* Mini Portrait Avatar */}
              <div className="relative w-7 h-7 rounded-full overflow-hidden border border-accent/40 shadow-sm shrink-0">
                <Image
                  src="/camal.png"
                  alt="Camal"
                  fill
                  unoptimized
                  className="object-cover object-top"
                />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-border/70 text-xs font-mono text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>{t.hero.statusBadge}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-xs font-mono text-accent">
                <Sparkles size={12} />
                <span>{t.hero.locationBadge}</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6">
                {t.hero.greeting} <span className="text-accent underline decoration-accent/30 underline-offset-8">{siteConfig.name}</span>.
                <br />
                <span className="text-foreground/90">{t.hero.creative}</span>{" "}
                <span className="bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
                  {t.hero.roleHighlight}
                </span>{" "}
                {t.hero.roleEnd}
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-8"
            >
              {t.hero.shortBio}
            </motion.p>

            {/* Quick Contact Chips (Phone & Email with 1-click copy) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              {/* Phone Chip */}
              <div className="inline-flex items-center bg-secondary/60 hover:bg-secondary/90 border border-border/70 rounded-lg p-1 transition-colors">
                <a
                  href={siteConfig.phoneUrl}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-foreground hover:text-accent transition-colors"
                >
                  <Phone size={13} className="text-accent" />
                  <span>{siteConfig.phone}</span>
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard(siteConfig.phone, "phone")}
                  className="p-1.5 text-muted-foreground hover:text-accent rounded transition-colors"
                  title="Copy Phone"
                >
                  {copiedPhone ? <Check size={13} className="text-accent" /> : <Copy size={13} />}
                </button>
              </div>

              {/* Email Chip */}
              <div className="inline-flex items-center bg-secondary/60 hover:bg-secondary/90 border border-border/70 rounded-lg p-1 transition-colors">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-foreground hover:text-accent transition-colors"
                >
                  <Mail size={13} className="text-accent" />
                  <span>{siteConfig.email}</span>
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard(siteConfig.email, "email")}
                  className="p-1.5 text-muted-foreground hover:text-accent rounded transition-colors"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check size={13} className="text-accent" /> : <Copy size={13} />}
                </button>
              </div>
            </motion.div>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-accent-foreground font-semibold rounded-md text-sm hover:bg-accent/90 transition-all duration-200 shadow-md shadow-accent/20 active:scale-95"
              >
                {t.hero.viewProjects}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </Link>
              <Link
                href="/contacts"
                onClick={handleConnectClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-border/80 text-foreground font-medium rounded-md text-sm hover:border-accent/40 hover:bg-secondary/60 transition-all duration-200 active:scale-95"
              >
                {t.hero.contactMe}
              </Link>
            </motion.div>

            {/* Social Channels Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-center gap-5 pt-4 border-t border-border/30"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                {t.hero.followMe}
              </span>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors duration-200"
                aria-label="GitHub Profile (Jamaltop)"
                title="GitHub: https://github.com/Jamaltop"
              >
                <Github size={18} />
              </a>
              <a
                href={siteConfig.links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors duration-200"
                aria-label="Telegram (@jsscriptdev)"
                title="Telegram: https://t.me/jsscriptdev"
              >
                <Send size={18} />
              </a>
              <button
                type="button"
                onClick={openLinkedInModal}
                className="text-muted-foreground hover:text-accent transition-colors duration-200"
                aria-label="LinkedIn"
                title="LinkedIn Profile"
              >
                <FaLinkedin size={18} />
              </button>
            </motion.div>
          </div>

          {/* Right Column: Dynamic Interactive Code / Developer Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative group">
              {/* Outer ambient glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 to-transparent rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative bg-[#111113] border border-border/80 rounded-xl p-5 sm:p-6 shadow-2xl font-mono text-xs sm:text-sm overflow-hidden">
                {/* Window top bar */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                    <span className="ml-2 text-xs text-muted-foreground/60 flex items-center gap-1.5">
                      <Terminal size={12} />
                      {t.hero.liveConfig}
                    </span>
                  </div>
                  <div className="text-[10px] text-accent font-semibold px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                    LIVE
                  </div>
                </div>

                {/* Code lines */}
                <div className="space-y-2 text-muted-foreground leading-relaxed">
                  <p>
                    <span className="text-purple-400">export const</span>{" "}
                    <span className="text-accent">developer</span>{" "}
                    <span className="text-foreground">=</span> {"{"}
                  </p>
                  <p className="pl-4">
                    name: <span className="text-emerald-300">&quot;{siteConfig.name}&quot;</span>,
                  </p>
                  <p className="pl-4">
                    role: <span className="text-emerald-300">&quot;{siteConfig.role}&quot;</span>,
                  </p>
                  <p className="pl-4">
                    location: <span className="text-emerald-300">&quot;{siteConfig.location}&quot;</span>,
                  </p>
                  <p className="pl-4">
                    phone: <span className="text-amber-300">&quot;{siteConfig.phone}&quot;</span>,
                  </p>
                  <p className="pl-4">
                    email: <span className="text-amber-300">&quot;{siteConfig.email}&quot;</span>,
                  </p>
                  <p className="pl-4">
                    github: <span className="text-cyan-300">&quot;github.com/Jamaltop&quot;</span>,
                  </p>
                  <p className="pl-4">
                    telegram: <span className="text-cyan-300">&quot;@jsscriptdev&quot;</span>,
                  </p>
                  <p className="pl-4">
                    status: <span className="text-emerald-400">&quot;{t.hero.statusText}&quot;</span>
                  </p>
                  <p>{"};"}</p>
                </div>

                {/* Bottom Interactive Mini-status */}
                <div className="mt-5 pt-4 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>0 errors • 0 warnings</span>
                  </div>
                  <span className="text-accent/80 font-mono">Next.js 15 • React 19</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
