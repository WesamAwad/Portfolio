import { useEffect } from "react";

function scrollToHash(hash: string) {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  if (!id) return true;

  const el = document.getElementById(id);
  if (!el) return false;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  return true;
}

/** Waits for lazy-mounted sections before scrolling to URL / nav hashes. */
export function ScrollToHash() {
  useEffect(() => {
    let raf = 0;
    let cancelled = false;

    const waitForHash = (hash: string, maxFrames = 180) => {
      let frames = 0;

      const tick = () => {
        if (cancelled) return;
        if (scrollToHash(hash) || frames++ >= maxFrames) return;
        raf = requestAnimationFrame(tick);
      };

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    if (window.location.hash) {
      waitForHash(window.location.hash);
    }

    const onHashChange = () => {
      if (window.location.hash) waitForHash(window.location.hash);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return null;
}
