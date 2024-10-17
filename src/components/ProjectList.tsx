interface Project {
  title: string;
  description: string;
  status: 'In Progress' | 'Completed' | 'On Hold';
}

interface ProjectListProps {
  projects: Project[];
  onEdit: (index: number) => void; // Add edit handler
  onDelete: (index: number) => void; // Add delete handler
}

const ProjectList = ({ projects, onEdit, onDelete }: ProjectListProps) => {
  return (
    <ul className="space-y-4">
      {projects.map((project, index) => (
        <li key={index} className="p-4 border border-gray-200 rounded hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-lg font-bold">{project.title}</h3>
          <p>{project.description}</p>
          <span
            className={`inline-block px-2 py-1 mt-2 text-white rounded ${
              project.status === 'In Progress' ? 'bg-yellow-500' :
              project.status === 'Completed' ? 'bg-green-500' :
              'bg-red-500'
            }`}
          >
            {project.status}
          </span>

          {/* Edit and Delete Buttons */}
          <div className="mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 mr-2 rounded"
              onClick={() => onEdit(index)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
              onClick={() => onDelete(index)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProjectList;