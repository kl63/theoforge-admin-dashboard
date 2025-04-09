'use client';

import React, { useState } from 'react';
import PageContainer from '@/components/Layout/PageContainer';
import Button from '@/components/Common/Button'; // <-- Import Button

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

  const pageTitle = "Get In Touch";
  const pageSubtitle = "Have questions or want to discuss a project? Fill out the form below or contact us directly.";

  return (
    <main>
      <PageContainer 
        title={pageTitle} 
        subtitle={pageSubtitle} 
      >
        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full max-w-lg mx-auto"
        >
          <div className="flex flex-col space-y-6"> 
            <input
              required
              className="font-poppins w-full px-3 py-2 border border-border-light dark:border-border-dark rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-background-input-light dark:bg-background-input-dark text-text-primary dark:text-dark-text-primary placeholder-text-secondary dark:placeholder-dark-text-secondary transition-colors duration-150 ease-in-out"
              id="name"
              placeholder="Full Name"
              name="name"
              autoComplete="name"
            />
            <input
              required
              className="font-poppins w-full px-3 py-2 border border-border-light dark:border-border-dark rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-background-input-light dark:bg-background-input-dark text-text-primary dark:text-dark-text-primary placeholder-text-secondary dark:placeholder-dark-text-secondary transition-colors duration-150 ease-in-out"
              id="email"
              placeholder="Email Address"
              name="email"
              type="email"
              autoComplete="email"
            />
            <textarea
              required
              className="font-poppins w-full px-3 py-2 border border-border-light dark:border-border-dark rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-background-input-light dark:bg-background-input-dark text-text-primary dark:text-dark-text-primary placeholder-text-secondary dark:placeholder-dark-text-secondary transition-colors duration-150 ease-in-out"
              id="message"
              placeholder="Your Message"
              name="message"
              rows={6}
            />
            {/* Use the Button component, standardize color to primary */}
            <Button
              type="submit"
              variant="primary" 
              size="lg" 
              className="w-full" // Keep full width
              disabled={isSubmitting} 
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>

          {/* Submission Feedback */}
          {submitStatus === 'success' && (
            <div className="font-poppins mt-6 p-4 rounded-md bg-success-light dark:bg-success-dark text-success-dark dark:text-success-light">
              {submitMessage}
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="font-poppins mt-6 p-4 rounded-md bg-error-light dark:bg-error-dark text-error-dark dark:text-error-light">
              {submitMessage}
            </div>
          )}
        </form>

        {/* Divider */}
        <hr className="my-12 md:my-16 border-border-light dark:border-border-dark" />

        {/* Contact Info Section */}
        <div className="text-center"> 
          <h2 className="font-poppins text-2xl font-semibold mb-6 text-text-primary dark:text-dark-text-primary">
            Contact Information
          </h2>
          <div className="flex flex-col space-y-3 items-center">
            <a
              href="mailto:info@yourcompany.com" 
              className="font-poppins flex items-center text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary transition-colors duration-150 ease-in-out"
            >
              <span className="ml-2">info@yourcompany.com</span> 
            </a>
            <a
              href="tel:+1234567890" 
              className="font-poppins flex items-center text-text-secondary dark:text-dark-text-secondary hover:text-primary dark:hover:text-dark-primary transition-colors duration-150 ease-in-out"
            >
              <span className="ml-2">(123) 456-7890</span> 
            </a>
            {/* Add Address etc. if needed using similar structure */}
          </div>
        </div>
      </PageContainer>
    </main>
  );
 };

export default ContactPage;
