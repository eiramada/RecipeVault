# RecipeVault
https://recipevaultpro.web.app/

## Table of Contents
1. [Project Proposal](#project-proposal)
2. [File List](#file-list)
3. [Detailed Project Plan](#detailed-project-plan)

## Project Proposal

### Project Overview
RecipeVault is a mobile and web application that allows users to browse, select, and manage their favorite recipes. The app will provide features for adjusting ingredient quantities, generating shopping lists, creating weekly menu plans, and storing user preferences. Users will also be able to add their own recipes to the database. The backend will be powered by Firebase, and the frontend will be built using React. The app aims to offer a cool and easy-to-follow UI/UX with WCAG accessibility standards.

### Key Features
- **Browse and Select Recipes**:
  - Users can search and browse a database of recipes.
  - Each recipe will have a detailed view with ingredients, instructions, and images.
- **Adjust Ingredient Quantities**:
  - Users can adjust the quantity of ingredients based on the number of servings or personal preference.
- **Generate Shopping List**:
  - Automatically generate a shopping list based on selected recipes.
  - Users can manually add or remove items from the shopping list.
- **Create Weekly Menu Plan**:
  - Users can plan their meals for the week by selecting recipes for each day.
  - The menu plan will integrate with the shopping list feature.
- **Store Recipes and Preferences in Firebase**:
  - User data, including favorite recipes, preferences, and meal plans, will be stored in Firebase.
  - Utilize Firebase Authentication for user management.
- **Add Recipes to Database**:
  - Users can add their own recipes to the database.
  - Recipe submission form will include fields for ingredients, instructions, images, and tags/categories.

### Technology Stack
- **Frontend**: React
- **Backend**: Firebase (Firestore, Firebase Authentication)
- **Languages**: JavaScript, C# (for any server-side logic or integration)

### Detailed Requirements
1. **Browse and Select Recipes**
   - **Search Functionality**: Users can search for recipes by name, ingredients, or category (e.g., vegan, gluten-free). Use Algolia or Firebase's built-in search capabilities for indexing recipes.
   - **Recipe Details**: Display ingredients, step-by-step instructions, and images. Include tags/categories for easy filtering.
2. **Adjust Ingredient Quantities**
   - **Quantity Adjustment**: Users can adjust ingredient quantities by specifying the number of servings or by manually editing quantities. Ensure real-time updates of ingredient quantities displayed in the recipe.
3. **Generate Shopping List**
   - **Shopping List Creation**: Automatically create a shopping list from selected recipes. Group similar items and adjust quantities based on the combined needs of multiple recipes.
   - **Manual Adjustments**: Allow users to add, remove, and modify items on the shopping list.
   - **Offline Access**: Ensure the shopping list is accessible offline through local storage or service workers.
4. **Create Weekly Menu Plan**
   - **Menu Planning Interface**: Calendar view for users to drag and drop recipes into specific days. Summary view showing all planned meals for the week.
   - **Integration with Shopping List**: Automatically update the shopping list based on the menu plan. Allow users to update the menu plan and reflect changes in the shopping list.
5. **Store Recipes and Preferences in Firebase**
   - **Data Management**: Use Firestore for storing user data, recipes, shopping lists, and menu plans. Ensure data is properly structured and optimized for read and write operations.
   - **User Authentication**: Implement Firebase Authentication for user sign-up, login, and session management. Support for social logins (Google, Facebook) as well as email/password login.
6. **Add Recipes to Database**
   - **Recipe Submission**: Provide a form for users to add their own recipes, including fields for ingredients, instructions, images, and tags/categories. Validate recipe submissions to ensure completeness and correctness.

 ### Future  
 **User Analytics**: Implement basic user analytics to track usage patterns, most popular recipes, and user interaction with different features. 
 **User Feedback Loop**: Establish a mechanism for users to provide feedback and report bugs directly through the app.
 **Premium Subscriptions**
 **Enhanced filtering**
 **Additional integrations** (e.g., grocery delivery services)

## File List

**RecipeVault**:
- **public**:
  - `index.html`
  - `manifest.json`
  - `robots.txt`
  - **assets**:
    - **images**: []
- **src**:
  - **assets**:
    - **images**: []
    - **styles**:
      - `base.scss`
      - `variables.scss`
  - **components**:
    - **AdminPanel**:
      - `AdminDashboard.js`
      - `UserManagement.js`
    - **Auth**:
      - `Login.js`
      - `Register.js`
      - `PasswordReset.js`
    - **Layout**:
      - `Header.js`
      - `Footer.js`
    - **Recipe**:
      - `RecipeList.js`
      - `RecipeDetail.js`
      - `AddEditRecipe.js`
      - `RecipeCard.js`
    - **MenuPlan**:
      - `MenuPlan.js`
      - `MenuPlanCalendar.js`
      - `MenuPlanTemplate.js`
    - **ShoppingList**:
      - `ShoppingList.js`
      - `ShoppingListItem.js`
    - **User**:
      - `UserProfile.js`
      - `UserPreferences.js`
  - **contexts**:
    - `AuthContext.js`
    - `RecipeContext.js`
  -  **services**:
    - `recipeService.js`
  - **hooks**:
    - `useAuth.js`
    - `useRecipes.js`
    - `useMenuPlan.js`
  - **pages**:
    - `HomePage.js`
    - `MenuPlanPage.js`
    - `ShoppingListPage.js`
    - `ProfilePage.js`
  - **services**:
    - `firebase.js`
    - `recipeService.js`
    - `userService.js`
  - **utils**:
    - `constants.js`
    - `helpers.js`
    - `validation.js`
  - `App.js`
  - `index.js`
  - `serviceWorker.js`
- `.gitignore`
- `package.json`
- `README.md`
- `yarn.lock`

### Dependencies
- **Core**:
  - `react`
  - `react-dom`
  - `react-router-dom`
  - `firebase`
  - `redux`
  - `react-redux`
- **Styling**:
  - `sass`
  - `@material-ui/core`
  - `styled-components`
  - `@emotion/react`
  - `@emotion/styled`
- **Utilities**:
  - `axios`
  - `formik`
  - `yup`
  - `moment`
  - `react-dnd`
  - `react-dnd-html5-backend`
  - `lodash`
  - `i18next`
  - `react-i18next`
- **Firebase Specific**:
  - `react-firebase-hooks`
- **Additional**:
  - `eslint`
  - `prettier`
  - `eslint-plugin-react`
  - `eslint-config-prettier`
  - `eslint-plugin-prettier`

## Detailed Project Plan

### Project Overview
- **Name**: RecipeVault
- **Description**: A mobile and web application to browse, select, and manage recipes with features for adjusting ingredient quantities, generating shopping lists, creating weekly menu plans, and storing user preferences. Users can also add their own recipes to the database.
- **Technology Stack**:
  - **Frontend**: React
  - **Backend**: Firebase
  - **Languages**: JavaScript

### Phases

#### Phase: Authentication and User Management
- **Tasks**:
  - **Firebase Setup**
    - Configure Firebase project, set up Firestore, Authentication.
    - Implement Firebase configuration in `services/firebase.js`.
  - **Authentication Components**
    - Create `Login.js`, `Register.js`, `PasswordReset.js` components under `src/components/Auth`.
    - Implement Firebase Authentication for email/password and social logins.
  - **User Context and Hooks**
    - Create `AuthContext.js` and `useAuth.js` to manage authentication state and provide user data across the app.

#### Phase: User Preferences and Profile
- **Tasks**:
  - **User Profile and Preferences**
    - Develop `UserProfile.js` and `UserPreferences.js` components.
  - **User Service Functions**
    - Implement functions in `userService.js` for managing user data in Firebase.

#### Phase: Advanced Features
- **Tasks**:
  - **Advanced Search and Filtering**
    - Implement detailed search capabilities using Algolia.
    - Add more complex filtering options (e.g., dietary preferences, cuisine types).
  - **Social Login Integrations**
    - Implement social logins (Google, Facebook).
  - **Detailed UI/UX Enhancements**
    - Refine and enhance the UI/UX for a more polished user experience.

#### Phase: Final Integration and Testing
- **Tasks**:
  - **Integration Testing**
    - Perform end-to-end testing of the entire application flow.
  - **User Acceptance Testing**
    - Gather feedback from stakeholders and end-users.
    - Make necessary adjustments based on feedback.

#### Phase: Deployment and Maintenance
- **Tasks**:
  - **Deployment Preparation**
    - Deploy the application to Firebase Hosting.
    - Set up CI/CD pipelines for continuous deployment.
  - **Post-Launch Maintenance**
    - Monitor application performance and user feedback.
    - Implement bug fixes and feature enhancements as needed.
