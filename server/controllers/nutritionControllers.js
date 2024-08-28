
// Controllers for handling nutrition-related operations
// - createNutritionController: Handles the creation of nutrition records
// - getAllNutritionByUserController: Retrieves all nutrition records for a specific user
// - getNutritionByIdController: Retrieves a specific nutrition record by its ID
// - deleteNutritionController: Deletes a nutrition record by its ID
// - updateNutritionController: Updates a nutrition record's details by its ID

import {
  createNutrition,
  getAllNutritionByUserService,
  getNutritionById,
  deleteNutrition as deleteNutritionService,
  updateNutrition as updateNutritionService,
  getNutritionByFood,
} from "../services/nutritionServices.js";
export const createNutritionController = async (req, res) => {
  try {
    const { userId } = req.params;
    const existingNutrition = await getNutritionByFood(userId, req.body.food);
    if (existingNutrition) {
      return res.status(409).json({ error: "Nutrition already exists for this recipe" });
    }

    const nutrition = await createNutrition({ user: userId, ...req.body });
    res.status(201).json(nutrition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAllNutritionForUserController = async (req, res) => {
  const { userId } = req.params;
  try {
    const nutrition = await getAllNutritionByUserService(userId);
    res.status(200).json(nutrition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNutritionByIdController = async (req, res) => {
  const { userId, nutritionId } = req.params;
  try {
    const nutrition = await getNutritionById(userId, nutritionId);
    if (!nutrition) {
      return res.status(404).json({ message: "Nutrition not found" });
    }
    res.status(200).json(nutrition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteNutritionController = async (req, res) => {
  const { userId, nutritionId } = req.params;
  try {
    const nutrition = await deleteNutritionService(userId, nutritionId);
    if (!nutrition) {
      return res.status(404).json({ message: "Nutrition not found" });
    }
    res.status(200).json({ message: "Nutrition deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateNutritionController = async (req, res) => {
  const { userId, nutritionId } = req.params;
  const updatedNutrition = req.body;
  try {
    const nutrition = await updateNutritionService(userId, nutritionId, updatedNutrition);
    if (!nutrition) {
      return res.status(404).json({ message: "Nutrition not found" });
    }
    res.status(200).json(nutrition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
