export interface BlogSnippet {
  link: string;
  title: string;
  excerpt: string;
  // Add other properties if needed, e.g., date, author, tags, fullContent
}

export const allBlogSnippets: BlogSnippet[] = [
  {
    link: '/blog/genai-competitive-advantage',
    title: '[Placeholder Title: GenAI Competitive Advantage]', // TODO: Replace with actual title
    excerpt: '[Placeholder Excerpt: Briefly describe the GenAI post here...]' // TODO: Replace with actual excerpt
  },
  {
    link: '/blog/knowledge-graph-architecture',
    title: '[Placeholder Title: Knowledge Graph Architecture]', // TODO: Replace with actual title
    excerpt: '[Placeholder Excerpt: Briefly describe the Knowledge Graph post here...]' // TODO: Replace with actual excerpt
  },
  // Add other blog post snippets here as needed
];
