// Hero-only tablet screen: a compact SaaS dashboard. Built in HTML (not a screenshot) so it
// stays crisp at any size; everything is sized in cqw (the screen's width). The screen is
// small, so type is kept large and the content to a few readable elements.

const metrics = [
  { label: "Revenue", value: "RM48.2k", delta: "12.4%" },
  { label: "Active users", value: "3,184", delta: "8.1%" },
];

const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];

// Revenue trend on a 100×24 chart; y grows downward.
const points = [
  [0, 19.5],
  [20, 17],
  [40, 18.2],
  [60, 12],
  [80, 9.2],
  [100, 4],
];
const line = points.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");

const projects = [
  { name: "Checkout v2", meta: "Due 28 Oct", initial: "C", tint: "#e6dfd2", progress: 0.72 },
  { name: "Onboarding", meta: "In review", initial: "O", tint: "#dfe4dc" },
  { name: "Billing API", meta: "Shipped", initial: "B", tint: "#e2e1e6", done: true },
];

export function DashboardScreen() {
  return (
    <div className="@container absolute inset-0 bg-[#f5f5f2] text-ink">
      <div className="flex h-full flex-col gap-[2.6cqw] p-[4.6cqw]">
        <header className="flex items-center justify-between">
          <span className="grid size-[6.6cqw] place-items-center rounded-[2cqw] bg-ink">
            <span className="flex items-end gap-[0.7cqw]">
              <span className="h-[1.6cqw] w-[0.9cqw] rounded-full bg-paper/60" />
              <span className="h-[2.8cqw] w-[0.9cqw] rounded-full bg-paper" />
            </span>
          </span>
          <nav className="flex rounded-full bg-ink/[0.05] p-[0.8cqw] text-[3.6cqw] leading-none">
            <span className="rounded-full bg-paper px-[2.6cqw] py-[1.4cqw] font-medium shadow-[0_0.3cqw_0.8cqw_rgb(11_13_18/0.08)]">
              Overview
            </span>
            <span className="px-[2.4cqw] py-[1.4cqw] text-ink/50">Projects</span>
          </nav>
          <span className="grid size-[6.6cqw] place-items-center rounded-full bg-[#dcd6cb] text-[2.8cqw] leading-none font-semibold text-ink/70">
            AS
          </span>
        </header>

        <div className="grid grid-cols-2 gap-[3cqw]">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-[3.2cqw] bg-paper p-[3.6cqw] ring-1 ring-ink/[0.05]">
              <p className="text-[3.4cqw] leading-none text-ink/50">{metric.label}</p>
              <p className="mt-[2cqw] text-[7.4cqw] leading-none font-semibold tracking-[-0.04em] tabular-nums">
                {metric.value}
              </p>
              <p className="mt-[1.6cqw] text-[3.1cqw] leading-none font-medium text-[#2f7a4c]">↑ {metric.delta}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[3.2cqw] bg-paper p-[3.6cqw] ring-1 ring-ink/[0.05]">
          <div className="flex items-baseline justify-between leading-none">
            <p className="text-[3.8cqw] font-medium">Revenue</p>
            <p className="text-[3.1cqw] text-ink/45">Last 6 months</p>
          </div>
          <svg viewBox="0 0 100 24" className="mt-[2.4cqw] block w-full overflow-visible">
            <defs>
              <linearGradient id="db-area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#0b0d12" stopOpacity="0.1" />
                <stop offset="1" stopColor="#0b0d12" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[2, 12, 22].map((y) => (
              <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="#0b0d12" strokeOpacity="0.06" strokeWidth="0.4" />
            ))}
            <path d={`${line} L100 24 L0 24 Z`} fill="url(#db-area)" />
            <path d={line} fill="none" stroke="#0b0d12" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round" />
            <circle cx="100" cy="4" r="1.9" fill="#ff4a1c" stroke="#fff" strokeWidth="0.8" />
          </svg>
          <div className="mt-[1.6cqw] flex justify-between text-[2.8cqw] leading-none text-ink/40">
            {months.map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>

        <div className="rounded-[3.2cqw] bg-paper px-[3.6cqw] py-[3cqw] ring-1 ring-ink/[0.05]">
          <div className="flex items-baseline justify-between leading-none">
            <p className="text-[3.8cqw] font-medium">Projects</p>
            <p className="text-[3.1cqw] text-ink/45">View all</p>
          </div>
          <ul className="mt-[1cqw] divide-y divide-ink/[0.06]">
            {projects.map((project) => (
              <li key={project.name} className="flex items-center gap-[2.6cqw] py-[1.5cqw] last:pb-0">
                <span
                  className="grid size-[6.4cqw] shrink-0 place-items-center rounded-[1.8cqw] text-[3cqw] leading-none font-semibold text-ink/70"
                  style={{ background: project.tint }}
                >
                  {project.initial}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[3.5cqw] leading-none font-medium">{project.name}</span>
                  <span className="mt-[1.2cqw] block text-[2.9cqw] leading-none text-ink/45">{project.meta}</span>
                </span>
                {project.progress !== undefined ? (
                  <span className="h-[1.2cqw] w-[13cqw] overflow-hidden rounded-full bg-ink/[0.08]">
                    <span className="block h-full rounded-full bg-ink" style={{ width: `${project.progress * 100}%` }} />
                  </span>
                ) : (
                  <span
                    className={`rounded-full px-[1.8cqw] py-[1cqw] text-[2.7cqw] leading-none font-medium ${
                      project.done ? "bg-[#e3efe6] text-[#2f7a4c]" : "bg-ink/[0.05] text-ink/60"
                    }`}
                  >
                    {project.done ? "Live" : "Review"}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
