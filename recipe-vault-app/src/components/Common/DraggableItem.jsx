import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Box, Grid, IconButton, ListItem, TextField, useMediaQuery } from "@mui/material";
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
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

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
    <ListItem
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      sx={{ p: 0, m: 0 }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={isMobile ? 1 : 0.25}>
          <DragIndicatorIcon />
        </Grid>
        <Grid item xs={isMobile ? 11 : 11.25}>
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
        {isMobile ? (
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <IconButton
                onClick={() => handleRemoveItem(index)}
                edge="end"
                sx={{ p: 0, m: 0 }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Grid>
        ) : (
          <Grid item xs={0.5}>
            <IconButton onClick={() => handleRemoveItem(index)} edge="end">
              <DeleteIcon />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </ListItem>
  );
};

export default DraggableItem;
