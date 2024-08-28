// Mongoose schema for the Meal collection
// - Defines the structure of the Meal documents
// - Includes fields for user, name, recipes, and timestamps

import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const MealModel = mongoose.model("Meal", mealSchema);
