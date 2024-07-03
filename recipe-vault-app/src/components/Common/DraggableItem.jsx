import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Grid, IconButton, ListItem, TextField } from "@mui/material";
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useTranslation } from "react-i18next";

const ItemType = "INSTRUCTION";

const DraggableItem = ({
  item,
  index,
  moveItem,
  handleItemChange,
  handleRemoveItem,
}) => {
  const { t } = useTranslation();
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(draggedItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = draggedItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) {
        return;
      }

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveItem(dragIndex, hoverIndex);
      draggedItem.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <ListItem ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={1}>
          <DragIndicatorIcon />
        </Grid>
        <Grid item xs={9}>
          <TextField
            label={`${t("instruction.stepLabel")} ${index + 1}`}
            name="description"
            value={item.description}
            onChange={(e) => handleItemChange(index, e)}
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={() => handleRemoveItem(index)} edge="end">
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default DraggableItem;
