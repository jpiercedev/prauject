import React, { useState, useEffect } from 'react';

interface Project {
  title: string;
  description: string;
  status: 'In Progress' | 'Completed' | 'On Hold';
}

interface SidebarProps {
  project: Project | null;
  onClose: () => void;
  onSave: (updatedProject: Project) => void;
}

const Sidebar = ({ project, onClose, onSave }: SidebarProps) => {
  // State for form fields and sidebar visibility
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'In Progress' | 'Completed' | 'On Hold'>('In Progress');
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // When the project changes, open or close the sidebar
  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setStatus(project.status);
      setShouldRender(true); // Render sidebar
      setTimeout(() => setIsOpen(true), 10); // Open with slight delay for animation
    } else {
      setIsOpen(false);
      setTimeout(() => setShouldRender(false), 300); // close animation duration
    }
  }, [project]);

  // Handle the save process
  const handleSave = () => {
    // Trigger the close animation first
    setIsOpen(false);
    // Wait for the animation to finish before calling onSave and onClose
    setTimeout(() => {
      if (project) {
        onSave({ title, description, status });
      }
      onClose();
    }, 300); // duration of the animation
  };

  // Handle the cancel process (without saving)
  const handleClose = () => {
    setIsOpen(false); // Trigger the close animation
    setTimeout(onClose, 300); // Wait for animation before closing
  };

  // Don't render sidebar if not needed
  if (!shouldRender) return null;

  return (
    <div
      className={`fixed right-0 top-0 h-full w-1/3 bg-white shadow-lg p-4 transform transition-transform ease-in-out duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <h2 className="text-xl font-bold mb-4">Edit Project</h2>

      {/* Title input */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mb-4 block w-full rounded"
        placeholder="Title"
      />

      {/* Description textarea */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 mb-4 block w-full rounded"
        placeholder="Description"
      />

      {/* Status dropdown */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as 'In Progress' | 'Completed' | 'On Hold')}
        className="border p-2 mb-4 block w-full rounded"
      >
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        <option value="On Hold">On Hold</option>
      </select>

      {/* Save and Cancel buttons */}
      <div className="flex justify-end">
        <button onClick={handleClose} className="bg-gray-500 text-white py-2 px-4 rounded mr-2">
          Cancel
        </button>
        <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded">
          Save
        </button>
      </div>
    </div>
  );
};

export default Sidebar;