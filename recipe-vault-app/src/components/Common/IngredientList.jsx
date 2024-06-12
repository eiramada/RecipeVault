import React, { useState } from "react";
import { Grid, IconButton, List, ListItem, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const IngredientList = ({ ingredients, onIngredientsChange }) => {
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    quantity: "",
    unit: "",
    notes: "",
  });

  const handleAddIngredient = () => {
    if (newIngredient.name.trim()) {
      onIngredientsChange([...ingredients, newIngredient]);
      setNewIngredient({ name: "", quantity: "", unit: "", notes: "" });
    }
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const updatedIngredients = ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [name]: value } : ingredient
    );
    onIngredientsChange(updatedIngredients);
  };

  const handleRemoveIngredient = (index) => {
    onIngredientsChange(ingredients.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3}>
          <TextField
            label="Name"
            name="name"
            value={newIngredient.name}
            onChange={(e) =>
              setNewIngredient({ ...newIngredient, name: e.target.value })
            }
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Quantity"
            name="quantity"
            value={newIngredient.quantity}
            onChange={(e) =>
              setNewIngredient({ ...newIngredient, quantity: e.target.value })
            }
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Unit"
            name="unit"
            value={newIngredient.unit}
            onChange={(e) =>
              setNewIngredient({ ...newIngredient, unit: e.target.value })
            }
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Notes"
            name="notes"
            value={newIngredient.notes}
            onChange={(e) =>
              setNewIngredient({ ...newIngredient, notes: e.target.value })
            }
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton
            variant="contained"
            color="primary"
            onClick={handleAddIngredient}
            aria-label="add ingredient"
          >
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
      <List>
        {ingredients.map((ingredient, index) => (
          <ListItem key={index}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <TextField
                  label="Name"
                  name="name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, e)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Quantity"
                  name="quantity"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, e)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  label="Unit"
                  name="unit"
                  value={ingredient.unit}
                  onChange={(e) => handleIngredientChange(index, e)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Notes"
                  name="notes"
                  value={ingredient.notes}
                  onChange={(e) => handleIngredientChange(index, e)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  onClick={() => handleRemoveIngredient(index)}
                  edge="end"
                  aria-label="remove ingredient"
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default IngredientList;
