import React from "react";
import { MarkedRecipeProvider } from "./contexts/MarkedRecipesContext";
import { MenuPlanProvider } from "./contexts/MenuPlanContext";
import { RecipeProvider } from "./contexts/RecipeContext";
import { ShoppingListProvider } from "./contexts/ShoppingListContext";
import { UserProvider } from "./contexts/UserContext";

const AppProviders = ({ children }) => {
  return (
    <UserProvider>
      <RecipeProvider>
        <MenuPlanProvider>
          <MarkedRecipeProvider>
            <ShoppingListProvider>{children}</ShoppingListProvider>
          </MarkedRecipeProvider>
        </MenuPlanProvider>
      </RecipeProvider>
    </UserProvider>
  );
};

export default AppProviders;
