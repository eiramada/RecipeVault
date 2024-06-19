import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import RecipeSelectModal from "../components/Recipes/RecipeSelectModal";
import { RecipeContext } from "../contexts/RecipeContext";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
  const {
    recipes,
    markedRecipeIds,
    menuPlan,
    setMenuPlan,
    loading,
    error,
    removeMenuPlan,
    useExampleData,
  } = useContext(RecipeContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("");

  const markedRecipeObjects = markedRecipeIds
    .map((id) => recipes.find((recipe) => recipe.id === id))
    .filter((recipe) => recipe);

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
        ...menuPlan,
        {
          recipeId: selectedRecipe,
          day: selectedDay,
          meal: selectedMeal,
        },
      ];
      setMenuPlan(newMenuPlan);
      localStorage.setItem("menuPlan", JSON.stringify(newMenuPlan));
      handleCloseModal();
    }
  };

  const handleRemoveFromMenuPlan = (recipeId, day, meal) => {
    const updatedMenuPlan = menuPlan.filter(
      (item) =>
        !(item.day === day && item.meal === meal && item.recipeId === recipeId)
    );
    setMenuPlan(updatedMenuPlan);
    localStorage.setItem("menuPlan", JSON.stringify(updatedMenuPlan));
  };

  const handleExport = (format) => {
    if (format === "pdf") {
      exportAsPDF();
    } else if (format === "csv") {
      exportAsCSV();
    }
  };

  const exportAsPDF = () => {
    const doc = new jsPDF();

    doc.text("Weekly Menu Plan", 20, 10);
    const tableColumn = ["", ...daysOfWeek];
    const tableRows = [];

    mealTimes.forEach((meal) => {
      const row = [meal];
      daysOfWeek.forEach((day) => {
        const recipesForDayMeal = menuPlan
          .filter((item) => item.day === day && item.meal === meal)
          .map((item) => {
            const recipe = recipes.find((r) => r.id === item.recipeId);
            return recipe ? recipe.title : "Recipe Not Found";
          })
          .join(", ");
        row.push(recipesForDayMeal);
      });
      tableRows.push(row);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("menu_plan.pdf");
  };

  const exportAsCSV = () => {
    const rows = [];
    rows.push(["", ...daysOfWeek]);

    mealTimes.forEach((meal) => {
      const row = [meal];
      daysOfWeek.forEach((day) => {
        const recipesForDayMeal = menuPlan
          .filter((item) => item.day === day && item.meal === meal)
          .map((item) => {
            const recipe = recipes.find((r) => r.id === item.recipeId);
            return recipe ? recipe.title : "Recipe Not Found";
          })
          .join(", ");
        row.push(recipesForDayMeal);
      });
      rows.push(row);
    });

    let csvContent = "data:text/csv;charset=utf-8,";
    rows.forEach((rowArray) => {
      const row = rowArray.join(",");
      csvContent += row + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "menu_plan.csv");
    document.body.appendChild(link);
    link.click();
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
        Weekly Menu Plan
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleExport("pdf")}
            style={{ marginRight: "10px" }}
          >
            Export as PDF
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleExport("csv")}
          >
            Export as CSV
          </Button>
          <Button size="small" color="primary" onClick={useExampleData}>
            Use Example Data
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Button
              onClick={removeMenuPlan}
              size="small"
              style={{ padding: 0 }}
            >
              X
            </Button>
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
                      <TableCell
                        key={day}
                        align="center"
                        onClick={() => handleOpenModal(day, meal)}
                        style={{ cursor: "pointer" }}
                      >
                        {menuPlan
                          .filter(
                            (item) => item.day === day && item.meal === meal
                          )
                          .map((item, index) => {
                            const recipe = recipes.find(
                              (r) => r.id === item.recipeId
                            );
                            return (
                              <div
                                key={index}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Typography>
                                  {recipe ? recipe.title : "Recipe Not Found"}
                                </Typography>
                                <Button
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveFromMenuPlan(
                                      item.recipeId,
                                      day,
                                      meal
                                    );
                                  }}
                                >
                                  X
                                </Button>
                              </div>
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

      <RecipeSelectModal
        open={modalOpen}
        handleClose={handleCloseModal}
        recipes={markedRecipeObjects}
        selectedRecipe={selectedRecipe}
        setSelectedRecipe={setSelectedRecipe}
        handleSave={handleSave}
      />
    </Container>
  );
};

export default MenuPlanPage;
