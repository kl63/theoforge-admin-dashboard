import React from 'react';
import { Metadata } from 'next';
import { createMetadataGenerator } from '@/lib/metadataUtils';
import PageContainer from '@/components/Layout/PageContainer';
import ForgeProjectsList from './ForgeProjectsList';
import { getAllForgeProjects } from '@/lib/forgeUtils';

// Generate metadata dynamically from forge content
export const generateMetadata = createMetadataGenerator('forge');

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
