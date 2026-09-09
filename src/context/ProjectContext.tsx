import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Project, CreateProjectPayload, ScriptTone } from '../types';
import { INITIAL_PROJECTS, generateMockProjectFromUrl } from '../data/defaultScenarios';

const STORAGE_KEY = 'explainer_ai_projects_v1';

interface ProjectContextType {
  projects: Project[];
  activeFilter: 'all' | 'completed' | 'processing';
  setActiveFilter: (filter: 'all' | 'completed' | 'processing') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredProjects: Project[];
  getProjectById: (id: string) => Project | undefined;
  createProject: (payload: CreateProjectPayload) => Promise<Project>;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => Project;
  updateScriptTone: (projectId: string, tone: ScriptTone) => void;
  toggleScriptApproval: (projectId: string) => void;
  resetToDefaults: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load projects from localStorage:', e);
    }
    return INITIAL_PROJECTS;
  });

  const [activeFilter, setActiveFilter] = useState<'all' | 'completed' | 'processing'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to persist projects:', e);
    }
  }, [projects]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesFilter =
        activeFilter === 'all' ||
        (activeFilter === 'completed' && project.status === 'Completed') ||
        (activeFilter === 'processing' && project.status === 'Processing');

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        project.name.toLowerCase().includes(query) ||
        project.domain.toLowerCase().includes(query) ||
        project.summary.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [projects, activeFilter, searchQuery]);

  const getProjectById = (id: string) => {
    return projects.find((p) => p.id === id);
  };

  const createProject = async (payload: CreateProjectPayload): Promise<Project> => {
    const newProj = generateMockProjectFromUrl(payload);
    setProjects((prev) => [newProj, ...prev]);
    showToast(`Explainer video generated for ${newProj.name}!`);
    return newProj;
  };

  const deleteProject = (id: string) => {
    const target = projects.find((p) => p.id === id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    showToast(`Project "${target?.name || id}" was deleted.`);
  };

  const duplicateProject = (id: string): Project => {
    const original = projects.find((p) => p.id === id);
    if (!original) throw new Error('Project not found');

    const copy: Project = {
      ...original,
      id: `proj-${original.domain.replace(/[^a-z0-9]/gi, '-')}-copy-${Date.now().toString(36)}`,
      name: `${original.name} (Copy)`,
      createdAt: new Date().toISOString(),
    };

    setProjects((prev) => [copy, ...prev]);
    showToast(`Duplicated "${original.name}" successfully!`);
    return copy;
  };

  const updateScriptTone = (projectId: string, tone: ScriptTone) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          script: {
            ...p.script,
            tone,
          },
        };
      })
    );
    showToast(`Script regenerated with ${tone} tone.`);
  };

  const toggleScriptApproval = (projectId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        const newStatus = !p.script.approved;
        return {
          ...p,
          script: {
            ...p.script,
            approved: newStatus,
          },
        };
      })
    );
  };

  const resetToDefaults = () => {
    setProjects(INITIAL_PROJECTS);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Reset sample projects to default state.');
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        activeFilter,
        setActiveFilter,
        searchQuery,
        setSearchQuery,
        filteredProjects,
        getProjectById,
        createProject,
        deleteProject,
        duplicateProject,
        updateScriptTone,
        toggleScriptApproval,
        resetToDefaults,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const ctx = useContext(ProjectContext);
  if (!ctx) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return ctx;
};
