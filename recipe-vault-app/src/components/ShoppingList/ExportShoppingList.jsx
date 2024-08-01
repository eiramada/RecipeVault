import React from "react";
import { Button } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useTranslation } from "react-i18next";

const ExportShoppingList = ({ items }) => {
  const { t } = useTranslation();

  const formatRecipes = (recipes) => {
    const recipeMap = new Map();
    recipes.forEach(({ title, day, meal }) => {
      if (!recipeMap.has(title)) {
        recipeMap.set(title, []);
      }
      recipeMap.get(title).push(
        `${t(`tableHeaders.daysOfWeek.${day}`)} ${t(`tableHeaders.mealTimes.${meal}`)}`
      );
    });

    return Array.from(recipeMap.entries())
      .map(([title, times]) => `${title} (${times.join(", ")})`)
      .join(", ");
  };

  const exportAsPDF = () => {
    const doc = new jsPDF();

    doc.text(t("shoppingList"), 20, 10);
    const tableColumn = [t("name"), t("quantity"), t("unit"), t("notes"), t("recipes")];
    const tableRows = [];

    items.forEach((item) => {
      const itemData = [
        item.name,
        item.quantity,
        item.unit,
        item.notes || "",
        formatRecipes(item.recipes)
      ];
      tableRows.push(itemData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("shopping_list.pdf");
  };

  const exportAsCSV = () => {
    const rows = [
      [t("name"), t("quantity"), t("unit"), t("notes"), t("recipes")],
      ...items.map((item) => [
        item.name,
        item.quantity,
        item.unit,
        item.notes || "",
        formatRecipes(item.recipes)
      ]),
    ];

    let csvContent = "data:text/csv;charset=utf-8,";
    rows.forEach((rowArray) => {
      const row = rowArray.join(",");
      csvContent += row + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "shopping_list.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={exportAsPDF} sx={{ marginRight: 1 }}>
        {t("exportPDF")}
      </Button>
      <Button variant="contained" color="secondary" onClick={exportAsCSV}>
        {t("exportCSV")}
      </Button>
    </>
  );
};

export default ExportShoppingList;
