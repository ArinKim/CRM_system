import { MOCK_PROJECTS } from "../data/Projects";
import ProjectList from "../components/Projects/ProjectList";
import { Project } from "../models/Project.model";

function ProjectPage() {
  const saveProject = (project: Project) => {
    console.log("Saving project: ", project);
  };

  return (
    <div className="home">
      <h1 className="title">Welcome to the Home Page</h1>
      <p className="description">This is a simple home page.</p>
      <h1 className="projects">Projects</h1>
      <ProjectList onSave={saveProject} projects={MOCK_PROJECTS} />
    </div>
  );
}

export default ProjectPage;
