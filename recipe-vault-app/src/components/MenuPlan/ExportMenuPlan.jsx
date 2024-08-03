import { Button } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import React from "react";
import { useTranslation } from "react-i18next";

const ExportMenuPlan = ({ menuPlan, recipes, daysOfWeek, mealTimes }) => {
  const { t } = useTranslation();

  const handleExport = (format) => {
    if (format === "pdf") {
      exportAsPDF();
    } else if (format === "csv") {
      exportAsCSV();
    }
  };

  const exportAsPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica");

    doc.text(t("weeklyMenuPlan"), 20, 10);
    const tableColumn = [
      "",
      ...daysOfWeek.map((day) => t(`tableHeaders.daysOfWeek.${day}`)),
    ];
    const tableRows = [];

    mealTimes.forEach((meal) => {
      const row = [t(`tableHeaders.mealTimes.${meal}`)];
      daysOfWeek.forEach((day) => {
        const recipesForDayMeal = menuPlan
          .filter((item) => item.day === day && item.meal === meal)
          .map((item) => {
            const recipe = recipes.find((r) => r.id === item.recipeId);
            return recipe ? recipe.title : t("recipeNotFound");
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
    rows.push([
      "",
      ...daysOfWeek.map((day) => t(`tableHeaders.daysOfWeek.${day}`)),
    ]);

    mealTimes.forEach((meal) => {
      const row = [t(`tableHeaders.mealTimes.${meal}`)];
      daysOfWeek.forEach((day) => {
        const recipesForDayMeal = menuPlan
          .filter((item) => item.day === day && item.meal === meal)
          .map((item) => {
            const recipe = recipes.find((r) => r.id === item.recipeId);
            return recipe ? recipe.title : t("recipeNotFound");
          })
          .join(", ");
        row.push(recipesForDayMeal);
      });
      rows.push(row);
    });

    let csvContent = "\uFEFF";
    rows.forEach((rowArray) => {
      const row = rowArray.map(value => `"${value}"`).join(",");
      csvContent += row + "\r\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "menu_plan.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleExport("pdf")}
        style={{ marginRight: "10px" }}
      >
        {t("exportPDF")}
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleExport("csv")}
      >
        {t("exportCSV")}
      </Button>
    </>
  );
};

export default ExportMenuPlan;
