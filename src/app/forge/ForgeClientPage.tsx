'use client';

import React from 'react';
import { forgeProjects, ForgeProject } from '@/data/forgeProjects';

const ForgeClientPage = () => {
  return (
    <div>
      <h1>TheoForge Projects</h1>
      <p>Explore a selection of projects developed at TheoForge.</p>
      <div>
        {forgeProjects.length > 0 ? (
          forgeProjects.map((project: ForgeProject) => (
            <div key={project.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              {/* Add more project details or a link here */}
            </div>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default ForgeClientPage;
