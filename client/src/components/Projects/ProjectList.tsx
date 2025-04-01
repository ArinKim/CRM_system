import { useState } from "react";
import { Project } from "../../models/Project.model";
import ProjectForm from "../Forms/ProjectForm";
import ProjectCard from "./ProjectCard";

interface ProjectListProps {
  projects: Project[];
  onSave: (project: Project) => void;
}

function ProjectList({ projects, onSave }: ProjectListProps) {
  const [projectBeingEdited, setProjectBeingEdited] = useState({});

  const handleEdit = (project: Project) => {
    setProjectBeingEdited(project);
  };

  const cancelEditing = () => {
    setProjectBeingEdited({});
  };

  const items = projects.map((project) => (
    <div key={project.id} className="cols-sm">
      {project === projectBeingEdited ? (
        <ProjectForm onSave={onSave} onCancel={cancelEditing} />
      ) : (
        <ProjectCard project={project} onEdit={handleEdit} />
      )}
    </div>
  ));
  return <div className="row">{items}</div>;
}

export default ProjectList;
