// import DeleteIcon from "@mui/icons-material/Delete";
// import {
//   Button,
//   Container,
//   Grid,
//   IconButton,
//   List,
//   ListItem,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import recipesFromFile from "../../data/recipes.json";
// import EditableTagList from "../Common/EditableTagList";
// import Ingredient from "../Common/IngredientInput";

// function EditRecipe() {
//   const { id } = useParams();
//   const [recipes, setRecipes] = useState([]);
//   const [editedRecipe, setEditedRecipe] = useState(null);

//   useEffect(() => {
//     const storedRecipes = localStorage.getItem("recipes");
//     const recipesFromLocal = storedRecipes ? JSON.parse(storedRecipes) : [];
//     const allRecipes = Array.isArray(recipesFromLocal) 
//       ? [...recipesFromFile, ...recipesFromLocal] 
//       : [...recipesFromFile];
      
//     // Remove duplicate recipes based on unique `id`
//     const mergedRecipes = Array.from(new Map(allRecipes.map(item => [item.id, item])).values());

//     setRecipes(mergedRecipes);
//   }, []);

//   useEffect(() => {
//     const recipe = recipes.find((r) => r.id === id);
//     setEditedRecipe(recipe);
//   }, [recipes, id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedRecipe((prevRecipe) => ({
//       ...prevRecipe,
//       [name]: value,
//     }));
//   };

//   const addIngredient = (newIngredient) => {
//     setEditedRecipe((prevRecipe) => ({
//       ...prevRecipe,
//       ingredients: [...prevRecipe.ingredients, newIngredient],
//     }));
//   };

//   const handleIngredientChange = (index, updatedIngredient) => {
//     setEditedRecipe((prevRecipe) => ({
//       ...prevRecipe,
//       ingredients: prevRecipe.ingredients.map((ingredient, i) =>
//         i === index ? updatedIngredient : ingredient
//       ),
//     }));
//   };

//   const handleRemoveIngredient = (index) => {
//     setEditedRecipe((prevRecipe) => ({
//       ...prevRecipe,
//       ingredients: prevRecipe.ingredients.filter((_, i) => i !== index),
//     }));
//   };

//   const handleInstructionChange = (index, e) => {
//     const { name, value } = e.target;
//     setEditedRecipe((prevRecipe) => ({
//       ...prevRecipe,
//       instructions: prevRecipe.instructions.map((instruction, i) =>
//         i === index ? { ...instruction, [name]: value } : instruction
//       ),
//     }));
//   };

//   const handleRemoveInstruction = (index) => {
//     setEditedRecipe((prevRecipe) => ({
//       ...prevRecipe,
//       instructions: prevRecipe.instructions.filter((_, i) => i !== index),
//     }));
//   };

//   const handleRemoveImage = (index) => {
//     setEditedRecipe((prevRecipe) => ({
//       ...prevRecipe,
//       images: prevRecipe.images.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Edited recipe saved:", editedRecipe);
//   };

//   if (!editedRecipe) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Container>
//       <form onSubmit={handleSubmit}>
//         <Typography variant="h4" component="h2" gutterBottom>
//           Edit Recipe
//         </Typography>
//         <TextField
//           label="Title"
//           name="title"
//           value={editedRecipe.title || ""}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Description"
//           name="description"
//           value={editedRecipe.description || ""}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//           multiline
//           rows={4}
//         />
//         <TextField
//           label="Servings"
//           type="number"
//           name="servings"
//           value={editedRecipe.servings || ""}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Prep Time (mins)"
//           type="number"
//           name="prepTime"
//           value={editedRecipe.prepTime || ""}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Cook Time (mins)"
//           type="number"
//           name="cookTime"
//           value={editedRecipe.cookTime || ""}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Author"
//           name="author"
//           value={editedRecipe.author || ""}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />

//         <Typography variant="h6" component="h3" gutterBottom>
//           Ingredients
//         </Typography>
//         <Ingredient
//           ingredient={{ name: "", quantity: "", unit: "", notes: "" }}
//           isNew={true}
//           addIngredient={addIngredient}
//         />
//         <br />
//         {editedRecipe.ingredients && editedRecipe.ingredients.map((ingredient, index) => (
//           <React.Fragment key={index}>
//             <Ingredient
//               ingredient={ingredient}
//               index={index}
//               handleIngredientChange={handleIngredientChange}
//               handleRemoveIngredient={handleRemoveIngredient}
//             />
//             <br />
//           </React.Fragment>
//         ))}

//         <Typography variant="h6" component="h3" gutterBottom>
//           Instructions
//         </Typography>
//         <List>
//           {editedRecipe.instructions && editedRecipe.instructions.map((instruction, index) => (
//             <ListItem key={index}>
//               <Grid container spacing={2} alignItems="center">
//                 <Grid item xs={10}>
//                   <TextField
//                     label="Instruction"
//                     name="description"
//                     value={instruction.description || ""}
//                     onChange={(e) => handleInstructionChange(index, e)}
//                     fullWidth
//                     margin="normal"
//                     multiline
//                     rows={2}
//                   />
//                 </Grid>
//                 <Grid item xs={2}>
//                   <IconButton
//                     onClick={() => handleRemoveInstruction(index)}
//                     edge="end"
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </Grid>
//               </Grid>
//             </ListItem>
//           ))}
//         </List>
//         <Typography variant="h6" component="h3" gutterBottom>
//           Images
//         </Typography>
//         <List>
//           {editedRecipe.images && editedRecipe.images.map((image, index) => (
//             <ListItem key={index}>
//               {image}
//               <IconButton onClick={() => handleRemoveImage(index)} edge="end">
//                 <DeleteIcon />
//               </IconButton>
//             </ListItem>
//           ))}
//         </List>
//         <EditableTagList tagsList={editedRecipe.tags} />
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           style={{ marginTop: "16px" }}
//         >
//           Save Recipe
//         </Button>
//       </form>
//     </Container>
//   );
// }

// export default EditRecipe;
