import pandas as pd
import numpy as np
from datetime import datetime
import json

# Load the CSV file
csv_path = '/Users/gdc/specflow/community_wisdom/railway_public_posts.csv'
df = pd.read_csv(csv_path)

# Display basic information about the dataset
print("=== DATASET OVERVIEW ===")
print(f"Total number of posts: {len(df)}")
print(f"\nColumn names: {df.columns.tolist()}")
print(f"\nData types:\n{df.dtypes}")
print(f"\nMissing values:\n{df.isnull().sum()}")

# Convert created_at to datetime
df['created_at'] = pd.to_datetime(df['created_at'])

# Date range analysis
print("\n=== DATE RANGE ===")
print(f"Earliest post: {df['created_at'].min()}")
print(f"Latest post: {df['created_at'].max()}")
print(f"Date span: {(df['created_at'].max() - df['created_at'].min()).days} days")

# Subreddit distribution
print("\n=== SUBREDDIT DISTRIBUTION ===")
subreddit_counts = df['subreddit'].value_counts()
print(subreddit_counts)
print(f"\nTotal unique subreddits: {df['subreddit'].nunique()}")

# Score analysis
print("\n=== SCORE STATISTICS ===")
print(f"Mean score: {df['score'].mean():.2f}")
print(f"Median score: {df['score'].median():.2f}")
print(f"Max score: {df['score'].max()}")
print(f"Min score: {df['score'].min()}")
print(f"Std deviation: {df['score'].std():.2f}")

# Top 10 posts by score
print("\n=== TOP 10 POSTS BY SCORE ===")
top_posts = df.nlargest(10, 'score')[['title', 'author', 'subreddit', 'score', 'created_at']]
for idx, row in top_posts.iterrows():
    print(f"\n{idx+1}. Score: {row['score']} | Subreddit: {row['subreddit']}")
    print(f"   Title: {row['title']}")
    print(f"   Author: {row['author']} | Date: {row['created_at'].strftime('%Y-%m-%d')}")

# Year distribution
print("\n=== POSTS BY YEAR ===")
df['year'] = df['created_at'].dt.year
year_counts = df['year'].value_counts().sort_index()
for year, count in year_counts.items():
    print(f"{year}: {count} posts")

# Save top 10 posts with full content to JSON
top_10_full = df.nlargest(10, 'score').to_dict('records')
with open('/Users/gdc/specflow/top_10_posts.json', 'w') as f:
    json.dump(top_10_full, f, indent=2, default=str)
print("\n=== TOP 10 POSTS SAVED TO top_10_posts.json ===")