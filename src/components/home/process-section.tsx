"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLanguage } from "@/shared/context/language-context";

export function ProcessSection() {
  const { t } = useLanguage();

  return (
    <section className="section-py border-t border-border/40">
      <div className="container">
        <Reveal>
          <SectionHeading
            label={t.process.tag}
            title={t.process.title}
            description={t.process.desc}
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.process.steps.map((step, index) => (
            <Reveal key={step.step} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group relative p-6 bg-secondary/30 hover:bg-secondary/60 border border-border/50 hover:border-accent/40 rounded-xl transition-all duration-300 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-extrabold font-mono text-accent/30 group-hover:text-accent transition-colors">
                      {step.step}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-border group-hover:bg-accent transition-colors" />
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/30 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span>Phase 0{index + 1}</span>
                  <span className="text-accent/70">Verified ✓</span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
