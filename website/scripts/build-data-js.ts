import * as fs from 'fs';
import * as path from 'path';

// Read the posts.json file
const postsJsonPath = path.join(process.cwd(), '..', 'data', 'posts.json');
const postsData = JSON.parse(fs.readFileSync(postsJsonPath, 'utf-8'));

// Create a JavaScript file that sets window.postsData
const jsContent = `// Auto-generated posts data
window.postsData = ${JSON.stringify(postsData, null, 2)};
`;

// Write to data directory
const outputPath = path.join(process.cwd(), '..', 'data', 'posts-data.js');
fs.writeFileSync(outputPath, jsContent);

console.log('✅ Generated posts-data.js');