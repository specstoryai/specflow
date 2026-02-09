import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getAllCategories, getAllPosts, getAllTags } from "@/lib/posts";
import { slugify } from "@/lib/format";

type BlogPageProps = {
  searchParams?: {
    tag?: string;
    category?: string;
  };
};

export default function BlogPage({ searchParams }: BlogPageProps) {
  const tagFilter = searchParams?.tag;
  const categoryFilter = searchParams?.category;
  const posts = getAllPosts().filter((post) => {
    const tagMatch = tagFilter
      ? post.tags.map(slugify).includes(slugify(tagFilter))
      : true;
    const categoryMatch = categoryFilter
      ? slugify(post.category) === slugify(categoryFilter)
      : true;
    return tagMatch && categoryMatch;
  });

  const tags = getAllTags();
  const categories = getAllCategories();

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted">
        <Link
          href="/"
          className="text-sm text-muted transition-colors hover:text-accent"
        >
          ← Back to home
        </Link>
        <div className="flex items-center gap-4">
          <span>{posts.length} posts</span>
          {(tagFilter || categoryFilter) && (
            <Link href="/blog" className="hover:text-accent">
              Clear filters
            </Link>
          )}
        </div>
      </div>
      <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_240px]">
        <div>
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>

        <aside className="rounded-2xl border border-border/80 bg-card p-6 text-sm">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              Categories
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/blog?category=${encodeURIComponent(category)}`}
                  className="rounded-full border border-border/80 px-3 py-1 text-xs uppercase tracking-[0.2em] hover:border-accent hover:text-accent"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              Tags
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-border/80 px-3 py-1 text-xs uppercase tracking-[0.2em] hover:border-accent hover:text-accent"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-border/60 pt-6 text-xs uppercase tracking-[0.2em] text-muted">
            <a href="/rss.xml" className="hover:text-accent">
              RSS feed
            </a>
          </div>
        </aside>
      </section>
    </div>
  );
}
