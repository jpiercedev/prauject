import { useState, useEffect } from 'react';

interface Project {
  title: string;
  description: string;
  status: 'In Progress' | 'Completed' | 'On Hold';
}

interface ProjectFormProps {
  onAddProject: (project: Project) => void;
  project: Project | null; // Allow for passing in a project to edit
}

const ProjectForm = ({ onAddProject, project }: ProjectFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'In Progress' | 'Completed' | 'On Hold'>('In Progress');

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setStatus(project.status);
    }
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProject({ title, description, status });
    setTitle(''); // Reset form
    setDescription('');
    setStatus('In Progress');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-stone-700 p-4 mb-2 block w-full rounded-lg text-stone-500"
        required
      />
      <textarea placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="bg-stone-700 p-4 mb-2 block w-full rounded-lg text-stone-500"
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as 'In Progress' | 'Completed' | 'On Hold')}
        className="bg-stone-700 p-4 mb-4 block w-full rounded-lg text-stone-500"
      >
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        <option value="On Hold">On Hold</option>
      </select>
      <button className="bg-blue-500 text-white py-2 px-4 rounded">
        {project ? 'Update Project' : 'Add Project'}
      </button>
    </form>
  );
};

export default ProjectForm;
