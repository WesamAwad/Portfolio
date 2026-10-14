import { aboutContent } from "../../data/about";

export function AboutMe() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative scroll-mt-5 border-t border-border/80 bg-background">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-primary/5 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 md:px-8 md:py-28 md:text-start">
        <div className="mb-10 flex flex-col items-center md:mb-8 md:items-start">
          <div className="group inline-flex flex-col items-center md:items-start">
            <h2 id="about-heading" className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {aboutContent.title}
            </h2>
            <span aria-hidden="true" className="mt-3 block h-1 w-16 origin-center rounded-full bg-primary transition-[width] duration-300 ease-out group-hover:w-full md:origin-left" />
          </div>
        </div>

        <div className="grid items-center  justify-items-center gap-10 md:justify-items-stretch lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <div className="max-w-2xl">
            <h3 className="font-hero text-xl font-semibold leading-snug text-balance text-foreground sm:text-2xl md:text-3xl">{aboutContent.headline}</h3>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{aboutContent.summary}</p>
          </div>

          <ul className="grid w-full max-w-md gap-4 sm:max-w-none sm:grid-cols-3 lg:grid-cols-1">
            {aboutContent.metrics.map(({ icon: Icon, value, label }) => (
              <li key={label}>
                <article className="flex flex-col items-center gap-3 rounded-xl border border-primary/35 bg-card/60 p-4 text-center shadow-[0_0_24px_-8px_color-mix(in_oklab,var(--primary)_35%,transparent)] backdrop-blur-md transition hover:border-primary/60 md:flex-row md:items-center md:gap-4 md:text-start lg:flex-row">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-hero text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{value}</p>
                    <p className="mt-0.5 text-sm font-medium text-primary">{label}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
