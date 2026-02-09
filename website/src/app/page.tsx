import Image from "next/image";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";

export default function Home() {
  const posts = getAllPosts();
  const latestGuide = posts.find(
    (post) => post.category.toLowerCase() === "guides",
  );
  const recentPosts = posts.slice(0, 6);
  const guidePosts = posts
    .filter((post) => post.category.toLowerCase() === "guides")
    .slice(0, 3);
  const meditationPosts = posts
    .filter((post) => post.category.toLowerCase() === "essays")
    .slice(0, 3);
  const fieldNotePosts = posts
    .filter((post) => post.category.toLowerCase() === "field notes")
    .slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-6xl px-2 pb-10 pt-5">
      <section className="rounded-3xl border border-border/80 bg-card px-8 py-12 shadow-[0_20px_60px_rgba(31,26,23,0.06)] md:px-10 md:py-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">
              Specflow Guides
            </p>
            <div className="mt-6 border-b border-border/70 pb-6">
              <h1 className="text-5xl font-light leading-[0.95] tracking-[-0.02em] md:text-5xl">
                A library of guides
              </h1>
              <p className="mt-3 text-xl leading-snug text-foreground/80 md:text-2xl">
                for builders working with AI
              </p>
            </div>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              From the SpecStory team sharing practical guides, learnings, opinions, and updates on coding agents to help teams
              ship with clarity. Each piece is short, practical, and tuned for
              real-world execution.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href="/blog"
                className="rounded-full border border-accent/35 bg-accent/15 px-5 py-2 text-xs uppercase tracking-[0.1em] transition hover:border-accent hover:text-accent"
              >
                Explore the blog
              </Link>
              <a
                href="https://www.specstory.com"
                className="inline-flex items-center gap-2 rounded-full border border-accent/45 bg-accent/5 px-5 py-2 text-xs uppercase tracking-[0.2em] text-muted transition hover:border-accent hover:text-accent"
                target="_blank"
                rel="noreferrer"
              >
                Visit SpecStory
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            </div>
          </div>
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl border border-border/100 bg-border/200">
            <Image
              src="/images/hero_banner.png"
              alt="Specflow hero banner"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-8 md:grid-cols-3">
        {[
          {
            title: "Guides",
            copy: "Planning rituals, prompt architecture, and execution playbooks.",
            href: "#guides",
          },
          {
            title: "Meditations",
            copy: "Short, opinionated takes on what is changing in product work.",
            href: "#meditations",
          },
          {
            title: "Field notes",
            copy: "Weekly insights from shipping with SpecStory and Specflow.",
            href: "#field-notes",
          },
        ].map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="rounded-2xl border border-border/80 bg-card p-6 transition hover:border-accent/60 hover:shadow-[0_12px_30px_rgba(31,26,23,0.12)]"
            aria-label={`Jump to ${item.title}`}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-accent">
              {item.title}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {item.copy}
            </p>
          </Link>
        ))}
      </section>

      <section className="mt-10 grid gap-10 lg:grid-cols-[2.1fr_1fr]">
        <div className="rounded-3xl border border-border/80 bg-card p-8 shadow-[0_20px_60px_rgba(31,26,23,0.06)]">
          {latestGuide?.image ? (
            <div className="overflow-hidden rounded-2xl border border-border/70 bg-border/20">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={latestGuide.image}
                  alt={latestGuide.title}
                  fill
                  sizes="(min-width: 1024px) 520px, (min-width: 768px) 60vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="aspect-[5/3] rounded-2xl border border-border/70 bg-gradient-to-br from-[rgba(81,183,214,0.18)] via-white to-[rgba(247,199,104,0.2)]" />
          )}
          {latestGuide && (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                {latestGuide.category}
              </p>
              <h2 className="mt-3 font-sans text-2xl font-semibold leading-snug">
                <Link href={`/blog/${latestGuide.slug}`} className="hover:text-accent">
                  {latestGuide.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {latestGuide.summary}
              </p>
              <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted">
                <span>{formatDate(latestGuide.date)}</span>
                <span>{latestGuide.author}</span>
              </div>
            </div>
          )}
        </div>

        <aside className="rounded-3xl border border-border/80 bg-card p-8">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted">
            <span>Recent posts</span>
            <Link href="/blog" className="hover:text-accent">
              View all
            </Link>
          </div>
          <div className="mt-6 space-y-6">
            {recentPosts.map((post) => (
              <div key={post.slug} className="border-b border-border/60 pb-6 last:border-b-0 last:pb-0">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted">
                  {post.category}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-2 block font-sans text-sm font-semibold leading-snug hover:text-accent"
                >
                  {post.title}
                </Link>
                <p className="mt-2 text-xs text-muted">
                  {formatDate(post.date)}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="mt-10 space-y-10">
        <div>
          <h2
            id="guides"
            className="text-lg font-bold uppercase tracking-[0.2em]"
          >
            Guides
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {guidePosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
        <div>
          <h2
            id="meditations"
            className="text-lg font-bold uppercase tracking-[0.2em]"
          >
            Meditations
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {meditationPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
        <div>
          <h2
            id="field-notes"
            className="text-lg font-bold uppercase tracking-[0.2em]"
          >
            Field notes
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {fieldNotePosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
