import { Checkbox, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const ShoppingListItem = ({ item }) => {
  const { t } = useTranslation();

  const formatRecipes = (recipes) => {
    const recipeMap = new Map();
    recipes.forEach(({ title, day, meal }) => {
      if (!recipeMap.has(title)) {
        recipeMap.set(title, []);
      }
      recipeMap
        .get(title)
        .push(
          `${t(`tableHeaders.daysOfWeek.${day}`)} ${t(
            `tableHeaders.mealTimes.${meal}`
          )}`
        );
    });

    return Array.from(recipeMap.entries())
      .map(([title, times]) => `${title} (${times.join(", ")})`)
      .join(", ");
  };

  return (
    <ListItem divider>
      <Checkbox />
      <ListItemText
        primary={`${item.name} - ${item.quantity} ${item.unit}`}
        secondary={
          <>
            {item.notes && (
              <>
                {t("notes")}: {item.notes}
                <br />
              </>
            )}
            {t("recipes")}: {formatRecipes(item.recipes)}
          </>
        }
      />
    </ListItem>
  );
};

export default ShoppingListItem;
