import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    Grid,
    IconButton,
    List,
    ListItem,
    TextField
} from "@mui/material";
import React, { useState } from "react";

const Ingredients = ({ ingredients, onIngredientsChange }) => {
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    quantity: "",
    unit: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    if ((name === "quantity" || name === "unit") && value && isNaN(value)) {
      error = "Must be a number";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    return error;
  };

  const handleChange = (e, isNew, index) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (isNew) {
      setNewIngredient((prev) => ({ ...prev, [name]: value }));
    } else {
      const updatedIngredients = ingredients.map((ingredient, i) =>
        i === index ? { ...ingredient, [name]: value } : ingredient
      );
      onIngredientsChange(updatedIngredients);
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleAdd = () => {
    const quantityError = validateField("quantity", newIngredient.quantity);
    const unitError = validateField("unit", newIngredient.unit);
    if (!quantityError && !unitError && newIngredient.name.trim()) {
      onIngredientsChange([...ingredients, newIngredient]);
      setNewIngredient({ name: "", quantity: "", unit: "", notes: "" });
    }
  };

  const handleRemove = (index) => {
    onIngredientsChange(ingredients.filter((_, i) => i !== index));
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3}>
          <TextField
            label="Name"
            name="name"
            value={newIngredient.name}
            onChange={(e) => handleChange(e, true)}
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Quantity"
            name="quantity"
            value={newIngredient.quantity}
            onChange={(e) => handleChange(e, true)}
            fullWidth
            error={!!errors.quantity}
            helperText={errors.quantity}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Unit"
            name="unit"
            value={newIngredient.unit}
            onChange={(e) => handleChange(e, true)}
            fullWidth
            error={!!errors.unit}
            helperText={errors.unit}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Notes"
            name="notes"
            value={newIngredient.notes}
            onChange={(e) => handleChange(e, true)}
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton variant="contained" color="primary" onClick={handleAdd}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>

      <List>
        {ingredients && ingredients.map((ingredient, index) => (
          <ListItem key={index}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <TextField
                  label="Name"
                  name="name"
                  value={ingredient.name}
                  onChange={(e) => handleChange(e, false, index)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Quantity"
                  name="quantity"
                  value={ingredient.quantity}
                  onChange={(e) => handleChange(e, false, index)}
                  fullWidth
                  error={!!errors.quantity}
                  helperText={errors.quantity}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Unit"
                  name="unit"
                  value={ingredient.unit}
                  onChange={(e) => handleChange(e, false, index)}
                  fullWidth
                  error={!!errors.unit}
                  helperText={errors.unit}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Notes"
                  name="notes"
                  value={ingredient.notes}
                  onChange={(e) => handleChange(e, false, index)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={() => handleRemove(index)} edge="end">
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Ingredients;
