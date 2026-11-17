"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone, Mail, Check, Copy, MessageSquare, Send } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/shared/context/language-context";

export function ContactCTA() {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { t } = useLanguage();

  const copyText = (val: string, type: "phone" | "email") => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(val);
      if (type === "phone") {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      } else {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      }
    }
  };

  return (
    <section id="contact" className="section-py border-t border-border/40 relative overflow-hidden scroll-mt-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container relative">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-block text-accent font-mono text-xs tracking-widest uppercase mb-3 px-3 py-1 bg-accent/10 rounded-full border border-accent/20">
              {t.contactCTA.tag}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              {t.contactCTA.titleStart}
              <br />
              <span className="text-accent">{t.contactCTA.titleHighlight}</span> {t.contactCTA.titleEnd}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">
              {t.contactCTA.desc}
            </p>

            {/* Quick Contact Box */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              {/* Phone */}
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary/60 border border-border/60 rounded-lg">
                <a
                  href={siteConfig.phoneUrl}
                  className="flex items-center gap-2 text-sm font-mono text-foreground hover:text-accent transition-colors"
                >
                  <Phone size={14} className="text-accent" />
                  <span>{siteConfig.phone}</span>
                </a>
                <button
                  type="button"
                  onClick={() => copyText(siteConfig.phone, "phone")}
                  className="p-1 text-muted-foreground hover:text-accent transition-colors"
                  title="Copy Phone"
                >
                  {copiedPhone ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary/60 border border-border/60 rounded-lg">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 text-sm font-mono text-foreground hover:text-accent transition-colors"
                >
                  <Mail size={14} className="text-accent" />
                  <span>{siteConfig.email}</span>
                </a>
                <button
                  type="button"
                  onClick={() => copyText(siteConfig.email, "email")}
                  className="p-1 text-muted-foreground hover:text-accent transition-colors"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Main CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contacts"
                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-accent-foreground font-semibold rounded-md text-sm hover:bg-accent/90 transition-all duration-200 shadow-md shadow-accent/20 active:scale-95"
              >
                <MessageSquare size={16} />
                {t.contactCTA.openForm}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
              </Link>
              <a
                href={siteConfig.links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-border text-foreground font-medium rounded-md text-sm hover:bg-secondary/60 transition-all duration-200"
              >
                <Send size={15} className="text-accent" />
                {t.contactCTA.telegramChat}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
