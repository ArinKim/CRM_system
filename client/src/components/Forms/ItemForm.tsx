import { Item } from "../../models/Item.model";
import { SyntheticEvent } from "react";

interface ItemFormProps {
  onSave: (project: Item) => void;
  onCancel: () => void;
}

function ItemForm({ onSave, onCancel }: ItemFormProps) {
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    onSave(new Item({ name: "Updated Item" }));
  };

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="name">Item Name</label>
      <input type="text" name="name" placeholder="enter name" />
      <label htmlFor="description">Item Description</label>

      <textarea name="description" placeholder="enter description"></textarea>
      <label htmlFor="budget">Item Budget</label>

      <input type="number" name="budget" placeholder="enter budget" />
      <label htmlFor="isActive">Active?</label>
      <input type="checkbox" name="isActive" />

      <div className="input-group">
        <button className="primary bordered medium">Save</button>
        <span></span>
        <button type="button" className="bordered medium" onClick={onCancel}>
          cancel
        </button>
      </div>
    </form>
  );
}

export default ItemForm;
