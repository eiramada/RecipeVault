import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import AddEditRecipe from "./components/Recipes/AddEditRecipe";
import RecipeDetail from "./components/Recipes/RecipeDetail";
import RecipeList from "./components/Recipes/RecipeList";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFoundPage";

function App() {
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Header />
          <br />
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
          </Routes>
          <Footer />
        </Box>
      </Box>
    </div>
  );
}

export default App;
