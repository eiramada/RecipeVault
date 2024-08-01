import { Container, List, Typography } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ExportShoppingList from "../components/ShoppingList/ExportShoppingList";
import ShoppingListItem from "../components/ShoppingList/ShoppingListItem";
import { MenuPlanContext } from "../contexts/MenuPlanContext";
import { RecipeContext } from "../contexts/RecipeContext";
import { ShoppingListContext } from "../contexts/ShoppingListContext";
import useDocumentTitle from "../hooks/useDocumentTitle";

const ShoppingListPage = () => {
  const { t } = useTranslation();
  const { items, setItems } = useContext(ShoppingListContext);
  const { recipes } = useContext(RecipeContext);
  const { menuPlans } = useContext(MenuPlanContext);
  const [generatedItems, setGeneratedItems] = useState([]);

  useDocumentTitle("shoppingList");

  const generateShoppingList = useCallback(() => {
    const shoppingList = [];

    menuPlans.forEach(({ recipeId, day, meal }) => {
      const recipe = recipes.find((r) => Number(r.id) === Number(recipeId));
      if (recipe) {
        recipe.ingredients.forEach(({ name, quantity, unit, notes }) => {
          const existingItem = shoppingList.find(
            (item) => item.name === name && item.unit === unit
          );

          if (existingItem) {
            existingItem.quantity =
              Number(existingItem.quantity) + Number(quantity);
            existingItem.recipes.push({ title: recipe.title, day, meal });
          } else {
            shoppingList.push({
              name,
              quantity,
              unit,
              notes,
              recipes: [{ title: recipe.title, day, meal }],
            });
          }
        });
      }
    });

    shoppingList.sort((a, b) => a.name.localeCompare(b.name));
    return shoppingList;
  }, [menuPlans, recipes]);

  useEffect(() => {
    const shoppingList = generateShoppingList();
    setGeneratedItems(shoppingList);
  }, [generateShoppingList]);

  useEffect(() => {
    if (generatedItems.length > 0) {
      setItems(generatedItems);
    }
  }, [generatedItems, setItems]);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {t("shoppingList")}
      </Typography>
      <ExportShoppingList items={items} />
      <List>
        {items.map((item, index) => (
          <ShoppingListItem key={index} item={item} index={index} />
        ))}
      </List>
    </Container>
  );
};

export default ShoppingListPage;
