import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const servicesDirectory = path.join(process.cwd(), 'src/content/services');

export interface ServiceData {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  icon?: string; // Added icon field
  order?: number; // Added order field
  // Add other frontmatter fields here as needed
}

// Helper function to get all service slugs (filenames without .md)
export function getAllServiceSlugs() {
  try {
    const fileNames = fs.readdirSync(servicesDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading services directory:', error);
    return []; // Return empty array if directory doesn't exist or error occurs
  }
}

// Helper function to get data for a single service by slug
export function getServiceData(slug: string): ServiceData | null {
  const fullPath = path.join(servicesDirectory, `${slug}.md`);
  try {
    if (!fs.existsSync(fullPath)) {
      console.warn(`Markdown file not found for service slug: ${slug}`);
      return null; // Return null if file doesn't exist
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the service metadata section
    const { data, content } = matter(fileContents);

    // Basic validation for required fields
    if (!data.title || !data.excerpt) {
      console.warn(`Missing required frontmatter in ${slug}.md: title or excerpt`);
      return null;
    }

    // Combine the data with the slug and content
    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      image: data.image,
      icon: data.icon,
      order: data.order,
      content,
    };
  } catch (error) {
    console.error(`Error reading or parsing markdown file for service slug ${slug}:`, error);
    return null; // Return null on other errors
  }
}

// Helper function to get sorted data for all services
export function getSortedServicesData(): ServiceData[] {
  const allSlugs = getAllServiceSlugs();
  const allServicesData = allSlugs
    .map(slug => getServiceData(slug))
    .filter((service): service is ServiceData => service !== null); // Filter out null results

  // Sort services by order, then by title
  return allServicesData.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
    }
    // If order is the same or undefined, sort by title
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });
}
