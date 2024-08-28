// API routes for meal-related operations
// - POST /meals: Creates a new meal
// - GET /meals/:userId: Retrieves all meals for a specific user
// - GET /meals/:userId/:mealId: Retrieves a specific meal by its ID
// - DELETE /meals/:userId/:mealId: Deletes a meal by its ID
// - PUT /meals/:userId/:mealId: Updates a meal's details by its ID

import express from 'express';
import { createMealController, deleteMealController, getAllMealsByUserController, getMealByIdController, updateMealController } from '../controllers/mealControllers.js';

const router = express.Router();

// Routes for meals
router.post('/meals', createMealController); // Create a new meal for a user
router.get('/:userId/meals', getAllMealsByUserController); // Get all meals for a user
router.get('/:userId/meals/:mealId', getMealByIdController); // Get a meal by ID for a user
router.delete('/meals/:mealId', deleteMealController); // Delete a meal by ID for a user
router.put('/:userId/meals/:mealId', updateMealController); // Update a meal by ID for a user

export default router;
