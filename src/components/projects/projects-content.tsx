"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, X, Briefcase, Sparkles, Filter, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { projects, type Project } from "@/config/site";
import { cn } from "@/shared/lib/cn";
import { useLanguage } from "@/shared/context/language-context";

export function ProjectsContent() {
  const [activeDivision, setActiveDivision] = useState<"all" | "commercial" | "pet">("all");
  const [activeTech, setActiveTech] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { lang, t } = useLanguage();

  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((p) => p.technologies.forEach((t) => techSet.add(t)));
    return ["All", ...Array.from(techSet).sort()];
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesDivision = activeDivision === "all" || p.division === activeDivision;
      const matchesTech = activeTech === "All" || p.technologies.includes(activeTech);
      return matchesDivision && matchesTech;
    });
  }, [activeDivision, activeTech]);

  const commercialCount = projects.filter((p) => p.division === "commercial").length;
  const petCount = projects.filter((p) => p.division === "pet").length;

  return (
    <div className="pt-28 md:pt-36">
      <section className="pb-24 md:pb-32">
        <div className="container">
          {/* Header */}
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="inline-block text-accent font-mono text-xs tracking-widest uppercase mb-3 px-3 py-1 bg-accent/10 rounded-full border border-accent/20">
                {t.projectsPage.tag}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                {t.projectsPage.titleStart}{" "}
                <span className="text-muted-foreground">{t.projectsPage.titleEnd}</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t.projectsPage.desc}
              </p>
            </div>
          </Reveal>

          {/* TWO MAIN DIVISIONS SWITCHER */}
          <Reveal delay={0.1}>
            <div className="p-1.5 bg-secondary/50 border border-border/70 rounded-2xl flex flex-wrap items-center gap-2 mb-8">
              <button
                type="button"
                onClick={() => {
                  setActiveDivision("all");
                  setActiveTech("All");
                }}
                className={cn(
                  "relative flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-mono font-medium rounded-xl transition-all duration-200",
                  activeDivision === "all"
                    ? "text-accent-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {activeDivision === "all" && (
                  <motion.div
                    layoutId="projects-main-division"
                    className="absolute inset-0 bg-accent rounded-xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t.projectsPage.allTab}</span>
                <span className="relative z-10 px-2 py-0.5 rounded-full text-[10px] bg-background/30 text-current">
                  {projects.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveDivision("commercial");
                  setActiveTech("All");
                }}
                className={cn(
                  "relative flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-mono font-medium rounded-xl transition-all duration-200",
                  activeDivision === "commercial"
                    ? "text-accent-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {activeDivision === "commercial" && (
                  <motion.div
                    layoutId="projects-main-division"
                    className="absolute inset-0 bg-accent rounded-xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Briefcase size={14} className="relative z-10" />
                <span className="relative z-10">{t.projectsPage.commercialTab}</span>
                <span className="relative z-10 px-2 py-0.5 rounded-full text-[10px] bg-background/30 text-current">
                  {commercialCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveDivision("pet");
                  setActiveTech("All");
                }}
                className={cn(
                  "relative flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-mono font-medium rounded-xl transition-all duration-200",
                  activeDivision === "pet"
                    ? "text-accent-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {activeDivision === "pet" && (
                  <motion.div
                    layoutId="projects-main-division"
                    className="absolute inset-0 bg-accent rounded-xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Sparkles size={14} className="relative z-10" />
                <span className="relative z-10">{t.projectsPage.petTab}</span>
                <span className="relative z-10 px-2 py-0.5 rounded-full text-[10px] bg-background/30 text-current">
                  {petCount}
                </span>
              </button>
            </div>
          </Reveal>

          {/* Technology filter chips */}
          <Reveal delay={0.15}>
            <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-border/40">
              <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5 mr-2">
                <Filter size={12} />
                {t.projectsPage.filterByTech}
              </span>
              {allTechnologies.map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => setActiveTech(tech)}
                  className={cn(
                    "px-3 py-1 text-xs font-mono rounded-md border transition-all duration-200",
                    activeTech === tech
                      ? "bg-accent/20 text-accent border-accent/40 font-semibold"
                      : "text-muted-foreground border-border/50 hover:border-foreground/30 hover:text-foreground"
                  )}
                >
                  {tech}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Projects Listing */}
          <motion.div layout className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const isCommercial = project.division === "commercial";

                return (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.05,
                      layout: { duration: 0.25 },
                    }}
                    onClick={() => setSelectedProject(project)}
                    className="group cursor-pointer grid grid-cols-1 md:grid-cols-12 gap-6 p-6 md:p-8 bg-secondary/30 border border-border/50 rounded-xl hover:border-accent/40 hover:bg-secondary/50 transition-all duration-300"
                  >
                    {/* Visual Preview */}
                    <div className="md:col-span-5 aspect-video bg-muted/40 rounded-lg overflow-hidden border border-border/40 relative">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent" />

                      {/* Division Badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono font-semibold rounded-md border shadow-sm",
                            isCommercial
                              ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                              : "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
                          )}
                        >
                          {isCommercial ? (
                            <>
                              <Briefcase size={11} />
                              {project.categoryLabel[lang] || project.categoryLabel.en}
                            </>
                          ) : (
                            <>
                              <Sparkles size={11} />
                              {project.categoryLabel[lang] || project.categoryLabel.en}
                            </>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-7 flex flex-col justify-between">
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
                            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                              {project.metrics}
                            </span>
                          )}
                        </div>

                        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-200">
                          {project.title}
                        </h2>

                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                          {project.description[lang] || project.description.en}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-end justify-between gap-4 pt-4 border-t border-border/30">
                        {/* Technologies */}
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

                        {/* Interactive Buttons */}
                        <div className="flex items-center gap-3 shrink-0">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-secondary"
                            aria-label="GitHub Repo"
                          >
                            <Github size={16} />
                            <span>{t.featured.code}</span>
                          </a>
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-semibold bg-accent/15 text-accent border border-accent/30 rounded-md hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                            aria-label="Live Demo"
                          >
                            <span>{t.featured.demo}</span>
                            <ArrowUpRight size={14} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 bg-secondary/20 rounded-xl border border-border/40">
              <p className="text-muted-foreground mb-4">
                {t.projectsPage.noResults}
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveDivision("all");
                  setActiveTech("All");
                }}
                className="px-4 py-2 text-xs font-mono bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors"
              >
                {t.projectsPage.resetFilters}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { lang, t } = useLanguage();
  const isCommercial = project.division === "commercial";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/85 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.96 }}
        transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#111113] border border-border/80 rounded-2xl p-6 sm:p-8 shadow-2xl"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg bg-secondary/50 hover:bg-secondary"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Division tag */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-semibold rounded-md border",
              isCommercial
                ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                : "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
            )}
          >
            {isCommercial ? <Briefcase size={12} /> : <Sparkles size={12} />}
            {project.categoryLabel[lang] || project.categoryLabel.en}
          </span>
          <span className="text-xs font-mono text-muted-foreground">{project.year}</span>
          {project.metrics && (
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {project.metrics}
            </span>
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
          {project.title}
        </h2>

        {/* Long Description */}
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
          {project.longDescription[lang] || project.longDescription.en}
        </p>

        {/* Highlights */}
        <div className="p-4 bg-secondary/30 border border-border/50 rounded-xl mb-6 space-y-2">
          <div className="text-xs font-mono text-accent uppercase tracking-wider">
            {t.projectsPage.architectureTitle}
          </div>
          <ul className="text-xs sm:text-sm text-foreground/80 space-y-1.5">
            <li className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-accent shrink-0" />
              <span>Full responsive layout with mobile-first breakpoints</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-accent shrink-0" />
              <span>Type-safe architecture with clean component boundaries</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-accent shrink-0" />
              <span>Sub-second page transitions & optimized bundle sizing</span>
            </li>
          </ul>
        </div>

        {/* Technologies Used */}
        <div className="mb-8">
          <span className="text-xs font-mono text-muted-foreground block mb-2 uppercase">
            Technologies:
          </span>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono text-foreground bg-secondary/80 border border-border/60 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-4 border-t border-border/40">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold border border-border/80 text-foreground rounded-lg hover:bg-secondary/60 transition-all duration-200"
          >
            <Github size={16} />
            {t.projectsPage.viewCode}
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all duration-200 shadow-md shadow-accent/20"
          >
            <ArrowUpRight size={16} />
            {t.projectsPage.launchDemo}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
