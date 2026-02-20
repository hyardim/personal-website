import Link from "next/link";

const POSTS = [
  {
    title: "Building a Bento Grid Portfolio with Next.js",
    excerpt: "How I designed and built this portfolio using a bento-style layout with Tailwind CSS and Next.js static export.",
    date: "2026-02-19",
    readTime: "5 min read",
    tags: ["Next.js", "Tailwind", "Design"],
  },
  {
    title: "My LeetCode Journey: From Zero to 142 Problems",
    excerpt: "Lessons learned, patterns recognized, and strategies that helped me improve my problem-solving skills.",
    date: "2026-01-15",
    readTime: "8 min read",
    tags: ["DSA", "LeetCode", "Career"],
  },
  {
    title: "Understanding System Design Fundamentals",
    excerpt: "A beginner-friendly breakdown of load balancers, caching, databases, and how they work together.",
    date: "2025-12-10",
    readTime: "12 min read",
    tags: ["System Design", "Backend"],
  },
  {
    title: "TypeScript Tips I Wish I Knew Earlier",
    excerpt: "Practical TypeScript patterns that make your code safer and more expressive without over-engineering.",
    date: "2025-11-20",
    readTime: "6 min read",
    tags: ["TypeScript", "Web Dev"],
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30">
      <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-emerald-400 transition-colors duration-300 mb-12"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to home
        </Link>

        {/* Header */}
        <header className="mb-16 animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Blog
          </h1>
          <p className="mt-3 text-neutral-400 text-sm leading-relaxed max-w-md">
            Writing about web development, system design, and things I learn along the way.
          </p>
          <div className="mt-4 h-px w-16 bg-gradient-to-r from-emerald-500/50 to-transparent" />
        </header>

        {/* Posts list */}
        <div className="space-y-2">
          {POSTS.map((post, i) => (
            <article
              key={post.title}
              className="animate-fade-up group rounded-2xl border border-white/[0.05] bg-neutral-900/30 p-6 transition-all duration-500 hover:border-emerald-500/20 hover:bg-neutral-900/60 hover:shadow-lg hover:shadow-emerald-500/[0.03]"
              style={{ "--delay": `${100 + i * 80}ms` } as React.CSSProperties}
            >
              {/* Date + read time */}
              <div className="flex items-center gap-2 mb-3">
                <time className="text-[11px] text-neutral-500 tabular-nums">
                  {formatDate(post.date)}
                </time>
                <span className="text-neutral-700">&middot;</span>
                <span className="text-[11px] text-neutral-500">{post.readTime}</span>
              </div>

              {/* Title */}
              <h2 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] text-neutral-500 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center animate-fade-up" style={{ "--delay": "500ms" } as React.CSSProperties}>
          <p className="text-[11px] text-neutral-600">
            More posts coming soon...
          </p>
        </div>
      </div>
    </main>
  );
}
