import { Item } from "../../models/Item.model";

function formatDescription(description: string): string {
  return description.substring(0, 60) + "...";
}

interface ItemCardProps {
  item: Item;
  onEdit: (item: Item) => void;
}

function ItemCard(props: ItemCardProps) {
  const { item, onEdit } = props;

  const handleEditClicked = (itemBeingEdited: Item) => {
    onEdit(itemBeingEdited);
  };

  return (
    <div className="card">
      <section className="section dark">
        <h5 className="strong">
          <strong>{item.name}</strong>
        </h5>
        <p>{formatDescription(item.description)}</p>
        <button className="bordered" onClick={() => handleEditClicked(item)}>
          <span className="icon-edit "></span>
          Edit
        </button>
      </section>
    </div>
  );
}

export default ItemCard;
