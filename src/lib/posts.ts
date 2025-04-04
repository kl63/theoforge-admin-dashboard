'use server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define content directory with explicit normalization
const postsDirectory = path.resolve(process.cwd(), 'src', 'content', 'blog');
console.log('Posts directory resolved to:', postsDirectory);

export interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  author?: string;
  image?: string;
  audioUrl?: string;
  tags?: string[];
  readingTime?: string;
  // Podcast-related fields
  isPodcast?: boolean;
  podcastEpisodeNumber?: number;
  podcastDuration?: string;
  podcastHost?: string;
  podcastGuest?: string;
  podcastPlatforms?: {
    spotify?: string;
    apple?: string;
    google?: string;
    rss?: string;
  };
}

// Helper function to get all post slugs (filenames without .md)
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    console.log('Reading directory:', postsDirectory);
    
    // Check if directory exists
    try {
      await fs.promises.access(postsDirectory, fs.constants.R_OK);
    } catch (error) {
      console.error('Blog directory does not exist or is not readable:', postsDirectory);
      return [];
    }
    
    const fileNames = await fs.promises.readdir(postsDirectory);
    console.log('Files found in directory:', fileNames);
    
    const mdFiles = fileNames.filter(fileName => fileName.endsWith('.md'));
    console.log('Markdown files found:', mdFiles);
    
    return mdFiles.map(fileName => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading blog directory:', error);
    return [];
  }
}

// Helper function to get data for a single post by slug
export async function getPostData(slug: string): Promise<PostData | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    console.log('Attempting to read file:', fullPath);
    
    // Check if file exists
    try {
      await fs.promises.access(fullPath, fs.constants.R_OK);
    } catch (error) {
      console.error(`File does not exist or is not readable: ${fullPath}`);
      return null;
    }
    
    // Read file content
    let fileContents: string;
    try {
      fileContents = await fs.promises.readFile(fullPath, 'utf8');
      console.log(`Successfully read file: ${fullPath}, size: ${fileContents.length} bytes`);
    } catch (error) {
      console.error(`Error reading file: ${fullPath}`, error);
      return null;
    }
    
    // Parse frontmatter with error handling
    let data: any;
    let content: string;
    try {
      const result = matter(fileContents);
      data = result.data;
      content = result.content;
      console.log(`Successfully parsed frontmatter for: ${slug}`);
    } catch (error) {
      console.error(`Error parsing frontmatter in ${slug}.md:`, error);
      return null;
    }
    
    // Process tags
    let tags: string[] = [];
    if (data.tags) {
      if (typeof data.tags === 'string') {
        tags = data.tags.split(',').map((tag: string) => tag.trim());
      } else if (Array.isArray(data.tags)) {
        tags = data.tags;
      }
    }
    
    // Process podcast platforms
    let podcastPlatforms = undefined;
    if (data.podcastPlatforms) {
      podcastPlatforms = {
        spotify: data.podcastPlatforms.spotify || undefined,
        apple: data.podcastPlatforms.apple || undefined,
        google: data.podcastPlatforms.google || undefined,
        rss: data.podcastPlatforms.rss || undefined
      };
    }
    
    // Create post data object with fallbacks for missing fields
    const postData: PostData = {
      slug,
      content,
      title: data.title || 'Untitled Post',
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      excerpt: data.excerpt || 'No excerpt available',
      author: data.author || undefined,
      image: data.image || undefined,
      audioUrl: data.audioUrl || undefined,
      tags: tags.length > 0 ? tags : undefined,
      // Podcast-related fields
      isPodcast: data.isPodcast || (data.audioUrl ? true : false),
      podcastEpisodeNumber: data.podcastEpisodeNumber || undefined,
      podcastDuration: data.podcastDuration || undefined,
      podcastHost: data.podcastHost || undefined,
      podcastGuest: data.podcastGuest || undefined,
      podcastPlatforms: podcastPlatforms
    };
    
    return postData;
  } catch (error) {
    console.error(`Unexpected error processing ${slug}.md:`, error);
    return null;
  }
}

// Helper function to get sorted data for all posts
export async function getSortedPostsData(): Promise<PostData[]> {
  try {
    const allSlugs = await getAllPostSlugs();
    console.log('All slugs found:', allSlugs);
    
    if (allSlugs.length === 0) {
      console.warn('No blog posts found!');
      return [];
    }
    
    // Process each slug sequentially to avoid overwhelming the system
    const allPostsData: PostData[] = [];
    for (const slug of allSlugs) {
      const postData = await getPostData(slug);
      if (postData) {
        allPostsData.push(postData);
      }
    }
    
    console.log(`Successfully processed ${allPostsData.length} out of ${allSlugs.length} posts`);
    
    // Sort posts by date
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      return -1;
    });
  } catch (error) {
    console.error('Error getting sorted posts data:', error);
    return [];
  }
}

// Get all unique tags across all posts
export async function getAllTags(): Promise<string[]> {
  try {
    const allPosts = await getSortedPostsData();
    const tagSet = new Set<string>();
    
    allPosts.forEach(post => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach(tag => tagSet.add(tag));
      }
    });
    
    const tags = Array.from(tagSet).sort();
    console.log('All tags found:', tags);
    return tags;
  } catch (error) {
    console.error('Error getting all tags:', error);
    return [];
  }
}

// Get posts filtered by tag
export async function getPostsByTag(tag: string): Promise<PostData[]> {
  try {
    const allPosts = await getSortedPostsData();
    const filteredPosts = allPosts.filter(post => 
      post.tags && Array.isArray(post.tags) && post.tags.includes(tag)
    );
    console.log(`Found ${filteredPosts.length} posts with tag: ${tag}`);
    return filteredPosts;
  } catch (error) {
    console.error(`Error getting posts by tag ${tag}:`, error);
    return [];
  }
}
