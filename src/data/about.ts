import { Calendar, Rocket, Trophy, type LucideIcon } from "lucide-react";

export type Metric = {
  icon: LucideIcon;
  value: string;
  label: string;
};

export const aboutContent = {
  title: "About Me",
  headline:
    "Building polished React interfaces that feel fast, clear, and intentional",
  summary:
    "Front-End Developer focused on React and modern UI craft. I turn product ideas into accessible, high-performance interfaces with clean architecture and careful attention to detail — from first paint to every interaction. My goal is simple: experiences that look professional and work beautifully.",
  metrics: [
    { icon: Calendar, value: "+5 Years", label: "Experience" },
    { icon: Rocket, value: "+30", label: "Projects Delivered" },
    { icon: Trophy, value: "100%", label: "Client Satisfaction" },
  ] satisfies Metric[],
} as const;
