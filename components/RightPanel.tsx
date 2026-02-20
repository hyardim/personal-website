import Link from "next/link";
import { StatsSection } from "./StatsSection";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const EXPERIENCES = [
  {
    role: "Quant Developer Intern",
    where: "IS Investment",
    dept: "Investment Technologies Dept.",
    when: "Jul — Aug 2025",
    period: "2025",
    active: true,
    bullets: [
      "Learned about financial instruments like options and built a Black-Scholes options pricer in Python.",
      "Built an order book using numpy and pandas with data from the ITCH protocol, stored in ClickhouseDB.",
      "Embedded a fast, modular backtesting engine to test passive buy-wall and active momentum strategies.",
    ],
  },
  {
    role: "Software Engineering Intern",
    where: "H3M Analytics",
    dept: "AML Team",
    when: "Aug — Sep 2023",
    period: "2023",
    active: false,
    bullets: [
      "Extracted data via the Oracle DB library and wrote MySQL queries to preprocess 1M+ financial transactions across 1000+ accounts.",
      "Built a fraud detection model with 0.71 accuracy using logistic regression and scikit-learn.",
    ],
  },
  {
    role: "Venture Analyst Intern",
    where: "Vestel Ventures",
    dept: "Zorlu Group VC",
    when: "Jul — Aug 2023",
    period: "2023",
    active: false,
    bullets: [
      "Awarded the internship after winning Robert College's annual elevator pitch competition.",
      "Scouted 100+ startups via startups.watch and delivered a fintech growth projection report using Python data analysis.",
      "Developed understanding of SaaS products by attending the SaaStanbul conference.",
    ],
  },
];

const PROJECTS = [
  {
    title: "HTTP Server",
    desc: "Multi-threaded HTTP/1.1 server in C++ using BSD sockets and low-level TCP. Handles concurrent connections via std::thread with mutex synchronisation, request parsing, and static file serving.",
    href: "https://github.com/hyardim",
    tech: ["C++", "BSD Sockets", "TCP/IP", "std::thread", "Mutex"],
    emoji: "🔌",
  },
  {
    title: "FitBro App",
    desc: "Full-stack fitness tracking app with a RESTful API delivering sub-150ms response times. CI/CD pipeline halved deployment time. Polyglot persistence — MongoDB for workout logs, PostgreSQL for auth — containerised with Docker and orchestrated with K8s.",
    href: "https://github.com/hyardim",
    tech: ["Flask", "React", "Bootstrap", "MongoDB", "PostgreSQL", "Docker", "K8s"],
    emoji: "💪",
  },
  {
    title: "Personal Portfolio",
    desc: "This site — sticky split-screen layout, live GitHub & LeetCode API integration, and a static export deployed to Cloudflare Pages.",
    href: "https://github.com/hyardim/personal-website",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Cloudflare Pages"],
    emoji: "🌐",
  },
];

const EDUCATION = [
  {
    school: "University College London",
    short: "UCL",
    degree: "BSc Computer Science",
    detail: "On track for 1st Class Honours",
    when: "2024 — 2027",
    location: "London, UK",
    extras: ["CS Society", "Fintech Society", "Quant Society"],
    active: true,
  },
  {
    school: "Robert College",
    short: "RC",
    degree: "MEB High School Diploma",
    detail: "96.70 / 100  ·  SAT 1530 (Math: 800 · English: 730)",
    when: "2019 — 2024",
    location: "Istanbul, TR",
    extras: ["2× TEKNOFEST Finalist", "AP Scholar With Distinction"],
    active: false,
  },
];

const STACK_GROUPS = [
  {
    label: "Languages",
    items: [
      { name: "Python", color: "text-yellow-400 border-yellow-400/20 bg-yellow-400/5" },
      { name: "Java", color: "text-red-400 border-red-400/20 bg-red-400/5" },
      { name: "C / C++", color: "text-pink-400 border-pink-400/20 bg-pink-400/5" },
      { name: "JavaScript", color: "text-amber-400 border-amber-400/20 bg-amber-400/5" },
      { name: "TypeScript", color: "text-blue-400 border-blue-400/20 bg-blue-400/5" },
      { name: "Haskell", color: "text-purple-400 border-purple-400/20 bg-purple-400/5" },
      { name: "SQL", color: "text-violet-400 border-violet-400/20 bg-violet-400/5" },
    ],
  },
  {
    label: "Web & Frameworks",
    items: [
      { name: "React", color: "text-cyan-400 border-cyan-400/20 bg-cyan-400/5" },
      { name: "Next.js", color: "text-white border-white/20 bg-white/5" },
      { name: "Flask", color: "text-neutral-300 border-neutral-300/20 bg-neutral-300/5" },
      { name: "Tailwind CSS", color: "text-sky-400 border-sky-400/20 bg-sky-400/5" },
    ],
  },
  {
    label: "Data & ML",
    items: [
      { name: "numpy", color: "text-blue-300 border-blue-300/20 bg-blue-300/5" },
      { name: "pandas", color: "text-violet-400 border-violet-400/20 bg-violet-400/5" },
      { name: "scikit-learn", color: "text-amber-400 border-amber-400/20 bg-amber-400/5" },
      { name: "MongoDB", color: "text-green-400 border-green-400/20 bg-green-400/5" },
      { name: "PostgreSQL", color: "text-indigo-400 border-indigo-400/20 bg-indigo-400/5" },
      { name: "ClickhouseDB", color: "text-yellow-500 border-yellow-500/20 bg-yellow-500/5" },
      { name: "MySQL", color: "text-orange-300 border-orange-300/20 bg-orange-300/5" },
    ],
  },
  {
    label: "DevOps & Tools",
    items: [
      { name: "Docker", color: "text-blue-400 border-blue-400/20 bg-blue-400/5" },
      { name: "Kubernetes", color: "text-indigo-400 border-indigo-400/20 bg-indigo-400/5" },
      { name: "Git", color: "text-orange-400 border-orange-400/20 bg-orange-400/5" },
      { name: "Cloudflare", color: "text-amber-500 border-amber-500/20 bg-amber-500/5" },
    ],
  },
];

/* ─────────────────────────────────────────────
   SHARED COMPONENTS
───────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <h2 className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-600 shrink-0">
        {children}
      </h2>
      <div className="flex-1 h-px bg-gradient-to-r from-white/[0.07] to-transparent" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTIONS
───────────────────────────────────────────── */

function ExperienceSection() {
  return (
    <section id="experience" className="mb-24">
      <SectionLabel>Experience</SectionLabel>
      <div className="flex flex-col gap-2">
        {EXPERIENCES.map((e) => (
          <div
            key={`${e.role}-${e.where}`}
            className="group grid grid-cols-[60px_1fr] gap-5 rounded-2xl px-4 py-4 transition-all duration-300 hover:bg-white/[0.025]"
          >
            {/* Date column */}
            <div className="pt-0.5">
              <p className="text-[9px] font-mono text-neutral-600 uppercase tracking-wider leading-tight">
                {e.period}
              </p>
            </div>

            {/* Content column */}
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[15px] font-semibold text-neutral-200 group-hover:text-white transition-colors duration-300 leading-snug">
                    {e.role}
                    <span className="text-neutral-500 font-normal"> · </span>
                    <span className="text-emerald-400/80">{e.where}</span>
                  </h3>
                  <p className="text-[11px] text-neutral-600 mt-0.5">{e.dept}</p>
                </div>
              </div>
              <ul className="mt-3 flex flex-col gap-1.5">
                {e.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-[12px] text-neutral-500 leading-relaxed">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-emerald-500/50" />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-2.5 text-[10px] text-neutral-700 tabular-nums">{e.when}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="mb-24">
      <SectionLabel>Projects</SectionLabel>
      <div className="flex flex-col gap-2">
        {PROJECTS.map((p) => (
          <a
            key={p.title}
            href={p.href}
            target={p.href.startsWith("http") ? "_blank" : undefined}
            rel={p.href.startsWith("http") ? "noreferrer" : undefined}
            className="group grid grid-cols-[60px_1fr] gap-5 rounded-2xl px-4 py-4 transition-all duration-300 hover:bg-white/[0.025]"
          >
            {/* Emoji column */}
            <div className="pt-0.5 flex justify-start">
              <span className="text-xl leading-none">{p.emoji}</span>
            </div>

            {/* Content column */}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[15px] font-semibold text-neutral-200 group-hover:text-white transition-colors duration-300">
                  {p.title}
                </h3>
                <svg
                  className="w-3.5 h-3.5 text-neutral-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
              <p className="mt-1.5 text-[12px] text-neutral-500 leading-relaxed">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-0.5 text-[9px] font-medium text-emerald-400/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section id="education" className="mb-24">
      <SectionLabel>Education</SectionLabel>
      <div className="flex flex-col gap-2">
        {EDUCATION.map((edu) => (
          <div
            key={edu.school}
            className="group grid grid-cols-[60px_1fr] gap-5 rounded-2xl px-4 py-4 transition-all duration-300 hover:bg-white/[0.025]"
          >
            {/* Period column */}
            <div className="pt-0.5">
              <p className="text-[9px] font-mono text-neutral-600 uppercase tracking-wider leading-tight">
                {edu.when.split(" — ")[0]}
                <br />—<br />
                {edu.when.split(" — ")[1]}
              </p>
            </div>

            {/* Content column */}
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[15px] font-semibold text-neutral-200 group-hover:text-white transition-colors duration-300 leading-snug">
                      {edu.school}
                    </h3>
                    {edu.active && (
                      <span className="relative flex h-1.5 w-1.5 shrink-0">
                        <span className="absolute h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                        <span className="relative h-1.5 w-1.5 rounded-full bg-sky-400" />
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-neutral-400 mt-0.5">{edu.degree}</p>
                  <p className="text-[11px] text-neutral-600 mt-0.5">{edu.detail}</p>
                </div>
                <p className="text-[10px] text-neutral-700 shrink-0 text-right leading-snug">
                  {edu.location}
                </p>
              </div>
              {edu.extras.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {edu.extras.map((e) => (
                    <span
                      key={e}
                      className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[9px] text-neutral-500 font-medium"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StackSection() {
  return (
    <section id="stack" className="mb-24">
      <SectionLabel>Stack</SectionLabel>
      <div className="flex flex-col gap-5">
        {STACK_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-neutral-700 mb-2.5">
              {group.label}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item.name}
                  className={`rounded-lg border px-2.5 py-1 text-[10px] font-medium transition-all duration-300 hover:scale-105 ${item.color}`}
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BlogSection() {
  return (
    <section id="blog" className="mb-24">
      <SectionLabel>Blog</SectionLabel>
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.09] hover:bg-white/[0.03]">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-neutral-200">Writing</h3>
            <p className="mt-1.5 text-[12px] text-neutral-500 leading-relaxed max-w-sm">
              Occasional posts on web dev, systems programming, quant finance, and
              things I learn along the way.
            </p>
            <Link
              href="/blog/"
              className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-rose-400/80 hover:text-rose-300 transition-colors duration-300"
            >
              Read articles
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   EXPORT
───────────────────────────────────────────── */

export function RightPanel() {
  return (
    <main className="w-full md:w-[58%] py-16 md:py-24">
      <StatsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <StackSection />
      <BlogSection />

      {/* Footer */}
      <footer className="pb-12">
        <div className="h-px bg-gradient-to-r from-white/[0.05] to-transparent mb-5" />
        <p className="text-[11px] text-neutral-800">
          Built with Next.js &amp; Tailwind CSS &middot; Deployed on Cloudflare Pages
        </p>
      </footer>
    </main>
  );
}
