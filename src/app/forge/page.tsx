import React from 'react';
import { getAllForgeProjects } from '@/lib/forgeUtils';
import PageContainer from '@/components/Layout/PageContainer';
import ForgeProjectsList from './ForgeProjectsList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forge Projects | TheoForge Experiments & Tools',
  description: 'Explore the Forge - a collection of internal projects, experiments, and tools developed at TheoForge demonstrating AI capabilities and innovative solutions.',
};

export default function Page() {
  const pageTitle = "Forge Projects";
  const pageSubtitle = "Explore a selection of internal projects, experiments, and tools developed at TheoForge.";

  // Server-side data loading
  const forgeProjects = getAllForgeProjects();
  
  return (
    <PageContainer title={pageTitle} subtitle={pageSubtitle}>
      <ForgeProjectsList projects={forgeProjects} />
    </PageContainer>
  );
}
