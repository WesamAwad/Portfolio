import { Header } from "./components/Header";
import { Hero } from "./components/sections/Hero";
import { AboutMe } from "./components/sections/AboutMe";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";
import { Experience } from "./components/sections/Experience";
import { Certificates } from "./components/sections/Certificates";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutMe />
        <Projects />
        <Skills />
        <Experience />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
