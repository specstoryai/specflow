import * as fs from 'fs';
import * as path from 'path';

interface Post {
  id: string;
  title: string;
  body: string;
  author: string;
  score: number;
  subreddit: string;
  url: string;
  created_at: string;
  category: string[];
  keyQuotes: string[];
}

// Load posts data
const dataPath = path.join(process.cwd(), '..', 'data', 'posts.json');
const postsData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
const posts: Post[] = postsData.posts;

// Generate pages for all posts
const allPosts = posts;

// Function to clean and format post content
function formatPostContent(body: string): string {
  // Convert Reddit markdown to proper Quarto markdown
  let content = body;
  
  // Fix headers (Reddit uses # with space)
  content = content.replace(/^#\s+(.+)$/gm, '## $1');
  content = content.replace(/^##\s+(.+)$/gm, '### $1');
  
  // Fix bold formatting
  content = content.replace(/\*\*(.+?)\*\*/g, '**$1**');
  
  // Fix italic formatting
  content = content.replace(/\*([^*]+)\*/g, '*$1*');
  
  // Fix code blocks
  content = content.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
    return `\`\`\`${lang || 'text'}\n${code}\`\`\``;
  });
  
  // Fix inline code
  content = content.replace(/`([^`]+)`/g, '`$1`');
  
  // Fix lists
  content = content.replace(/^\*\s+(.+)$/gm, '- $1');
  content = content.replace(/^\d+\.\s+(.+)$/gm, (match, item, offset, string) => {
    const lines = string.substring(0, offset).split('\n');
    const prevLine = lines[lines.length - 1];
    const isStartOfList = !prevLine || !prevLine.match(/^\d+\./);
    return isStartOfList ? '1. ' + item : match;
  });
  
  // Fix links
  content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '[$1]($2)');
  
  // Add proper paragraph spacing
  content = content.replace(/\n\n+/g, '\n\n');
  
  return content;
}

// Function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
}

// Create post directory
const postsDir = path.join(process.cwd(), '..', 'reddit-wisdom', 'guides', 'posts');
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

// Generate pages for all posts
allPosts.forEach(post => {
  const slug = generateSlug(post.title);
  const postDir = path.join(postsDir, slug);
  
  // Create post directory
  if (!fs.existsSync(postDir)) {
    fs.mkdirSync(postDir, { recursive: true });
  }
  
  // Format the post content
  const formattedContent = formatPostContent(post.body);
  
  // Extract key quotes if not already available
  const keyQuotes = post.keyQuotes.length > 0 
    ? post.keyQuotes.map(q => `- "${q}"`).join('\n')
    : '- No key quotes extracted';
  
  // Create the Quarto markdown content
  const qmdContent = `---
title: "${post.title.replace(/"/g, '\\"')}"
description: "Score: ${post.score} | Author: ${post.author} | Subreddit: r/${post.subreddit}"
author: "${post.author}"
date: "${new Date(post.created_at).toISOString().split('T')[0]}"
categories: [${post.category.map(c => `"${c}"`).join(', ')}]
---

<div class="post-meta">
  <span class="author">by ${post.author}</span>
  <span class="date">${new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
  <span class="score">${post.score} points</span>
  <span class="subreddit">r/${post.subreddit}</span>
</div>

<div class="post-actions">
  <a href="${post.url}" target="_blank" class="btn btn-primary">View on Reddit →</a>
  <a href="../../" class="btn btn-outline-secondary">← Back to Guides</a>
</div>

## Post Content

${formattedContent}

## Key Takeaways

${keyQuotes}

<style>
.post-meta {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin: 1rem 0 2rem 0;
  padding: 1rem;
  background: var(--bs-light);
  border-radius: 0.5rem;
  font-size: 0.9rem;
}

.post-meta span {
  color: var(--bs-secondary);
}

.post-meta .score {
  color: var(--bs-success);
  font-weight: bold;
}

.post-actions {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
}

.post-content {
  line-height: 1.8;
  font-size: 1.1rem;
}

h2, h3, h4 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

ul, ol {
  margin: 1rem 0;
  padding-left: 2rem;
}

blockquote {
  border-left: 4px solid var(--bs-primary);
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
}

code {
  background: var(--bs-light);
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
}

pre {
  background: var(--bs-light);
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
}
</style>`;
  
  // Write the file
  const filePath = path.join(postDir, 'index.qmd');
  fs.writeFileSync(filePath, qmdContent);
  
  console.log(`Generated post page: ${slug}/index.qmd`);
});

console.log(`\n✅ Generated ${allPosts.length} post pages!`);