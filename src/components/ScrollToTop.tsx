import { useEffect, useState, type MouseEvent } from "react";
import { ArrowUp } from "lucide-react";

const RING_SIZE = 48;
const RING_STROKE = 2.5;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function startScrollToTop() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
}

function isModalOpen() {
  return Boolean(document.querySelector('[role="dialog"][aria-modal="true"], [role="dialog"]'));
}

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const updateScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;

      setVisible(scrollY > window.innerHeight);
      setProgress(nextProgress);
      frameId = 0;
    };

    const onScroll = () => {
      if (frameId !== 0) return;
      frameId = window.requestAnimationFrame(updateScroll);
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameId !== 0) window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    const syncModal = () => setModalOpen(isModalOpen());
    syncModal();

    const observer = new MutationObserver(syncModal);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["role", "aria-modal"] });

    return () => observer.disconnect();
  }, []);

  const show = visible && !modalOpen;
  const dashOffset = RING_CIRCUMFERENCE * (1 - progress);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    startScrollToTop();
    event.currentTarget.blur();
    document.getElementById("site-logo")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      inert={!show ? true : undefined}
      className={`fixed right-4 bottom-4 z-40 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border/80 bg-card/80 text-primary shadow-[0_0_24px_-10px_color-mix(in_oklab,var(--primary)_40%,transparent)] backdrop-blur-md transition-[opacity,transform,box-shadow,border-color] duration-300 hover:border-primary/50 hover:shadow-[0_0_28px_-8px_color-mix(in_oklab,var(--primary)_55%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none sm:right-6 sm:bottom-6 sm:h-12 sm:w-12 ${
        show ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg className="pointer-events-none absolute inset-0 h-full w-full -rotate-90" viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`} aria-hidden="true">
        <circle cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RING_RADIUS} fill="none" stroke="currentColor" strokeWidth={RING_STROKE} className="text-border/70" />
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={RING_STROKE}
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          className="text-primary transition-[stroke-dashoffset] duration-150 ease-out motion-reduce:transition-none"
        />
      </svg>
      <ArrowUp className="relative z-10 h-5 w-5" aria-hidden="true" />
    </button>
  );
}
