// recipeRoutes.js

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
