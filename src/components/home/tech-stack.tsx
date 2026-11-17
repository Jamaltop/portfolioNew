"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { technologies } from "@/config/site";
import { useLanguage } from "@/shared/context/language-context";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
  SiGithub,
} from "react-icons/si";

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  Git: SiGit,
  GitHub: SiGithub,
};

export function TechStack() {
  const { lang } = useLanguage();

  const labels = {
    en: {
      tag: "Tech Stack",
      title: "Technologies I work with",
      desc: "The tools and technologies I use daily to bring ideas to life.",
    },
    ru: {
      tag: "Технологии",
      title: "Стек и инструменты",
      desc: "Современные инструменты, которые я использую ежедневно для создания масштабируемых веб-продуктов.",
    },
    az: {
      tag: "Texnologiyalar",
      title: "İstifadə etdiyim alətlər",
      desc: "İdeyaları reallığa çevirmək üçün gündəlik istifadə etdiyim müasir texnologiyalar.",
    },
  }[lang] || {
    tag: "Tech Stack",
    title: "Technologies I work with",
    desc: "The tools and technologies I use daily to bring ideas to life.",
  };

  return (
    <section className="section-py border-t border-border/30">
      <div className="container">
        <Reveal>
          <SectionHeading
            label={labels.tag}
            title={labels.title}
            description={labels.desc}
          />
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {technologies.map((tech, index) => {
            const Icon = iconMap[tech.name];
            return (
              <Reveal key={tech.name} delay={index * 0.05}>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="group flex items-center gap-3 p-4 bg-secondary/40 border border-border/40 rounded-lg hover:border-accent/30 hover:bg-secondary/70 transition-all duration-300"
                >
                  {Icon && (
                    <Icon
                      size={20}
                      className="text-muted-foreground group-hover:text-accent transition-colors duration-300 shrink-0"
                    />
                  )}
                  <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                    {tech.name}
                  </span>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
