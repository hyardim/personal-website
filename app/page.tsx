export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 py-12">
      <section className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-4 auto-rows-[minmax(120px,_auto)]">
        {/* Hero */}
        <div className="col-span-1 row-span-2 rounded-3xl bg-gradient-to-br from-sky-500 to-cyan-400 p-6 text-slate-950 md:col-span-2">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em]">
            Software Developer
          </p>
          <h1 className="mb-3 text-3xl font-semibold md:text-4xl">
            Hakan Yardim
          </h1>
          <p className="mb-6 text-sm text-slate-900/80 md:text-base">
            Building clean, performant web experiences with TypeScript, React,
            and modern tooling.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-slate-50 transition hover:bg-slate-800"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-slate-900/40 bg-white/20 px-4 py-2 text-sm font-medium text-slate-950 backdrop-blur transition hover:bg-white/40"
            >
              Contact
            </a>
          </div>
        </div>

        {/* About */}
        <div className="col-span-1 row-span-1 rounded-3xl border border-slate-800 bg-slate-900/60 p-5 md:col-span-2">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            About
          </h2>
          <p className="text-sm text-slate-200/90">
            I&apos;m a developer focused on building pragmatic, well-structured
            products. I enjoy working across the stack with a bias toward great
            UX, performance, and maintainable systems.
          </p>
        </div>

        {/* Tech stack */}
        <div className="col-span-1 row-span-1 rounded-3xl border border-slate-800 bg-slate-900/60 p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            Stack
          </h2>
          <ul className="flex flex-wrap gap-2 text-xs text-slate-200/90">
            {[
              "TypeScript",
              "React",
              "Next.js",
              "Node.js",
              "Tailwind CSS",
              "Cloudflare",
            ].map((item) => (
              <li
                key={item}
                className="rounded-full bg-slate-800/80 px-3 py-1"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Projects */}
        <div
          id="projects"
          className="col-span-1 row-span-2 rounded-3xl border border-slate-800 bg-slate-900/60 p-5 md:col-span-2"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Projects
            </h2>
            <span className="text-xs text-slate-500">
              Add your real projects here
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <article className="group rounded-2xl border border-slate-800 bg-slate-900/80 p-4 transition hover:border-sky-500/70 hover:bg-slate-900">
              <h3 className="mb-1 text-sm font-semibold text-slate-50">
                Portfolio on Cloudflare
              </h3>
              <p className="mb-2 text-xs text-slate-300/90">
                This site: a fast, bento-style portfolio built with Next.js,
                Tailwind, and deployed on Cloudflare Pages.
              </p>
              <p className="text-[11px] text-slate-500">
                Tech: Next.js · TypeScript · Tailwind · Cloudflare Pages
              </p>
            </article>
            <article className="group rounded-2xl border border-slate-800 bg-slate-900/80 p-4 transition hover:border-sky-500/70 hover:bg-slate-900">
              <h3 className="mb-1 text-sm font-semibold text-slate-50">
                Project Two
              </h3>
              <p className="mb-2 text-xs text-slate-300/90">
                Replace this card with a real project you&apos;re proud of:
                maybe an API, dashboard, or side project.
              </p>
              <p className="text-[11px] text-slate-500">
                Link GitHub / live demo here.
              </p>
            </article>
          </div>
        </div>

        {/* Blog teaser */}
        <div className="col-span-1 row-span-1 rounded-3xl border border-slate-800 bg-slate-900/60 p-5">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            Writing
          </h2>
          <p className="mb-3 text-sm text-slate-200/90">
            Soon: blog posts about your projects, learning notes, and
            experiments.
          </p>
          <a
            href="#"
            className="inline-flex text-xs font-medium text-sky-400 hover:text-sky-300"
          >
            Blog coming soon
          </a>
        </div>

        {/* Contact */}
        <div
          id="contact"
          className="col-span-1 row-span-1 rounded-3xl border border-slate-800 bg-slate-900/60 p-5"
        >
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            Contact
          </h2>
          <p className="mb-3 text-sm text-slate-200/90">
            Open to roles and collaborations. Reach out for anything from
            product work to experiments.
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <a
              href="mailto:your.email@hakanyardim.com"
              className="rounded-full bg-slate-800 px-3 py-1 text-slate-50 transition hover:bg-slate-700"
            >
              Email
            </a>
            <a
              href="https://github.com/hyardim"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-700 px-3 py-1 text-slate-200 transition hover:border-sky-500 hover:text-sky-300"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-700 px-3 py-1 text-slate-200 transition hover:border-sky-500 hover:text-sky-300"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer className="flex items-center justify-between gap-2 border-t border-slate-800 pt-4 text-xs text-slate-500">
        <span>© {new Date().getFullYear()} Hakan Yardim</span>
        <span>Built with Next.js · Tailwind · Cloudflare</span>
      </footer>
    </main>
  );
}

