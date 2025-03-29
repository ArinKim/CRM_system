import { MOCK_PROJECTS } from "../data/projects";

function HomePage() {
    return  (
        <div className="home">
            <h1 className="title">Welcome to the Home Page</h1>
            <p className="description">This is a simple home page.</p>
        <h1 className="projects">Projects</h1>
        <pre>{JSON.stringify(MOCK_PROJECTS, null, ' ')}</pre>
        </div>
    )
  }
  
  export default HomePage;