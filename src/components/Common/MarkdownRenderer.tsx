'use client';

import React from 'react';
import Box from '@mui/material/Box';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

// Reusable component for rendering Markdown content with consistent styling
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => (
  <Box
    component="article" // Use semantic article tag
    sx={{
      // General typography and spacing
      color: 'text.primary',
      fontSize: '1rem',
      lineHeight: 1.7,
      '& > :first-of-type': { mt: 0 }, // Remove top margin from the very first element
      '& > * + *': { mt: '1.5em' }, // Consistent vertical spacing between elements

      // Headings - adjust sizes as needed
      '& h1, & h2, & h3, & h4, & h5, & h6': {
        mt: '1.8em',
        mb: '0.8em',
        fontWeight: 'bold',
        lineHeight: 1.3,
        color: 'text.primary' // Ensure headings use primary text color
      },
      '& h1': { fontSize: '2.2rem' }, 
      '& h2': { fontSize: '1.8rem' },
      '& h3': { fontSize: '1.5rem' },
      '& h4': { fontSize: '1.2rem' },

      // Paragraphs
      '& p': {
        // Inherits general line height
      },

      // Links
      '& a': {
        color: 'primary.main',
        textDecoration: 'underline',
        '&:hover': {
          textDecorationColor: (theme) => theme.palette.primary.light,
        },
      },

      // Lists (unordered and ordered)
      '& ul, & ol': {
        pl: '2em', // Indentation
        '& li': {
          mb: '0.6em',
        },
      },

      // Blockquotes
      '& blockquote': {
        borderLeft: (theme) => `4px solid ${theme.palette.divider}`,
        pl: 2,
        ml: 0,
        fontStyle: 'italic',
        color: 'text.secondary',
        '& p': { // Adjust paragraph margin within blockquote if needed
          mt: '0.5em', 
          mb: '0.5em',
        }
      },

      // Code blocks and inline code
      '& code': { // Inline code
        fontFamily: 'monospace',
        fontSize: '0.9em',
        backgroundColor: (theme) => theme.palette.action.hover, // Subtle background
        borderRadius: '4px',
        padding: '0.2em 0.4em',
        wordBreak: 'break-word', // Prevent long code strings from overflowing
      },
      '& pre': { // Code blocks container
        backgroundColor: (theme) => theme.palette.grey[100], // Slightly darker background for block
        borderRadius: '4px',
        padding: '1em',
        overflowX: 'auto', // Enable horizontal scroll for long lines
        '& code': { // Code within pre (reset inline styles)
          backgroundColor: 'transparent',
          padding: 0,
          fontSize: '0.875rem', // Monospace font size
          lineHeight: 1.5, 
        },
      },
      
      // Horizontal Rules
      '& hr': {
          border: 0, 
          height: '1px',
          backgroundColor: 'divider',
          my: '2em', // Add vertical margin
      },

      // Images (optional basic styling)
      '& img': {
          maxWidth: '100%',
          height: 'auto',
          display: 'block', // Center image if needed
          my: '1.5em', // Add vertical margin
      },

      // Tables (optional basic styling)
      '& table': {
          width: '100%',
          borderCollapse: 'collapse',
          my: '1.5em',
      },
      '& th, & td': {
          border: (theme) => `1px solid ${theme.palette.divider}`,
          padding: '0.5em 1em',
          textAlign: 'left',
      },
      '& th': {
          backgroundColor: (theme) => theme.palette.grey[50],
          fontWeight: 'bold',
      },
    }}
  >
    <ReactMarkdown>{content}</ReactMarkdown>
  </Box>
);

export default MarkdownRenderer;
