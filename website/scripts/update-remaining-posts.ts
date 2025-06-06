import * as fs from 'fs';
import * as path from 'path';

const postsDir = path.join(process.cwd(), '..', 'reddit-wisdom', 'guides', 'posts');

// Get all post directories
const postDirs = fs.readdirSync(postsDir)
  .filter(dir => fs.statSync(path.join(postsDir, dir)).isDirectory());

let updatedCount = 0;

for (const postDir of postDirs) {
  const qmdPath = path.join(postsDir, postDir, 'index.qmd');
  
  if (fs.existsSync(qmdPath)) {
    let content = fs.readFileSync(qmdPath, 'utf-8');
    
    // Check if file still has post-actions section
    if (content.includes('<div class="post-actions">')) {
      // Extract Reddit URL from the View on Reddit button
      const redditMatch = content.match(/<a href="(https:\/\/reddit\.com[^"]+)" target="_blank" class="btn btn-primary">View on Reddit/);
      
      if (redditMatch) {
        const redditUrl = redditMatch[1];
        
        // Add reddit-link to post-meta if not already there
        if (!content.includes('reddit-link')) {
          content = content.replace(
            /<span class="date">([^<]+)<\/span>\s*<span class="score">/,
            `<span class="date">$1</span>\n  <span class="reddit-link"><a href="${redditUrl}" target="_blank">View on Reddit →</a></span>\n  <span class="score">`
          );
        }
        
        // Remove the entire post-actions section
        content = content.replace(
          /<div class="post-actions">[\s\S]*?<\/div>\n\n/,
          ''
        );
        
        fs.writeFileSync(qmdPath, content);
        updatedCount++;
        console.log(`Updated: ${postDir}`);
      }
    }
  }
}

console.log(`\nTotal files updated: ${updatedCount}`);