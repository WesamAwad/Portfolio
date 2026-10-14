import type { ComponentType, SVGProps } from "react";
import { Brain, Search } from "lucide-react";
import { SiJavascript, SiReact, SiTypescript } from "react-icons/si";
import reactAdvancedImg from "../assets/certificates/react-advanced.webp";
import javascriptAdvancedImg from "../assets/certificates/javascript-advanced.webp";
import typescriptImg from "../assets/certificates/typescript.webp";
import seoImg from "../assets/certificates/seo.webp";
import introAiImg from "../assets/certificates/intro-ai.webp";

export type CertificateIcon = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  type: "Specialization" | "Course" | "Training";
  credentialId?: string;
  verifyUrl?: string;
  image: string;
  skills: string[];
  courses?: string[];
  featured?: boolean;
  /** Cover icon shown on the card (not the certificate image) */
  icon?: CertificateIcon;
  /** Brand color for the cover icon */
  iconColor?: string;
};

const ALMDRASA_VERIFY = "https://almdrasa.com/certificate-verification";

export const certificates: Certificate[] = [
  {
    id: "react-advanced",
    title: "React: Basics to Advanced",
    issuer: "Almdrasa",
    date: "Jun 2026",
    type: "Specialization",
    credentialId: "734F2BBDD9-734F2BBD70-1394FE674",
    verifyUrl: `${ALMDRASA_VERIFY}/734F2BBDD9-734F2BBD70-1394FE674/`,
    image: reactAdvancedImg,
    skills: ["React", "TypeScript", "Hooks", "State Management"],
    courses: ["React Basics", "React Deep Dive", "React Projects", "TypeScript Fundamentals", "React with TypeScript"],
    featured: true,
    icon: SiReact,
    iconColor: "#61DAFB",
  },
  {
    id: "javascript-advanced",
    title: "JavaScript: Basics to Advanced",
    issuer: "Almdrasa",
    date: "Jan 2026",
    type: "Specialization",
    credentialId: "734936EBF3-73436EAB64-1394FE674",
    verifyUrl: `${ALMDRASA_VERIFY}/734936EBF3-73436EAB64-1394FE674/`,
    image: javascriptAdvancedImg,
    skills: ["JavaScript (ES6+)", "DOM", "Async JS", "OOP"],
    courses: [
      "JavaScript Fundamentals",
      "JavaScript Intermediate",
      "JavaScript Projects I",
      "Advanced JavaScript",
      "JavaScript Projects II",
    ],
    featured: true,
    icon: SiJavascript,
    iconColor: "#F7DF1E",
  },
  {
    id: "typescript",
    title: "TypeScript from Scratch",
    issuer: "Almdrasa",
    date: "Jun 2026",
    type: "Course",
    credentialId: "759D8EF617-759D61540D-1394FE674",
    verifyUrl: `${ALMDRASA_VERIFY}/759D8EF617-759D61540D-1394FE674/`,
    image: typescriptImg,
    skills: ["TypeScript", "Type Safety", "Generics"],
    icon: SiTypescript,
    iconColor: "#3178C6",
  },
  {
    id: "seo",
    title: "SEO — Search Engine Optimization",
    issuer: "Avatar IT (with UNFPA & SDF)",
    date: "Aug 2026",
    type: "Training",
    credentialId: "AVT-2026-0127",
    verifyUrl: "https://app.avatar.ps/verify/AVT-2026-0127/034390f4da3d5cc5",
    image: seoImg,
    skills: ["Technical SEO", "Core Web Vitals", "On-page SEO"],
    courses: ["40-hour in-person training · Gaza · Jun – Jul 2026"],
    icon: Search,
    iconColor: "#4285F4",
  },
  {
    id: "intro-ai",
    title: "Introduction to AI",
    issuer: "Almdrasa",
    date: "Jan 2026",
    type: "Course",
    credentialId: "75BB3D61CA-75BB0F2577-1394FE674",
    verifyUrl: `${ALMDRASA_VERIFY}/75BB3D61CA-75BB0F2577-1394FE674/`,
    image: introAiImg,
    skills: ["AI Fundamentals", "Machine Learning Basics"],
    courses: ["Part of the Programming Foundations track"],
    icon: Brain,
    iconColor: "#A78BFA",
  },
];
