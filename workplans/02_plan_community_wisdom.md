# Claude Code Prompt: Integrate AI Coding Community Wisdom into SpecFlow.com

## Project Context
I need to add a new "Community Wisdom" section to my specflow.com website that showcases the evolution of AI-assisted software development practices based on Reddit community insights. I have analyzed data from 47 Reddit posts spanning January 2024 to June 2025, and created three summary markdown files. The raw data is also available in a CSV file for validation and additional analysis.

## Source Files
1. **Primary Data Source**: `commmunity_wisdom/railway_public_posts.csv` (47 posts with 7 columns: title, body, author, subreddit, score, created_at, url)
2. **Summary Files** (generated from the CSV analysis):
   - `commmunity_wisdom/timeline.md` - Chronological evolution of AI coding practices from 2024-2025
   - `commmunity_wisdom/guide-evolution.md` - Analysis of how coding guides and methodologies evolved
   - `commmunity_wisdom/syntopical-summary.md` - Comprehensive analysis of themes, contributors, and future trends

## Critical Task: Data Validation
Before implementing the website features, validate that the summary files accurately reflect the CSV data:

### Validation Checklist
1. **Verify Key Metrics**:
   - Total post count (should be 47)
   - Date range (Jan 4, 2024 - June 4, 2025)
   - Subreddit distribution (r/cursor: 25, r/ChatGPTCoding: 14, r/ClaudeAI: 5)
   - Top posts by score match CSV data

2. **Cross-Reference Posts**:
   - Confirm top 5 posts mentioned in summaries exist in CSV with correct scores
   - Validate author attribution and post counts
   - Check all Reddit URLs are present and properly formatted

3. **Temporal Analysis Validation**:
   - Verify quarterly post counts match CSV data
   - Confirm average scores per period
   - Validate chronological ordering of breakthrough posts

4. **Extract Additional Insights**:
   - Identify any significant posts missed in summaries
   - Look for patterns in post body content not captured
   - Extract exact quotes from high-scoring posts for feature highlights

## Website Structure Requirements

### 1. Create New Section in Learn in the quarto site:   `/community-wisdom/`
This should be a new main section accessible from the primary navigation from the learn dropdown, containing:
- Landing page with overview and navigation to subsections
- Interactive timeline visualization
- Searchable guide repository with full post content
- Key insights dashboard with real-time calculations from CSV
- Contributor highlights with complete post history

### 2. Information Architecture
```
/community-wisdom/
├── index.html (Overview & Introduction)
├── /data/
│   ├── posts.json (Generated from CSV)
│   ├── timeline.json (Validated timeline data)
│   └── contributors.json (Author statistics)
├── /timeline/
│   ├── index.html (Interactive timeline)
│   └── /api/ (Data endpoints)
├── /guides/
│   ├── index.html (Categorized guide listing)
│   ├── /vibe-coding/
│   ├── /multi-agent/
│   ├── /api-integration/
│   └── /post/{id}/ (Individual post pages)
├── /insights/
│   ├── index.html (Key findings dashboard)
│   └── /trends/ (Emerging trends visualization)
└── /contributors/
    ├── index.html (Top contributors & their impact)
    └── /{username}/ (Individual contributor pages)
```

### 3. Data Processing Pipeline

#### Phase 1: CSV Data Extraction and Validation
```typescript
// 1. Parse CSV and create master data structure
const posts = parseCSV('railway_public_posts.csv');

// 2. Validate against summary claims
const validation = {
  totalPosts: posts.length === 47,
  dateRange: validateDateRange(posts),
  subredditCounts: validateSubredditDistribution(posts),
  topPosts: validateTopPosts(posts, summaryData),
  metrics: calculateMetrics(posts)
};

// 3. Generate comprehensive JSON database
const database = {
  posts: enrichPostData(posts),
  timeline: generateTimelineData(posts),
  contributors: calculateContributorStats(posts),
  categories: categorizePostsWithML(posts),
  validation: validation
};
```

#### Phase 2: Content Enrichment
- Extract key quotes from post bodies (especially high-scoring posts)
- Generate tags based on content analysis
- Create search index including post bodies
- Build relationship graph between posts (references, similar topics)

### 4. Key Features to Implement

#### A. Interactive Timeline Component with CSV Data
- Real-time calculation of metrics from CSV data
- Show actual post distribution, not just summary counts
- Interactive hover showing post titles and scores
- Click-through to full post content (stored from CSV)
- Data validation indicators showing where summaries match/differ from raw data

#### B. Enhanced Guide Repository
- Full-text search across post titles AND bodies from CSV
- Display complete post content, not just summaries
- Categories auto-generated from content analysis
- "View on Reddit" links with tracking
- Related posts suggestion based on content similarity

#### C. Real-Time Insights Dashboard
- Live calculations from CSV data:
  - Actual 517% growth validation
  - Score distribution histograms
  - Posting frequency heat map
  - Author contribution patterns
- Comparison view: Summary claims vs. actual data

#### D. Comprehensive Contributor Showcase
- Complete post history for each author from CSV
- Contribution timeline for top authors
- Score trends over time
- Topic expertise analysis based on post content

### 5. Data Validation Implementation

Create a validation report page showing:
```typescript
{
  "summaryAccuracy": {
    "timeline": {
      "claimedPosts": 47,
      "actualPosts": countFromCSV(),
      "match": true/false
    },
    "topPosts": {
      "claimed": [...summaryTopPosts],
      "actual": [...csvTopPosts],
      "discrepancies": [...]
    },
    "metrics": {
      "growthRate": {
        "claimed": "517%",
        "calculated": calculateFromCSV(),
        "variance": "..."
      }
    }
  }
}
```

### 6. Enhanced Data Processing Tasks

1. **Primary CSV Processing**:
   ```typescript
   // Extract and validate all data
   - Parse CSV with proper date handling
   - Clean and normalize text content
   - Validate all Reddit URLs
   - Generate unique IDs for each post
   - Extract quotes from bodies of high-scoring posts
   ```

2. **Cross-Validation with Summaries**:
   ```typescript
   // Compare summary claims with CSV data
   - Match mentioned posts to CSV records
   - Verify scores, dates, and authors
   - Flag any discrepancies for manual review
   - Generate validation report
   ```

3. **Enhanced JSON Structure**:
   ```json
   {
     "posts": [{
       "id": "generated-uuid",
       "csvRow": 1,
       "title": "Post Title",
       "body": "Full post content from CSV",
       "author": "username",
       "score": 420,
       "date": "2025-05-09",
       "created_at": "2025-05-09T12:34:56Z",
       "url": "https://reddit.com/...",
       "subreddit": "ClaudeAI",
       "category": ["vibe-coding", "guides"],
       "keyQuotes": ["Extracted memorable quotes..."],
       "validationStatus": "verified|discrepancy|not_in_summary"
     }],
     "validation": {
       "summaryAccuracy": 95.2,
       "discrepancies": [...],
       "additionalInsights": [...]
     }
   }
   ```

### 7. Implementation Priorities (Updated)

**Phase 1 (Data Foundation)**:
1. Parse and validate CSV data
2. Cross-reference with summary files
3. Generate comprehensive JSON database
4. Create validation report page
5. Set up data update pipeline

**Phase 2 (Core Features)**:
1. Implement timeline with real CSV data
2. Build searchable repository with full post content
3. Create insights dashboard with live calculations
4. Deploy with data validation indicators

**Phase 3 (Enhanced Experience)**:
1. Add contributor deep-dives
2. Implement content similarity analysis
3. Create post relationship visualizations
4. Add CSV data export functionality

### 8. Additional Requirements

#### Data Integrity
- Display "Source: Reddit Community Data" with post count
- Show last updated date
- Include data validation status on each page
- Provide download link to processed dataset

#### Search Enhancement
- Index full post bodies from CSV
- Implement fuzzy search for typos
- Search within specific date ranges
- Filter by minimum score threshold

#### Analytics Integration
- Track which posts get most clicks
- Monitor search queries
- Measure time spent on different guides
- Report on data validation accuracy

### 9. Testing Requirements (Enhanced)

- CSV parsing accuracy across different encodings
- Data validation report correctness
- Search functionality across 47 posts with full content
- Performance with full post bodies loaded
- URL validation for all Reddit links
- Cross-reference accuracy between summaries and CSV

## File Locations
- CSV data source: `railway_public_posts.csv`
- Summary markdown files: `[provide location of timeline.md, guide-evolution.md, syntopical-summary.md]`
- Current website root: `[provide your website directory path]`
- Existing CSS/JS assets: `[provide paths to reuse]`

## Additional Context
[Add any specific details about your website's tech stack, design system, or constraints]

## Initial Tasks for Claude Code
1. First, load and examine the CSV file to understand the exact data structure
2. Validate the summary files against the CSV data and report discrepancies
3. Extract additional insights from post bodies that may not be in summaries
4. Generate the comprehensive JSON database from CSV
5. Create the validation report page
6. Then proceed with building the community-wisdom section

Please start by loading the CSV file, validating it against the summary claims, and creating a comprehensive data extraction plan before implementing any website features.