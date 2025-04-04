'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

interface NewsletterSignupProps {
  variant?: 'inline' | 'card';
  title?: string;
  subtitle?: string;
}

export default function NewsletterSignup({ 
  variant = 'card', 
  title = 'Subscribe to Our Newsletter',
  subtitle = 'Get the latest insights on AI strategy and implementation delivered to your inbox.'
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Validate consent
    if (!consent) {
      setError('Please agree to receive communications');
      return;
    }
    
    // In a real implementation, you would send this data to your API
    console.log('Newsletter signup:', { email, name, consent });
    
    // Show success message
    setSuccess(true);
    
    // Reset form
    setEmail('');
    setName('');
    setError(null);
  };

  const handleClose = () => {
    setSuccess(false);
  };

  const content = (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant={variant === 'card' ? 'h5' : 'h6'} component="h3" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {subtitle}
        </Typography>
      </Box>
      
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <TextField
          label="Email Address"
          type="email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error && !email}
          helperText={!email && error ? error : ''}
          size={variant === 'inline' ? 'small' : 'medium'}
        />
        
        <TextField
          label="Name (Optional)"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          size={variant === 'inline' ? 'small' : 'medium'}
        />
        
        <FormControlLabel
          control={
            <Checkbox
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              color="primary"
            />
          }
          label={
            <Typography variant="body2">
              I agree to receive email communications from TheoForge about industry insights, events, and services.
            </Typography>
          }
        />
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<MailOutlineIcon />}
          sx={{ mt: 1, borderRadius: variant === 'card' ? 8 : 1 }}
        >
          Subscribe
        </Button>
      </Box>
      
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Thanks for subscribing! Please check your email to confirm your subscription.
        </Alert>
      </Snackbar>
    </>
  );

  if (variant === 'card') {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        {content}
      </Paper>
    );
  }

  return content;
}
