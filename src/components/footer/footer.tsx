"use client";

import Link from "next/link";
import { Github, Send, Phone, Mail, MapPin } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/shared/context/language-context";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, openLinkedInModal } = useLanguage();

  return (
    <footer className="border-t border-border/50 bg-[#0c0c0e]">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-xl tracking-tight text-foreground mb-4 group"
            >
              <div className="w-7 h-7 rounded bg-accent/20 border border-accent/40 flex items-center justify-center font-mono font-bold text-accent text-xs">
                C
              </div>
              <span>{siteConfig.name}</span>
              <span className="text-accent">.</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6">
              {t.footer.desc}
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <MapPin size={13} className="text-accent" />
              <span>{siteConfig.location}</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-mono font-semibold text-accent mb-4 uppercase tracking-widest">
              {t.footer.navigation}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {t.nav.projects}
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-mono font-semibold text-accent mb-4 uppercase tracking-widest">
              {t.footer.channels}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={siteConfig.phoneUrl}
                  className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <Phone size={14} className="text-accent" />
                  <span className="font-mono">{siteConfig.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <Mail size={14} className="text-accent" />
                  <span className="font-mono">{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <Send size={14} className="text-accent" />
                  <span>Telegram (@jsscriptdev)</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <Github size={14} className="text-accent" />
                  <span>GitHub (Jamaltop)</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openLinkedInModal}
                  className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors duration-200 text-left"
                >
                  <FaLinkedin size={14} className="text-accent" />
                  <span>LinkedIn</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            &copy; {currentYear} {siteConfig.name}. {t.footer.rights}
          </p>
          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {t.footer.availableHire}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
