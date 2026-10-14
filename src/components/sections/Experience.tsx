import { Briefcase, Building2, CheckCircle2 } from "lucide-react";
import { experienceContent, experienceRoles, type ExperienceRole } from "../../data/experience";

function ExperienceCard({ role }: { role: ExperienceRole }) {
  return (
    <article className="group relative flex-1 rounded-2xl border border-border/80 bg-card/55 p-5 shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_0%,transparent)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-primary/55 hover:shadow-[0_0_36px_-12px_color-mix(in_oklab,var(--primary)_50%,transparent)] motion-reduce:transform-none sm:p-6">
      <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/0 blur-2xl transition duration-500 group-hover:bg-primary/15" />

      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 text-start">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {role.current ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide text-primary uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                Available for Hire
              </span>
            ) : null}
            <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${role.current ? "border-primary/40 bg-primary/10 text-primary" : "border-border bg-background/40 text-muted"}`}>{role.duration}</span>
          </div>

          <h3 className="font-display text-lg font-bold text-foreground sm:text-xl">{role.title}</h3>

          <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-muted">
            <Building2 className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
            {role.company}
          </p>
        </div>

        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
          <Briefcase className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>

      <ul className="relative mt-5 space-y-3 text-start">
        {role.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2.5 text-sm leading-relaxed text-foreground/85">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <ul className="relative mt-5 flex flex-wrap gap-2">
        {role.tech.map((tech) => (
          <li key={tech} className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            {tech}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="relative -scroll-mt-5 overflow-hidden border-t border-border/80 bg-background">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-28 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-16 h-80 w-80 rounded-full bg-primary/8 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 md:px-8 md:py-28 md:text-start">
        <div className="mb-12 flex flex-col items-center md:mb-14 md:items-start">
          <span className="mb-3 inline-flex items-center rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">{experienceContent.badge}</span>
          <div className="group inline-flex flex-col items-center md:items-start">
            <h2 id="experience-heading" className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Professional <span className="text-primary">{experienceContent.titleAccent}</span>
            </h2>
            <span aria-hidden="true" className="mt-3 block h-1 w-16 origin-center rounded-full bg-primary transition-[width] duration-300 ease-out group-hover:w-full md:origin-left" />
          </div>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{experienceContent.subtitle}</p>
        </div>

        <ol className="relative mx-auto max-w-3xl space-y-8 md:mx-0 md:max-w-none">
          {/* Vertical timeline spine */}
          <div aria-hidden="true" className="absolute top-3 bottom-3 left-[0.7rem] w-px bg-border md:left-[1.15rem]" />

          {experienceRoles.map((role, index) => (
            <li key={role.id} className="relative flex gap-4 md:gap-6 motion-safe:animate-[fade-up_0.5s_ease-out_both]" style={{ animationDelay: `${index * 90}ms` }}>
              {/* Timeline node */}
              <div className="relative z-10 mt-5 flex h-6 w-6 shrink-0 items-center justify-center md:mt-6 md:h-9 md:w-9">
                {role.current ? (
                  <>
                    <span aria-hidden="true" className="absolute inline-flex h-6 w-6 animate-ping rounded-full bg-primary/35 motion-reduce:animate-none md:h-8 md:w-8" />
                    <span className="relative h-3 w-3 rounded-full border-2 border-primary bg-primary shadow-[0_0_16px_color-mix(in_oklab,var(--primary)_70%,transparent)] md:h-3.5 md:w-3.5" />
                  </>
                ) : (
                  <span className="relative h-3 w-3 rounded-full border-2 border-border bg-card ring-4 ring-background md:h-3.5 md:w-3.5" />
                )}
              </div>

              <ExperienceCard role={role} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
