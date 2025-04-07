// Define the structure for a link item
export interface LinkItem {
  name: string;
  url: string;
  icon?: string; // Optional icon identifier (e.g., 'code', 'link')
}

// Define the structure for the about item data
export interface AboutItem {
  id: string;
  title: string;
  description?: string;
  contentHtml?: string; // For potential item-specific HTML content
  image?: string;       // Optional image URL
  name?: string;        // Optional name override (if different from title)
  links?: LinkItem[];   // Optional array of links
  component?: string;   // Optional identifier for component type (e.g., 'Framework')
}

// Define the structure for the overall about page data
export interface AboutData {
  title: string;        // Main title for the about page
  contentHtml?: string; // Main HTML content for the page
  image?: string;       // Optional main image URL (e.g., profile picture)
  name?: string;        // Optional main name (e.g., profile name)
  items?: AboutItem[];  // Optional array of about items/sections
}

// Function to return the about data
// TODO: Update this function to fetch/generate data matching the AboutData interface
// The current static data or markdown processing needs adjustment.
export const getAboutData = (): AboutData | null => {
  // Returning null as a placeholder - requires actual data fetching/generation
  console.warn("getAboutData in src/lib/about.ts needs implementation matching the updated AboutData interface.");
  return null;
};
