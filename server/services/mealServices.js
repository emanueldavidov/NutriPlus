// Business logic for meal-related operations
// - createMeal: Creates a new meal in the database
// - getAllMealsByUserService: Retrieves all meals associated with a specific user
// - getMealById: Retrieves a meal by its ID
// - deleteMeal: Deletes a meal by its ID
// - updateMeal: Updates the details of a meal by its ID
// - getMealByName: Checks if a meal with the same name and recipes exists for the user

import { MealModel } from "../models/mealModel.js";

export const createMeal = (meal) => MealModel.create(meal);

export const getAllMealsByUserService = (userId) => {
  return MealModel.find({ user: userId }).populate('recipes').exec();
};

export const getMealByName = (userID, mealName,recipes) =>
  MealModel.findOne({ user: userID, name: mealName, recipes: recipes});


export const getMealById = (userID, mealID) =>
  MealModel.findOne({ user: userID, _id: mealID }).populate('recipes').exec();

export const deleteMeal = (userID, mealID) =>
  MealModel.findByIdAndDelete({ user: userID, _id: mealID });
  
export const updateMeal = (userID, mealID, updatedMeal) =>
  MealModel.findByIdAndUpdate({ user: userID, _id: mealID }, updatedMeal, {
    new: true,
    useFindAndModify: false,
  });
