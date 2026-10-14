export type ExperienceRole = {
  id: string;
  title: string;
  company: string;
  duration: string;
  current?: boolean;
  highlights: string[];
  tech: string[];
};

export const experienceContent = {
  badge: "Experience",
  title: "Professional Journey",
  titleAccent: "Journey",
  subtitle: "5+ years building modern web apps and leading frontend architecture.",
} as const;

export const experienceRoles: ExperienceRole[] = [
  {
    id: "lead-senior",
    title: "Frontend Team Lead & Senior Engineer",
    company: "Web Development & Web Platforms",
    duration: "2024 — Present",
    current: true,
    highlights: [
      "Led frontend architecture and UI engineering across 5+ complex web application projects using React.js, TypeScript, and Tailwind CSS.",
      "Configured state management ecosystems with Redux Toolkit and RTK Query for efficient API integrations.",
      "Conducted technical SEO audits, performance optimizations, and Core Web Vitals enhancements to elevate search rankings and user retention.",
    ],
    tech: ["React.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "RTK Query", "Vite"],
  },
  {
    id: "frontend-dev",
    title: "Frontend Developer",
    company: "Web Applications & Services",
    duration: "2020 — 2024",
    highlights: ["Developed clean, responsive, and pixel-perfect web interfaces from Figma/Adobe XD designs.", "Integrated RESTful APIs, optimized asset delivery, and maintained cross-browser compatibility."],
    tech: ["JavaScript (ES6+)", "HTML5", "CSS3", "Bootstrap 5", "REST APIs", "Git"],
  },
];
