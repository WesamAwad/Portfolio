import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, Eye, X } from "lucide-react";
import { SectionHeadingUnderline } from "../SectionHeadingUnderline";
import { certificates, type Certificate } from "../../data/certificates";

const glassCardClass =
  "group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_32px_-10px_color-mix(in_oklab,var(--primary)_45%,transparent)] motion-reduce:transform-none dark:shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_0%,transparent)]";

const secondaryBtnClass =
  "inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-border bg-card/70 px-3 py-2 text-xs font-semibold text-card-foreground transition hover:border-primary/50 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const primaryBtnClass =
  "inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

function typeBadgeClass(type: Certificate["type"]) {
  if (type === "Specialization") {
    return "border-primary/40 bg-primary/15 text-primary";
  }
  if (type === "Training") {
    return "border-accent/35 bg-accent/10 text-accent";
  }
  return "border-border bg-background/45 text-muted";
}

function CertificateImageModal({ certificate, onClose }: { certificate: Certificate; onClose: () => void }) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const getFocusable = () => {
      const root = dialogRef.current;
      if (!root) return [] as HTMLElement[];
      return Array.from(root.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (active === first || !dialogRef.current?.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="presentation">
      <button type="button" aria-label="Close certificate preview" className="absolute inset-0 cursor-pointer bg-background/70 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(90vh,40rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-[0_0_48px_-12px_color-mix(in_oklab,var(--primary)_35%,transparent)]"
      >
        <div className="flex items-start justify-between gap-3 border-b border-border/80 px-5 py-4">
          <h2 id={titleId} className="font-display text-xl font-bold text-foreground">
            {certificate.title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex cursor-pointer rounded-lg border border-border p-1.5 text-muted transition hover:border-primary/40 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            aria-label="Close"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-4">
          <img
            src={certificate.image}
            alt={`Full certificate: ${certificate.title} issued by ${certificate.issuer}`}
            width={3508}
            height={2480}
            loading="lazy"
            decoding="async"
            className="mx-auto max-h-[min(70vh,32rem)] w-full rounded-xl object-contain"
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}

function CertificateCover({ certificate, onOpen }: { certificate: Certificate; onOpen: () => void }) {
  const Icon = certificate.icon;
  const iconColor = certificate.iconColor ?? "var(--primary)";

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group/cover relative h-28 w-full cursor-pointer overflow-hidden border-b border-border bg-slate-50 text-start focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring md:aspect-video md:h-auto dark:border-b-0 dark:bg-linear-to-br dark:from-background dark:via-card dark:to-background"
      aria-label={`View certificate for ${certificate.title}`}
      style={{ "--cover-icon": iconColor } as CSSProperties}
    >
      {/* Soft brand-tinted radial glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition duration-500 group-hover/cover:scale-110"
        style={{
          backgroundColor: `color-mix(in oklab, ${iconColor} 28%, transparent)`,
        }}
      />
      {/* Dot pattern */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.22] dark:opacity-[0.18]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, color-mix(in oklab, ${iconColor} 40%, transparent) 1px, transparent 0)`,
          backgroundSize: "18px 18px",
        }}
      />
      {/* Edge vignette */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,color-mix(in_oklab,var(--background)_55%,transparent)_100%)]" />

      <span className={`absolute top-3 left-3 z-10 inline-flex items-center rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide uppercase ${typeBadgeClass(certificate.type)}`}>{certificate.type}</span>

      {Icon ? (
        <span className="absolute inset-0 z-10 flex items-center justify-center">
          <Icon
            aria-hidden="true"
            className="h-11 w-11 transition duration-500 group-hover/cover:scale-110 motion-reduce:transition-none motion-reduce:group-hover/cover:scale-100 md:h-14 md:w-14 lg:h-16 lg:w-16"
            style={{
              color: iconColor,
              filter: "drop-shadow(0 0 16px color-mix(in oklab, var(--cover-icon) 50%, transparent))",
            }}
          />
        </span>
      ) : null}
    </button>
  );
}

function CertificateCard({ certificate }: { certificate: Certificate }) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const courseCount = certificate.courses?.length ?? 0;
  const showCoursesPill = courseCount > 1;

  return (
    <>
      <article className={`${glassCardClass} w-full`}>
        <CertificateCover certificate={certificate} onOpen={() => setViewerOpen(true)} />

        <div className="flex flex-1 flex-col gap-4 p-5">
          <div className="text-start">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-border bg-background/40 px-2.5 py-1 text-xs font-semibold text-muted">{certificate.date}</span>
              {showCoursesPill ? <span className="inline-flex items-center rounded-full border border-border bg-background/40 px-2.5 py-1 text-xs font-semibold text-muted">{courseCount} courses</span> : null}
            </div>

            <h3 className="font-display text-base font-bold text-foreground sm:text-lg">{certificate.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{certificate.issuer}</p>
          </div>

          <ul className="flex flex-wrap gap-2">
            {certificate.skills.map((skill) => (
              <li key={skill} className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                {skill}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center gap-2 pt-1">
            <button type="button" onClick={() => setViewerOpen(true)} className={secondaryBtnClass}>
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              View
            </button>
            {certificate.verifyUrl ? (
              <a href={certificate.verifyUrl} target="_blank" rel="noopener noreferrer" className={primaryBtnClass}>
                Verify
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </article>

      {viewerOpen ? <CertificateImageModal certificate={certificate} onClose={() => setViewerOpen(false)} /> : null}
    </>
  );
}

export function Certificates() {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const updateActiveIndex = () => {
      const items = Array.from(scroller.children) as HTMLElement[];
      if (items.length === 0) return;

      const center = scroller.scrollLeft + scroller.clientWidth / 2;
      let nearest = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      items.forEach((item, index) => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const distance = Math.abs(itemCenter - center);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = index;
        }
      });

      setActiveIndex((current) => (current === nearest ? current : nearest));
    };

    updateActiveIndex();
    scroller.addEventListener("scroll", updateActiveIndex, { passive: true });
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      scroller.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, []);

  return (
    <section id="certificates" aria-labelledby="certificates-heading" className="relative -scroll-mt-5 overflow-hidden border-t border-border/80 bg-background">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-28 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-16 h-80 w-80 rounded-full bg-primary/8 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 md:px-8 md:py-28 md:text-start">
        <div className="mb-12 flex flex-col items-center md:mb-14 md:items-start">
          <div className="group inline-flex flex-col items-center md:items-start">
            <h2 id="certificates-heading" className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              My Certificates
            </h2>
            <SectionHeadingUnderline />
          </div>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">Verified specializations, courses, and training that support my frontend craft.</p>
        </div>

        <ul
          ref={scrollerRef}
          className="flex items-stretch snap-x snap-mandatory gap-4 overflow-x-auto [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden md:grid md:snap-none md:grid-cols-2 md:gap-6 md:overflow-x-visible lg:grid-cols-3"
        >
          {certificates.map((certificate, index) => (
            <li
              key={certificate.id}
              className="flex w-[85%] shrink-0 snap-center motion-safe:animate-[fade-up_0.5s_ease-out_both] md:w-auto md:shrink"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <CertificateCard certificate={certificate} />
            </li>
          ))}
        </ul>

        <div className="mt-5 flex justify-center gap-2 md:hidden" role="tablist" aria-label="Certificate slides">
          {certificates.map((certificate, index) => (
            <button
              key={certificate.id}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`Go to ${certificate.title}`}
              className={`h-2 w-2 cursor-pointer rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${activeIndex === index ? "bg-primary" : "bg-border hover:bg-muted"}`}
              onClick={() => {
                const scroller = scrollerRef.current;
                const item = scroller?.children[index] as HTMLElement | undefined;
                if (!scroller || !item) return;
                const left = item.offsetLeft - (scroller.clientWidth - item.offsetWidth) / 2;
                const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                scroller.scrollTo({ left: Math.max(0, left), behavior: reduceMotion ? "auto" : "smooth" });
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
