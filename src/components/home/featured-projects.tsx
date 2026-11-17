"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Briefcase, Code2, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/config/site";
import { cn } from "@/shared/lib/cn";
import { useLanguage } from "@/shared/context/language-context";

export function FeaturedProjects() {
  const [activeDivision, setActiveDivision] = useState<"all" | "commercial" | "pet">("all");
  const { lang, t } = useLanguage();

  const filteredProjects = projects.filter((p) => {
    if (activeDivision === "all") return p.featured;
    return p.division === activeDivision;
  });

  return (
    <section className="section-py">
      <div className="container">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeading
              label={t.featured.tag}
              title={t.featured.title}
              description={t.featured.desc}
              className="mb-0"
            />

            {/* Division Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-secondary/60 border border-border/60 rounded-xl shrink-0 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setActiveDivision("all")}
                className={cn(
                  "relative px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg transition-all duration-200",
                  activeDivision === "all"
                    ? "text-accent-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {activeDivision === "all" && (
                  <motion.div
                    layoutId="home-proj-division"
                    className="absolute inset-0 bg-accent rounded-lg"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t.featured.all}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveDivision("commercial")}
                className={cn(
                  "relative flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg transition-all duration-200",
                  activeDivision === "commercial"
                    ? "text-accent-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {activeDivision === "commercial" && (
                  <motion.div
                    layoutId="home-proj-division"
                    className="absolute inset-0 bg-accent rounded-lg"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Briefcase size={12} className="relative z-10" />
                <span className="relative z-10">{t.featured.commercial}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveDivision("pet")}
                className={cn(
                  "relative flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg transition-all duration-200",
                  activeDivision === "pet"
                    ? "text-accent-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {activeDivision === "pet" && (
                  <motion.div
                    layoutId="home-proj-division"
                    className="absolute inset-0 bg-accent rounded-lg"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Code2 size={12} className="relative z-10" />
                <span className="relative z-10">{t.featured.pet}</span>
              </button>
            </div>
          </div>
        </Reveal>

        {/* Project Cards with Animation */}
        <motion.div layout className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="group relative grid grid-cols-1 md:grid-cols-12 gap-6 p-6 md:p-8 bg-secondary/30 border border-border/50 rounded-xl hover:border-accent/40 hover:bg-secondary/50 transition-all duration-300"
              >
                {/* Visual / Project Preview Box */}
                <div className="md:col-span-4 aspect-video md:aspect-[4/3] bg-muted/40 rounded-lg overflow-hidden border border-border/40 relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono font-semibold rounded-md border",
                        project.division === "commercial"
                          ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                          : "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                      )}
                    >
                      {project.division === "commercial" ? (
                        <>
                          <Briefcase size={10} />
                          {project.categoryLabel[lang] || project.categoryLabel.en}
                        </>
                      ) : (
                        <>
                          <Sparkles size={10} />
                          {project.categoryLabel[lang] || project.categoryLabel.en}
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="md:col-span-8 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2.5">
                      <span className="text-xs font-mono text-muted-foreground">
                        {project.year}
                      </span>
                      {project.clientOrContext && (
                        <span className="text-xs font-mono text-foreground/60">
                          • {project.clientOrContext[lang] || project.clientOrContext.en}
                        </span>
                      )}
                      {project.metrics && (
                        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {project.metrics}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-200">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xl">
                      {project.description[lang] || project.description.en}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-end justify-between gap-4 pt-4 border-t border-border/30">
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-mono text-muted-foreground bg-background/60 border border-border/50 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-3 shrink-0">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-secondary"
                        aria-label="GitHub Repository"
                      >
                        <Github size={16} />
                        <span className="hidden sm:inline">{t.featured.code}</span>
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold bg-accent/15 text-accent border border-accent/30 rounded-md hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                        aria-label="Live Demo"
                      >
                        <span>{t.featured.demo}</span>
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View all button */}
        <Reveal>
          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border/70 hover:border-accent/40 bg-secondary/40 hover:bg-secondary text-sm font-medium text-foreground transition-all duration-200"
            >
              {t.featured.viewAll}
              <ArrowUpRight size={16} className="text-accent" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
