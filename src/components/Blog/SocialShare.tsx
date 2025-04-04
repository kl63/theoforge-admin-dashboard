'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ShareIcon from '@mui/icons-material/Share';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';

interface SocialShareProps {
  title: string;
  url: string;
  description: string;
  hashtags?: string[];
}

export default function SocialShare({ title, url, description, hashtags = [] }: SocialShareProps) {
  const [shareOpen, setShareOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleShare = () => {
    setShareOpen(true);
  };

  const handleClose = () => {
    setShareOpen(false);
  };

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(
      () => {
        showSnackbar('URL copied to clipboard!');
      },
      () => {
        showSnackbar('Failed to copy URL');
      }
    );
  };

  // Generate LinkedIn sharing URL with pre-populated content
  const formattedHashtags = hashtags.map(tag => tag.replace(/\s+/g, '')).join(',');
  
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`;
  
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}&hashtags=${formattedHashtags}`;
  
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`;
  
  const emailSubject = encodeURIComponent(title);
  const emailBody = encodeURIComponent(`${title}\n\n${description}\n\nRead more: ${url}`);
  const emailShareUrl = `mailto:?subject=${emailSubject}&body=${emailBody}`;

  // Generate LinkedIn post template
  const linkedinPostTemplate = `🔍 NEW INSIGHTS: ${title}\n\n${description}\n\n${hashtags.map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ')}\n\nRead the full article: ${url}`;

  return (
    <>
      <Button 
        onClick={handleShare}
        variant="outlined"
        size="small"
        startIcon={<ShareIcon />}
        sx={{ borderRadius: 8 }}
      >
        Share
      </Button>

      <Dialog open={shareOpen} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Share This Article
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
            Share directly to:
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Tooltip title="Share on LinkedIn">
              <IconButton 
                color="primary" 
                href={linkedinShareUrl} 
                target="_blank"
                aria-label="share on linkedin"
                sx={{ 
                  bgcolor: 'action.hover', 
                  '&:hover': { bgcolor: 'action.selected' } 
                }}
              >
                <LinkedInIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share on Twitter">
              <IconButton 
                color="primary" 
                href={twitterShareUrl} 
                target="_blank"
                aria-label="share on twitter"
                sx={{ 
                  bgcolor: 'action.hover', 
                  '&:hover': { bgcolor: 'action.selected' } 
                }}
              >
                <TwitterIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share on Facebook">
              <IconButton 
                color="primary" 
                href={facebookShareUrl} 
                target="_blank"
                aria-label="share on facebook"
                sx={{ 
                  bgcolor: 'action.hover', 
                  '&:hover': { bgcolor: 'action.selected' } 
                }}
              >
                <FacebookIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share via Email">
              <IconButton 
                color="primary" 
                href={emailShareUrl}
                aria-label="share via email"
                sx={{ 
                  bgcolor: 'action.hover', 
                  '&:hover': { bgcolor: 'action.selected' } 
                }}
              >
                <EmailIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Typography variant="subtitle1" gutterBottom>
            Copy Article Link:
          </Typography>
          <Box sx={{ display: 'flex', mb: 4 }}>
            <TextField
              fullWidth
              value={url}
              variant="outlined"
              size="small"
              InputProps={{
                readOnly: true,
              }}
            />
            <Button
              variant="contained"
              onClick={copyToClipboard}
              startIcon={<ContentCopyIcon />}
              sx={{ ml: 1, whiteSpace: 'nowrap' }}
            >
              Copy
            </Button>
          </Box>

          <Typography variant="subtitle1" gutterBottom>
            LinkedIn Post Template:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            value={linkedinPostTemplate}
            variant="outlined"
            size="small"
            InputProps={{
              readOnly: true,
            }}
          />
          <Button
            variant="text"
            onClick={() => {
              navigator.clipboard.writeText(linkedinPostTemplate);
              showSnackbar('LinkedIn post template copied!');
            }}
            startIcon={<ContentCopyIcon />}
            sx={{ mt: 1 }}
          >
            Copy Template
          </Button>
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
