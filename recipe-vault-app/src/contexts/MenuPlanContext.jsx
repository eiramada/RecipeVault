import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchMenuPlans, updateMenuPlan } from "../services/menuPlanService";
import { UserContext } from "./UserContext";

export const MenuPlanContext = createContext();

export const MenuPlanProvider = ({ children }) => {
  const [menuPlans, setMenuPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    const loadMenuPlans = async () => {
      try {
        const data = await fetchMenuPlans();
        setMenuPlans(data[userId] || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadMenuPlans();
  }, [userId]);

  const saveMenuPlans = async (updatedPlans) => {
    try {
      await updateMenuPlan(userId, updatedPlans);
      setMenuPlans(updatedPlans);
    } catch (err) {
      setError(err);
    }
  };

  const removeMenuPlan = () => {
    setMenuPlans([]);
  };

  return (
    <MenuPlanContext.Provider
      value={{
        menuPlans,
        loading,
        error,
        setMenuPlans,
        saveMenuPlans,
        removeMenuPlan,
      }}
    >
      {children}
    </MenuPlanContext.Provider>
  );
};
