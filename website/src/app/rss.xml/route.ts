import { siteConfig } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const GET = async () => {
  const posts = getAllPosts();
  const items = posts
    .map((post) => {
      const categories = post.tags
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join("");
      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${siteConfig.url}/blog/${post.slug}</link>
          <guid>${siteConfig.url}/blog/${post.slug}</guid>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <description>${escapeXml(post.summary)}</description>
          ${categories}
        </item>
      `;
    })
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>${escapeXml(siteConfig.name)}</title>
        <link>${siteConfig.url}</link>
        <description>${escapeXml(siteConfig.description)}</description>
        ${items}
      </channel>
    </rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
};
