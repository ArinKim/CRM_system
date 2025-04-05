import { MOCK_ITEMS } from "../../data/Items";
import ProjectList from "../../components/Items/ItemList";
import { Item } from "../../models/Item.model";
import "./ItemPage.css";

function ProjectPage() {
  const saveProject = (items: Item) => {
    console.log("Saving project: ", items);
  };

  return (
    <div className="items-page">
      <h1>Items</h1>
      <ProjectList onSave={saveProject} items={MOCK_ITEMS} />
    </div>
  );
}

export default ProjectPage;
