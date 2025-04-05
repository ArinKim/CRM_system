import { useState } from "react";
import { Item } from "../../models/Item.model";
import ItemForm from "../Forms/ItemForm";
import ItemCard from "./ItemCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

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
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(Array(6)).map((_, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            {elements[index]}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ItemList;
