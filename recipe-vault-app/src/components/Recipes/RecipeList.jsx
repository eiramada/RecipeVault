import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { RecipeContext } from "../../contexts/RecipeContext";
import RecipeCard from "./RecipeCard";
import SearchRecipe from "./SearchRecipe";

const RecipeList = () => {
  const { t } = useTranslation();
  const { recipes, loading, error } = useContext(RecipeContext);

  return (
    <>
      <SearchRecipe />

      {loading ? (
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
      ) : error ? (
        <Container>
          <Typography variant="h6" color="error" align="center">
          {t('error')}
          </Typography>
        </Container>
      ) : (
        <Container>
          <Grid container spacing={4}>
            {recipes.map((recipe) => (
              <Grid item key={recipe.id} xs={12} sm={6} md={4}>
                <RecipeCard recipe={recipe} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
      <Container>
        <Link to="/add">
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "16px" }}
          >
        {t('addNewRecipe')}
          </Button>
        </Link>
      </Container>
    </>
  );
};

export default RecipeList;
