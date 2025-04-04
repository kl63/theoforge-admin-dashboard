'use client';

import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress'; 
import SendIcon from '@mui/icons-material/Send';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import Stack from '@mui/material/Stack'; 

// Rebuilt Contact Page Component
const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(
    null
  );
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };

    // Basic Frontend Validation
    if (!data.name || !data.email || !data.message) {
      setSubmitStatus('error');
      setSubmitMessage('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(
          result.message || 'Thank you for your message! We will be in touch soon.'
        );
        // Optionally reset form: (event.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus('error');
        setSubmitMessage(
          result.message || 'An error occurred. Please try again later.'
        );
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage(
        'A network error occurred. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
      {/* Page Title */}
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        align="center" 
        sx={{ fontWeight: 600, mb: 2 }}
      >
        Get In Touch
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
        Have questions or want to discuss a project? Fill out the form below or contact us directly.
      </Typography>

      {/* Form Section */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          width: '100%', 
          maxWidth: '600px', 
          mx: 'auto', 
        }}
      >
        {/* Stacked Fields Container */}
        <Stack spacing={3}> 
          <TextField
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            variant="outlined"
          />
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            variant="outlined"
          />
          <TextField
            required
            fullWidth
            id="message"
            label="Your Message"
            name="message"
            multiline
            rows={6}
            variant="outlined"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={isSubmitting}
            endIcon={isSubmitting ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
            sx={{ py: 1.5 }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </Stack>

        {/* Submission Feedback */}
        {submitStatus === 'success' && (
          <Alert severity="success" sx={{ mt: 3 }}>
            {submitMessage}
          </Alert>
        )}
        {submitStatus === 'error' && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {submitMessage}
          </Alert>
        )}
      </Box>

      {/* Divider */}
      <Divider sx={{ my: { xs: 6, md: 8 } }} />

      {/* Contact Info Section */}
      <Box sx={{ textAlign: 'center' }}> 
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 3 }}>
          Contact Information
        </Typography>
        <Stack spacing={2} direction="column" alignItems="center">
          <Link
            href="mailto:info@yourcompany.com" 
            variant="body1"
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
            color="inherit"
          >
            <EmailIcon sx={{ mr: 1 }} />
            info@yourcompany.com 
          </Link>
          <Link
            href="tel:+1234567890" 
            variant="body1"
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
            color="inherit"
          >
            <PhoneIcon sx={{ mr: 1 }} />
            (123) 456-7890 
          </Link>
          {/* Add Address etc. if needed using similar Stack/Link structure */}
        </Stack>
      </Box>
    </Container>
  );
};

export default ContactPage;
