import Button from "@mui/material/Button";
import { Item } from "../../models/Item.model";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

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
    <Card
      sx={{
        maxWidth: 450,
        margin: "10px",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2">
          {formatDescription(item.description)}
        </Typography>
        <CardActions>
          <Button size="small" onClick={() => handleEditClicked(item)}>
            Edit
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default ItemCard;
