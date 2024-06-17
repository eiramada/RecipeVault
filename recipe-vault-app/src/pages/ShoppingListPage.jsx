import {
    Container,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { RecipeContext } from "../contexts/RecipeContext";

function ShoppingListPage() {
  const [items, setItems] = useState([]);
  const { recipes } = useContext(RecipeContext);

  const menuPlan = useMemo(() => {
    const menuPlanJSON = localStorage.getItem("menuPlan");
    return menuPlanJSON ? JSON.parse(menuPlanJSON) : [];
  }, []);

  useEffect(() => {
    const shoppingList = [];

    menuPlan.forEach((recipeId) => {
      const recipe = recipes.find((r) => Number(r.id) === Number(recipeId));
      if (recipe) {
        recipe.ingredients.forEach((ingredient) => {
          const existingItem = shoppingList.find(
            (item) =>
              item.name === ingredient.name && item.unit === ingredient.unit
          );

          if (existingItem) {
            existingItem.quantity += ingredient.quantity;
          } else {
            shoppingList.push({
              name: ingredient.name,
              quantity: ingredient.quantity,
              unit: ingredient.unit,
            });
          }
        });
      }
    });

    shoppingList.sort((a, b) => a.name.localeCompare(b.name));

    setItems(shoppingList);
  }, [menuPlan, recipes]);

  return (
    <Container maxWidth="md">
      <Typography variant="h2" gutterBottom>
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
