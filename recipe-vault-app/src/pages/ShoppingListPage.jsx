import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { RecipeContext } from "../contexts/RecipeContext";

function ShoppingListPage() {
  const [items, setItems] = useState([]);
  const { recipes, menuPlan } = useContext(RecipeContext);

  useEffect(() => {
    const generateShoppingList = () => {
      const shoppingList = [];

      menuPlan.forEach(({ recipeId }) => {
        const recipe = recipes.find(
          (r) => Number(r.id) === Number(recipeId)
        );
        if (recipe) {
          recipe.ingredients.forEach(({ name, quantity, unit }) => {
            const existingItem = shoppingList.find(
              (item) => item.name === name && item.unit === unit
            );

            if (existingItem) {
              existingItem.quantity += quantity;
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

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping List
      </Typography>
      <List>
        {items.map((item, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${item.name} - ${item.quantity} ${item.unit}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default ShoppingListPage;
