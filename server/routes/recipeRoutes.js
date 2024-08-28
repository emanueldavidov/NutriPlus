// API routes for recipe-related operations
// - POST /recipes: Creates a new recipe
// - GET /recipes: Retrieves all recipes
// - GET /recipes/:recipeId: Retrieves a specific recipe by its ID
// - DELETE /recipes/:recipeId: Deletes a recipe by its ID
// - PUT /recipes/:recipeId: Updates a recipe's details by its ID

import express from 'express';
import { createRecipe, deleteRecipe, getAllRecipes, getRecipeById, updateRecipe } from '../controllers/recipeControllers.js';

const router = express.Router();

// Routes for recipes
router.get('/recipes', getAllRecipes); // Get all recipes for a user
router.get('/recipes/:recipeId', getRecipeById); // Get a recipe by ID for a user
router.post('/recipes', createRecipe); // Create a new recipe for a user
router.delete('/recipes/:recipeId', deleteRecipe); // Delete a recipe by ID for a user
router.put('/recipes/:recipeId', updateRecipe); // Update a recipe by ID for a user

export default router;
