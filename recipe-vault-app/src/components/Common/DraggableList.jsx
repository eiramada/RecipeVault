import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Grid,
  IconButton,
  List,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTranslation } from "react-i18next";
import DraggableItem from "./DraggableItem";

const DraggableList = ({ items, onItemsChange }) => {
  const { t } = useTranslation();
  const [newItem, setNewItem] = useState({ description: "" });
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleAddItem = () => {
    if (newItem.description.trim()) {
      onItemsChange([
        ...items,
        {
          description: newItem.description,
          step: items.length + 1,
        },
      ]);
      setNewItem({ description: "" });
    }
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    onItemsChange(updatedItems);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    onItemsChange(
      updatedItems.map((item, i) => ({
        ...item,
        step: i + 1,
      }))
    );
  };

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = Array.from(items);
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);

    onItemsChange(
      updatedItems.map((item, i) => ({
        ...item,
        step: i + 1,
      }))
    );
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={isMobile ? 12 : 11.5}>
          <TextField
            label={t("instruction.newTitle")}
            name="description"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({
                ...newItem,
                description: e.target.value,
              })
            }
            fullWidth
            multiline
            rows={2}
            helperText={t("instruction.enterDetailsHere")}
          />
        </Grid>
        <Grid item xs={isMobile ? 12 : 0.5}>
          <Box
            display="flex"
            justifyContent={isMobile ? "center" : "flex-start"}
          >
            <IconButton
              variant="contained"
              color="primary"
              onClick={handleAddItem}
              aria-label={t("Add")}
              sx={{ p: 0, m: 0 }}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <DndProvider backend={HTML5Backend}>
        <List sx={{ p: 0, m: 0 }}>
          {items.map((item, index) => (
            <DraggableItem
              key={item.step}
              item={item}
              index={index}
              moveItem={moveItem}
              handleItemChange={handleItemChange}
              handleRemoveItem={handleRemoveItem}
            />
          ))}
        </List>
      </DndProvider>
    </>
  );
};

export default DraggableList;
