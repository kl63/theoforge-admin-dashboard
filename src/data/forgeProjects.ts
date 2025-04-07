// src/data/forgeProjects.ts

// Define the interface for a Forge Project (formerly PlaygroundProject)
export interface ForgeProject {
  id: string;
  title: string;
  author: string;
  githubUrl: string;
  liveUrl?: string; // Optional URL for a live demo
  tryUrl?: string; // Optional URL for an internal "Try It Out" page within /forge
  tags?: string[]; // Optional tags for categorization/filtering
  featured?: boolean; // Optional flag for featured project
  description: string; // Moved description here
}

// Placeholder data for Forge projects (formerly playgroundProjects)
export const forgeProjects: ForgeProject[] = [
  {
    id: 'philosopher-graph',
    title: 'Philosopher Relationships',
    description: 'Exploring the network of teachings and influences between ancient Greek philosophers using a simulated knowledge graph.',
    author: 'TheoForge AI',
    githubUrl: 'https://github.com/your-repo/philosopher-graph', // Placeholder
    liveUrl: undefined, // No separate live demo for this one yet
    tryUrl: '/forge/philosopher-graph', // Updated internal link
    tags: ['Knowledge Graph', 'Visualization', 'Philosophy', 'Simulation'],
    featured: true, // Let's feature this example
  },
  {
    id: '1',
    title: 'AI Content Summarizer',
    description: 'A simple tool using OpenAI API to summarize long texts or articles. Exploring prompt engineering.',
    author: 'Keith Williams', 
    githubUrl: 'https://github.com/kaw393939/ai-summarizer-poc',
    tags: ['Next.js', 'TypeScript', 'OpenAI', 'API', 'POC'],
    featured: true, 
  },
  {
    id: '2',
    title: 'Interactive Data Visualization',
    description: 'Experimenting with D3.js within a React component to create dynamic charts based on user input.',
    author: 'Consultant A', 
    githubUrl: 'https://github.com/consultantA/d3-react-example',
    tags: ['React', 'D3.js', 'Data Viz', 'Frontend'],
  },
  {
    id: '3',
    title: 'Serverless Function Automation',
    description: 'Automating a data processing task using AWS Lambda and S3 triggers. Focus on cost-efficiency.',
    author: 'Consultant B', 
    githubUrl: 'https://github.com/consultantB/aws-lambda-automation',
    tags: ['AWS', 'Serverless', 'Lambda', 'Python', 'Automation'],
  },
  {
    id: '4',
    title: 'Customizable UI Component Library',
    description: 'Building a small set of reusable UI components with Storybook for documentation and testing.',
    author: 'Consultant C', 
    githubUrl: 'https://github.com/consultantC/react-component-lib',
    tags: ['React', 'Storybook', 'UI/UX', 'Component Library'],
  }
];
