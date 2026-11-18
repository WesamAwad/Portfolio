import { ExternalLink } from "lucide-react";
import { SectionHeadingUnderline } from "../SectionHeadingUnderline";
import { performanceContent } from "../../data/performance";
import { useTheme } from "../../theme/useTheme";
import performancePanelDark from "../../assets/performance-panel-dark.webp";
import performancePanelLight from "../../assets/performance-panel-light.webp";

export function Performance() {
  const { dark } = useTheme();
  const performancePanel = dark ? performancePanelDark : performancePanelLight;

  return (
    <section id="performance" aria-labelledby="performance-heading" className="relative scroll-mt-5 overflow-hidden border-t border-border/80 bg-background">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-28 top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-primary/8 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 md:px-8 md:py-16 md:text-start">
        <div className="mb-3 flex flex-col items-center md:mb-4 md:items-start">
          <div className="group inline-flex flex-col items-center md:items-start">
            <h2 id="performance-heading" className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {performanceContent.title}
            </h2>
            <SectionHeadingUnderline />
          </div>
          <p className="mt-2 text-base leading-relaxed text-muted sm:text-lg md:whitespace-nowrap">
            {performanceContent.summary}
          </p>
        </div>

        <figure className="motion-safe:animate-[fade-up_0.55s_ease-out_both]">
          <img
            key={performancePanel}
            src={performancePanel}
            alt={performanceContent.imageAlt}
            width={dark ? 1419 : 1470}
            height={dark ? 725 : 746}
            loading="lazy"
            decoding="async"
            className="h-auto w-full"
          />
          <figcaption className="sr-only">
            Lighthouse scores: Performance {performanceContent.scores[0].value}, Accessibility {performanceContent.scores[1].value}, Best Practices{" "}
            {performanceContent.scores[2].value}, SEO {performanceContent.scores[3].value}.
          </figcaption>
        </figure>

        <div className="mt-3 flex flex-col items-center gap-3 md:mt-4 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-muted">Re-run the live report anytime on PageSpeed Insights.</p>
          <a
            href={performanceContent.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {performanceContent.verifyLabel}
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
