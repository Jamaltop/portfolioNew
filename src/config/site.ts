export interface Project {
  id: string;
  title: string;
  description: {
    en: string;
    ru: string;
    az: string;
  };
  longDescription: {
    en: string;
    ru: string;
    az: string;
  };
  technologies: string[];
  image: string;
  github: string;
  demo: string;
  featured: boolean;
  year: string;
  division: "commercial" | "pet";
  categoryLabel: {
    en: string;
    ru: string;
    az: string;
  };
  clientOrContext?: {
    en: string;
    ru: string;
    az: string;
  };
  metrics?: string;
}

export const siteConfig = {
  name: "Camal",
  fullName: "Camal",
  role: "Frontend Developer",
  location: "Azerbaijan, Baku",
  email: "camalkos91@gmail.com",
  phone: "051-543-23-06",
  phoneFormatted: "+994 51 543 23 06",
  phoneUrl: "tel:0515432306",
  photoUrl: "/camal.png",
  description:
    "Creative Frontend Developer specializing in React, Next.js, and TypeScript. I engineer performant, visually distinctive digital products with seamless user experiences.",
  shortBio:
    "Creative Frontend Developer based in Azerbaijan. I build modern, lightning-fast web applications with clean architecture, thoughtful micro-interactions, and pixel-perfect design.",
  links: {
    github: "https://github.com/Jamaltop",
    telegram: "https://t.me/jsscriptdev",
    telegramUsername: "@jsscriptdev",
    linkedin: "#", // Handled via modal notice
  },
  stats: [
    { value: "3+", key: "experience" },
    { value: "20+", key: "projects" },
    { value: "99%", key: "satisfaction" },
    { value: "<0.8s", key: "firstPaint" },
  ],
  nav: [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "projects", href: "/projects" },
    { key: "contact", href: "/contacts" },
  ],
};

export const technologies = [
  { name: "HTML", category: "core" },
  { name: "CSS", category: "core" },
  { name: "JavaScript", category: "core" },
  { name: "TypeScript", category: "core" },
  { name: "React", category: "framework" },
  { name: "Next.js", category: "framework" },
  { name: "Tailwind CSS", category: "styling" },
  { name: "Git", category: "tools" },
  { name: "GitHub", category: "tools" },
] as const;

export type Technology = (typeof technologies)[number];

export const projects: Project[] = [
  {
    id: "velora",
    title: "Velora",
    description: {
      en: "A premium React + Vite commercial landing experience focused on a modern beauty and lifestyle brand.",
      ru: "Премиальный коммерческий landing на React + Vite для современного бренда красоты и lifestyle.",
      az: "Modern gözəllik və lifestyle brendi üçün React + Vite əsasında hazırlanmış premium kommersiya landing təcrübəsi.",
    },
    longDescription: {
      en: "Velora is a modern commercial website created to present a premium lifestyle brand with a polished flow, strong product storytelling, and conversion-focused sections.",
      ru: "Velora — современный коммерческий сайт для премиального lifestyle-бренда с аккуратной визуальной подачей, сильным storytelling и CTA-блоками под конверсию.",
      az: "Velora premium lifestyle brendini peşəkar şəkildə təqdim etmək üçün yaradılmış modern kommersiya saytıdır; məhsul hekayəsi, aydın struktur və konversiyaya yönəlmiş bölmələr daxildir.",
    },
    technologies: ["React", "Vite", "TypeScript", "CSS"],
    image: "/velora.jpeg",
    github: "https://github.com/Jamaltop/velora",
    demo: "https://velora-kappa-inky.vercel.app",
    featured: true,
    year: "2026",
    division: "commercial",
    categoryLabel: {
      en: "Commercial Project",
      ru: "Коммерческий проект",
      az: "Kommersiya layihəsi",
    },
    clientOrContext: {
      en: "Client project",
      ru: "Клиентский проект",
      az: "Müştəri layihəsi",
    },
    metrics: "Commercial landing",
  },
  {
    id: "frontend-playground",
    title: "Frontend Playground",
    description: {
      en: "An interactive React and HTML/CSS showcase built to experiment with frontend patterns, components, and visual UI ideas.",
      ru: "Интерактивная площадка на React и HTML/CSS для экспериментов с UI-компонентами, паттернами и визуальными идеями интерфейсов.",
      az: "React və HTML/CSS əsasında hazırlanmış interaktiv frontend sandbox, UI komponentləri və vizual dizayn ideyaları üçün sınaq meydançasıdır.",
    },
    longDescription: {
      en: "Frontend Playground is a creative UI sandbox focused on experimentation, modular interface concepts, and polished interactive behaviors for modern frontend development.",
      ru: "Frontend Playground — это творческая UI-площадка для экспериментов, модульных интерфейсных решений и отточенных интерактивных паттернов в современном фронтенде.",
      az: "Frontend Playground müasir frontend inkişafı üçün interaktiv UI sınaq meydançasıdır; modul interfeys konsepsiyaları, təkrarlanan komponentlər və dəqiq interaktiv davranışlar üzərində işlənir.",
    },
    technologies: ["React", "HTML", "CSS", "JavaScript"],
    image: "/frontendPlaygroung.jpeg",
    github: "https://github.com/Jamaltop/frontend-playground",
    demo: "https://jamaltop.github.io/frontend-playground/",
    featured: true,
    year: "2026",
    division: "commercial",
    categoryLabel: {
      en: "Commercial Project",
      ru: "Коммерческий проект",
      az: "Kommersiya layihəsi",
    },
    clientOrContext: {
      en: "Client project",
      ru: "Клиентский проект",
      az: "Müştəri layihəsi",
    },
    metrics: "Interactive UI showcase",
  },
  {
    id: "taskflow",
    title: "TaskFlow",
    description: {
      en: "A productivity-focused React + Vite landing page designed for a modern task and workflow management brand.",
      ru: "Landing page для бренда менеджмента задач и workflow на React + Vite с фокусом на продуктивность и пользовательский опыт.",
      az: "Müasir task və workflow menecment brendi üçün React + Vite əsasında yaradılmış məhsuldarlığa yönəlmiş landing page.",
    },
    longDescription: {
      en: "TaskFlow is a sleek React + Vite website built to communicate the value of a modern productivity product through clear positioning, polished sections, and conversion-driven storytelling.",
      ru: "TaskFlow — современный React + Vite-сайт для продукта повышения продуктивности с понятным позиционированием, аккуратными секциями и story-driven подачей.",
      az: "TaskFlow müasir məhsuldarlıq məhsulunu aydın şəkildə çatdırmaq üçün hazırlanmış React + Vite saytıdır; qısa mövqe, peşəkar bölmələr və konversiyaya yönəlmiş hekayə strukturu daxildir.",
    },
    technologies: ["React", "Vite", "TypeScript", "CSS"],
    image: "/taskflow.jpeg",
    github: "https://github.com/Jamaltop/taskflow",
    demo: "https://taskflow-phi-lake.vercel.app",
    featured: true,
    year: "2026",
    division: "commercial",
    categoryLabel: {
      en: "Commercial Project",
      ru: "Коммерческий проект",
      az: "Kommersiya layihəsi",
    },
    clientOrContext: {
      en: "Client project",
      ru: "Клиентский проект",
      az: "Müştəri layihəsi",
    },
    metrics: "Productivity brand site",
  },
  {
    id: "healthyfood",
    title: "HealthyFood",
    description: {
      en: "A modern JSX/React food brand landing page focused on products, health benefits, and conversion-friendly presentation.",
      ru: "Современная JSX/React-страница для бренда здорового питания с акцентом на пользу продукта и конверсию.",
      az: "JSX/React əsasında hazırlanmış sağlam qida brendi landing page, məhsul üstünlükləri və dönüşüm optimizasiyası üzərində qurulub.",
    },
    longDescription: {
      en: "HealthyFood is a responsive JSX/React landing page designed for a food and wellness brand. It combines clear product storytelling, lifestyle visuals, and strong conversion sections for a polished commercial presentation.",
      ru: "HealthyFood — адаптивная JSX/React-страница для бренда здорового питания. Она сочетает визуальную подачу, продуктовый storytelling и сильные CTA-блоки для коммерческого показа.",
      az: "HealthyFood sağlam qida və wellness brendi üçün hazırlanmış JSX/React landing pagedır. Məhsul hekayəsi, həyat tərzi vizualları və güclü CTA blokları ilə kommersiya təqdimatını yaxşılaşdırır.",
    },
    technologies: ["React", "JSX", "CSS"],
    image: "/healthyfood.png",
    github: "https://github.com/Jamaltop/healthyfood",
    demo: "https://healthyfood-nine.vercel.app",
    featured: true,
    year: "2024",
    division: "commercial",
    categoryLabel: {
      en: "Commercial Project",
      ru: "Коммерческий проект",
      az: "Kommersiya layihəsi",
    },
    clientOrContext: {
      en: "Client project",
      ru: "Клиентский проект",
      az: "Müştəri layihəsi",
    },
    metrics: "React landing page",
  },
  {
    id: "pfc-it",
    title: "PFC IT",
    description: {
      en: "A responsive HTML/CSS/JS website for a tech-focused brand, built to present services, expertise, and contact information clearly.",
      ru: "Адаптивный сайт на HTML/CSS/JS для IT-бренда с понятным представлением услуг, экспертизы и контактов.",
      az: "HTML/CSS/JS ilə hazırlanmış, texnologiya fokuslu brend üçün responsiv veb sayt; xidmətlər, ekspertiz və əlaqə məlumatları aydın təqdim olunur.",
    },
    longDescription: {
      en: "PFC IT is a clean corporate-style landing page built with vanilla HTML, CSS, and JavaScript. The focus is on clarity, fast delivery, and a professional presentation for a tech business.",
      ru: "PFC IT — это простой корпоративный landing page на vanilla HTML/CSS/JS. Основной акцент сделан на ясность, скорость загрузки и профессиональную подачу IT-бизнеса.",
      az: "PFC IT vanilla HTML/CSS/JS ilə yaradılmış, təmiz korporativ style landing pagedır. Fokus aydınlıq, sürətli təqdimat və texnologiya biznesi üçün peşəkar üslubdadır.",
    },
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "/pfc.png",
    github: "https://github.com/Jamaltop/PFC-IT",
    demo: "https://jamaltop.github.io/PFC-IT/",
    featured: true,
    year: "2023",
    division: "commercial",
    categoryLabel: {
      en: "Commercial Project",
      ru: "Коммерческий проект",
      az: "Kommersiya layihəsi",
    },
    clientOrContext: {
      en: "Client project",
      ru: "Клиентский проект",
      az: "Müştəri layihəsi",
    },
    metrics: "Corporate landing",
  },
  {
    id: "aurora",
    title: "AURORA",
    description: {
      en: "A modern landing page focused on premium visual storytelling and conversion-driven product presentation.",
      ru: "Современная landing page с акцентом на визуальный storytelling и продуктовую презентацию.",
      az: "Premium vizual hekayə və məhsul təqdimatı üçün modern landing page.",
    },
    longDescription: {
      en: "AURORA is a polished interactive landing page built to showcase a premium brand or product with strong motion, clean structure, and memorable visual hierarchy.",
      ru: "AURORA — это аккуратная интерактивная landing page для премиум-бренда с сильной визуальной иерархией, анимацией и продуманной структурой.",
      az: "AURORA premium marka və məhsul təqdimatı üçün yaradılmış, diqqət çəkən animasiyalar və aydın vizual struktur təqdim edən interaktiv landing pagedır.",
    },
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "/aurora.jpeg",
    github: "https://github.com/Jamaltop/AURORA",
    demo: "https://jamaltop.github.io/AURORA/",
    featured: true,
    year: "2023",
    division: "pet",
    categoryLabel: {
      en: "Pet Project",
      ru: "Pet-проект",
      az: "Pet Layihə",
    },
    clientOrContext: {
      en: "Personal project",
      ru: "Личный проект",
      az: "Şəxsi layihə",
    },
    metrics: "Landing page",
  },
  {
    id: "cinemate",
    title: "CINEMATE",
    description: {
      en: "A cinematic movie discovery interface with rich visuals, category browsing, and engaging browsing flow.",
      ru: "Кинематографичный интерфейс для поиска фильмов с красивой визуальной подачей и удобной навигацией.",
      az: "Film kəşfiyyatı üçün sinematik, görsel baxımdan zəngin və istifadəsi rahat interfeys.",
    },
    longDescription: {
      en: "CINEMATE is designed around immersive movie browsing. It focuses on visual organization, smooth transitions, and clear content storytelling for a modern entertainment app experience.",
      ru: "CINEMATE создан для погружения в кино: удобный просмотр, качественная визуализация карточек и понятная навигация по категориям.",
      az: "CINEMATE kino axtarışı və baxışı üçün yaradılmış, vizual cəlbedici, hamar keçidlər və aydın kateqoriyalar təmin edən interfeysdir.",
    },
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "/cinemate.jpeg",
    github: "https://github.com/Jamaltop/CINEMATE",
    demo: "https://jamaltop.github.io/CINEMATE/",
    featured: true,
    year: "2023",
    division: "pet",
    categoryLabel: {
      en: "Pet Project",
      ru: "Pet-проект",
      az: "Pet Layihə",
    },
    clientOrContext: {
      en: "Personal project",
      ru: "Личный проект",
      az: "Şəxsi layihə",
    },
    metrics: "Movie showcase",
  },
  {
    id: "finora",
    title: "FINORA",
    description: {
      en: "A sleek landing experience for a brand or product with premium pacing, structured sections, and clear call-to-action blocks.",
      ru: "Элегантная страница для бренда или продукта с четкой структурой секций и сильными CTA-элементами.",
      az: "Premium üslubda, aydın bölmələr və zəif CTA blokları ilə layihələndirilmiş cəlbedici landing page.",
    },
    longDescription: {
      en: "FINORA presents a visually sharp and concise product story, combining layered visuals, controlled spacing, and refined motion to create a premium landing page experience.",
      ru: "FINORA сочетает лаконичную структуру, аккуратную типографику и плавную анимацию, чтобы сделать landing page премиальным и понятным.",
      az: "FINORA aydın mətn, balanslı boşluqlar və hamar animasiyalarla premium hiss yaradaraq məhsul hekayəsini təqdim edir.",
    },
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "/finora.jpeg",
    github: "https://github.com/Jamaltop/FINORA",
    demo: "https://jamaltop.github.io/FINORA/",
    featured: true,
    year: "2024",
    division: "pet",
    categoryLabel: {
      en: "Pet Project",
      ru: "Pet-проект",
      az: "Pet Layihə",
    },
    clientOrContext: {
      en: "Personal project",
      ru: "Личный проект",
      az: "Şəxsi layihə",
    },
    metrics: "Brand landing",
  },
  {
    id: "nexora",
    title: "NEXORA",
    description: {
      en: "A futuristic product-style landing page with strong hero composition and modern digital aesthetics.",
      ru: "Футуристическая landing page в стиле продукта с мощным hero-баннером и современным UI.",
      az: "Gələcək baxışlı məhsul stilində landing page, güclü hero bölməsi və müasir digital üslub.",
    },
    longDescription: {
      en: "NEXORA focuses on a visually dominant hero section and a clean narrative flow that guides the visitor from vision to conversion with minimal friction.",
      ru: "NEXORA строится вокруг мощного hero-элемента и понятного пользовательского сценария, который ведет посетителя к конверсии без лишних шагов.",
      az: "NEXORA güclü hero bölməsi və asan hərəkət axını ilə ziyarətçini vizyadan konversiyaya aparan müasir landing page dizaynıdır.",
    },
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "/nexora.jpeg",
    github: "https://github.com/Jamaltop/NEXORA",
    demo: "https://jamaltop.github.io/NEXORA/",
    featured: true,
    year: "2024",
    division: "pet",
    categoryLabel: {
      en: "Pet Project",
      ru: "Pet-проект",
      az: "Pet Layihə",
    },
    clientOrContext: {
      en: "Personal project",
      ru: "Личный проект",
      az: "Şəxsi layihə",
    },
    metrics: "Futuristic UI",
  },
  {
    id: "velo",
    title: "velo",
    description: {
      en: "A clean and energetic landing page built around motion, product focus, and concise brand presentation.",
      ru: "Чистый и динамичный landing page с акцентом на движение, продукт и лаконичную подачу бренда.",
      az: "Hərəkət, məhsul diqqəti və qısa marka təqdimatı üzərində qurulmuş təmiz, enerjili landing page.",
    },
    longDescription: {
      en: "VELO maintains a lightweight and modern aesthetic while presenting a crisp product story, introspective sections, and a strong visual rhythm to keep the user engaged.",
      ru: "VELO сохраняет легкий и современный стиль, но при этом удерживает внимание пользователя за счет ритма секций, сильной визуальной иерархии и понятной структуры.",
      az: "VELO yüngül və müasir estetik saxlayaraq, aydın bölmələr və canlı vizual ritm ilə ziyarətçini diqqətdə saxlayır.",
    },
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "/velo.jpeg",
    github: "https://github.com/Jamaltop/velo",
    demo: "https://jamaltop.github.io/velo/",
    featured: true,
    year: "2023",
    division: "pet",
    categoryLabel: {
      en: "Pet Project",
      ru: "Pet-проект",
      az: "Pet Layihə",
    },
    clientOrContext: {
      en: "Personal project",
      ru: "Личный проект",
      az: "Şəxsi layihə",
    },
    metrics: "Brand page",
  },
];
