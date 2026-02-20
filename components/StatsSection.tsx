"use client";

import { useEffect, useState } from "react";

/* ── Types ── */
interface GhData {
  username: string;
  publicRepos: number;
  followers: number;
  totalStars: number;
  totalCommits: number;
  totalContributions: number;
  topLanguages: { name: string; count: number; color: string }[];
  contributions: { count: number; date: string }[][];
}

interface LcData {
  username: string;
  ranking: number;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  easyTotal: number;
  mediumSolved: number;
  mediumTotal: number;
  hardSolved: number;
  hardTotal: number;
  totalActiveDays: number;
  submissionCalendar: string; // JSON: { [unixTimestampSeconds]: count }
}

const GH_FALLBACK: GhData = {
  username: "hyardim",
  publicRepos: 9,
  followers: 9,
  totalStars: 0,
  totalCommits: 0,
  totalContributions: 0,
  topLanguages: [],
  contributions: [],
};

/* Zero-out so stale numbers never show — live worker populates the real values */
const LC_FALLBACK: LcData = {
  username: "hYardim10",
  ranking: 0,
  totalSolved: 0,
  totalQuestions: 0,
  easySolved: 0,
  easyTotal: 0,
  mediumSolved: 0,
  mediumTotal: 0,
  hardSolved: 0,
  hardTotal: 0,
  totalActiveDays: 0,
  submissionCalendar: "{}",
};

/* ── Build a 12-week contribution grid from a date→count map ── */
function buildWeekGrid(dateMap: Record<string, number>, numWeeks: number): { count: number; date: string }[][] {
  const grid: { count: number; date: string }[][] = [];
  const start = new Date();
  start.setDate(start.getDate() - numWeeks * 7);
  start.setDate(start.getDate() - start.getDay()); // align to Sunday
  const cur = new Date(start);
  for (let w = 0; w < numWeeks; w++) {
    const week: { count: number; date: string }[] = [];
    for (let d = 0; d < 7; d++) {
      const dateStr = cur.toISOString().split("T")[0];
      week.push({ count: dateMap[dateStr] || 0, date: dateStr });
      cur.setDate(cur.getDate() + 1);
    }
    grid.push(week);
  }
  return grid;
}

/* ── Arrow icon ── */
function Arrow() {
  return (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
  );
}

export function StatsSection() {
  const [gh, setGh] = useState<GhData>(GH_FALLBACK);
  const [lc, setLc] = useState<LcData>(LC_FALLBACK);
  const [ghLoading, setGhLoading] = useState(true);
  const [lcLoading, setLcLoading] = useState(true);
  const [ghLive, setGhLive] = useState(false);
  const [lcLive, setLcLive] = useState(false);

  /* ── Fetch GitHub ── */
  useEffect(() => {
    fetch("/api/github")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => { setGh(d); setGhLive(true); setGhLoading(false); })
      .catch(() => {
        // Public REST API fallback — user, repos, and events (CORS-friendly, no token)
        Promise.all([
          fetch("https://api.github.com/users/hyardim"),
          fetch("https://api.github.com/users/hyardim/repos?per_page=100"),
          fetch("https://api.github.com/users/hyardim/events?per_page=100"),
        ])
          .then(([u, r, e]) => (u.ok && r.ok ? Promise.all([u.json(), r.json(), e.ok ? e.json() : []]) : Promise.reject()))
          .then(([user, repos, events]: [any, any[], any[]]) => {
            // Language breakdown
            const langMap: Record<string, number> = {};
            repos.forEach((r) => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });
            const topLanguages = Object.entries(langMap)
              .sort((a, b) => b[1] - a[1]).slice(0, 6)
              .map(([name, count]) => ({ name, count, color: getLangColor(name) }));

            // Contribution grid from PushEvents (last ~90 days)
            const dateMap: Record<string, number> = {};
            if (Array.isArray(events)) {
              events.forEach((ev: any) => {
                if (ev.type === "PushEvent") {
                  const date = (ev.created_at || "").split("T")[0];
                  if (date) dateMap[date] = (dateMap[date] || 0) + (ev.payload?.commits?.length || 1);
                }
              });
            }
            const contributions = buildWeekGrid(dateMap, 12);
            const totalContributions = Object.values(dateMap).reduce((s, v) => s + v, 0);

            setGh({
              username: user.login, publicRepos: user.public_repos, followers: user.followers,
              totalStars: repos.reduce((s: number, r: any) => s + (r.stargazers_count || 0), 0),
              totalCommits: 0, totalContributions, topLanguages, contributions,
            });
          })
          .catch(() => {})
          .finally(() => setGhLoading(false));
      });
  }, []);

  /* ── Fetch LeetCode ── */
  useEffect(() => {
    fetch("/api/leetcode")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => { setLc(d); setLcLive(true); })
      .catch(() => {})
      .finally(() => setLcLoading(false));
  }, []);

  /* ── Derived values ── */
  const totalLangCount = gh.topLanguages.reduce((s, l) => s + l.count, 0);
  const maxContrib = Math.max(1, ...gh.contributions.flat().map((d) => d.count));

  /* Parse LeetCode submission calendar (timestamp seconds → date string) */
  const lcDateMap: Record<string, number> = {};
  try {
    const raw = JSON.parse(lc.submissionCalendar || "{}");
    Object.entries(raw).forEach(([ts, cnt]) => {
      const date = new Date(Number(ts) * 1000).toISOString().split("T")[0];
      lcDateMap[date] = (lcDateMap[date] || 0) + (cnt as number);
    });
  } catch {}
  const lcContribs = buildWeekGrid(lcDateMap, 12);
  const maxLcContrib = Math.max(1, ...lcContribs.flat().map((d) => d.count));
  const hasLcActivity = lcContribs.flat().some((d) => d.count > 0);

  const lcRadius = 30;
  const lcCirc = 2 * Math.PI * lcRadius;
  const lcPct = lc.totalQuestions > 0 ? lc.totalSolved / lc.totalQuestions : 0.04;
  const lcOffset = lcCirc - lcPct * lcCirc;

  const difficulties = [
    { label: "Easy",   solved: lc.easySolved,   total: lc.easyTotal,   color: "text-emerald-400", bar: "bg-emerald-500/70" },
    { label: "Medium", solved: lc.mediumSolved,  total: lc.mediumTotal, color: "text-amber-400",   bar: "bg-amber-500/70"   },
    { label: "Hard",   solved: lc.hardSolved,    total: lc.hardTotal,   color: "text-red-400",     bar: "bg-red-500/70"     },
  ];

  return (
    <section id="stats" className="mb-24">
      {/* Section label */}
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-600 shrink-0">
          Stats
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-white/[0.07] to-transparent" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* ── GitHub card ── */}
        <a
          href={`https://github.com/${gh.username}`}
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-all duration-300 hover:border-violet-500/20 hover:bg-white/[0.035]"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-neutral-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span className="text-[13px] font-semibold text-neutral-200">GitHub</span>
            </div>
            <span className="flex items-center gap-1 text-[10px] text-neutral-600 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              @{gh.username} <Arrow />
            </span>
          </div>

          {/* 4-stat grid */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { label: "Repos",   value: gh.publicRepos },
              { label: "Stars",   value: gh.totalStars },
              { label: "Commits", value: gh.totalCommits },
              { label: "Contribs",value: gh.totalContributions },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-white/[0.03] border border-white/[0.04] py-2.5 text-center">
                <p className={`text-[15px] font-bold text-white tabular-nums leading-none ${ghLoading ? "animate-pulse opacity-40" : ""}`}>
                  {s.value}
                </p>
                <p className="text-[7px] uppercase tracking-wider text-neutral-700 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Language bar */}
          {gh.topLanguages.length > 0 && (
            <div className="mb-3">
              <div className="flex h-1.5 rounded-full overflow-hidden gap-0.5">
                {gh.topLanguages.map((lang) => (
                  <div
                    key={lang.name}
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${(lang.count / totalLangCount) * 100}%`, backgroundColor: lang.color, minWidth: "6%" }}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                {gh.topLanguages.slice(0, 4).map((lang) => (
                  <div key={lang.name} className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: lang.color }} />
                    <span className="text-[9px] text-neutral-500">{lang.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contribution heatmap */}
          {gh.contributions.length > 0 ? (
            <div className="mt-auto pt-3 border-t border-white/[0.04]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[8px] text-neutral-700 uppercase tracking-wider">
                  {gh.totalContributions} contributions this year
                </p>
                {ghLive && <span className="flex items-center gap-1 text-[8px] text-emerald-600"><span className="h-1 w-1 rounded-full bg-emerald-500" />live</span>}
              </div>
              <div className="flex gap-[3px]">
                {gh.contributions.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((day) => {
                      const intensity = day.count / maxContrib;
                      const bg =
                        day.count === 0 ? "bg-white/[0.04]"
                          : intensity < 0.25 ? "bg-emerald-500/30"
                            : intensity < 0.5  ? "bg-emerald-500/55"
                              : intensity < 0.75 ? "bg-emerald-500/75"
                                : "bg-emerald-400";
                      return (
                        <div
                          key={day.date}
                          className={`h-[7px] w-[7px] rounded-[2px] ${bg}`}
                          title={`${day.date}: ${day.count}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Placeholder heatmap */
            <div className="mt-auto pt-3 border-t border-white/[0.04]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[8px] text-neutral-700 uppercase tracking-wider">Activity</p>
                <span className="text-[8px] text-neutral-800 italic">cached</span>
              </div>
              <div className="flex gap-[3px]">
                {Array.from({ length: 12 }).map((_, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {Array.from({ length: 7 }).map((_, di) => (
                      <div key={di} className="h-[7px] w-[7px] rounded-[2px] bg-white/[0.04]" />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </a>

        {/* ── LeetCode card ── */}
        <a
          href="https://leetcode.com/u/hYardim10/"
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-all duration-300 hover:border-amber-500/15 hover:bg-white/[0.035]"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[13px] font-semibold text-neutral-200">LeetCode</span>
            <span className="flex items-center gap-1 text-[10px] text-neutral-600 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              @{lc.username} <Arrow />
            </span>
          </div>

          {/* Ring + breakdown */}
          <div className="flex items-center gap-5 mb-4">
            {/* Progress ring */}
            <div className="relative shrink-0">
              <svg width="74" height="74" className="-rotate-90">
                <circle cx="37" cy="37" r={lcRadius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4.5" />
                <circle
                  cx="37" cy="37" r={lcRadius} fill="none"
                  stroke="url(#lcGradStats)" strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeDasharray={lcCirc}
                  strokeDashoffset={lcOffset}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="lcGradStats" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-lg font-black text-white tabular-nums leading-none ${lcLoading ? "animate-pulse" : ""}`}>
                  {lc.totalSolved}
                </span>
                <span className="text-[7px] text-neutral-600 mt-0.5">/ {lc.totalQuestions}</span>
              </div>
            </div>

            {/* Progress bars */}
            <div className="flex-1 flex flex-col gap-2.5">
              {difficulties.map((d) => (
                <div key={d.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-semibold ${d.color}`}>{d.label}</span>
                    <span className="text-[9px] text-neutral-600 tabular-nums">
                      {d.solved}
                      <span className="text-neutral-700">/{d.total}</span>
                    </span>
                  </div>
                  <div className="h-[3px] rounded-full bg-white/[0.05] overflow-hidden">
                    <div
                      className={`h-full rounded-full ${d.bar} transition-all duration-1000 ease-out`}
                      style={{ width: `${d.total > 0 ? (d.solved / d.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submission heatmap */}
          <div className="mt-auto pt-3 border-t border-white/[0.04]">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[8px] text-neutral-700 uppercase tracking-wider">
                {lc.ranking > 0 && <span className="mr-2">Rank #{lc.ranking.toLocaleString()}</span>}
                {lc.totalActiveDays > 0 && <span>{lc.totalActiveDays} active days</span>}
                {!lc.ranking && !lc.totalActiveDays && "Submissions"}
              </p>
              {lcLive
                ? <span className="flex items-center gap-1 text-[8px] text-emerald-600"><span className="h-1 w-1 rounded-full bg-emerald-500" />live</span>
                : <span className="text-[8px] text-neutral-800 italic">cached</span>
              }
            </div>
            <div className="flex gap-[3px]">
              {lcContribs.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day) => {
                    const intensity = hasLcActivity ? day.count / maxLcContrib : 0;
                    const bg =
                      day.count === 0   ? "bg-white/[0.04]"
                      : intensity < 0.25 ? "bg-amber-500/30"
                      : intensity < 0.5  ? "bg-amber-500/55"
                      : intensity < 0.75 ? "bg-amber-500/75"
                      :                    "bg-amber-400";
                    return (
                      <div
                        key={day.date}
                        className={`h-[7px] w-[7px] rounded-[2px] ${bg}`}
                        title={`${day.date}: ${day.count}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </a>

      </div>
    </section>
  );
}

function getLangColor(name: string): string {
  const colors: Record<string, string> = {
    TypeScript: "#3178c6", JavaScript: "#f1e05a", Python: "#3572A5",
    Java: "#b07219", "C++": "#f34b7d", C: "#555555", HTML: "#e34c26",
    CSS: "#563d7c", Haskell: "#5e5086", Shell: "#89e051",
  };
  return colors[name] || "#8b949e";
}
