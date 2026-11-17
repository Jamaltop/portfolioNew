"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/shared/context/language-context";

export function AboutPreview() {
  const { t } = useLanguage();

  return (
    <section className="section-py border-t border-border/30">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <span className="inline-block text-accent font-mono text-sm tracking-wider uppercase mb-3">
                {t.aboutPreview.tag}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                {t.aboutPreview.titleStart}
                <br />
                <span className="text-muted-foreground">{t.aboutPreview.titleEnd}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t.aboutPreview.p1}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {t.aboutPreview.p2}
              </p>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors duration-200"
              >
                {t.aboutPreview.learnMore}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform duration-200"
                />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="space-y-4">
              {t.aboutPreview.principles.map((item, index) => (
                <div
                  key={item.title}
                  className="p-5 border-l-2 border-border hover:border-accent/50 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-accent/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-sm font-semibold text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-8">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
