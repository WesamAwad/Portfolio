import type { IconType } from "react-icons";
import { VscGraphLine, VscJson, VscPulse, VscServerProcess, VscVscode } from "react-icons/vsc";
import { AntigravityIcon } from "../components/icons/BrandIcons";
import { SiBootstrap, SiCss, SiCursor, SiFigma, SiGit, SiGithub, SiGooglesearchconsole, SiHtml5, SiJavascript, SiLighthouse, SiNextdotjs, SiPostman, SiReact, SiRedux, SiTailwindcss, SiTypescript, SiVercel } from "react-icons/si";

export type SkillItem = {
  name: string;
  icon: IconType;
  color: string;
  /** Keep the icon's built-in brand colors (ignore flat color tint) */
  preserveColors?: boolean;
};

export const skillsContent = {
  title: "My Skills",
  subtitle: "The tools, frameworks, and technologies I use to bring ideas to life.",
} as const;

/** Top track — scrolls left */
export const skillTrackTop: SkillItem[] = [
  { name: "React.js", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: SiCss, color: "#1572B6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Redux Toolkit", icon: SiRedux, color: "#764ABC" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "Git", icon: SiGit, color: "#F05032" },
];

/** Bottom track — scrolls right */
export const skillTrackBottom: SkillItem[] = [
  { name: "Bootstrap 5", icon: SiBootstrap, color: "#7952B3" },
  { name: "RTK Query", icon: VscServerProcess, color: "#764ABC" },
  { name: "REST APIs", icon: VscJson, color: "#F7DF1E" },
  { name: "Performance & SEO", icon: VscGraphLine, color: "#4285F4" },
  { name: "Core Web Vitals", icon: VscPulse, color: "#0CCE6B" },
  { name: "Lighthouse", icon: SiLighthouse, color: "#F44B21" },
  { name: "SEO", icon: SiGooglesearchconsole, color: "#458CF5" },
  { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
  { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  { name: "VS Code", icon: VscVscode, color: "#007ACC" },
  { name: "Cursor", icon: SiCursor, color: "#FFFFFF" },
  { name: "Antigravity", icon: AntigravityIcon, color: "#4285F4", preserveColors: true },
];
