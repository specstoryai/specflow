// This file is auto-generated from the posts.json data
export const postsData = {
  "posts": [],
  "timeline": {},
  "contributors": {},
  "validation": {},
  "metadata": {}
};

// Load the actual data
fetch('/data/posts.json')
  .then(response => response.json())
  .then(data => {
    Object.assign(postsData, data);
    // Trigger a custom event to notify that data is loaded
    window.dispatchEvent(new CustomEvent('postsDataLoaded', { detail: postsData }));
  })
  .catch(error => {
    console.error('Error loading posts data:', error);
  });