import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";

export default function Home() {
  const posts = getAllPosts();
  const featured = posts[0];
  const recent = posts.slice(1, 5);
  const gridPosts = posts.slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-16">
      <section className="rounded-3xl border border-border/80 bg-card px-10 py-16 shadow-[0_20px_60px_rgba(31,26,23,0.06)]">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">
          Specflow Guides
        </p>
        <h1 className="mt-6 text-4xl font-bold leading-tight">
          A quiet library for builders working with AI.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
          Specflow collects guides, essays, and field notes that help teams
          ship with clarity. Each piece is short, practical, and tuned for
          real-world execution.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/blog"
            className="rounded-full border border-accent/70 bg-accent px-6 py-2 text-xs uppercase tracking-[0.2em] text-white transition hover:opacity-90"
          >
            Explore the blog
          </Link>
          <a
            href="https://www.specstory.com"
            className="rounded-full border border-border/80 px-6 py-2 text-xs uppercase tracking-[0.2em] text-muted transition hover:border-accent hover:text-accent"
            target="_blank"
            rel="noreferrer"
          >
            Visit SpecStory
          </a>
        </div>
      </section>

      <section className="mt-20 grid gap-10 lg:grid-cols-[2.1fr_1fr]">
        <div className="rounded-3xl border border-border/80 bg-card p-8 shadow-[0_20px_60px_rgba(31,26,23,0.06)]">
          <div className="aspect-[16/9] rounded-2xl border border-border/70 bg-gradient-to-br from-[rgba(81,183,214,0.18)] via-white to-[rgba(247,199,104,0.2)]" />
          {featured && (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">
                {featured.category}
              </p>
              <h2 className="mt-3 text-2xl font-bold leading-snug">
                <Link href={`/blog/${featured.slug}`} className="hover:text-accent">
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {featured.summary}
              </p>
              <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted">
                <span>{formatDate(featured.date)}</span>
                <span>{featured.author}</span>
              </div>
            </div>
          )}
        </div>

        <aside className="rounded-3xl border border-border/80 bg-card p-8">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted">
            <span>Recent essays</span>
            <Link href="/blog" className="hover:text-accent">
              View all
            </Link>
          </div>
          <div className="mt-6 space-y-6">
            {recent.map((post) => (
              <div key={post.slug} className="border-b border-border/60 pb-6 last:border-b-0 last:pb-0">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted">
                  {post.category}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-2 block text-sm font-bold leading-snug hover:text-accent"
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

      <section className="mt-16 grid gap-8 md:grid-cols-3">
        {[
          {
            title: "Guides",
            copy: "Planning rituals, prompt architecture, and execution playbooks.",
          },
          {
            title: "Essays",
            copy: "Short, opinionated takes on what is changing in product work.",
          },
          {
            title: "Field notes",
            copy: "Weekly insights from shipping with SpecStory and Specflow.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-border/80 bg-card p-6"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              {item.title}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {item.copy}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-20">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold uppercase tracking-[0.2em]">
            Latest posts
          </h2>
          <Link href="/blog" className="text-xs uppercase tracking-[0.2em]">
            View all
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {gridPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
