import mongoose from "mongoose";

const nutritionSchema = new mongoose.Schema({
  calories: {
    type: String,
    required: true,
  },
  fat: {
    type: String,
    required: true,
  },
  protein: {
    type: String,
    required: true,
  },
  food:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const NutritionModel = mongoose.model("Nutrition", nutritionSchema);
