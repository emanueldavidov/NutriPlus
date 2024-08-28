// API routes for nutrition-related operations
// - POST /nutrition: Creates a new nutrition record
// - GET /nutrition/:userId: Retrieves all nutrition records for a specific user
// - GET /nutrition/:userId/:nutritionId: Retrieves a specific nutrition record by its ID
// - DELETE /nutrition/:userId/:nutritionId: Deletes a nutrition record by its ID
// - PUT /nutrition/:userId/:nutritionId: Updates a nutrition record's details by its ID


import express from 'express';
import { createNutritionController, deleteNutritionController, getAllNutritionForUserController, getNutritionByIdController, updateNutritionController } from '../controllers/nutritionControllers.js';

const router = express.Router();


router.get('/:userId/nutritions', getAllNutritionForUserController); // Get all nutrition for a user
router.get('/:userId/nutritions/:nutritionId', getNutritionByIdController); // Get a Nutrition by ID for a user
router.post('/:userId/nutritions', createNutritionController); // Create a new nutrition for a user
router.delete('/nutritions/:nutritionId', deleteNutritionController); // Delete a nutrition by ID for a user
router.put('/:userId/nutritions/:nutritionId', updateNutritionController); // Update a nutrition by ID for a user


export default router;
