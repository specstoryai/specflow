import Link from "next/link";
import { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/format";

type PostCardProps = {
  post: PostMeta;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 transition hover:border-accent/60">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          {post.category}
        </p>
        <h3 className="mt-3 text-lg font-bold leading-snug">
          <Link href={`/blog/${post.slug}`} className="hover:text-accent">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {post.summary}
        </p>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-muted">
        <span>{formatDate(post.date)}</span>
        <span>{post.author}</span>
      </div>
    </article>
  );
}
