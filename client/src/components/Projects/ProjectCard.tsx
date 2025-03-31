import { Project } from "../../models/Project.model";

function formatDescription(description: string): string {
  return description.substring(0, 60) + "...";
}

interface ProjectCardProps {
  project: Project;
}

function ProjectCard(props: ProjectCardProps) {
  const { project } = props;
  const handleEditClicked = (projectBeingEdited: Project) => {
    console.log("Edit clicked", projectBeingEdited);
  };
  return (
    <div className="card">
      <section className="section dark">
        <h5 className="strong">
          <strong>{project.name}</strong>
        </h5>
        <p>{formatDescription(project.description)}</p>
        <button className="bordered"
          onClick={() => handleEditClicked(project)}  >
          <span className="icon-edit "></span>
          Edit
        </button>
      </section>
    </div>
  );
}

export default ProjectCard;
