import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const navIds = navLinks.map((link) => link.href.slice(1));

    const updateActive = () => {
      const offset = 120;

      if (window.scrollY < 80) {
        setActiveHref("");
        return;
      }

      let current = "";
      for (const id of navIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) {
          current = `#${id}`;
        }
      }
      setActiveHref(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("hashchange", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("hashchange", updateActive);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const desktopLinkClass = (href: string) => {
    const isActive = activeHref === href;
    return `relative rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:bg-primary after:transition-transform after:duration-300 ${
      isActive
        ? "text-foreground after:scale-x-100"
        : "text-muted after:scale-x-0 hover:text-foreground hover:after:scale-x-100"
    }`;
  };

  const mobileLinkClass = (href: string) => {
    const isActive = activeHref === href;
    return `rounded-lg px-3 py-3 text-base font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
      isActive
        ? "bg-card text-primary"
        : "text-foreground hover:bg-card hover:text-primary"
    }`;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300 ${
        scrolled || menuOpen
          ? "border-b border-border/80 bg-background/80 shadow-[0_1px_0_0_color-mix(in_oklab,var(--primary)_18%,transparent)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-17 lg:px-8">
        <a
          id="site-logo"
          href="#home"
          onClick={() => {
            setActiveHref("");
            closeMenu();
          }}
          className="group relative font-hero text-xl font-bold tracking-tight text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:text-2xl"
        >
          <span className="relative z-10">
            <span className="text-primary">Wesam </span>
            <span>Awad</span>
          </span>
          <span
            aria-hidden="true"
            className="absolute -bottom-0.5 left-0 h-0.75 w-[3.2rem] origin-left bg-primary transition-[width] duration-300 group-hover:w-full sm:w-[3.8rem]"
          />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActiveHref(link.href)}
              className={desktopLinkClass(link.href)}
              aria-current={activeHref === link.href ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <a
            href="#contact"
            onClick={closeMenu}
            className={`rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
              menuOpen ? "hidden lg:inline-flex" : "hidden sm:inline-flex"
            }`}
          >
            Hire me
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-border/80 bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
          menuOpen ? "max-h-112 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-center sm:px-6"
          aria-label="Mobile"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setActiveHref(link.href);
                closeMenu();
              }}
              className={mobileLinkClass(link.href)}
              aria-current={activeHref === link.href ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}

          <div className="mt-2 flex items-center gap-2 border-t border-border pt-4">
            <a
              href="#contact"
              onClick={closeMenu}
              className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Hire me
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
