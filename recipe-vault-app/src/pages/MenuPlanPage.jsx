import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { RecipeContext } from "../contexts/RecipeContext";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const mealTimes = ["Breakfast", "Lunch", "Dinner", "Snack"];

const MenuPlanPage = () => {
  const { recipes, menuPlan, markedRecipeIds, addToMenuPlan, loading, error } =
    useContext(RecipeContext);

  const findMarkedRecipes = () => {
    return markedRecipeIds
      .map((id) => recipes.find((recipe) => recipe.id === id))
      .filter((recipe) => recipe);
  };

  const markedRecipeObjects = findMarkedRecipes();

  const [selectedOptions, setSelectedOptions] = useState(
    markedRecipeObjects.reduce((acc, recipe) => {
      acc[recipe.id] = { day: "", meal: "" };
      return acc;
    }, {})
  );

  const handleSelectChange = (recipeId, type, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [recipeId]: {
        ...prev[recipeId],
        [type]: value,
      },
    }));
  };

  const handleAddToMenuPlan = (recipeId) => {
    const { day, meal } = selectedOptions[recipeId];
    if (day && meal) {
      const recipe = markedRecipeObjects.find(
        (recipe) => recipe.id === recipeId
      );
      addToMenuPlan(recipe.id, day, meal);
      setSelectedOptions((prev) => ({
        ...prev,
        [recipeId]: { day: "", meal: "" },
      }));
    }
  };

  if (loading) {
    return (
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress />
        </div>
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
        Menu Plan
      </Typography>
      <Grid container spacing={2}>
        {/* Left Side: Marked Recipes */}
        <Grid item xs={6}>
          <Typography variant="h6" gutterBottom>
            Match Recipe with Meal Time
          </Typography>
          {markedRecipeObjects.map((recipe) => (
            <div
              key={recipe.id}
              style={{
                display: "flex",
                flexWrap: "nowrap",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Typography variant="subtitle1" style={{ flex: "1" }}>
                {recipe.title}
              </Typography>
              <FormControl fullWidth style={{ flex: "1", marginRight: "10px" }}>
                <InputLabel id={`day-selector-label-${recipe.id}`}>
                  Select Day
                </InputLabel>
                <Select
                  labelId={`day-selector-label-${recipe.id}`}
                  id={`day-selector-${recipe.id}`}
                  value={selectedOptions[recipe.id]?.day || ""}
                  onChange={(e) =>
                    handleSelectChange(recipe.id, "day", e.target.value)
                  }
                >
                  {daysOfWeek.map((day) => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth style={{ flex: "1", marginRight: "10px" }}>
                <InputLabel id={`meal-selector-label-${recipe.id}`}>
                  Select Meal
                </InputLabel>
                <Select
                  labelId={`meal-selector-label-${recipe.id}`}
                  id={`meal-selector-${recipe.id}`}
                  value={selectedOptions[recipe.id]?.meal || ""}
                  onChange={(e) =>
                    handleSelectChange(recipe.id, "meal", e.target.value)
                  }
                >
                  {mealTimes.map((meal) => (
                    <MenuItem key={meal} value={meal}>
                      {meal}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Tooltip
                title={
                  !selectedOptions[recipe.id]?.day ||
                  !selectedOptions[recipe.id]?.meal
                    ? "Please select both day and meal"
                    : ""
                }
              >
                <span>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddToMenuPlan(recipe.id)}
                    disabled={
                      !selectedOptions[recipe.id]?.day ||
                      !selectedOptions[recipe.id]?.meal
                    }
                    style={{ flex: "1", alignSelf: "center" }}
                  >
                    Add
                  </Button>
                </span>
              </Tooltip>
            </div>
          ))}
        </Grid>
        {/* Right Side: Calendar View */}
        <Grid item xs={6}>
          <Typography variant="h6" gutterBottom>
            Weekly Menu Plan
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  {daysOfWeek.map((day) => (
                    <TableCell key={day} align="center">
                      {day}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {mealTimes.map((meal) => (
                  <TableRow key={meal}>
                    <TableCell component="th" scope="row">
                      {meal}
                    </TableCell>
                    {daysOfWeek.map((day) => (
                      <TableCell key={day} align="center">
                        {menuPlan &&
                          menuPlan
                            .filter(
                              (item) => item.day === day && item.meal === meal
                            )
                            .map((item, index) => {
                              const recipe = recipes.find(
                                (r) => r.id === item.recipeId
                              );
                              return (
                                <Typography key={index}>
                                  {recipe ? recipe.title : "Recipe Not Found"}
                                </Typography>
                              );
                            })}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MenuPlanPage;
