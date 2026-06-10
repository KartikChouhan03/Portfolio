'use client';

import { useState, useEffect } from 'react';
import { projects } from '@/data/projects';
import type { Project } from '@/types';

export function useProjectModal() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Open modal and sync hash state in browser
  const openProject = (project: Project) => {
    setSelectedProject(project);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#project-${project.id}`);
    }
  };

  // Close modal and remove hash state from browser URL
  const closeProject = () => {
    setSelectedProject(null);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#project-')) {
        const id = hash.replace('#project-', '');
        const project = projects.find((p) => p.id === id);
        if (project) {
          setSelectedProject(project);
          return;
        }
      }
      setSelectedProject(null);
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Process initial hash on page load/mount
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return {
    selectedProject,
    openProject,
    closeProject,
  };
}

export default useProjectModal;
