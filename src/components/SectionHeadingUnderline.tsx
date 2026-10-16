import { useEffect, useRef, useState } from "react";

type SectionHeadingUnderlineProps = {
  className?: string;
};

export function SectionHeadingUnderline({ className = "mt-3" }: SectionHeadingUnderlineProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const target = el.closest("section") ?? el;
    let expandTimer: ReturnType<typeof setTimeout> | undefined;
    let observer: IntersectionObserver | undefined;

    const clearObserver = () => {
      window.clearTimeout(expandTimer);
      observer?.disconnect();
      observer = undefined;
    };

    const setupMobileObserver = () => {
      clearObserver();
      setExpanded(false);

      if (!mobileQuery.matches) return;

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;

          window.clearTimeout(expandTimer);
          expandTimer = setTimeout(() => {
            setExpanded(true);
            observer?.disconnect();
          }, 220);
        },
        {
          threshold: 0.22,
          rootMargin: "0px 0px -18% 0px",
        },
      );

      observer.observe(target);
    };

    setupMobileObserver();
    mobileQuery.addEventListener("change", setupMobileObserver);

    return () => {
      mobileQuery.removeEventListener("change", setupMobileObserver);
      clearObserver();
    };
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`${className} block h-1 origin-center rounded-full bg-primary transition-[width] duration-300 ease-out motion-reduce:transition-none md:origin-left md:group-hover:w-28 ${expanded ? "w-28" : "w-16"}`}
    />
  );
}
