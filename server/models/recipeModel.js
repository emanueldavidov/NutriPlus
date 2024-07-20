import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  recipeName: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      ingredient: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
    },
  ],
  category: {  // Fixed the syntax error here
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructions: {
    type: [String], 
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const RecipeModel = mongoose.model("Recipe", recipeSchema);
