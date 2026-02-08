import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  tags: string[];
  author: string;
  image?: string;
};

export type Post = PostMeta & {
  contentHtml: string;
};

const postsDirectory = path.join(process.cwd(), "content/posts");

const normalizeTags = (value: unknown) =>
  Array.isArray(value) ? value.map(String) : [];

const normalizeString = (value: unknown, fallback: string) =>
  typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;

const normalizeOptionalString = (value: unknown) =>
  typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;

const parsePost = (slug: string, fileContents: string) => {
  const { data, content } = matter(fileContents);

  const meta: PostMeta = {
    slug,
    title: normalizeString(data.title, "Untitled"),
    date: normalizeString(data.date, new Date().toISOString()),
    summary: normalizeString(data.summary, ""),
    category: normalizeString(data.category, "General"),
    tags: normalizeTags(data.tags),
    author: normalizeString(data.author, "Specflow"),
    image: normalizeOptionalString(data.image),
  };

  return { meta, content };
};

export const getAllPosts = (): PostMeta[] => {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx?$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { meta } = parsePost(slug, fileContents);
    return meta;
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);

  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { meta, content } = parsePost(slug, fileContents);
  const processedContent = await remark().use(html).process(content);

  return {
    ...meta,
    contentHtml: processedContent.toString(),
  };
};

export const getAllTags = () => {
  const tags = new Set<string>();
  getAllPosts().forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
};

export const getAllCategories = () => {
  const categories = new Set<string>();
  getAllPosts().forEach((post) => categories.add(post.category));
  return Array.from(categories).sort((a, b) => a.localeCompare(b));
};
