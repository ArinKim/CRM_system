import { MOCK_ITEMS } from "../data/Items";
import ProjectList from "../components/Items/ItemList";
import { Item } from "../models/Item.model";

function ProjectPage() {
  const saveProject = (items: Item) => {
    console.log("Saving project: ", items);
  };

  return (
    <div className="home">
      <h1 className="title">Welcome to the Home Page</h1>
      <p className="description">This is a simple home page.</p>
      <h1 className="items">Items</h1>
      <ProjectList onSave={saveProject} items={MOCK_ITEMS} />
    </div>
  );
}

export default ProjectPage;
