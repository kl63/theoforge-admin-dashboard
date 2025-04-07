import React from 'react';
import { getAboutData } from '@/lib/about';
import AboutClientUI from '@/components/About/AboutClientUI';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const aboutData = await getAboutData('keith');

  if (!aboutData) {
    return {
      title: 'About TheoForge',
      description: 'Learn more about TheoForge and our mission.',
    };
  }

  return {
    title: `About ${aboutData.name} | TheoForge`,
    // description: aboutData.bio_summary || 'Learn more about TheoForge and our mission.', // Temporarily commented out
    description: 'Learn more about TheoForge and our mission.', // Use default description
  };
}

export default async function AboutPage() {
  const aboutData = await getAboutData('keith'); // Added 'keith' argument back

  // Handle the case where data might not be available
  // This check is crucial because getAboutData currently returns null

  return <AboutClientUI aboutData={aboutData} />; // Pass prop as 'aboutData'
}
