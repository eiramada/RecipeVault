import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Checkbox,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RecipeContext } from "../contexts/RecipeContext";
import useDocumentTitle from "../hooks/useDocumentTitle";

function ShoppingListPage() {
  const { t } = useTranslation();
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("shoppingList"))
  );
  const { recipes, menuPlan } = useContext(RecipeContext);
  useDocumentTitle("shoppingList");

  useEffect(() => {
    //Doesn't consider if user has made changes into their shopping list
    const generateShoppingList = () => {
      const shoppingList = [];

      menuPlan.forEach(({ recipeId }) => {
        const recipe = recipes.find((r) => Number(r.id) === Number(recipeId));
        if (recipe) {
          recipe.ingredients.forEach(({ name, quantity, unit }) => {
            const existingItem = shoppingList.find(
              (item) => item.name === name && item.unit === unit
            );

            if (existingItem) {
              existingItem.quantity =
                Number(existingItem.quantity) + Number(quantity);
            } else {
              shoppingList.push({ name, quantity, unit });
            }
          });
        }
      });

      shoppingList.sort((a, b) => a.name.localeCompare(b.name));
      setItems(shoppingList);
    };

    generateShoppingList();
  }, [menuPlan, recipes]);

  const handleEdit = (index) => {
    const newItems = [...items];
    newItems[index].isEditing = !newItems[index].isEditing;
    setItems(newItems);
  };

  const handleNameChange = (index, event) => {
    const newItems = [...items];
    newItems[index].name = event.target.value;
    setItems(newItems);
  };

  const handleDelete = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    localStorage.setItem("shoppingList", JSON.stringify(newItems));
  };

  const handleQuantityChange = (index, event) => {
    const newItems = [...items];
    newItems[index].quantity = event.target.value;
    setItems(newItems);
  };

  const handleUnitChange = (index, event) => {
    const newItems = [...items];
    newItems[index].unit = event.target.value;
    setItems(newItems);
  };

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("shoppingList"));
    if (storedItems) {
      setItems(storedItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(items));
  }, [items]);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {t("shoppingList")}
      </Typography>
      <List>
        {items &&
          items.map((item, index) => (
            <ListItem key={index} divider>
              <Checkbox />
              {item.isEditing ? (
                <>
                  <TextField
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, e)}
                    size="small"
                    style={{ marginRight: "8px" }}
                  />
                  <TextField
                    value={item.unit}
                    onChange={(e) => handleUnitChange(index, e)}
                    size="small"
                    style={{ marginRight: "8px" }}
                  />
                  <TextField
                    value={item.name}
                    onChange={(e) => handleNameChange(index, e)}
                    size="small"
                    style={{ marginRight: "8px" }}
                  />
                </>
              ) : (
                <ListItemText
                  primary={`${item.name} - ${item.quantity} ${item.unit}`}
                />
              )}
              <IconButton onClick={() => handleEdit(index)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
      </List>
    </Container>
  );
}

export default ShoppingListPage;
