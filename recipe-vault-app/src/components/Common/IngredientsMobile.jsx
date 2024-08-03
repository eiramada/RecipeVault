import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "../../css/RecipeEditor.module.css";
import {
  handleAddIngredient,
  handleFieldChange,
  handleRemoveIngredient,
} from "../../utils/ingerdientUtils";

const IngredientsMobile = ({ ingredients, onIngredientsChange }) => {
  const { t } = useTranslation();

  const [newIngredient, setNewIngredient] = useState({
    name: "",
    quantity: "",
    unit: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const groupedIngredients = ingredients.reduce((acc, ingredient) => {
    if (!acc[ingredient.group]) {
      acc[ingredient.group] = [];
    }
    acc[ingredient.group].push(ingredient);
    return acc;
  }, {});

  return (
    <Box className={styles.ingredientsContainer}>
      <Box className={styles.newIngredient}>
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
          className={styles.fullWidthInput}
        />
        <Box className={styles.inlineFields}>
          <TextField
            label={t("quantity")}
            name="quantity"
            value={newIngredient.quantity}
            onChange={(e) =>
              handleFieldChange(
                e,
                true,
                "new",
                newIngredient,
                setNewIngredient,
                ingredients,
                onIngredientsChange,
                setErrors,
                t
              )
            }
            className={styles.halfWidthInput}
            error={!!errors.new?.quantity}
            helperText={errors.new?.quantity}
          />
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
            className={styles.halfWidthInput}
            error={!!errors.unit}
            helperText={errors.unit}
          />
        </Box>
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
          className={styles.fullWidthInput}
        />
        <Box className={styles.addButton}>
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
        </Box>
      </Box>

      <List sx={{ p: 0, m: 0, pt: 2 }}>
        {Object.keys(groupedIngredients).map((group) => (
          <React.Fragment key={group}>
            <Typography variant="subtitle1" color="textSecondary">
              {group}
            </Typography>
            {groupedIngredients[group].map((ingredient, index) => (
              <ListItem key={index} sx={{ p: 0, m: 0, pb: 2 }}>
                <Box className={styles.ingredientItem}>
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
                    className={styles.fullWidthInput}
                  />
                  <Box className={styles.inlineFields}>
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
                      className={styles.halfWidthInput}
                      error={!!errors[index]?.quantity}
                      helperText={errors[index]?.quantity}
                    />
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
                      className={styles.halfWidthInput}
                      error={!!errors.unit}
                      helperText={errors.unit}
                    />
                  </Box>
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
                    className={styles.fullWidthInput}
                  />
                  <Box className={styles.deleteButton}>
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
                  </Box>
                </Box>
              </ListItem>
            ))}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default IngredientsMobile;
