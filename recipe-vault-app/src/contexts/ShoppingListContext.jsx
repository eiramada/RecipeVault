import React, { createContext, useContext, useEffect, useState } from "react";
import {
  fetchShoppingLists,
  updateShoppingList,
} from "../services/shoppingListService";
import { UserContext } from "./UserContext";

export const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    const loadShoppingLists = async () => {
      try {
        const data = await fetchShoppingLists();
        setItems(data[userId] || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadShoppingLists();
  }, [userId]);

  const updateItem = (index, updatedItem) => {
    const updatedItems = [...items];
    updatedItems[index] = updatedItem;
    setItems(updatedItems);
    saveItems(updatedItems);
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    saveItems(updatedItems);
  };

  const saveItems = async (updatedItems) => {
    try {
      await updateShoppingList(userId, updatedItems);
      setItems(updatedItems);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <ShoppingListContext.Provider
      value={{
        items,
        setItems,
        loading,
        error,
        updateItem,
        deleteItem,
        saveItems,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};
