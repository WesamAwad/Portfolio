import alkanzAcademyImage from "../assets/Alkanze-Mockup.webp";
import alkanzAcademyImageMd from "../assets/Alkanze-Mockup-800.webp";
import alkanzAcademyImageSm from "../assets/Alkanze-Mockup-400.webp";
import creativeAgencyImage from "../assets/SpecialDesighn-Mockup.webp";
import creativeAgencyImageMd from "../assets/SpecialDesighn-Mockup-800.webp";
import creativeAgencyImageSm from "../assets/SpecialDesighn-Mockup-400.webp";
import swiftFixImage from "../assets/SwiftFix-Mockup.webp";
import swiftFixImageMd from "../assets/SwiftFix-Mockup-800.webp";
import swiftFixImageSm from "../assets/SwiftFix-Mockup-400.webp";

export type ProjectCategory = "react-ts" | "vanilla-js" | "landing";

export type Project = {
  id: string;
  title: string;
  description: string;
  role: string;
  category: ProjectCategory;
  tech: string[];
  image?: string;
  /** Responsive candidates: "url 400w, url 800w, url 1600w" */
  imageSrcSet?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
};

export const projectFilters = [
  { id: "all", label: "All" },
  { id: "react-ts", label: "React & TypeScript" },
  { id: "vanilla-js", label: "JavaScript (Vanilla)" },
  { id: "landing", label: "Landing Pages & UI" },
] as const;

export type ProjectFilterId = (typeof projectFilters)[number]["id"];

export const projectsContent = {
  title: "My Projects",
} as const;

export const projects: Project[] = [
  {
    id: "swiftfix",
    title: "SwiftFix",
    description: "A service-marketplace platform connecting users with repair workshops — built to simplify device diagnostics and fix workflows into a seamless React web interface.",
    role: "Front-End Developer — built the UI, state management, and interactive flows in React & TypeScript.",
    category: "react-ts",
    tech: ["React", "TypeScript", "Tailwind", "Redux"],
    image: swiftFixImage,
    imageSrcSet: `${swiftFixImageSm} 400w, ${swiftFixImageMd} 800w, ${swiftFixImage} 1600w`,
    liveUrl: "https://swiftfix-app-project.vercel.app/",
    featured: true,
    githubUrl: "https://github.com/WesamAwad/Front-End-React-Tagat",
  },
  {
    id: "alkanz-academy",
    title: "Alkanz Academy",
    description: "An educational platform for students with courses, live sessions, and organized learning paths — built as a clear, content-first web experience.",
    role: "Front-End Developer — developed the student-facing pages, layouts, and interactive UI with HTML, CSS, JavaScript, and Bootstrap.",
    category: "vanilla-js",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap5"],
    image: alkanzAcademyImage,
    imageSrcSet: `${alkanzAcademyImageSm} 400w, ${alkanzAcademyImageMd} 800w, ${alkanzAcademyImage} 1600w`,
    liveUrl: "https://alkanzacademy.com/",
  },
  {
    id: "creative-agency",
    title: "Creative Agency",
    description: "A multi-section landing page with customizable theme options, gallery, timeline, and testimonials — focused on interactive UI and polished layout.",
    role: "Front-End Developer — designed and built the full landing page, theme controls, and interactive sections with vanilla JavaScript.",
    category: "landing",
    tech: ["HTML", "CSS", "JavaScript"],
    image: creativeAgencyImage,
    imageSrcSet: `${creativeAgencyImageSm} 400w, ${creativeAgencyImageMd} 800w, ${creativeAgencyImage} 1600w`,
    liveUrl: "https://wesamawad.github.io/Project-js/",
    githubUrl: "https://github.com/WesamAwad/Project-js",
  },
];
