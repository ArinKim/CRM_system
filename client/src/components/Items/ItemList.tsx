import { useState } from "react";
import { Item } from "../../models/Item.model";
import ItemForm from "../Forms/ItemForm";
import ItemCard from "./ItemCard";

interface ItemListProps {
  items: Item[];
  onSave: (item: Item) => void;
}

function ItemList({ items, onSave }: ItemListProps) {
  const [itemBeingEdited, setItemBeingEdited] = useState({});

  const handleEdit = (item: Item) => {
    setItemBeingEdited(item);
  };

  const cancelEditing = () => {
    setItemBeingEdited({});
  };

  const elements = items.map((item) => (
    <div key={item.id} className="cols-sm">
      {item === itemBeingEdited ? (
        <ItemForm onSave={onSave} onCancel={cancelEditing} />
      ) : (
        <ItemCard item={item} onEdit={handleEdit} />
      )}
    </div>
  ));
  return <div className="row">{elements}</div>;
}

export default ItemList;
