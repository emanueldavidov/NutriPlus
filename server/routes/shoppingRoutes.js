// shoppingListRoutes.js

import express from 'express';
import { createShoppingListController, deleteShoppingListController, getAllShoppingListsByUserController, getShoppingListByIdController, updateShoppingListController } from '../controllers/shoppingListControllers.js';

const router = express.Router();


router.get('/:userId/shoppingLists', getAllShoppingListsByUserController); // Get all recipes for a user
router.get('/:userId/shoppingLists/:shoppingListId', getShoppingListByIdController); // Get a ShoppingList by ID for a user
router.post('/:userId/shoppingLists', createShoppingListController); // Create a new recipe for a user
router.delete('/shoppingLists/:shoppingListId', deleteShoppingListController); // Delete a recipe by ID for a user
router.put('/:userId/shoppingLists/:shoppingListId', updateShoppingListController); // Update a recipe by ID for a user


export default router;
