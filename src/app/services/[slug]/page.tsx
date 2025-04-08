import React from 'react';
import { notFound } from 'next/navigation';
import NextLink from 'next/link'; // Use NextLink for navigation
import { getAllServiceSlugs, getServiceData } from '@/lib/services';
import MarkdownRenderer from '@/components/Common/MarkdownRenderer'; // Import the common component

// Define the expected structure of resolved params
interface ResolvedServiceParams {
  slug: string;
}

// Type for the props received by the page component and generateMetadata
interface ServicePageProps {
  params: Promise<ResolvedServiceParams>;
}

// Function to generate static paths for pre-rendering
export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Function to generate metadata dynamically
export async function generateMetadata({ params }: ServicePageProps) {
  const resolvedParams = await params; // Await the promise
  const slug = resolvedParams.slug;
  const service = await getServiceData(slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.title} | TheoForge`,
    description: service.excerpt,
    // Add other metadata fields if needed
  };
}

// The main page component
export default async function ServicePage({ params }: ServicePageProps) {
  const resolvedParams = await params; // Await the promise
  const slug = resolvedParams.slug;

  // Fetch the full service data
  const service = await getServiceData(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <NextLink href="/" className="block transition hover:text-gray-700 dark:hover:text-gray-300">
                <span className="sr-only"> Home </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              </NextLink>
            </li>
            <li className="rtl:rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
            </li>
            <li>
              <NextLink href="/services" className="block transition hover:text-gray-700 dark:hover:text-gray-300"> Services </NextLink>
            </li>
            <li className="rtl:rotate-180">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
            </li>
            <li>
              <span className="block transition text-gray-800 dark:text-gray-200 font-medium"> {service.title} </span>
            </li>
          </ol>
        </nav>

        {/* Service Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-900 dark:text-white">
          {service.title}
        </h1>

        {/* Render service content using Markdown */}
        <MarkdownRenderer content={service.content} />

        {/* Optional: Add a CTA section if needed */}
      </div>
    </div>
  );
}
