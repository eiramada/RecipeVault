import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import AddEditRecipe from "./components/Recipes/AddEditRecipe";
import RecipeDetail from "./components/Recipes/RecipeDetail";
import RecipeList from "./components/Recipes/RecipeList";
import { RecipeProvider } from "./contexts/RecipeContext";
import HomePage from "./pages/HomePage";
import MenuPlan from "./pages/MenuPlanPage";
import NotFound from "./pages/NotFoundPage";
import ShoppingListPage from "./pages/ShoppingListPage";

function App() {
  return (
    <RecipeProvider>
      <div>
        <Header />
        <Box
          sx={{ display: "flex", flexDirection: "column", flexGrow: 1, p: 3 }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route
              path="/add/"
              element={<AddEditRecipe isEditMode={false} />}
            />
            <Route
              path="/edit/:id"
              element={<AddEditRecipe isEditMode={true} />}
            />
            <Route path="/shopping-list" element={<ShoppingListPage />} />
            <Route path="/menu-plan" element={<MenuPlan />} />
          </Routes>
        </Box>
        <br /> <br /> <br />
        <Footer />
      </div>
    </RecipeProvider>
  );
}

export default App;
