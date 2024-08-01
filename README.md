# RecipeVault

https://recipevaultpro.web.app/

## Table of Contents

1. [Project Proposal](#project-proposal)
2. [File List](#file-list)

## Project Proposal

### Project Overview

RecipeVault is a web application that allows users to browse, select, and manage their favorite recipes. The app will provide features for adjusting ingredient quantities, generating shopping lists, creating weekly menu plans, and storing user preferences. Users will also be able to add their own recipes to the database. The backend will be powered by Firebase, and the frontend will be built using React. The app aims to offer a cool and easy-to-follow UI/UX with WCAG accessibility standards.

### Technology Stack

- **Frontend**: React
- **Backend**: Firebase (Realtime Database)
- **Languages**: JavaScript

### Detailed Requirements

1. **Browse and Select Recipes**
   - **Search Functionality**: Users can search for recipes by name, ingredients, or category (e.g., vegan, gluten-free). Use Algolia or Firebase's built-in search capabilities for indexing recipes.
   - **Recipe Details**: Display ingredients, step-by-step instructions, and images. Include tags/categories for easy filtering.
2. **Adjust Ingredient Quantities**
   - **Quantity Adjustment**: Users can adjust ingredient quantities by specifying the number of servings or by manually editing quantities. Ensure real-time updates of ingredient quantities displayed in the recipe.
3. **Generate Shopping List**
   - **Shopping List Creation**: Automatically create a shopping list from selected recipes. Group similar items and adjust quantities based on the combined needs of multiple recipes.
   - **Manual Adjustments**: Allow users to add, remove, and modify items on the shopping list.
   - **Offline Access**: Ensure the shopping list is accessible offline.
4. **Create Weekly Menu Plan**
   - **Menu Planning Interface**: Calendar view for users to drag and drop recipes into specific days. Summary view showing all planned meals for the week.
   - **Integration with Shopping List**: Automatically update the shopping list based on the menu plan. Allow users to update the menu plan and reflect changes in the shopping list.
5. **Store Recipes and Preferences in Firebase**
   - **Data Management**: Use Firebase for storing user data, recipes, shopping lists, and menu plans. Ensure data is properly structured and optimized for read and write operations.
6. **Add Recipes to Database**
   - **Recipe Submission**: Provide a form for users to add their own recipes, including fields for ingredients, instructions, images, and tags/categories. Validate recipe submissions to ensure completeness and correctness.

### Future

**User Analytics**: Implement basic user analytics to track usage patterns, most popular recipes, and user interaction with different features. <br>
**User Feedback Loop**: Establish a mechanism for users to provide feedback and report bugs directly through the app.<br>
**Premium Subscriptions**<br>
**Enhanced filtering**<br>
**User Authentication**: Implement Firebase Authentication for user sign-up, login, and session management. Support for social logins (Google, Facebook) as well as email/password login.<br>
**Additional integrations** (e.g., grocery delivery services)<br>

## File List

**recipe-vault-app**:

- **public**:
  - `dynamic-config.jsx`
  - `index.html`
  - `manifest.en.json`
  - `manifest.et.json`
  - `robots.txt`
  - **assets**:
    - **images**:
      - `ee_flag.ico`
      - `en_flag.ico`
      - `Placeholder.webp`
- **src**:
  - **components**:
    - **Common**:
      - `CarouselGallery.jsx`
      - `DraggableItem.jsx`
      - `DraggableList.jsx`
      - `EditableTagList.jsx`
      - `ImageList.jsx`
      - `IngredientsMobile.jsx`
      - `IngredientsWide.jsx`
      - `LoadingSpinner.jsx`
      - `MessageAlert.jsx`
      - `TagList.jsx`
    - **Layout**:
      - `Header.jsx`
      - `Footer.jsx`
      - `Layout.jsx`
    - **MenuPlan**:
      - `MenuPlanTable.jsx`
      - `RecipeSelectModal.jsx`
    - **Recipes**:
      - `RecipeCard.jsx`
      - `RecipeComponents.jsx`
      - `RecipeEditor.jsx`
      - `RecipeForm.jsx`
      - `RecipeFormContainer.jsx`
      - `RecipeIngredients.jsx`
      - `RecipeInstructions.jsx`
      - `RecipeList.jsx`
      - `SearchRecipe.jsx`
    - **ShoppingList**:
      - `ShoppingListItem.jsx`
  - **contexts**:
    - `MarkedRecipesContext.jsx`
    - `MenuPlanContext.jsx`
    - `RecipeContext.jsx`
    - `ShoppingListContext.jsx`
    - `UserContext.jsx`
  - **hooks**:
    - `useDocumentTitle.jsx`
    - `useRecipeData.jsx`
    - `useRecipes.jsx`
    - `useShoppingList.jsx`
  - **i18n**:
    - `ee.json`
    - `en.json`
  - **pages**:
    - `HomePage.jsx`
    - `MenuPlanPage.jsx`
    - `NotFoundPage.jsx`
    - `RecipeEditorPage.jsx`
    - `RecipePage.jsx`
    - `RecipesPage.jsx`
    - `ShoppingListPage.jsx`
  - **services**:
    - `recipeService.jsx`
    - `menuPlanService.jsx`
    - `markedRecipeService.jsx`
    - `shoppingListService.jsx`
  - **utils**:
    - `ingerdientUtils.jsx`
    - `recipeFormUtils.jsx`
    - `recipeUtils.jsx`
    - `validation.jsx`
  - `App.js`
  - `AppProviders.jsx`
  - `i18n.js`
  - `index.js`
  - `theme.js`
- `env.local`
- `.gitignore`
- `package.json`
- `README.md`

### Dependencies

- **Core**:
  - `react`: `^18.3.1`
  - `react-dom`: `^18.3.1`
  - `react-router-dom`: `^6.23.1`
  - `firebase`: `^10.12.2`
- **Styling**:
  - `@mui/material`: `^5.15.19`
  - `@emotion/react`: `^11.11.4`
  - `@emotion/styled`: `^11.11.5`
- **Utilities**:
  - `jspdf`: `^2.5.1`
  - `jspdf-autotable`: `^3.8.2`
  - `lodash`: `^4.17.21`
  - `react-beautiful-dnd`: `^13.1.1`
  - `react-dnd`: `^16.0.1`
  - `react-dnd-html5-backend`: `^16.0.1`
  - `react-i18next`: `^14.1.2`
  - `react-material-ui-carousel`: `^3.4.2`
  - `web-vitals`: `^2.1.4`
- **Additional**:
  - `eslint`
  - `prettier`