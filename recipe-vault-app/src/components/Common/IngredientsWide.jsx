import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, IconButton, List, ListItem, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  handleAddIngredient,
  handleFieldChange,
  handleRemoveIngredient,
} from "../../utils/ingerdientUtils";

const Ingredients = ({ ingredients, onIngredientsChange }) => {
  const { t } = useTranslation();

  const [newIngredient, setNewIngredient] = useState({
    name: "",
    quantity: "",
    unit: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  return (
    <>
      <Grid container spacing={2} alignItems="center" sx={{ pt: 1.5 }}>
        <Grid item xs={3.5}>
          <TextField
            label={t("name")}
            name="name"
            value={newIngredient.name}
            onChange={(e) =>
              handleFieldChange(
                e,
                true,
                null,
                newIngredient,
                setNewIngredient,
                ingredients,
                onIngredientsChange,
                setErrors,
                t
              )
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={2.5}>
          <TextField
            label={t("quantity")}
            name="quantity"
            value={newIngredient.quantity}
            onChange={(e) =>
              handleFieldChange(
                e,
                true,
                null,
                newIngredient,
                setNewIngredient,
                ingredients,
                onIngredientsChange,
                setErrors,
                t
              )
            }
            fullWidth
            error={!!errors.quantity}
            helperText={errors.quantity}
          />
        </Grid>
        <Grid item xs={2.5}>
          <TextField
            label={t("unit")}
            name="unit"
            value={newIngredient.unit}
            onChange={(e) =>
              handleFieldChange(
                e,
                true,
                null,
                newIngredient,
                setNewIngredient,
                ingredients,
                onIngredientsChange,
                setErrors,
                t
              )
            }
            fullWidth
            error={!!errors.unit}
            helperText={errors.unit}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label={t("notes")}
            name="notes"
            value={newIngredient.notes}
            onChange={(e) =>
              handleFieldChange(
                e,
                true,
                null,
                newIngredient,
                setNewIngredient,
                ingredients,
                onIngredientsChange,
                setErrors,
                t
              )
            }
            fullWidth
          />
        </Grid>
        <Grid
          item
          xs={0.5}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <IconButton
            variant="contained"
            color="primary"
            onClick={() =>
              handleAddIngredient(
                newIngredient,
                ingredients,
                onIngredientsChange,
                setNewIngredient,
                setErrors,
                t
              )
            }
          >
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>

      <List sx={{ p: 0, m: 0, pt: 2 }}>
        {ingredients &&
          ingredients.map((ingredient, index) => (
            <ListItem key={index} sx={{ p: 0, m: 0, pb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3.5}>
                  <TextField
                    label={t("name")}
                    name="name"
                    value={ingredient.name}
                    onChange={(e) =>
                      handleFieldChange(
                        e,
                        false,
                        index,
                        newIngredient,
                        setNewIngredient,
                        ingredients,
                        onIngredientsChange,
                        setErrors,
                        t
                      )
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2.5}>
                  <TextField
                    label={t("quantity")}
                    name="quantity"
                    value={ingredient.quantity}
                    onChange={(e) =>
                      handleFieldChange(
                        e,
                        false,
                        index,
                        newIngredient,
                        setNewIngredient,
                        ingredients,
                        onIngredientsChange,
                        setErrors,
                        t
                      )
                    }
                    fullWidth
                    error={!!errors.quantity}
                    helperText={errors.quantity}
                  />
                </Grid>
                <Grid item xs={2.5}>
                  <TextField
                    label={t("unit")}
                    name="unit"
                    value={ingredient.unit}
                    onChange={(e) =>
                      handleFieldChange(
                        e,
                        false,
                        index,
                        newIngredient,
                        setNewIngredient,
                        ingredients,
                        onIngredientsChange,
                        setErrors,
                        t
                      )
                    }
                    fullWidth
                    error={!!errors.unit}
                    helperText={errors.unit}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label={t("notes")}
                    name="notes"
                    value={ingredient.notes}
                    onChange={(e) =>
                      handleFieldChange(
                        e,
                        false,
                        index,
                        newIngredient,
                        setNewIngredient,
                        ingredients,
                        onIngredientsChange,
                        setErrors,
                        t
                      )
                    }
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  xs={0.5}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <IconButton
                    onClick={() =>
                      handleRemoveIngredient(
                        index,
                        ingredients,
                        onIngredientsChange
                      )
                    }
                    edge="end"
                  >
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
