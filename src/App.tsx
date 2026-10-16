import { lazy, Suspense, type ReactNode } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/sections/Hero";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { ScrollToHash } from "./components/ScrollToHash";

const AboutMe = lazy(() => import("./components/sections/AboutMe").then((module) => ({ default: module.AboutMe })));
const Projects = lazy(() => import("./components/sections/Projects").then((module) => ({ default: module.Projects })));
const Skills = lazy(() => import("./components/sections/Skills").then((module) => ({ default: module.Skills })));
const Experience = lazy(() => import("./components/sections/Experience").then((module) => ({ default: module.Experience })));
const Certificates = lazy(() => import("./components/sections/Certificates").then((module) => ({ default: module.Certificates })));
const Contact = lazy(() => import("./components/sections/Contact").then((module) => ({ default: module.Contact })));

function SectionSuspense({ children }: { children: ReactNode }) {
  return <Suspense fallback={<div className="min-h-[70svh] md:min-h-144" aria-hidden="true" />}>{children}</Suspense>;
}

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Header />
      <main>
        <Hero />
        <SectionSuspense>
          <AboutMe />
        </SectionSuspense>
        <SectionSuspense>
          <Projects />
        </SectionSuspense>
        <SectionSuspense>
          <Skills />
        </SectionSuspense>
        <SectionSuspense>
          <Experience />
        </SectionSuspense>
        <SectionSuspense>
          <Certificates />
        </SectionSuspense>
        <SectionSuspense>
          <Contact />
        </SectionSuspense>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
