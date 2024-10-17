import React, { useState, useEffect } from 'react';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import Sidebar from './components/Sidebar';
import Onboarding from './components/Onboarding';

// Project Object
interface Project {
  title: string;
  description: string;
  status: 'In Progress' | 'Completed' | 'On Hold';
}

interface OnboardingProps {
  onSubmit: (name: strin`g) => void; // Correctly typed to expect a string and return void
}

const App = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [name, setName] = useState('');
  
  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  // Check if username exists
  useEffect(() => {
    const name = localStorage.getItem('name');
    if (name) {
      setName(name);
    }
  }, []);

  // Username submission
  const handleNameSubmit = (name: string) => {
    setName(name); 
    // Save to localStorage
    localStorage.setItem('name', name); 
  };

  const saveProjectsToLocalStorage = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const addProject = (newProject: Project) => {
    if (editingIndex !== null) {
      const updatedProjects = [...projects];
      updatedProjects[editingIndex] = newProject;
      saveProjectsToLocalStorage(updatedProjects);
      setEditingIndex(null);
      setCurrentProject(null);
    } else {
      const updatedProjects = [...projects, newProject];
      saveProjectsToLocalStorage(updatedProjects);
    }
  };

  const editProject = (index: number) => {
    setCurrentProject(projects[index]);
    setEditingIndex(index);
  };

  const deleteProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    saveProjectsToLocalStorage(updatedProjects);
  };

  const closeSidebar = () => {
    setCurrentProject(null);
  };

  const saveEditedProject = (updatedProject: Project) => {
    if (editingIndex !== null) {
      const updatedProjects = [...projects];
      updatedProjects[editingIndex] = updatedProject;
      saveProjectsToLocalStorage(updatedProjects);
      closeSidebar();
    }
  };

  return (
    <div className="bg-stone-800 text-gray-100 min-h-screen">
      <div className="max-w-screen-sm mx-auto pt-20">
      {!name ? (
        <Onboarding onSubmit={handleNameSubmit} />
      ) : (
              <div>
              <h1 className="text-4xl font-serif text-white mb-6 mt-10 text-center">Good evening {name}</h1>
                <ProjectForm onAddProject={addProject} project={currentProject} />
                <ProjectList projects={projects} onEdit={editProject} onDelete={deleteProject} />
                
                {currentProject && (
                  <Sidebar
                    project={currentProject}
                    onClose={closeSidebar}
                    onSave={saveEditedProject}
                  />
                )}
              </div>
          )}
            </div>
          </div>
        );
      };

export default App;

