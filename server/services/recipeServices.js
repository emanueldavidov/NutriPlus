// Business logic for recipe-related operations
// - createRecipe: Creates a new recipe in the database
// - getAllRecipes: Retrieves all recipes from the database
// - getRecipeById: Retrieves a recipe by its ID
// - deleteRecipe: Deletes a recipe by its ID
// - updateRecipe: Updates the details of a recipe by its ID


import { RecipeModel } from "../models/recipeModel.js";

export const getAllRecipesService = () => RecipeModel.find({}).populate('user').exec();
export const getRecipeByIdService = (recipeId) => RecipeModel.findById(recipeId);
export const createRecipeService = (recipe) => RecipeModel.create(recipe);
export const updateRecipeService = (recipeId, updatedRecipe
) => RecipeModel.findOneAndUpdate(
    { _id: recipeId },
    updatedRecipe,
    { new: true }
);
export const deleteRecipeService = (recipeId) => RecipeModel.findOneAndDelete({ _id: recipeId });
