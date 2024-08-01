import { t } from "i18next";

const shoppingListUrl = process.env.REACT_APP_SHOPPING_LIST_DB_URL;

export const fetchShoppingLists = async () => {
  try {
    const response = await fetch(shoppingListUrl);
    const data = await response.json();
    return data || {};
  } catch (error) {
    console.error(t("errors.fetchingShoppingLists"), error);
    throw new Error(t("errors.fetchingShoppingLists"));
  }
};

export const updateShoppingList = async (userId, shoppingLists) => {
  try {
    const response = await fetch(shoppingListUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [userId]: shoppingLists }),
    });
    if (!response.ok) {
      throw new Error(t("errors.failedToUpdate"));
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(t("errors.updatingShoppingLists"), error);
    throw new Error(t("errors.updatingShoppingLists"));
  }
};
