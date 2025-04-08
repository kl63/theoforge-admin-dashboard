'use client';

import dynamic from 'next/dynamic';

// Dynamically import the actual page content, disabling SSR
const DynamicForgePage = dynamic(() => import('./ForgeClientPage'), {
  ssr: false,
  // Optional: Add a loading component
  // loading: () => <p>Loading Forge...</p>,
});

// This server component simply renders the dynamically imported client component
export default function Page() {
  return <DynamicForgePage />;
}
