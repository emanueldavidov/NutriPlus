// Controllers for handling recipe-related operations
// - createRecipeController: Handles the creation of new recipes
// - getAllRecipesController: Retrieves all recipes
// - getRecipeByIdController: Retrieves a specific recipe by its ID
// - deleteRecipeController: Deletes a recipe by its ID
// - updateRecipeController: Updates a recipe's details by its ID


import { createRecipeService, deleteRecipeService, getAllRecipesService, getRecipeByIdService, updateRecipeService } from "../services/recipeServices.js";
import { serverResponse } from "../utils/serverResponse.js";

// Get all recipes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await getAllRecipesService();
    serverResponse(res, 200, recipes);
  } catch (error) {
    serverResponse(res, 500, error.message);
  }
};

// Get recipe by ID
export const getRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const recipe = await getRecipeByIdService(recipeId);
    if (!recipe) {
      return serverResponse(res, 404, { message: "Recipe not found" });
    }
    serverResponse(res, 200, recipe);
  } catch (error) {
    serverResponse(res, 500, error.message);
  }
};

// Create a new recipe
export const createRecipe = async (req, res) => {
  console.log(req.body);
  try {
    const recipe = req.body; // Assuming request body contains recipe details
    const createdRecipe = await createRecipeService(recipe);
    serverResponse(res, 201, createdRecipe);
  } catch (error) {
    serverResponse(res, 500, error.message);
  }
};

// Update a recipe by ID
export const updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const updatedRecipe = req.body; // Updated recipe details
    const recipe = await updateRecipeService(recipeId, updatedRecipe);
    if (!recipe) {
      return serverResponse(res, 404, { message: "Recipe not found" });
    }
    serverResponse(res, 200, recipe);
  } catch (error) {
    serverResponse(res, 500, error.message);
  }
};

// Delete a recipe by ID
export const deleteRecipe = async (req, res) => {
  console.log(req.params.recipeId);
  try {
    const recipeId = req.params.recipeId;
    const deletedRecipe = await deleteRecipeService(recipeId);
    if (!deletedRecipe) {
      return serverResponse(res, 404, { message: "Recipe not found" });
    }
    serverResponse(res, 200, deletedRecipe);
  } catch (error) {
    serverResponse(res, 500, error.message);
  }
};


