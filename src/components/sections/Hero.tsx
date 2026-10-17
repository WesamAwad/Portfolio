import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "../icons/BrandIcons";
import { profile } from "../../data/profile";

const socialLinks = [
  { href: profile.social.github, label: "GitHub", icon: GitHubIcon, external: true },
  { href: profile.social.linkedin, label: "LinkedIn", icon: LinkedInIcon, external: true },
  { href: profile.social.emailHref, label: "Email", icon: Mail, external: true },
] as const;

const iconLinkClassName =
  "inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card text-muted transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-heading" className="relative min-h-svh overflow-hidden bg-background">
      <div className="mx-auto grid min-h-svh max-w-6xl content-center items-center justify-items-center gap-0 px-4 py-20 text-center sm:px-6 md:content-normal md:items-center md:gap-10 md:grid-cols-2 md:justify-items-stretch md:px-8 md:py-28 md:text-start">
        {/* النص — على الموبايل يطلع فوق أسفل الصورة */}
        <div className="order-2 relative z-20 -mt-28 max-w-xl md:order-1 md:mt-0">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-24 bottom-0 -z-10 bg-linear-to-t from-background from-40% via-background/95 to-transparent md:hidden" />

          <h1 id="hero-heading" className="font-hero text-3xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-6xl">
            <span className="font-medium text-foreground/85">Hi – I'm</span> <span className="font-bold text-foreground">{profile.firstName}</span>
          </h1>

          <p className="mt-2.5 font-display text-sm font-bold tracking-[0.2em] text-primary uppercase sm:text-base md:mt-3">{profile.role}</p>

          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base md:mt-5 md:text-lg">{profile.summary}</p>

          <div className="mt-7 flex flex-wrap justify-center gap-3 md:mt-8 md:justify-start">
            <a href={profile.ctas.primary.href} className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
              {profile.ctas.primary.label}
            </a>
            <a
              href={profile.ctas.secondary.href}
              {...("download" in profile.ctas.secondary && profile.ctas.secondary.download ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}
              className="rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-card-foreground transition hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {profile.ctas.secondary.label}
            </a>
          </div>

          <div className="mt-6 flex justify-center gap-3 md:justify-start">
            {socialLinks.map(({ href, label, icon: Icon, external }) => (
              <a key={label} href={href} className={iconLinkClassName} aria-label={label} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* الصورة — نفس الحجم، بدون تصغير قسري */}
        <div className="relative order-1 flex w-full items-center justify-center md:order-2 md:justify-end">
          <div aria-hidden="true" className="absolute h-[70%] w-[70%] rounded-full bg-primary/15 blur-3xl" />
          <img
            src={profile.image.src}
            srcSet={profile.image.srcSet}
            sizes={profile.image.sizes}
            alt={profile.image.alt}
            width={1024}
            height={1024}
            fetchPriority="high"
            decoding="async"
            className="relative z-10 w-full max-w-md object-contain transition-opacity duration-300 mask-[linear-gradient(to_bottom,black_75%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] md:max-w-lg"
          />
        </div>
      </div>
    </section>
  );
}
