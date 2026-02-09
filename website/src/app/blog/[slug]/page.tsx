import Image from "next/image";
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
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/blog"
        className="text-sm text-muted transition-colors hover:text-accent"
      >
        ← Back
      </Link>

      <header className="mb-12 mt-10">
        <p className="text-xs uppercase tracking-[0.2em] text-muted mb-4">
          {formatDate(post.date)} · {post.author}
        </p>
        <h1 className="font-sans text-3xl font-semibold leading-snug tracking-tight md:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 leading-relaxed text-muted">
          {post.summary}
        </p>
        {post.image && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-border/70 bg-border/20">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(min-width: 768px) 700px, 100vw"
                className="object-contain"
              />
            </div>
          </div>
        )}
      </header>

      <article
        className="markdown"
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
