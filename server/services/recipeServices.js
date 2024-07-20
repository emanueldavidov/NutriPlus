// recipeService.js

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
