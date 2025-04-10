import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { siteConfig } from '@/config/site';

// Default site image to use when no specific image is available
const DEFAULT_OG_IMAGE = siteConfig.ogImage;
const SITE_URL = siteConfig.url;

interface ContentMetadata {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  tags?: string[];
  status?: string;
  featured?: boolean;
  [key: string]: any; // For any additional frontmatter properties
}

/**
 * Create Open Graph and standard metadata for a page based on content metadata
 * 
 * @param contentMetadata - Metadata extracted from content frontmatter
 * @param basePath - Base path for the content type (e.g., '/forge', '/blog')
 * @returns Next.js Metadata object
 */
export function createMetadata(contentMetadata: ContentMetadata, basePath: string): Metadata {
  const title = contentMetadata.title ? 
    `${contentMetadata.title} | ${siteConfig.name}` : 
    siteConfig.name;
  const description = contentMetadata.description || siteConfig.description;
  
  // Determine the image to use - content image, default OG image, or site logo
  const imagePath = contentMetadata.image || DEFAULT_OG_IMAGE;
  const imageUrl = imagePath.startsWith('http') 
    ? imagePath 
    : `${SITE_URL}${imagePath}`;

  // Construct canonical URL
  const canonicalUrl = contentMetadata.id 
    ? `${SITE_URL}${basePath}/${contentMetadata.id}` 
    : SITE_URL;
  
  // Build keywords from tags if available
  const keywords = contentMetadata.tags || siteConfig.keywords;

  return {
    title: title,
    description: description,
    keywords: keywords,
    authors: [{ name: siteConfig.author }],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonicalUrl,
      title: title,
      description: description,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${contentMetadata.title || ''} | ${siteConfig.name}`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [imageUrl],
      creator: siteConfig.twitterHandle
    },
    alternates: {
      canonical: canonicalUrl,
    }
  };
}

/**
 * Loads content metadata from a markdown file
 * 
 * @param contentPath - Path to markdown file or directory containing index.md
 * @returns ContentMetadata object
 */
export async function loadContentMetadata(contentPath: string): Promise<ContentMetadata> {
  try {
    // Determine the actual file path (handle both direct file paths and directories)
    let filePath = contentPath;
    
    if (!contentPath.endsWith('.md')) {
      // If path is a directory, look for index.md
      const indexPath = path.join(contentPath, 'index.md');
      if (fs.existsSync(indexPath)) {
        filePath = indexPath;
      } else {
        // Try to find any .md file in the directory
        const files = fs.readdirSync(contentPath).filter(file => file.endsWith('.md'));
        if (files.length > 0) {
          filePath = path.join(contentPath, files[0]);
        } else {
          throw new Error(`No markdown file found in ${contentPath}`);
        }
      }
    }
    
    // Read the file content
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Extract frontmatter (assuming format like "---\nkey: value\n---\ncontent")
    const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);
    
    if (!frontmatterMatch) {
      return {}; // No frontmatter found
    }
    
    const frontmatterContent = frontmatterMatch[1];
    const metadata: ContentMetadata = {};
    
    // Parse frontmatter content into key-value pairs
    frontmatterContent.split('\n').forEach(line => {
      const match = line.match(/^([^:]+):\s*(.*)$/);
      if (match) {
        const [, key, value] = match;
        
        // Handle arrays (values starting with [ and ending with ])
        if (value.trim().startsWith('[') && value.trim().endsWith(']')) {
          try {
            metadata[key.trim()] = JSON.parse(value.replace(/'/g, '"'));
          } catch (e) {
            // Fall back to string if parsing fails
            metadata[key.trim()] = value.trim();
          }
        } else {
          // Handle normal values (remove quotes if present)
          metadata[key.trim()] = value.trim().replace(/^['"](.*)['"]$/, '$1');
        }
      }
    });
    
    return metadata;
  } catch (error) {
    console.error('Error loading content metadata:', error);
    return {}; // Return empty metadata on error
  }
}
