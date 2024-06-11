# RecipeVault

## Table of Contents
1. [Project Proposal](#project-proposal)
2. [File List](#file-list)
3. [10 Day Plan](#10-day-plan)
4. [Detailed Project Plan](#detailed-project-plan)

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
      - `Sidebar.js`
    - **Recipe**:
      - `RecipeList.js`
      - `RecipeDetail.js`
      - `AddRecipe.js`
      - `EditRecipe.js`
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
    - **Common**:
      - `Button.js`
      - `Input.js`
      - `Modal.js`
      - `Loader.js`
  - **contexts**:
    - `AuthContext.js`
    - `RecipeContext.js`
  - **hooks**:
    - `useAuth.js`
    - `useRecipes.js`
    - `useMenuPlan.js`
  - **pages**:
    - `HomePage.js`
    - `RecipesPage.js`
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

## 10 Day Plan

**Core Features to Focus On**
- Recipe Management: Allow users to add, view, and edit recipes.
- Basic Search: Implement basic search functionality for recipes.
- Shopping List: Enable users to generate and manage shopping lists from recipes.
- Menu Planning: Provide a simple interface for users to plan their meals.
- User Authentication: Ensure users can register, login, and reset passwords.


### Development Plan
- **Day 1**
  - **Initial Setup** (1 hour)
    - Create project repository, initialize with README.md, set up basic project structure.
    - Configure Git and set up the .gitignore file.
    - Initialize package management with yarn or npm.
  - **Install Dependencies** (1 hour)
    - Install core, styling, utilities, Firebase specific, and additional dependencies.
  - **Project Configuration** (2 hours)
    - Set up ESLint and Prettier.
    - Configure project for SCSS.
    - Create basic `index.html`, `manifest.json`, and `robots.txt`.

- **Day 2**
  - **Firebase Setup** (1 hour)
    - Configure Firebase project, set up Firestore, Authentication.
    - Implement Firebase configuration in `services/firebase.js`.
  - **Authentication Components** (3 hours)
    - Create `Login.js`, `Register.js`, `PasswordReset.js` components.
    - Implement Firebase Authentication for email/password and social logins.

- **Day 3**
  - **Recipe Data Handling** (2 hours)
    - Create `RecipeContext.js` and `useRecipes.js`.
    - Implement `recipeService.js` for CRUD operations with Firestore.
  - **Basic Recipe Components** (2 hours)
    - Develop `RecipeList.js` and `RecipeDetail.js`.

- **Day 4**
  - **Additional Recipe Components** (2 hours)
    - Develop `AddRecipe.js`, `EditRecipe.js`, and `RecipeCard.js`.
  - **Search Functionality** (2 hours)
    - Implement basic search functionality using Firebase's built-in search capabilities.

- **Day 5**
  - **Shopping List Components** (2 hours)
    - Implement `ShoppingList.js` and `ShoppingListItem.js`.
  - **Shopping List Integration** (2 hours)
    - Create service functions to handle shopping list generation and updates.

- **Day 6**
  - **Menu Plan Components** (3 hours)
    - Develop `MenuPlan.js` and `MenuPlanCalendar.js`.
    - Implement a basic drag-and-drop interface using `react-dnd`.
  - **Integration with Shopping List** (1 hour)
    - Ensure menu plans automatically update the shopping list.

- **Day 7**
  - **User Profile and Preferences** (2 hours)
    - Develop `UserProfile.js` and `UserPreferences.js`.
  - **User Service Functions** (2 hours)
    - Implement functions in `userService.js` for managing user data in Firebase.

- **Day 8**
  - **Reusable Components** (2 hours)
    - Create common components like `Button.js`, `Input.js`, `Modal.js`, and `Loader.js`.
  - **Utility Functions** (2 hours)
    - Implement utility functions in `utils/constants.js`, `utils/helpers.js`, and `utils/validation.js`.

- **Day 9**
  - **Integration Testing** (2 hours)
    - Perform end-to-end testing of the entire application flow.
  - **Bug Fixes and Refinements** (2 hours)
    - Address any issues found during integration testing.

- **Day 10**
  - **Deployment Preparation** (2 hours)
    - Deploy the application to Firebase Hosting.
    - Set up CI/CD pipelines if time permits.
  - **Final Adjustments and Review** (2 hours)
    - Final review and adjustments based on feedback.
    - Ensure all critical features are functional and the app is ready for demo.

## Detailed Project Plan

### Project Overview
- **Name**: RecipeVault
- **Description**: A mobile and web application to browse, select, and manage recipes with features for adjusting ingredient quantities, generating shopping lists, creating weekly menu plans, and storing user preferences. Users can also add their own recipes to the database.
- **Technology Stack**:
  - **Frontend**: React
  - **Backend**: Firebase (Firestore, Firebase Authentication)
  - **Languages**: JavaScript, C#

### Phases

#### Phase 1: Project Setup and Initial Configuration
- **Duration**: 3 days
- **Tasks**:
  - **Initial Setup**
    - Create project repository, initialize with README.md, set up basic project structure.
    - Configure Git and set up the .gitignore file.
    - Initialize package management with yarn or npm.
  - **Install Dependencies**
    - Install core, styling, utilities, Firebase specific, and additional dependencies.
  - **Project Configuration**
    - Set up ESLint and Prettier for code quality and formatting.
    - Configure project for SCSS (install node-sass, create base and variables SCSS files).
    - Create basic `index.html`, `manifest.json`, and `robots.txt`.

#### Phase 2: Authentication and User Management
- **Duration**: 4 days
- **Tasks**:
  - **Firebase Setup**
    - Configure Firebase project, set up Firestore, Authentication.
    - Implement Firebase configuration in `services/firebase.js`.
  - **Authentication Components**
    - Create `Login.js`, `Register.js`, `PasswordReset.js` components under `src/components/Auth`.
    - Implement Firebase Authentication for email/password and social logins.
  - **User Context and Hooks**
    - Create `AuthContext.js` and `useAuth.js` to manage authentication state and provide user data across the app.

#### Phase 3: Recipe Management
- **Duration**: 6 days
- **Tasks**:
  - **Recipe Data Handling**
    - Create `RecipeContext.js` and `useRecipes.js` for managing recipe data.
    - Implement `recipeService.js` for CRUD operations with Firestore.
  - **Recipe Components**
    - Develop `RecipeList.js`, `RecipeDetail.js`, `AddRecipe.js`, `EditRecipe.js`, and `RecipeCard.js` under `src/components/Recipe`.
    - Implement search functionality using Algolia or Firebase's built-in search capabilities.
  - **Adjust Ingredient Quantities**
    - Implement real-time adjustment of ingredient quantities in `RecipeDetail.js`.

#### Phase 4: Shopping List Feature
- **Duration**: 5 days
- **Tasks**:
  - **Shopping List Components**
    - Implement `ShoppingList.js` and `ShoppingListItem.js` components.
    - Create service functions to handle shopping list generation and updates.
  - **Offline Access**
    - Implement service workers in `serviceWorker.js` for offline access to the shopping list.

#### Phase 5: Menu Planning
- **Duration**: 5 days
- **Tasks**:
  - **Menu Plan Components**
    - Develop `MenuPlan.js`, `MenuPlanCalendar.js`, and `MenuPlanTemplate.js` components.
    - Create a drag-and-drop interface using `react-dnd` and `react-dnd-html5-backend`.
  - **Integration with Shopping List**
    - Ensure menu plans automatically update the shopping list.
    - Implement synchronization between menu plans and shopping lists in `useMenuPlan.js`.

#### Phase 6: User Preferences and Profile
- **Duration**: 3 days
- **Tasks**:
  - **User Profile and Preferences**
    - Develop `UserProfile.js` and `UserPreferences.js` components.
  - **User Service Functions**
    - Implement functions in `userService.js` for managing user data in Firebase.

#### Phase 7: Common Components and Utilities
- **Duration**: 3 days
- **Tasks**:
  - **Reusable Components**
    - Create common components like `Button.js`, `Input.js`, `Modal.js`, and `Loader.js`.
  - **Utility Functions**
    - Implement utility functions in `utils/constants.js`, `utils/helpers.js`, and `utils/validation.js`.

#### Phase 8: Advanced Features
- **Duration**: 5 days
- **Tasks**:
  - **Advanced Search and Filtering**
    - Implement detailed search capabilities using Algolia.
    - Add more complex filtering options (e.g., dietary preferences, cuisine types).
  - **Social Login Integrations**
    - Implement social logins (Google, Facebook).
  - **Detailed UI/UX Enhancements**
    - Refine and enhance the UI/UX for a more polished user experience.

#### Phase 9: Final Integration and Testing
- **Duration**: 4 days
- **Tasks**:
  - **Integration Testing**
    - Perform end-to-end testing of the entire application flow.
  - **User Acceptance Testing**
    - Gather feedback from stakeholders and end-users.
    - Make necessary adjustments based on feedback.

#### Phase 10: Deployment and Maintenance
- **Duration**: 3 days
- **Tasks**:
  - **Deployment Preparation**
    - Deploy the application to Firebase Hosting.
    - Set up CI/CD pipelines for continuous deployment.
  - **Post-Launch Maintenance**
    - Monitor application performance and user feedback.
    - Implement bug fixes and feature enhancements as needed.
