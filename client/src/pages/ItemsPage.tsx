import { MOCK_ITEMS } from "../data/Items";
import ProjectList from "../components/Items/ItemList";
import { Item } from "../models/Item.model";

function ProjectPage() {
  const saveProject = (items: Item) => {
    console.log("Saving project: ", items);
  };

  return (
    <div className="home">
      <h1 className="items">Items</h1>
      <ProjectList onSave={saveProject} items={MOCK_ITEMS} />
    </div>
  );
}

export default ProjectPage;
