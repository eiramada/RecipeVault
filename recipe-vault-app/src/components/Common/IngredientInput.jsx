import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, IconButton, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";

const IngredientInput = ({ ingredient, index, isNew, onAdd, onUpdate, onRemove }) => {
  const [currentIngredient, setCurrentIngredient] = useState(ingredient);

  useEffect(() => {
    if (!isNew) {
      setCurrentIngredient(ingredient);
    }
  }, [ingredient, isNew]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedIngredient = {
      ...currentIngredient,
      [name]: value,
    };
    setCurrentIngredient(updatedIngredient);
    if (!isNew) {
      onUpdate(index, updatedIngredient);
    }
  };

  const handleAdd = () => {
    onAdd(currentIngredient);
    setCurrentIngredient({ name: "", quantity: "", unit: "", notes: "" });
  };

  const handleRemove = () => {
    onRemove(index);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={3}>
        <TextField
          label="Name"
          name="name"
          value={currentIngredient.name}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          label="Quantity"
          name="quantity"
          value={currentIngredient.quantity}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          label="Unit"
          name="unit"
          value={currentIngredient.unit}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Notes"
          name="notes"
          value={currentIngredient.notes}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        {isNew ? (
          <IconButton variant="contained" color="primary" onClick={handleAdd}>
            <AddIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleRemove} edge="end">
            <DeleteIcon />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
};

export default IngredientInput;
