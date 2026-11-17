"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Layout, Palette, Gauge, Network } from "lucide-react";
import { useLanguage } from "@/shared/context/language-context";

const serviceIcons = [
  <Layout key="1" className="text-accent" size={24} />,
  <Palette key="2" className="text-accent" size={24} />,
  <Gauge key="3" className="text-accent" size={24} />,
  <Network key="4" className="text-accent" size={24} />,
];

const serviceTags = [
  ["Next.js", "React", "TypeScript", "App Router"],
  ["Framer Motion", "Tailwind CSS", "Micro-interactions", "Design Systems"],
  ["Core Web Vitals", "Lighthouse 100", "SEO", "Accessibility"],
  ["REST APIs", "WebSockets", "Auth", "Async State"],
];

export function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section className="section-py border-t border-border/40">
      <div className="container">
        <Reveal>
          <SectionHeading
            label={t.services.tag}
            title={t.services.title}
            description={t.services.desc}
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.services.items.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="group relative p-7 md:p-8 bg-secondary/30 hover:bg-secondary/60 border border-border/50 hover:border-accent/40 rounded-xl transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-lg bg-secondary/80 border border-border/60 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-300">
                      {serviceIcons[index % serviceIcons.length]}
                    </div>
                    <span className="text-xs font-mono text-muted-foreground/50 group-hover:text-accent/70 transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-200">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/30 flex flex-wrap gap-2">
                  {serviceTags[index % serviceTags.length].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-mono text-muted-foreground bg-background/50 border border-border/40 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
