import { useEffect, useState } from "react";
import {
  fetchShoppingLists,
  updateShoppingList,
} from "../services/shoppingListService";

const useShoppingList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadShoppingList = async () => {
      try {
        const storedItems = await fetchShoppingLists();
        setItems(storedItems || []);
      } catch (error) {
        console.error("Error fetching shopping list", error);
      }
    };

    loadShoppingList();
  }, []);

  const saveItems = async (newItems) => {
    setItems(newItems);
    try {
      await updateShoppingList(null, newItems);
    } catch (error) {
      console.error("Error updating shopping list", error);
    }
  };

  const updateItem = (index, updatedItem) => {
    const newItems = [...items];
    newItems[index] = updatedItem;
    saveItems(newItems);
  };

  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    saveItems(newItems);
  };

  return { items, setItems, updateItem, deleteItem, saveItems };
};

export default useShoppingList;
