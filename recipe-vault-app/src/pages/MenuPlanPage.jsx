import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import React, { useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import ExportMenuPlan from "../components/MenuPlan/ExportMenuPlan";
import MenuPlanTable from "../components/MenuPlan/MenuPlanTable";
import RecipeSelectModal from "../components/MenuPlan/RecipeSelectModal";
import { MarkedRecipeContext } from "../contexts/MarkedRecipesContext";
import { MenuPlanContext } from "../contexts/MenuPlanContext";
import { RecipeContext } from "../contexts/RecipeContext";
import useDocumentTitle from "../hooks/useDocumentTitle";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const mealTimes = ["Breakfast", "Lunch", "Dinner", "Snack1", "Snack2"];

const MenuPlanPage = () => {
  const { recipes = [] } = useContext(RecipeContext);
  const { markedRecipeIds } = useContext(MarkedRecipeContext);
  const {
    menuPlans = [],
    setMenuPlans,
    loading,
    error,
    saveMenuPlans,
  } = useContext(MenuPlanContext);
  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("");
  useDocumentTitle("menuPlanTitle");

  const markedRecipes = useMemo(
    () =>
      markedRecipeIds
        .map((id) => recipes.find((recipe) => recipe.id === id))
        .filter((recipe) => recipe),
    [markedRecipeIds, recipes]
  );
  const unmarkedRecipes = useMemo(
    () => recipes.filter((recipe) => !markedRecipeIds.includes(recipe.id)),
    [markedRecipeIds, recipes]
  );

  const handleOpenModal = (day, meal) => {
    setSelectedDay(day);
    setSelectedMeal(meal);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRecipe("");
  };

  const handleSave = () => {
    if (selectedRecipe && selectedDay && selectedMeal) {
      const newMenuPlan = [
        ...menuPlans,
        {
          recipeId: selectedRecipe,
          day: selectedDay,
          meal: selectedMeal,
        },
      ];
      setMenuPlans(newMenuPlan);
      saveMenuPlans(newMenuPlan);
      handleCloseModal();
    }
  };

  const handleRemoveFromMenuPlan = (recipeId, day, meal) => {
    const updatedMenuPlan = menuPlans.filter(
      (item) =>
        !(item.day === day && item.meal === meal && item.recipeId === recipeId)
    );
    setMenuPlans(updatedMenuPlan);
    saveMenuPlans(updatedMenuPlan);
  };

  if (loading) {
    return (
      <Container>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ height: "80vh" }}
        >
          <CircularProgress />
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {t("weeklyMenuPlan")}
      </Typography>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "20px",
          }}
        >
          <ExportMenuPlan
            menuPlan={menuPlans}
            recipes={recipes}
            daysOfWeek={daysOfWeek}
            mealTimes={mealTimes}
          />
        </Grid>
        {t("mealplanDescription")}
        <Grid item xs={12}>
          <MenuPlanTable
            menuPlan={menuPlans}
            recipes={recipes}
            handleOpenModal={handleOpenModal}
            handleRemoveFromMenuPlan={handleRemoveFromMenuPlan}
          />
        </Grid>
      </Grid>

      <RecipeSelectModal
        open={modalOpen}
        handleClose={handleCloseModal}
        recipes={unmarkedRecipes}
        markedRecipes={markedRecipes}
        selectedRecipe={selectedRecipe}
        setSelectedRecipe={setSelectedRecipe}
        handleSave={handleSave}
      />
    </Container>
  );
};

export default MenuPlanPage;
