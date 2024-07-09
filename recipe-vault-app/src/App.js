import { Box, Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import { RecipeProvider } from "./contexts/RecipeContext";
import HomePage from "./pages/HomePage";
import MenuPlan from "./pages/MenuPlanPage";
import NotFound from "./pages/NotFoundPage";
import RecipeEditorPage from "./pages/RecipeEditorPage";
import RecipePage from "./pages/RecipePage";
import RecipesPage from "./pages/RecipesPage";
import ShoppingListPage from "./pages/ShoppingListPage";
import styles from "./css/RecipeEditor.module.css";


function App() {
  return (
    <RecipeProvider>
      <div>
        <Header />
        <Container className={styles.noPaddingMobile}
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", flexGrow: 1, p: 3 }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/recipes" element={<RecipesPage />} />
              <Route path="/recipe/:id" element={<RecipePage />} />
              <Route path="/recipe/add" element={<RecipeEditorPage />} />
              <Route path="/recipe/edit/:id" element={<RecipeEditorPage />} />
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
