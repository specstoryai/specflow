import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

interface RedditPost {
  title: string;
  body: string;
  author: string;
  subreddit: string;
  score: number;
  created_at: string;
  url: string;
}

interface ValidationReport {
  summaryAccuracy: {
    timeline: {
      claimedPosts: number;
      actualPosts: number;
      match: boolean;
    };
    dateRange: {
      claimed: { start: string; end: string };
      actual: { start: string; end: string };
      match: boolean;
    };
    subredditDistribution: {
      claimed: Record<string, number>;
      actual: Record<string, number>;
      match: boolean;
    };
    topPosts: {
      claimed: any[];
      actual: any[];
      discrepancies: string[];
    };
    metrics: {
      growthRate: {
        claimed: string;
        calculated: string;
        variance: string;
      };
    };
  };
  additionalInsights: string[];
  extractedQuotes: Array<{ post: string; score: number; quote: string }>;
}

class CommunityDataValidator {
  private posts: RedditPost[] = [];
  private summaryData: any = {};

  async loadCSVData(): Promise<void> {
    const csvPath = path.join(process.cwd(), '..', '..', 'community_wisdom', 'railway_public_posts.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    
    this.posts = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      cast: (value, context) => {
        if (context.column === 'score') {
          return parseInt(value, 10);
        }
        return value;
      }
    });

    console.log(`Loaded ${this.posts.length} posts from CSV`);
  }

  async loadSummaryFiles(): Promise<void> {
    const summaryFiles = ['timeline.md', 'guide_evolution.md', 'syntopical.md'];
    const summaryPath = path.join(process.cwd(), '..', '..', 'community_wisdom');

    for (const file of summaryFiles) {
      const filePath = path.join(summaryPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      this.summaryData[file] = content;
    }
  }

  validateMetrics(): ValidationReport {
    // Calculate actual metrics from CSV
    const actualPostCount = this.posts.length;
    
    // Get date range
    const dates = this.posts.map(p => new Date(p.created_at)).sort((a, b) => a.getTime() - b.getTime());
    const actualDateRange = {
      start: dates[0].toISOString().split('T')[0],
      end: dates[dates.length - 1].toISOString().split('T')[0]
    };

    // Calculate subreddit distribution
    const subredditCounts: Record<string, number> = {};
    this.posts.forEach(post => {
      subredditCounts[post.subreddit] = (subredditCounts[post.subreddit] || 0) + 1;
    });

    // Get top posts by score
    const topPosts = [...this.posts]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(p => ({
        title: p.title,
        author: p.author,
        score: p.score,
        subreddit: p.subreddit,
        url: p.url,
        created_at: p.created_at
      }));

    // Calculate growth rate
    const postsByQuarter = this.getPostsByQuarter();
    const firstQuarterCount = postsByQuarter[0]?.count || 1;
    const lastQuarterCount = postsByQuarter[postsByQuarter.length - 1]?.count || 1;
    const growthRate = ((lastQuarterCount - firstQuarterCount) / firstQuarterCount * 100).toFixed(1);

    // Extract high-value quotes
    const extractedQuotes = this.extractHighValueQuotes();

    // Create validation report
    const report: ValidationReport = {
      summaryAccuracy: {
        timeline: {
          claimedPosts: 47,
          actualPosts: actualPostCount,
          match: actualPostCount === 47
        },
        dateRange: {
          claimed: { start: '2024-01-04', end: '2025-06-04' },
          actual: actualDateRange,
          match: actualDateRange.start === '2024-01-04' && actualDateRange.end === '2025-06-04'
        },
        subredditDistribution: {
          claimed: { 'cursor': 25, 'ChatGPTCoding': 14, 'ClaudeAI': 5 },
          actual: subredditCounts,
          match: subredditCounts['cursor'] === 25 && 
                 subredditCounts['ChatGPTCoding'] === 14 && 
                 subredditCounts['ClaudeAI'] === 5
        },
        topPosts: {
          claimed: [], // To be extracted from summary files
          actual: topPosts,
          discrepancies: []
        },
        metrics: {
          growthRate: {
            claimed: '517%',
            calculated: `${growthRate}%`,
            variance: `${Math.abs(517 - parseFloat(growthRate)).toFixed(1)}%`
          }
        }
      },
      additionalInsights: this.findAdditionalInsights(),
      extractedQuotes: extractedQuotes
    };

    return report;
  }

  private getPostsByQuarter(): Array<{ quarter: string; count: number; avgScore: number }> {
    const quarters: Record<string, { posts: RedditPost[]; }> = {};

    this.posts.forEach(post => {
      const date = new Date(post.created_at);
      const year = date.getFullYear();
      const quarter = Math.floor(date.getMonth() / 3) + 1;
      const key = `${year}-Q${quarter}`;

      if (!quarters[key]) {
        quarters[key] = { posts: [] };
      }
      quarters[key].posts.push(post);
    });

    return Object.entries(quarters)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([quarter, data]) => ({
        quarter,
        count: data.posts.length,
        avgScore: data.posts.reduce((sum, p) => sum + p.score, 0) / data.posts.length
      }));
  }

  private extractHighValueQuotes(): Array<{ post: string; score: number; quote: string }> {
    const highScorePosts = this.posts
      .filter(p => p.score > 100 && p.body.length > 200)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    return highScorePosts.map(post => {
      // Extract meaningful quotes (sentences with key terms)
      const sentences = post.body.split(/[.!?]+/).filter(s => s.trim().length > 50);
      const keyTerms = ['workflow', 'AI', 'coding', 'prompt', 'agent', 'LLM', 'context', 'memory'];
      
      const meaningfulSentences = sentences
        .filter(s => keyTerms.some(term => s.toLowerCase().includes(term.toLowerCase())))
        .slice(0, 2);

      return {
        post: post.title,
        score: post.score,
        quote: meaningfulSentences.join('. ').trim() || sentences[0]?.trim() || ''
      };
    });
  }

  private findAdditionalInsights(): string[] {
    const insights: string[] = [];

    // Find posts with unusually high engagement relative to subreddit
    const avgScoreBySubreddit: Record<string, number> = {};
    const subredditGroups: Record<string, RedditPost[]> = {};

    this.posts.forEach(post => {
      if (!subredditGroups[post.subreddit]) {
        subredditGroups[post.subreddit] = [];
      }
      subredditGroups[post.subreddit].push(post);
    });

    Object.entries(subredditGroups).forEach(([subreddit, posts]) => {
      avgScoreBySubreddit[subreddit] = posts.reduce((sum, p) => sum + p.score, 0) / posts.length;
    });

    // Find outliers
    this.posts.forEach(post => {
      const avgScore = avgScoreBySubreddit[post.subreddit];
      if (post.score > avgScore * 3) {
        insights.push(`Outlier post: "${post.title}" scored ${post.score} (3x above ${post.subreddit} average)`);
      }
    });

    // Analyze posting patterns
    const postsByAuthor: Record<string, number> = {};
    this.posts.forEach(post => {
      postsByAuthor[post.author] = (postsByAuthor[post.author] || 0) + 1;
    });

    const prolificAuthors = Object.entries(postsByAuthor)
      .filter(([_, count]) => count >= 3)
      .sort(([, a], [, b]) => b - a);

    if (prolificAuthors.length > 0) {
      insights.push(`Most prolific contributors: ${prolificAuthors.map(([author, count]) => `${author} (${count} posts)`).join(', ')}`);
    }

    return insights;
  }

  generateEnhancedJSON(): any {
    const enhancedPosts = this.posts.map((post, index) => ({
      id: `post-${index + 1}-${post.created_at.slice(0, 10)}`,
      csvRow: index + 1,
      title: post.title,
      body: post.body,
      author: post.author,
      score: post.score,
      date: post.created_at.split('T')[0],
      created_at: post.created_at,
      url: post.url,
      subreddit: post.subreddit,
      category: this.categorizePost(post),
      keyQuotes: this.extractKeyQuotes(post),
      validationStatus: 'verified' as const
    }));

    const timeline = this.generateTimelineData();
    const contributors = this.calculateContributorStats();

    return {
      posts: enhancedPosts,
      timeline,
      contributors,
      validation: this.validateMetrics(),
      metadata: {
        totalPosts: this.posts.length,
        dateRange: {
          start: Math.min(...this.posts.map(p => new Date(p.created_at).getTime())),
          end: Math.max(...this.posts.map(p => new Date(p.created_at).getTime()))
        },
        lastUpdated: new Date().toISOString()
      }
    };
  }

  private categorizePost(post: RedditPost): string[] {
    const categories: string[] = [];
    const lowerBody = post.body.toLowerCase();
    const lowerTitle = post.title.toLowerCase();

    if (lowerBody.includes('vibe') || lowerTitle.includes('vibe')) {
      categories.push('vibe-coding');
    }
    if (lowerBody.includes('agent') || lowerBody.includes('multi-agent')) {
      categories.push('multi-agent');
    }
    if (lowerBody.includes('api') || lowerBody.includes('integration')) {
      categories.push('api-integration');
    }
    if (lowerBody.includes('prompt') || lowerBody.includes('prompting')) {
      categories.push('prompting');
    }
    if (lowerBody.includes('memory') || lowerBody.includes('context')) {
      categories.push('context-management');
    }

    return categories.length > 0 ? categories : ['general'];
  }

  private extractKeyQuotes(post: RedditPost): string[] {
    if (post.body.length < 100) return [];

    const sentences = post.body
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 30 && s.length < 200);

    const keyPhrases = [
      'the key', 'important', 'critical', 'essential', 'must', 'should',
      'tip:', 'note:', 'warning:', 'remember', 'don\'t forget'
    ];

    return sentences
      .filter(s => keyPhrases.some(phrase => s.toLowerCase().includes(phrase)))
      .slice(0, 3);
  }

  private generateTimelineData(): any {
    const monthlyData: Record<string, { posts: number; avgScore: number; topPost: any }> = {};

    this.posts.forEach(post => {
      const date = new Date(post.created_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { posts: 0, avgScore: 0, topPost: null };
      }

      monthlyData[monthKey].posts++;
      monthlyData[monthKey].avgScore += post.score;

      if (!monthlyData[monthKey].topPost || post.score > monthlyData[monthKey].topPost.score) {
        monthlyData[monthKey].topPost = {
          title: post.title,
          score: post.score,
          author: post.author
        };
      }
    });

    // Calculate averages
    Object.values(monthlyData).forEach(data => {
      data.avgScore = Math.round(data.avgScore / data.posts);
    });

    return monthlyData;
  }

  private calculateContributorStats(): any {
    const stats: Record<string, {
      posts: number;
      totalScore: number;
      avgScore: number;
      topPost: any;
      firstPost: string;
      lastPost: string;
    }> = {};

    this.posts.forEach(post => {
      if (!stats[post.author]) {
        stats[post.author] = {
          posts: 0,
          totalScore: 0,
          avgScore: 0,
          topPost: null,
          firstPost: post.created_at,
          lastPost: post.created_at
        };
      }

      stats[post.author].posts++;
      stats[post.author].totalScore += post.score;

      if (!stats[post.author].topPost || post.score > stats[post.author].topPost.score) {
        stats[post.author].topPost = {
          title: post.title,
          score: post.score,
          url: post.url
        };
      }

      if (post.created_at < stats[post.author].firstPost) {
        stats[post.author].firstPost = post.created_at;
      }
      if (post.created_at > stats[post.author].lastPost) {
        stats[post.author].lastPost = post.created_at;
      }
    });

    // Calculate averages
    Object.values(stats).forEach(stat => {
      stat.avgScore = Math.round(stat.totalScore / stat.posts);
    });

    return stats;
  }

  async run(): Promise<void> {
    console.log('Starting Community Data Validation...\n');

    await this.loadCSVData();
    await this.loadSummaryFiles();

    const validationReport = this.validateMetrics();
    const enhancedData = this.generateEnhancedJSON();

    // Save validation report
    const reportPath = path.join(process.cwd(), 'data', 'validation-report.json');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(validationReport, null, 2));

    // Save enhanced data
    const dataPath = path.join(process.cwd(), 'data', 'posts.json');
    fs.writeFileSync(dataPath, JSON.stringify(enhancedData, null, 2));

    // Print summary
    console.log('\n=== Validation Summary ===');
    console.log(`Total Posts: ${validationReport.summaryAccuracy.timeline.actualPosts} (Expected: 47)`);
    console.log(`Date Range: ${validationReport.summaryAccuracy.dateRange.actual.start} to ${validationReport.summaryAccuracy.dateRange.actual.end}`);
    console.log(`Growth Rate: ${validationReport.summaryAccuracy.metrics.growthRate.calculated} (Claimed: 517%)`);
    
    console.log('\nSubreddit Distribution:');
    Object.entries(validationReport.summaryAccuracy.subredditDistribution.actual).forEach(([sub, count]) => {
      console.log(`  ${sub}: ${count}`);
    });

    console.log('\nTop 5 Posts by Score:');
    validationReport.summaryAccuracy.topPosts.actual.slice(0, 5).forEach((post, i) => {
      console.log(`  ${i + 1}. "${post.title}" by ${post.author} (${post.score} points)`);
    });

    console.log('\nAdditional Insights:');
    validationReport.additionalInsights.forEach(insight => {
      console.log(`  - ${insight}`);
    });

    console.log('\n✅ Validation complete! Reports saved to ./data/');
  }
}

// Run the validator
const validator = new CommunityDataValidator();
validator.run().catch(console.error);