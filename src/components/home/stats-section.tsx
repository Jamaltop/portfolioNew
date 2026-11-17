"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import { CheckCircle2, Zap, Trophy, Flame } from "lucide-react";
import { useLanguage } from "@/shared/context/language-context";

const statIcons = [
  <Trophy key="1" size={20} className="text-accent" />,
  <CheckCircle2 key="2" size={20} className="text-emerald-400" />,
  <Flame key="3" size={20} className="text-amber-400" />,
  <Zap key="4" size={20} className="text-cyan-400" />,
];

export function StatsSection() {
  const { t } = useLanguage();

  const statLabels: Record<string, string> = {
    experience: t.stats.experience,
    projects: t.stats.projects,
    satisfaction: t.stats.satisfaction,
    firstPaint: t.stats.firstPaint,
  };

  return (
    <section className="py-12 border-y border-border/40 bg-secondary/20 backdrop-blur-sm">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {siteConfig.stats.map((stat, index) => (
            <Reveal key={stat.key} delay={index * 0.08}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center sm:items-start p-4 rounded-xl hover:bg-secondary/40 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-secondary/80 border border-border/60 flex items-center justify-center">
                    {statIcons[index % statIcons.length]}
                  </div>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono tracking-tight text-foreground">
                    {stat.value}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-medium text-muted-foreground text-center sm:text-left">
                  {statLabels[stat.key] || stat.key}
                </span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
