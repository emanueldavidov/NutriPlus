import {
    createShoppingList,
    getAllShoppingListByUserService,
    getShoppingListById,
    deleteShoppingList as deleteShoppingListService,
    updateShoppingList as updateShoppingListService,
    getShoppingListByName,
  } from "../services/shoppingListServices.js";
  export const createShoppingListController = async (req, res) => {
    try {
    const { userId } = req.params;
      const existingShoppingList = await getShoppingListByName(userId, req.body.name);
      if (existingShoppingList) {
        return res.status(409).json({ error: "ShoppingList already exists" });
      }
  
      const shoppingList = await createShoppingList({user:userId,...req.body});
      res.status(201).json(shoppingList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  export const getAllShoppingListsByUserController = async (req, res) => {
    const { userId } = req.params;
    try {
      const shoppingLists = await getAllShoppingListByUserService(userId);
      res.status(200).json(shoppingLists);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const getShoppingListByIdController = async (req, res) => {
    const { userId, shoppingListId } = req.params;
    try {
      const shoppingList = await getShoppingListById(userId, shoppingListId);
      if (!shoppingList) {
        return res.status(404).json({ message: "ShoppingList not found" });
      }
      res.status(200).json(shoppingList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const deleteShoppingListController = async (req, res) => {
    const { userId, shoppingListId } = req.params;
    try {
      const shoppingList = await deleteShoppingListService(userId, shoppingListId);
      if (!shoppingList) {
        return res.status(404).json({ message: "ShoppingList not found" });
      }
      res.status(200).json({ message: "ShoppingList deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const updateShoppingListController = async (req, res) => {
    const { userId, shoppingListId } = req.params;
    const updatedShoppingList = req.body;
    try {
      const shoppingList = await updateShoppingListService(userId, shoppingListId, updatedShoppingList);
      if (!shoppingList) {
        return res.status(404).json({ message: "ShoppingList not found" });
      }
      res.status(200).json(shoppingList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  