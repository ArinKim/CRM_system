import { MOCK_ITEMS } from "../data/Items";
import ProjectList from "../components/Items/ItemList";
import { Item } from "../models/Item.model";
import CustomerContractChart from "../components/Chart/CustomerContractChart";
import DailySalesChart from "../components/Chart/DailySalesChart";
import MonthlySalesChart from "../components/Chart/MonthlySalesChart";

function ProjectPage() {
  const saveProject = (items: Item) => {
    console.log("Saving project: ", items);
  };

  return (
    <div className="home">
      <h1 className="items">Items</h1>
      <ProjectList onSave={saveProject} items={MOCK_ITEMS} />
      <div className="chart-container row">
        <DailySalesChart />
        <MonthlySalesChart />
        <CustomerContractChart />
      </div>
    </div>
  );
}

export default ProjectPage;
