'use client';

import React from 'react';
import { forgeProjects } from '@/data/forgeProjects';
import PageContainer from '@/components/Layout/PageContainer';
import ForgeProjectCard from '@/components/Forge/ForgeProjectCard';

const ForgeClientPage = () => {
  const pageTitle = "Forge Projects";
  const pageSubtitle = "Explore a selection of internal projects, experiments, and tools developed at TheoForge.";

  return (
    <PageContainer title={pageTitle} subtitle={pageSubtitle}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {forgeProjects.length > 0 ? (
          forgeProjects.map((project) => (
            <ForgeProjectCard key={project.id} project={project} />
          ))
        ) : (
          <div className="col-span-full text-center py-12"> 
            <p className="font-poppins text-lg text-text-secondary dark:text-dark-text-secondary">No projects found.</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default ForgeClientPage;
