import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const mealTimes = ["Breakfast", "Lunch", "Dinner", "Snack1", "Snack2"];

const MenuPlanTable = ({ menuPlan, recipes, handleOpenModal, handleRemoveFromMenuPlan }) => {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {daysOfWeek.map((day) => (
              <TableCell key={day} align="center">
                {t(`tableHeaders.daysOfWeek.${day}`)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {mealTimes.map((meal) => (
            <TableRow key={meal}>
              <TableCell component="th" scope="row">
                {t(`tableHeaders.mealTimes.${meal}`)}
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
                            {recipe ? recipe.title : t("recipeNotFound")}
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
  );
};

export default MenuPlanTable;
