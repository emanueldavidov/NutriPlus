// API routes for shopping list-related operations
// - POST /shoppingLists: Creates a new shopping list
// - GET /shoppingLists/:userId: Retrieves all shopping lists for a specific user
// - GET /shoppingLists/:userId/:shoppingListId: Retrieves a specific shopping list by its ID
// - DELETE /shoppingLists/:userId/:shoppingListId: Deletes a shopping list by its ID
// - PUT /shoppingLists/:userId/:shoppingListId: Updates a shopping list's details by its ID

import express from 'express';
import { createShoppingListController, deleteShoppingListController, getAllShoppingListsByUserController, getShoppingListByIdController, updateShoppingListController } from '../controllers/shoppingListControllers.js';

const router = express.Router();


router.get('/:userId/shoppingLists', getAllShoppingListsByUserController); // Get all recipes for a user
router.get('/:userId/shoppingLists/:shoppingListId', getShoppingListByIdController); // Get a ShoppingList by ID for a user
router.post('/:userId/shoppingLists', createShoppingListController); // Create a new recipe for a user
router.delete('/shoppingLists/:shoppingListId', deleteShoppingListController); // Delete a recipe by ID for a user
router.put('/:userId/shoppingLists/:shoppingListId', updateShoppingListController); // Update a recipe by ID for a user


export default router;
