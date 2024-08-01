import { t } from "i18next";

const menuPlanUrl = process.env.REACT_APP_MENU_PLAN_DB_URL;

export const fetchMenuPlans = async () => {
  try {
    const response = await fetch(menuPlanUrl);
    const data = await response.json();
    return data || {};
  } catch (error) {
    console.error(t("errors.fetchingMenuPlans"), error);
    throw new Error(t("errors.fetchingMenuPlans"));
  }
};

export const updateMenuPlan = async (userId, menuPlans) => {
  try {
    const response = await fetch(menuPlanUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [userId]: menuPlans }),
    });
    if (!response.ok) {
      throw new Error(t("errors.failedToUpdate"));
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(t("errors.updatingMenuPlans"), error);
    throw new Error(t("errors.updatingMenuPlans"));
  }
};
