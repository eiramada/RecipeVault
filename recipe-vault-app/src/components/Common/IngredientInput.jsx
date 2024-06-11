import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";

const Ingredient = ({
  ingredient,
  index,
  handleIngredientChange,
  handleRemoveIngredient,
  isNew,
  addIngredient,
}) => {
  const [newIngredient, setNewIngredient] = useState(ingredient);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedIngredient = {
      ...newIngredient,
      [name]: value,
    };
    setNewIngredient(updatedIngredient);
    handleIngredientChange(index, updatedIngredient);
  };

  const handleAddIngredient = () => {
    addIngredient(newIngredient);
    setNewIngredient({ name: "", quantity: "", unit: "", notes: "" });
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={3}>
        <TextField
          label="Name"
          name="name"
          value={newIngredient.name}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          label="Quantity"
          name="quantity"
          value={newIngredient.quantity}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          label="Unit"
          name="unit"
          value={newIngredient.unit}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          label="Notes"
          name="notes"
          value={newIngredient.notes}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={2}>
        {isNew ? (
          <IconButton
            variant="contained"
            color="primary"
            onClick={handleAddIngredient}
          >
            <AddIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => handleRemoveIngredient(index)} edge="end">
            <DeleteIcon />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
};

export { Ingredient };

