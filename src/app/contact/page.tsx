'use client';

import React, { useState } from 'react';
import PageContainer from '@/components/Layout/PageContainer';

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
        className="py-8 md:py-16 bg-white dark:bg-gray-900"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              id="name"
              placeholder="Full Name"
              name="name"
              autoComplete="name"
            />
            <input
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              id="email"
              placeholder="Email Address"
              name="email"
              type="email"
              autoComplete="email"
            />
            <textarea
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              id="message"
              placeholder="Your Message"
              name="message"
              rows={6}
            />
            <button
              type="submit"
              className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>

          {/* Submission Feedback */}
          {submitStatus === 'success' && (
            <div className="mt-6 p-4 rounded-md bg-green-50 text-green-700">
              {submitMessage}
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mt-6 p-4 rounded-md bg-red-50 text-red-700">
              {submitMessage}
            </div>
          )}
        </form>

        {/* Divider */}
        <hr className="my-12 md:my-16 border-gray-200 dark:border-gray-700" />

        {/* Contact Info Section */}
        <div className="text-center"> 
          <h2 className="text-2xl font-semibold mb-6">
            Contact Information
          </h2>
          <div className="flex flex-col space-y-3 items-center">
            <a
              href="mailto:info@yourcompany.com" 
              className="flex items-center text-gray-700 hover:text-indigo-600"
            >
              <span className="ml-2">info@yourcompany.com</span> 
            </a>
            <a
              href="tel:+1234567890" 
              className="flex items-center text-gray-700 hover:text-indigo-600"
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
