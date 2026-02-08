import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/format";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const generateStaticParams = async () => {
  return getAllPosts().map((post) => ({ slug: post.slug }));
};

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <Link
        href="/blog"
        className="text-sm text-text-muted hover:text-text-secondary transition-colors"
      >
        ← Back
      </Link>

      <header className="mt-10 mb-12">
        <p className="text-xs text-text-muted mb-4">
          {post.category} · {formatDate(post.date)}
        </p>
        <h1 className="text-2xl font-medium tracking-tight leading-snug">
          {post.title}
        </h1>
        <p className="mt-4 text-text-secondary leading-relaxed">
          {post.summary}
        </p>
      </header>

      <article
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <footer className="mt-16 pt-8 border-t border-border">
        <Link
          href="/blog"
          className="text-sm text-accent hover:underline"
        >
          ← All posts
        </Link>
      </footer>
    </div>
  );
}
