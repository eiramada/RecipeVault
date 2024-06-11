import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import AddRecipe from "./components/Recipes/AddRecipe";
import EditRecipe from "./components/Recipes/EditRecipe";
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
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/add/" element={<AddRecipe />} />
            <Route path="/edit/:id" element={<EditRecipe />} />
          </Routes>
          <Footer />
        </Box>
      </Box>
    </div>
  );
}

export default App;
