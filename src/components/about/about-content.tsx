"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Sparkles,
  Phone,
  Mail,
  ArrowRight,
  Camera,
  CheckCircle2,
  Calendar,
  Briefcase,
  Code2,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig, technologies } from "@/config/site";
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

const categoryLabels: Record<string, { en: string; ru: string; az: string }> = {
  core: { en: "Core Languages", ru: "Базовые языки", az: "Əsas dillər" },
  framework: { en: "Frameworks & Runtimes", ru: "Фреймворки и среды", az: "Freymvorklar" },
  styling: { en: "Styling & Motion", ru: "Стилизация и анимации", az: "Stillər və animasiya" },
  tools: { en: "Tools & Platforms", ru: "Инструменты и платформы", az: "Alətlər və platformalar" },
};

export function AboutContent() {
  const { lang, t } = useLanguage();
  const [photoError, setPhotoError] = useState(false);

  const groupedTech = technologies.reduce(
    (acc, tech) => {
      const cat = tech.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(tech);
      return acc;
    },
    {} as Record<string, typeof technologies[number][]>
  );

  return (
    <div className="pt-28 md:pt-36">
      {/* Top Hero Section: Bio + Photo Frame */}
      <section className="pb-24 md:pb-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Bio Text Column */}
            <div className="lg:col-span-7">
              <Reveal>
                <div className="flex items-center gap-3 mb-6">
                  <MapPin size={16} className="text-accent" />
                  <span className="text-sm text-muted-foreground font-mono">
                    {t.aboutPage.location}
                  </span>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/25 text-accent">
                    {t.aboutPage.badgeTitle}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8">
                  {t.aboutPage.titleStart}{" "}
                  <span className="text-accent">{t.aboutPage.titleEnd}</span>
                </h1>
              </Reveal>

              <div className="space-y-5 text-muted-foreground text-base sm:text-lg leading-relaxed">
                <Reveal delay={0.15}>
                  <p>
                    {lang === "ru" &&
                      "Привет! Я Camal — Frontend-разработчик из Баку, Азербайджан. Моя страсть — создавать визуально безупречные, быстрые и отзывчивые интерфейсы с использованием React, Next.js и TypeScript."}
                    {lang === "en" &&
                      "Hello! I'm Camal — a Frontend Developer based in Baku, Azerbaijan. I specialize in building visually stunning, lightning-fast, and responsive web applications using React, Next.js, and TypeScript."}
                    {lang === "az" &&
                      "Salam! Mən Camal — Bakıda fəaliyyət göstərən Frontend tərtibatçısıyam. React, Next.js və TypeScript istifadə edərək vizual cəhətdən mükəmməl və sürətli veb-tətbiqlər hazırlayıram."}
                  </p>
                </Reveal>
                <Reveal delay={0.2}>
                  <p>
                    {lang === "ru" &&
                      "Каждый проект для меня — это поиск баланса между строгой инженерной архитектурой, удобством для конечного пользователя и современным дизайном. Я уделяю внимание деталям: времени отклика, анимациям, типографике и оптимизации Core Web Vitals."}
                    {lang === "en" &&
                      "Every project is a search for balance between solid engineering architecture, end-user delight, and modern aesthetics. I obsess over details: response times, smooth transitions, typography, and Core Web Vitals."}
                    {lang === "az" &&
                      "Hər bir layihədə mühəndislik arxitekturası ilə istifadəçi rahatlığı və müasir estetika arasında tarazlıq qururam. Sürətə, animasiyalara və tipoqrafiyaya xüsusi diqqət yetirirəm."}
                  </p>
                </Reveal>
                <Reveal delay={0.25}>
                  <p>
                    {lang === "ru" &&
                      "Помимо коммерческой разработки, я постоянно экспериментирую в pet-проектах, исследуя новые возможности веба, генеративного UI и современных инструментов сборки."}
                    {lang === "en" &&
                      "Beyond commercial projects, I continuously build pet projects and open-source tools to explore emerging web capabilities, generative UI, and high-performance tooling."}
                    {lang === "az" &&
                      "Kommersiya layihələrindən əlavə, pet layihələrlə də məşğul oluram, yeni veb imkanlarını və açıq mənbəli alətləri araşdırıram."}
                  </p>
                </Reveal>
              </div>

              {/* Quick Contact Chips */}
              <Reveal delay={0.3}>
                <div className="mt-8 pt-6 border-t border-border/40 flex flex-wrap items-center gap-4">
                  <a
                    href={siteConfig.phoneUrl}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/60 hover:bg-secondary rounded-lg border border-border/60 text-xs font-mono text-foreground hover:text-accent transition-colors"
                  >
                    <Phone size={13} className="text-accent" />
                    <span>{siteConfig.phone}</span>
                  </a>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/60 hover:bg-secondary rounded-lg border border-border/60 text-xs font-mono text-foreground hover:text-accent transition-colors"
                  >
                    <Mail size={13} className="text-accent" />
                    <span>{siteConfig.email}</span>
                  </a>
                  <a
                    href={siteConfig.links.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/60 hover:bg-secondary rounded-lg border border-border/60 text-xs font-mono text-foreground hover:text-accent transition-colors"
                  >
                    <span>Telegram (@jsscriptdev)</span>
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Photo / Portrait Card Column */}
            <div className="lg:col-span-5 w-full">
              <Reveal delay={0.2}>
                <div className="relative group max-w-sm mx-auto lg:max-w-none">
                  {/* Outer subtle glow */}
                  <div className="absolute -inset-1 bg-gradient-to-tr from-accent/25 via-accent/5 to-transparent rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative bg-[#111113] border border-border/80 rounded-2xl p-5 shadow-2xl overflow-hidden">
                    {/* Top frame header */}
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-border/50 text-xs font-mono text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-foreground font-semibold">Camal</span>
                      </div>
                      <span className="text-[11px] text-accent">Baku, AZ</span>
                    </div>

                    {/* Photo Container */}
                    <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gradient-to-b from-[#18181c] to-[#0c0c0e] border border-border/60 flex flex-col items-center justify-center p-6 text-center">
                      {!photoError ? (
                        <Image
                          src="/camal.png"
                          alt="Camal - Frontend Developer"
                          fill
                          unoptimized
                          className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                          onError={() => setPhotoError(true)}
                          priority
                        />
                      ) : null}

                      {/* Stylized Fallback Avatar when photo is not yet dropped */}
                      {photoError && (
                        <div className="flex flex-col items-center justify-center w-full h-full text-center">
                          {/* Stylized Avatar Emblem */}
                          <div className="w-28 h-28 rounded-2xl bg-gradient-to-tr from-accent/20 via-secondary to-accent/10 border-2 border-accent/40 flex items-center justify-center shadow-lg mb-4 group-hover:scale-105 transition-transform">
                            <span className="text-5xl font-extrabold font-mono text-accent">
                              C
                            </span>
                          </div>

                          <h3 className="text-lg font-bold text-foreground mb-1">
                            Camal
                          </h3>
                          <p className="text-xs font-mono text-accent mb-4">
                            Frontend Developer
                          </p>

                          <div className="px-3.5 py-2 rounded-lg bg-secondary/80 border border-dashed border-border/80 text-[11px] font-mono text-muted-foreground flex items-center gap-2">
                            <Camera size={13} className="text-accent shrink-0" />
                            <span>{t.aboutPage.photoPlaceholderNotice}</span>
                          </div>
                        </div>
                      )}

                      {/* Verified Badge Overlay */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2 rounded-lg bg-[#0a0a0b]/85 backdrop-blur-md border border-border/60 text-[11px] font-mono">
                        <span className="flex items-center gap-1.5 text-foreground font-medium">
                          <CheckCircle2 size={13} className="text-emerald-400" />
                          {t.aboutPage.badgeStatus}
                        </span>
                        <span className="text-accent font-semibold">3+ Yrs Exp</span>
                      </div>
                    </div>

                    {/* Bottom Meta Stats */}
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-border/40 text-xs font-mono">
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/40">
                        <Briefcase size={13} className="text-accent shrink-0" />
                        <span className="text-muted-foreground">React • Next.js</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/40">
                        <Code2 size={13} className="text-accent shrink-0" />
                        <span className="text-muted-foreground">TypeScript</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-py border-t border-border/30">
        <div className="container">
          <Reveal>
            <SectionHeading
              label={t.aboutPage.philosophyTag}
              title={t.aboutPage.philosophyTitle}
              description={t.aboutPage.philosophyDesc}
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.aboutPreview.principles.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="group relative"
                >
                  <div className="absolute top-0 left-0 w-8 h-px bg-accent/40 group-hover:w-full transition-all duration-500" />
                  <div className="pt-6">
                    <span className="text-xs font-mono text-accent/60 mb-3 block">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Technologies Toolkit */}
      <section className="section-py border-t border-border/30">
        <div className="container">
          <Reveal>
            <SectionHeading
              label={t.aboutPage.toolkitTag}
              title={t.aboutPage.toolkitTitle}
              description={t.aboutPage.toolkitDesc}
            />
          </Reveal>

          <div className="space-y-12">
            {Object.entries(groupedTech).map(([category, techs], catIndex) => (
              <Reveal key={category} delay={catIndex * 0.1}>
                <div>
                  <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-5">
                    {categoryLabels[category]?.[lang] || categoryLabels[category]?.en || category}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {techs.map((tech) => {
                      const Icon = iconMap[tech.name];
                      return (
                        <motion.div
                          key={tech.name}
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
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Currently Learning */}
      <section className="section-py border-t border-border/30">
        <div className="container">
          <Reveal>
            <SectionHeading
              label={t.aboutPage.growthTag}
              title={t.aboutPage.growthTitle}
              description={t.aboutPage.growthDesc}
            />
          </Reveal>

          <div className="max-w-2xl">
            <div className="space-y-4">
              {t.aboutPage.learningItems.map((item, index) => (
                <Reveal key={item} delay={index * 0.08}>
                  <div className="flex items-start gap-4 group">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-accent/40 group-hover:bg-accent transition-colors duration-300 shrink-0" />
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {item}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience / Journey Timeline */}
      <section className="section-py border-t border-border/30">
        <div className="container">
          <Reveal>
            <SectionHeading
              label={t.aboutPage.journeyTag}
              title={t.aboutPage.journeyTitle}
              description={t.aboutPage.journeyDesc}
            />
          </Reveal>

          <div className="max-w-2xl">
            <div className="relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border/50" />

              <div className="space-y-10">
                {t.aboutPage.timeline.map((milestone, index) => (
                  <Reveal key={milestone.title} delay={index * 0.1}>
                    <div className="relative pl-8">
                      <div className="absolute left-0 top-1 w-[15px] h-[15px] rounded-full bg-background border-2 border-border flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                      </div>

                      <span className="text-xs font-mono text-accent/60 block mb-1.5">
                        {milestone.period}
                      </span>
                      <h3 className="text-base font-semibold text-foreground mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {milestone.desc}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Contact Banner */}
      <section className="section-py border-t border-border/30 bg-secondary/20">
        <div className="container">
          <Reveal>
            <div className="p-8 sm:p-10 rounded-2xl bg-[#111113] border border-border/70 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-2">
                  Direct Line
                </span>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {t.aboutPage.collaborateTitle}
                </h3>
                <p className="text-muted-foreground text-sm max-w-xl">
                  {t.aboutPage.collaborateDesc}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href={siteConfig.phoneUrl}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary border border-border text-xs font-mono text-foreground hover:text-accent transition-colors"
                >
                  <Phone size={14} className="text-accent" />
                  <span>{siteConfig.phone}</span>
                </a>
                <Link
                  href="/contacts"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-xs font-semibold hover:bg-accent/90 transition-all shadow-sm"
                >
                  <span>{t.nav.contact}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
