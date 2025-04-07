'use client';

import React from 'react';
import Link from 'next/link';
import { PostData } from '@/types/post';
import { 
  Card, CardActionArea, CardContent, CardMedia, Typography, Chip, Box, Stack
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface BlogCardProps {
  post: PostData;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const theme = useTheme();
  const linkHref = `/blog/${post.slug}`; 
  const cardImageHeight = 200; // Consistent height

  // --- "New" Badge Logic ---
  const isNew = (() => {
    if (!post.date) return false; // Can't determine if no date
    try {
      const postDate = new Date(post.date);
      const today = new Date();
      const timeDiff = today.getTime() - postDate.getTime();
      const daysDiff = timeDiff / (1000 * 3600 * 24); // Difference in days
      return daysDiff <= 7; // Consider posts within the last 7 days as "New"
    } catch (error) {
      console.error("Error parsing date for blog card:", post.date, error);
      return false;
    }
  })();
  // ------------------------

  return (
    // Ensure card takes full height of its container and uses flex column layout
    <Card 
      sx={{ 
        position: 'relative', // Add relative positioning for the absolute chip
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        width: '100%', // Ensure card takes full width of its grid container
        borderRadius: theme.spacing(2), // Use 16px borderRadius from theme
        boxShadow: 'none', // Start with no shadow
        border: `1px solid ${theme.palette.divider}`,
        transition: 'box-shadow 0.2s ease-in-out', // Add transition for shadow
        '&:hover': {
          boxShadow: theme.shadows[4], // Apply shadow to Card on hover
          // Target the CardMedia within the hovered Card
          '& .MuiCardActionArea-root .MuiCardMedia-root': {
            transform: 'scale(1.05)', // Scale the image
          }
        }
      }}
    >
      {/* "New" Badge - Positioned bottom-right */}
      {isNew && (
        <Chip 
          label="New"
          color="secondary" // Use secondary color for highlight
          size="small"
          sx={{ 
            position: 'absolute', 
            bottom: 8, 
            right: 8, 
            zIndex: 1, // Ensure it's above the image
            fontWeight: 'bold',
          }} 
        />
      )}
      <CardActionArea 
        component={Link} 
        href={linkHref}
        sx={{
          textDecoration: 'none', 
          color: 'inherit', 
          display: 'flex', 
          flexDirection: 'column', 
          flexGrow: 1, // Let ActionArea fill the Card
          // Remove hover styles from ActionArea
        }}
      >
        {/* Image container: Ensure it has overflow hidden and defined height */}
        <Box sx={{ 
          overflow: 'hidden', 
          width: '100%', 
          height: cardImageHeight // Use defined height for the container
        }}> 
          {post.image ? (
            <CardMedia
              component="img"
              className="MuiCardMedia-root" // Add class for targeting
              image={post.image || '/images/default-blog-banner.jpg'} // Ensure default
              alt={post.title}
              sx={{
                width: '100%', // Ensure media fills Box width
                height: '100%', // Ensure media fills Box height
                objectFit: 'cover', 
                transition: 'transform 0.3s ease-in-out', // Keep image transition
              }}
            />
          ) : (
            // Placeholder when no image is available
            <Box sx={{
              height: cardImageHeight, // Use defined height
              bgcolor: theme.palette.grey[100], // Subtle background
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Optional: Add an icon or text */}
              <Typography variant="caption" color="text.secondary">
                Image Coming Soon
              </Typography>
            </Box>
          )}
        </Box>
        <CardContent sx={{ flexGrow: 1, width: '100%', p: 2 }}> {/* Consistent padding */}
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {post.excerpt}
          </Typography>

          {/* Tags Section */}
          {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
            <Box sx={{ mt: 'auto', mb: 2 }}> {/* Use 16px margin */} 
              <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                {post.tags.slice(0, 3).map((tag) => ( 
                  <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ borderRadius: 1, fontSize: '0.7rem' }} />
                ))}
              </Stack>
            </Box>
          )}
        </CardContent>
      </CardActionArea>

      {/* Metadata Footer (outside CardActionArea content, inside Card) */}
      <Box sx={{ 
          p: 2, // Consistent padding with CardContent sides
          pt: 0, // No top padding, rely on CardContent bottom padding
          mt: 'auto', // Ensure it's at the bottom
          borderTop: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.mode === 'light' ? 'grey.50' : 'grey.900', // Subtle background
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ flexGrow: 1 }}> 
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })} 
            {post.readingTime ? ` • ${post.readingTime}` : ''} 
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default BlogCard;
