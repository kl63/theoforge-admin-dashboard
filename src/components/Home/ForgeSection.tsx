'use client';

import React from 'react';
import NextLink from 'next/link';
import { forgeProjects, ForgeProject } from '@/data/forgeProjects';
import JdenticonIcon from '../Common/JdenticonIcon';
import SectionContainer from '../Layout/SectionContainer';
import SectionHeading from '../Common/SectionHeading';
import BaseCard from '../Common/BaseCard';
import Button from '../Common/Button';

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 mr-1.5">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);

const ForgeSection: React.FC = () => {
  const nonFeatured = forgeProjects.filter(p => !p.featured);
  const displayProjects = nonFeatured.length >= 3 ? nonFeatured.slice(0, 3) : forgeProjects.slice(0, 3);

  return (
    <SectionContainer className="bg-white dark:bg-gray-900">
      <SectionHeading className="md:text-5xl mb-2">
        From the Forge
      </SectionHeading>
      <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12 max-w-3xl mx-auto">
        Explore recent experiments, tools, and creations forged by the network.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {displayProjects.map((project: ForgeProject) => (
          <BaseCard key={project.id} className="p-6">
            <div className="mb-3">
              <div className="leading-none mb-2">
                <JdenticonIcon value={project.title} size={40} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {project.title}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow">
              {project.description}
            </p>
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2 py-0.5 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-auto flex flex-wrap gap-2 items-center">
              <Button 
                href={project.githubUrl} 
                variant="secondary" 
                size="sm" 
                leftIcon={<GitHubIcon />} 
                target="_blank" 
                rel="noopener noreferrer"
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-indigo-500"
              >
                GitHub
              </Button>
              {project.liveUrl && (
                <Button 
                  href={project.liveUrl} 
                  variant="link" 
                  size="sm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Live Demo
                </Button>
              )}
              {project.tryUrl && (
                <NextLink href={project.tryUrl} legacyBehavior passHref>
                  <Button 
                    variant="primary" 
                    size="sm"
                  >
                    Try It Out
                  </Button>
                </NextLink>
              )}
            </div>
          </BaseCard>
        ))}
      </div>

      {forgeProjects.length > 3 && (
        <div className="text-center mt-12">
          <NextLink href="/forge" legacyBehavior passHref>
            <Button variant="outline" size="lg" rightIcon={<ArrowRightIcon />}>
              Explore the Forge
            </Button>
          </NextLink>
        </div>
      )}
    </SectionContainer>
  );
};

export default ForgeSection;
