import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define the path to the profile content directory
const profileDirectory = path.join(process.cwd(), 'src', 'content', 'profile');

// Define the structure for the profile data
export interface ProfileData {
  name: string;
  title: string;
  image: string;
  content: string; // Raw markdown content
  // Add any other frontmatter fields you expect
  role?: string;
  bio_summary?: string;
}

export function getProfileData(slug: string): ProfileData | null {
  const fullPath = path.join(profileDirectory, `${slug}.md`);
  try {
    if (!fs.existsSync(fullPath)) {
      console.warn(`Profile file not found: ${fullPath}`);
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);

    // Combine the data with the id and contentHtml
    return {
      name: data.name || 'Profile Name', // Provide defaults
      title: data.title || 'Profile Title',
      image: data.image || '/images/placeholder.png',
      role: data.role,
      bio_summary: data.bio_summary,
      content: content,
    } as ProfileData;

  } catch (error) {
    console.error(`Error reading or parsing profile file ${fullPath}:`, error);
    return null;
  }
}
