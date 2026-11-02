import { DeviceFrame } from "@/components/ui/DeviceFrame";
import type { DeviceKind, Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

const pad = (n: number) => String(n).padStart(2, "0");

// Fit the frame inside the visual area by whichever side runs out first
// (the area is a size container, so cqw/cqh are its width/height).
const frameFit: Record<DeviceKind, string> = {
  phone: "w-[min(100cqw,46cqh)]",
  browser: "w-[min(100cqw,151cqh)]",
  panel: "w-[min(100cqw,80cqh)]",
};

// Presentational only: the sticky/recede behaviour lives in ProjectStack.
export function ProjectCard({ project, index }: ProjectCardProps) {
  const headingId = `project-${project.slug}-heading`;
  const details = [
    { term: "Category", value: project.category },
    { term: "Platform", value: project.platform },
    { term: "Year", value: project.year },
  ].filter((d): d is { term: string; value: string } => Boolean(d.value));

  return (
    <article
      aria-labelledby={headingId}
      className="grid h-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-(--card-radius) border border-white/[0.08] bg-graphite lg:grid-cols-12 lg:grid-rows-1"
    >
      <div className="flex flex-col gap-5 p-5 sm:gap-6 sm:p-8 lg:col-span-5 lg:justify-between lg:p-12 xl:p-14">
        <div className="eyebrow flex items-center justify-between gap-4">
          <span>{pad(index + 1)}</span>
          <span className="lg:hidden">{project.category}</span>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5">
          <h3 id={headingId} className="text-title font-normal">
            {project.name}
          </h3>
          <p className="max-w-md text-muted sm:text-lg sm:leading-relaxed">{project.statement}</p>

          <dl className="mt-2 hidden grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 text-sm lg:grid">
            {details.map((d) => (
              <div key={d.term}>
                <dt className="eyebrow mb-1.5">{d.term}</dt>
                <dd>{d.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-1 sm:mt-3">
            {project.href ? (
              <a
                href={project.href}
                className="group inline-flex h-11 items-center gap-2.5 rounded-full border border-line px-5 text-sm font-medium transition-colors duration-(--dur-micro) hover:border-fg"
              >
                View project
                <span aria-hidden className="transition-transform duration-(--dur-micro) ease-out group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            ) : (
              <p className="eyebrow">Case study coming soon</p>
            )}
          </div>
        </div>
      </div>

      <div className="relative border-t border-line bg-white/[0.025] lg:col-span-7 lg:border-t-0 lg:border-l">
        <div className="absolute inset-[8%_10%] grid place-items-center [container-type:size] lg:inset-[10%]">
          <DeviceFrame
            kind={project.device}
            label={project.name}
            media={project.media}
            sizes="(min-width: 1024px) 50vw, 90vw"
            className={frameFit[project.device]}
          />
        </div>
      </div>
    </article>
  );
}
