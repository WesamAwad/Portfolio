import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { skillsContent, skillTrackBottom, skillTrackTop, type SkillItem } from "../../data/skills";

const LOOP_COPIES = 2;
const SPEED_PX_PER_SEC = 42;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return reduced;
}

function TechBadge({ item }: { item: SkillItem }) {
  const Icon = item.icon;

  return (
    <span
      className="group/badge inline-flex shrink-0 select-none flex-col items-center justify-center gap-1.5 rounded-2xl border border-border/80 bg-[color-mix(in_oklab,var(--card)_82%,#161b22)] px-5 py-3.5 shadow-[0_0_18px_-8px_color-mix(in_oklab,var(--primary)_25%,transparent),inset_0_1px_0_color-mix(in_oklab,var(--primary)_12%,transparent)] backdrop-blur-md transition duration-300 hover:z-10 hover:scale-110 hover:border-primary/50 hover:shadow-[0_0_28px_-4px_color-mix(in_oklab,var(--primary)_45%,transparent)] motion-reduce:transition-none motion-reduce:hover:scale-100"
      style={
        {
          "--badge-brand": item.color,
        } as CSSProperties
      }
    >
      <Icon
        aria-hidden="true"
        className="h-7 w-7 shrink-0 transition duration-300 group-hover/badge:scale-105 sm:h-8 sm:w-8"
        style={
          item.preserveColors
            ? undefined
            : {
                color: item.color,
                filter: "drop-shadow(0 0 6px color-mix(in oklab, var(--badge-brand) 35%, transparent))",
              }
        }
      />
      <span className="text-xs font-semibold text-foreground sm:text-sm">{item.name}</span>
    </span>
  );
}

type MarqueeTrackProps = {
  items: SkillItem[];
  /** `left` = content drifts left; `right` = drifts right */
  direction: "left" | "right";
  reducedMotion: boolean;
  label: string;
};

function MarqueeTrack({ items, direction, reducedMotion, label }: MarqueeTrackProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const loopWidthRef = useRef(0);
  const draggingRef = useRef(false);
  const pausedRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const velocityBoostRef = useRef(1);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const [offset, setOffset] = useState(0);
  const [grabbing, setGrabbing] = useState(false);

  const measure = useCallback(() => {
    const trackEl = trackRef.current;
    if (!trackEl) return;
    // One full set = half the duplicated track width
    loopWidthRef.current = trackEl.scrollWidth / LOOP_COPIES;
  }, []);

  const normalizeOffset = useCallback((value: number) => {
    const width = loopWidthRef.current;
    if (width <= 0) return value;
    let next = value;
    while (next >= width) next -= width;
    while (next < 0) next += width;
    return next;
  }, []);

  useEffect(() => {
    measure();
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(() => measure());
    observer.observe(viewport);
    if (trackRef.current) observer.observe(trackRef.current);

    return () => observer.disconnect();
  }, [measure, items]);

  useEffect(() => {
    if (reducedMotion) return;

    const tick = (time: number) => {
      if (lastTimeRef.current == null) lastTimeRef.current = time;
      const delta = Math.min((time - lastTimeRef.current) / 1000, 0.064);
      lastTimeRef.current = time;

      if (!draggingRef.current && !pausedRef.current && loopWidthRef.current > 0) {
        const signed = direction === "left" ? 1 : -1;
        velocityBoostRef.current += (1 - velocityBoostRef.current) * Math.min(1, delta * 3);
        offsetRef.current = normalizeOffset(offsetRef.current + signed * SPEED_PX_PER_SEC * velocityBoostRef.current * delta);
        setOffset(offsetRef.current);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [direction, reducedMotion, normalizeOffset]);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    measure();
    draggingRef.current = true;
    pausedRef.current = true;
    pointerIdRef.current = event.pointerId;
    dragStartXRef.current = event.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    setGrabbing(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || pointerIdRef.current !== event.pointerId) return;
    const deltaX = event.clientX - dragStartXRef.current;
    // Dragging right moves content right → opposite of left-scroll offset growth
    const next = normalizeOffset(dragStartOffsetRef.current - deltaX);
    offsetRef.current = next;
    setOffset(next);
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;
    draggingRef.current = false;
    pointerIdRef.current = null;
    setGrabbing(false);
    // Soft resume: briefly faster then settle
    velocityBoostRef.current = 0.35;
    if (!event.currentTarget.matches(":hover")) {
      pausedRef.current = false;
    }
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      /* already released */
    }
  };

  const onPointerEnter = () => {
    if (!draggingRef.current) pausedRef.current = true;
  };

  const onPointerLeave = () => {
    if (!draggingRef.current) pausedRef.current = false;
  };

  const loopItems = reducedMotion ? items : Array.from({ length: LOOP_COPIES }, () => items).flat();

  return (
    <div
      ref={viewportRef}
      role="group"
      aria-label={label}
      className={`relative overflow-hidden py-1 ${grabbing ? "cursor-grabbing" : "cursor-grab"}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <div
        ref={trackRef}
        className={`flex w-max items-center gap-3 sm:gap-4 ${reducedMotion ? "flex-wrap justify-center px-2" : ""}`}
        style={{
          transform: reducedMotion ? undefined : `translate3d(${-offset}px, 0, 0)`,
        }}
      >
        {loopItems.map((item, index) => (
          <TechBadge key={`${item.name}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative scroll-mt-0 overflow-hidden border-t border-border/80 bg-background">
      {/* Top neon edge */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

      {/* Ambient orbs + particle field */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-16 h-80 w-80 rounded-full bg-primary/12 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.2] dark:opacity-[0.16]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--primary) 40%, transparent) 1px, transparent 0)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, black 18%, transparent 78%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 md:px-8 md:py-28 md:text-start">
        <div className="mb-12 flex flex-col items-center md:mb-14 md:items-start">
          <span className="mb-3 inline-flex items-center rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">{skillsContent.badge}</span>
          <div className="group inline-flex flex-col items-center md:items-start">
            <h2 id="skills-heading" className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Skills & <span>{skillsContent.titleAccent}</span>
            </h2>
            <span aria-hidden="true" className="mt-3 block h-1 w-16 origin-center rounded-full bg-primary transition-[width] duration-300 ease-out group-hover:w-full md:origin-left" />
          </div>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{skillsContent.subtitle}</p>
        </div>

        {/* Soft green frame around the dual marquee */}
        <div className="relative rounded-[1.75rem] border border-primary/25 bg-card/30 p-4 shadow-[0_0_60px_-20px_color-mix(in_oklab,var(--primary)_45%,transparent),inset_0_1px_0_color-mix(in_oklab,var(--primary)_20%,transparent)] backdrop-blur-sm sm:p-6">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--primary)_12%,transparent),transparent_65%)]" />
          {/* Edge fades so badges dissolve into the frame */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 rounded-l-[1.75rem] bg-linear-to-r from-[color-mix(in_oklab,var(--card)_92%,transparent)] via-[color-mix(in_oklab,var(--card)_40%,transparent)] to-transparent sm:w-16"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 rounded-r-[1.75rem] bg-linear-to-l from-[color-mix(in_oklab,var(--card)_92%,transparent)] via-[color-mix(in_oklab,var(--card)_40%,transparent)] to-transparent sm:w-16"
          />

          <div className="relative flex flex-col gap-5 sm:gap-6">
            <MarqueeTrack items={skillTrackTop} direction="left" reducedMotion={reducedMotion} label="Primary tech stack scrolling left" />
            <MarqueeTrack items={skillTrackBottom} direction="right" reducedMotion={reducedMotion} label="Secondary tech stack scrolling right" />
          </div>
        </div>
      </div>
    </section>
  );
}
