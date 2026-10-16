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
    "Front-End Developer focused on React and modern UI. I turn product ideas into fast, accessible interfaces — built to look professional and work beautifully.",
  metrics: [
    { icon: Calendar, value: "+5 Years", label: "Experience" },
    { icon: Rocket, value: "+30", label: "Projects Delivered" },
    { icon: Trophy, value: "100%", label: "Client Satisfaction" },
  ] satisfies Metric[],
} as const;
