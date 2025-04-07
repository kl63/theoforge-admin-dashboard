'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { PostData } from '@/lib/posts';

interface LinkedInPreviewProps {
  post: PostData;
  baseUrl: string;
}

export default function LinkedInPreview({ post, baseUrl }: LinkedInPreviewProps) {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
      },
      () => {
        setSnackbarMessage('Failed to copy');
        setSnackbarOpen(true);
      }
    );
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Generate LinkedIn post templates
  const generateStandardPost = () => {
    const hashtags = post.tags 
      ? post.tags.map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ') 
      : '';
    
    const isPodcast = post.isPodcast ? `🎙️ NEW PODCAST EPISODE${post.podcastEpisodeNumber ? ` #${post.podcastEpisodeNumber}` : ''}` : '📝 NEW ARTICLE';
    
    return `${isPodcast}: ${post.title}\n\n${post.excerpt}\n\n${hashtags}\n\nRead the full ${post.isPodcast ? 'episode transcript' : 'article'}: ${baseUrl}/blog/${post.slug}`;
  };

  const generateExecutivePost = () => {
    const hashtags = post.tags 
      ? post.tags.map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ') 
      : '';
    
    return `🔍 EXECUTIVE INSIGHT: ${post.title}\n\nAs enterprise leaders navigate the rapidly evolving AI landscape, understanding ${post.tags?.[0] || 'strategic approaches'} becomes increasingly critical.\n\nIn our latest ${post.isPodcast ? 'podcast episode' : 'article'}, we explore:\n\n• Key insights on ${post.tags?.[0] || 'AI strategy'}\n• Practical implementation approaches\n• How to measure success and avoid common pitfalls\n\n${hashtags}\n\nRead more: ${baseUrl}/blog/${post.slug}`;
  };

  const generateThoughtLeadershipPost = () => {
    const hashtags = post.tags 
      ? post.tags.map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ') 
      : '';
    
    return `🧠 THOUGHT LEADERSHIP: ${post.title}\n\nI'm excited to share our latest perspective on ${post.tags?.[0] || 'enterprise AI strategy'}.\n\n"${post.excerpt.split('.')[0]}." ${post.excerpt.split('.').slice(1, 2).join('.')}.\n\nThis ${post.isPodcast ? 'podcast episode' : 'article'} is particularly relevant for:\n• CTOs and technology leaders\n• Enterprise architects\n• Digital transformation teams\n\n${hashtags}\n\nFull ${post.isPodcast ? 'episode' : 'article'}: ${baseUrl}/blog/${post.slug}`;
  };

  const standardPost = generateStandardPost();
  const executivePost = generateExecutivePost();
  const thoughtLeadershipPost = generateThoughtLeadershipPost();

  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${baseUrl}/blog/${post.slug}`)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.excerpt)}`;

  return (
    <>
      <Button
        variant="contained"
        startIcon={<LinkedInIcon />}
        onClick={handleOpen}
        sx={{ borderRadius: 8 }}
      >
        LinkedIn Toolkit
      </Button>

      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          LinkedIn Publishing Toolkit
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle1" gutterBottom>
            Promote your content to maximize engagement and establish thought leadership
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Typography variant="body2">
              Share this {post.isPodcast ? 'podcast episode' : 'article'} directly to LinkedIn:
            </Typography>
            <Button
              variant="outlined"
              startIcon={<LinkedInIcon />}
              endIcon={<OpenInNewIcon />}
              href={linkedInShareUrl}
              target="_blank"
              size="small"
            >
              Share on LinkedIn
            </Button>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Typography variant="h6" gutterBottom>
            LinkedIn Post Templates
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Choose a template that matches your audience and objectives. Copy and customize as needed.
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle2">Standard Announcement</Typography>
              <Button
                startIcon={<ContentCopyIcon />}
                size="small"
                onClick={() => copyToClipboard(standardPost, 'Standard post copied to clipboard!')}
              >
                Copy
              </Button>
            </Box>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                bgcolor: 'background.default',
                borderRadius: 2,
                mb: 3,
                whiteSpace: 'pre-wrap',
                fontFamily: 'inherit',
              }}
            >
              {standardPost}
            </Paper>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle2">Executive Audience Focus</Typography>
              <Button
                startIcon={<ContentCopyIcon />}
                size="small"
                onClick={() => copyToClipboard(executivePost, 'Executive post copied to clipboard!')}
              >
                Copy
              </Button>
            </Box>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                bgcolor: 'background.default',
                borderRadius: 2,
                mb: 3,
                whiteSpace: 'pre-wrap',
                fontFamily: 'inherit',
              }}
            >
              {executivePost}
            </Paper>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle2">Thought Leadership Position</Typography>
              <Button
                startIcon={<ContentCopyIcon />}
                size="small"
                onClick={() => copyToClipboard(thoughtLeadershipPost, 'Thought leadership post copied to clipboard!')}
              >
                Copy
              </Button>
            </Box>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                bgcolor: 'background.default',
                borderRadius: 2,
                mb: 3,
                whiteSpace: 'pre-wrap',
                fontFamily: 'inherit',
              }}
            >
              {thoughtLeadershipPost}
            </Paper>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Typography variant="h6" gutterBottom>
            LinkedIn Publishing Best Practices
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Optimal Posting Times
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip label="Tuesday 10-11am" size="small" />
              <Chip label="Wednesday 2-3pm" size="small" />
              <Chip label="Thursday 9-10am" size="small" />
              <Chip label="Tuesday-Thursday" size="small" variant="outlined" />
            </Box>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Engagement Tips
            </Typography>
            <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
              <li>End with a question to prompt comments</li>
              <li>Respond to all comments within 2 hours</li>
              <li>Tag relevant connections (maximum 5)</li>
              <li>Include a call-to-action</li>
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
