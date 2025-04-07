import React from 'react';
import { Box, Typography, TextField, Button, Paper, InputAdornment } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';

const NewsletterFooter: React.FC = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 2,
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h5" component="h3" sx={{ fontWeight: 'medium', mb: 1 }}>
          Stay Ahead with TheoForge Insights
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
          Subscribe for strategic insights on navigating AI complexity, delivered directly to your inbox.
        </Typography>
        
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 1,
            width: '100%',
          }}
        >
          <TextField
            fullWidth
            placeholder="Your email address"
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            endIcon={<SendIcon />}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            Subscribe
          </Button>
        </Box>
        
        <Typography variant="caption" sx={{ display: 'block', mt: 2, color: 'text.secondary' }}>
          We respect your privacy. Unsubscribe at any time.
        </Typography>
      </Box>
    </Paper>
  );
};

export default NewsletterFooter;
