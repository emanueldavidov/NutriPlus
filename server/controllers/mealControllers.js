
// Controllers for handling meal-related operations
// - createMealController: Handles the creation of new meals
// - getAllMealsByUserController: Retrieves all meals for a specific user
// - getMealByIdController: Retrieves a specific meal by its ID
// - deleteMealController: Deletes a meal by its ID
// - updateMealController: Updates a meal's details by its ID

import {
  createMeal,
  getAllMealsByUserService,
  getMealById,
  deleteMeal as deleteMealService,
  updateMeal as updateMealService,
  getMealByName,
} from "../services/mealServices.js";
export const createMealController = async (req, res) => {
  try {
    const existingMeal = await getMealByName(req.body.user, req.body.name, req.body.recipes);
    if (existingMeal) {
      return res.status(409).json({ error: "Meal already exists" });
    }

    const meal = await createMeal(req.body);
    res.status(201).json(meal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAllMealsByUserController = async (req, res) => {
  const { userId } = req.params;
  try {
    const meals = await getAllMealsByUserService(userId);
    console.log(meals)
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMealByIdController = async (req, res) => {
  const { userId, mealId } = req.params;
  try {
    const meal = await getMealById(userId, mealId);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMealController = async (req, res) => {
  const { userId, mealId } = req.params;
  try {
    const meal = await deleteMealService(userId, mealId);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    res.status(200).json({ message: "Meal deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMealController = async (req, res) => {
  const { userId, mealId } = req.params;
  const updatedMeal = req.body;
  try {
    const meal = await updateMealService(userId, mealId, updatedMeal);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
