import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "./icons/BrandIcons";
import { profile } from "../data/profile";

const whatsappHref = `https://wa.me/${profile.social.whatsapp}`;

const socialLinks = [
  { href: profile.social.github, label: "GitHub", icon: GitHubIcon, external: true },
  { href: profile.social.linkedin, label: "LinkedIn", icon: LinkedInIcon, external: true },
  { href: `mailto:${profile.social.email}`, label: "Email", icon: Mail, external: false },
  { href: whatsappHref, label: "WhatsApp", icon: WhatsAppIcon, external: true },
] as const;

const iconLinkClassName =
  "inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card text-muted transition duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_20px_-8px_color-mix(in_oklab,var(--primary)_45%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:h-9 md:w-9";

function scrollToTop() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
}

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-background dark:bg-[color-mix(in_oklab,var(--background)_88%,black)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-8 text-center sm:px-6 md:items-stretch md:px-8 md:text-start">
        {/* Row 1 */}
        <div className="flex w-full flex-col items-center gap-5 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="flex flex-col items-center md:items-start">
            <a
              href="#home"
              onClick={(event) => {
                event.preventDefault();
                scrollToTop();
              }}
              className="group relative font-hero text-xl font-bold tracking-tight text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:text-2xl md:text-xl"
            >
              <span className="relative z-10">
                <span className="text-primary">{profile.firstName} </span>
                <span>{profile.lastName}</span>
              </span>
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 left-1/2 h-0.75 w-[3.2rem] -translate-x-1/2 origin-center bg-primary transition-[width] duration-300 group-hover:w-full sm:w-[3.8rem] md:left-0 md:translate-x-0 md:origin-left md:w-[3.2rem]"
              />
            </a>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted md:mt-1.5 md:max-w-sm md:text-xs">Front-End Developer crafting clean, fast web experiences.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:justify-end md:gap-2">
            {socialLinks.map(({ href, label, icon: Icon, external }) => (
              <a key={label} href={href} className={iconLinkClassName} aria-label={label} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <Icon className="h-5 w-5 shrink-0 md:h-4 md:w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div aria-hidden="true" className="mt-6 h-px w-full max-w-md bg-border/80 md:mt-5 md:max-w-none" />

        <p className="mt-5 w-full text-center text-xs text-muted md:mt-4">
          © 2026 {profile.firstName} {profile.lastName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
