import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, Info, X } from "lucide-react";
import { GitHubIcon } from "../icons/BrandIcons";
import { SectionHeadingUnderline } from "../SectionHeadingUnderline";
import { projectFilters, projects, projectsContent, type Project, type ProjectFilterId } from "../../data/projects";

function filteredProjects(filter: ProjectFilterId): Project[] {
  if (filter === "all") return projects;
  return projects.filter((project) => project.category === filter);
}

const secondaryBtnClass =
  "inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-border bg-card/70 px-3 py-2 text-xs font-semibold text-card-foreground transition hover:border-primary/50 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:border-border disabled:hover:text-card-foreground";

function ProjectDetailsModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="presentation">
      <button
        type="button"
        aria-label="Close project details"
        className="absolute inset-0 cursor-pointer bg-background/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(90vh,40rem)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-[0_0_48px_-12px_color-mix(in_oklab,var(--primary)_35%,transparent)]"
      >
        <div className="flex items-start justify-between gap-3 border-b border-border/80 px-5 py-4">
          <h2 id={titleId} className="font-display text-xl font-bold text-foreground">
            {project.title}
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
          {project.image ? (
            <img
              src={project.image}
              srcSet={project.imageSrcSet}
              sizes="(max-width: 768px) 90vw, 42rem"
              alt={`Screenshot of ${project.title}`}
              width={1600}
              height={1067}
              loading="lazy"
              decoding="async"
              className="mb-4 aspect-video w-full rounded-xl object-cover"
            />
          ) : null}
          <p className="text-sm leading-relaxed text-muted">{project.description}</p>
          <div className="mt-4 rounded-xl border border-border/80 bg-background/40 px-3.5 py-3">
            <p className="text-[0.7rem] font-semibold tracking-wide text-[#115e59] uppercase dark:text-primary">My role</p>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground">{project.role}</p>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li key={tech} className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-medium text-[#115e59] dark:text-primary">
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-border/80 px-5 py-4">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Live Demo
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ) : null}
          {project.githubUrl ? (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={secondaryBtnClass}>
              <GitHubIcon className="h-3.5 w-3.5" />
              Code
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/50 shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_0%,transparent)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_0_32px_-10px_color-mix(in_oklab,var(--primary)_45%,transparent)] motion-reduce:transform-none">
        <div className="relative aspect-video overflow-hidden bg-card">
          {project.image ? (
            <img
              src={project.image}
              srcSet={project.imageSrcSet}
              sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 380px"
              alt={`Screenshot of ${project.title}`}
              width={1600}
              height={1067}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          ) : (
            <>
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--primary)_28%,transparent),transparent_55%),linear-gradient(160deg,var(--card),var(--background))]" />
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div className="absolute inset-0 flex items-end p-5">
                <p className="font-hero text-2xl font-bold tracking-tight text-foreground">{project.title}</p>
              </div>
            </>
          )}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-t from-card/40 via-transparent to-transparent" />

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 z-10 flex items-center justify-center bg-background/0 opacity-0 transition duration-300 group-hover:bg-background/55 group-hover:opacity-100 focus-visible:bg-background/55 focus-visible:opacity-100 focus-visible:-outline-offset-4 focus-visible:outline-2 focus-visible:outline-ring motion-reduce:transition-none"
              aria-label={`View live demo of ${project.title}`}
            >
              <span className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-card/90 px-4 py-2 text-sm font-semibold text-foreground shadow-[0_0_24px_-6px_color-mix(in_oklab,var(--primary)_50%,transparent)] backdrop-blur-sm">
                View Live Demo
                <ExternalLink className="h-4 w-4 text-primary" aria-hidden="true" />
              </span>
            </a>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5">
          <div>
            <h3 className="font-display text-lg font-bold text-foreground">{project.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{project.description}</p>
          </div>

          <ul className="flex flex-wrap gap-2">
            {project.tech.map((tech, index) => (
              <li
                key={tech}
                className={`rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-medium text-[#115e59] dark:text-primary ${index >= 3 ? "hidden md:list-item" : ""}`}
              >
                {tech}
              </li>
            ))}
            {project.tech.length > 3 ? (
              <li className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-medium text-[#115e59] md:hidden dark:text-primary" aria-label={`${project.tech.length - 3} more technologies`}>
                +{project.tech.length - 3}
              </li>
            ) : null}
          </ul>

          <div className="mt-auto flex flex-col gap-2 pt-1">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Live Demo
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ) : null}

            <div className="flex items-center gap-2">
              {project.githubUrl ? (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={secondaryBtnClass}>
                  <GitHubIcon className="h-3.5 w-3.5" />
                  Code
                </a>
              ) : (
                <button type="button" disabled className={secondaryBtnClass} aria-label={`Code for ${project.title} unavailable`}>
                  <GitHubIcon className="h-3.5 w-3.5" />
                  Code
                </button>
              )}
              <button type="button" className={secondaryBtnClass} onClick={() => setDetailsOpen(true)} aria-haspopup="dialog">
                <Info className="h-3.5 w-3.5" aria-hidden="true" />
                Details
              </button>
            </div>
          </div>
        </div>
      </article>

      {detailsOpen ? <ProjectDetailsModal project={project} onClose={() => setDetailsOpen(false)} /> : null}
    </>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilterId>("all");
  const visibleProjects = filteredProjects(filter);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative -scroll-mt-5 overflow-hidden border-t border-border/80 bg-background">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-primary/8 blur-3xl" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.22] dark:opacity-[0.16]"
        style={{
          backgroundImage: "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 15%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 md:px-8 md:py-28 md:text-start">
        <div className="mb-10 flex flex-col items-center md:mb-12 md:items-start">
          <div className="group inline-flex flex-col items-center md:items-start">
            <h2 id="projects-heading" className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {projectsContent.title}
            </h2>
            <SectionHeadingUnderline />
          </div>
        </div>

        <div
          className="mb-10 flex flex-nowrap items-center justify-start gap-2 overflow-x-auto [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden md:mb-12 md:flex-wrap md:justify-center"
          role="tablist"
          aria-label="Project filters"
        >
          {projectFilters.map((item) => {
            const isActive = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(item.id)}
                className={`shrink-0 cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                  isActive ? "border-primary bg-primary text-primary-foreground shadow-[0_0_24px_-6px_color-mix(in_oklab,var(--primary)_55%,transparent)]" : "border-border bg-card/60 text-muted hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {visibleProjects.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project) => (
              <li key={project.id} className="motion-safe:animate-[fade-up_0.45s_ease-out]">
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-2xl border border-border/80 bg-card/40 px-6 py-12 text-center text-muted backdrop-blur-sm">More projects in this category are coming soon.</p>
        )}
      </div>
    </section>
  );
}
