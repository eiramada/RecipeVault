import { Box, Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import AddEditRecipe from "./components/Recipes/AddEditRecipe";
import RecipeDetail from "./components/Recipes/RecipeDetail";
import { RecipeProvider } from "./contexts/RecipeContext";
import HomePage from "./pages/HomePage";
import MenuPlan from "./pages/MenuPlanPage";
import NotFound from "./pages/NotFoundPage";
import RecipesPage from "./pages/RecipesPage";
import ShoppingListPage from "./pages/ShoppingListPage";

function App() {
  return (
    <RecipeProvider>
      <div>
        <Header />
        <Container>
          <Box
            sx={{ display: "flex", flexDirection: "column", flexGrow: 1, p: 3 }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/recipes" element={<RecipesPage />} />
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
        </Container>
        <br /> <br /> <br />
        <Footer />
      </div>
    </RecipeProvider>
  );
}

export default App;
