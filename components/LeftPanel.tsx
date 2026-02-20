"use client";

import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "stats",      label: "Stats"      },
  { id: "experience", label: "Experience" },
  { id: "projects",   label: "Projects"   },
  { id: "education",  label: "Education"  },
  { id: "stack",      label: "Stack"      },
  { id: "blog",       label: "Blog"       },
];

/* ── Update these whenever they change ── */
const NOW_ITEMS = [
  { color: "bg-emerald-400", pulse: true,  label: "Status",     text: "Seeking 2026 Summer Internships" },
  { color: "bg-sky-400",     pulse: false, label: "Study",      text: "BSc CS @ UCL · Year 2 of 3" },
  { color: "bg-violet-400",  pulse: false, label: "Coursework",     text: "Security · Systems Eng · Intro AI · Maths" },
  { color: "bg-amber-400",   pulse: false, label: "Building",   text: "Personal Portfolio · Ambience-AI-1.5" },
  { color: "bg-rose-400",    pulse: false, label: "Reading",    text: "Designing Data Intensive Applications" },
] as const;

export function LeftPanel() {
  const [active, setActive] = useState("stats");

  /* ── Active section tracking ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="md:sticky md:top-0 md:h-screen md:w-[42%] shrink-0 flex flex-col justify-between py-16 md:py-24 pr-0 md:pr-16">

      {/* ── Top ── */}
      <div>

        {/* Name */}
        <h1 className="text-[3.2rem] leading-[1.05] font-black tracking-tight text-white">
          Hakan
          <br />
          <span className="text-emerald-400">Yardim</span>
          <span className="text-emerald-400 animate-blink">_</span>
        </h1>

        {/* Role */}
        <p className="mt-3 text-[13px] font-medium text-neutral-400 tracking-wide">
          CS @ UCL
        </p>

        {/* Description */}
        <p className="mt-4 text-[13px] text-neutral-600 leading-relaxed max-w-[18rem]">
          Building performant software — from algorithmic trading systems to
          full-stack web apps.
        </p>

        {/* ── Now ── */}
        <div className="mt-8 rounded-xl border border-white/[0.06] bg-white/[0.015] px-4 py-3.5">
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-700 mb-3">Now</p>
          <div className="flex flex-col gap-2.5">
            {NOW_ITEMS.map(({ color, pulse, label, text }) => (
              <div key={text} className="flex items-start gap-2.5">
                {pulse ? (
                  <span className="relative flex h-1.5 w-1.5 shrink-0 mt-[4px]">
                    <span className={`absolute h-full w-full animate-ping rounded-full ${color} opacity-60`} />
                    <span className={`relative h-1.5 w-1.5 rounded-full ${color}`} />
                  </span>
                ) : (
                  <span className={`h-1.5 w-1.5 rounded-full ${color} shrink-0 mt-[4px]`} />
                )}
                <p className="text-[11px] text-neutral-500 leading-snug">
                  {label && <span className="text-neutral-700 mr-1.5">{label}:</span>}
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-3 flex flex-col gap-0.5">
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`group flex items-center gap-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                  isActive ? "text-white" : "text-neutral-600 hover:text-neutral-400"
                }`}
              >
                <span
                  className={`h-px transition-all duration-300 ${
                    isActive
                      ? "w-12 bg-white"
                      : "w-5 bg-neutral-700 group-hover:w-8 group-hover:bg-neutral-500"
                  }`}
                />
                {label}
              </a>
            );
          })}
        </nav>
      </div>

      {/* ── Bottom ── */}
      <div>
        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-white/[0.07] to-transparent mb-5" />

        {/* Social icons + Resume */}
        <div className="flex items-center gap-2.5">
          <a
            href="https://github.com/hyardim"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] text-neutral-600 transition-all duration-300 hover:border-violet-500/25 hover:text-violet-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/hyardim"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] text-neutral-600 transition-all duration-300 hover:border-violet-500/25 hover:text-violet-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="mailto:hakan.yardim.24@ucl.ac.uk"
            aria-label="Email"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] text-neutral-600 transition-all duration-300 hover:border-violet-500/25 hover:text-violet-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          </a>
          <a
            href="/resume.pdf"
            className="ml-1 flex items-center gap-1.5 rounded-xl border border-violet-500/25 bg-violet-500/[0.08] px-3.5 py-2 text-[11px] font-semibold text-violet-300 transition-all duration-300 hover:bg-violet-500/15 hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/10"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Resume
          </a>
        </div>
      </div>
    </aside>
  );
}
