// Mongoose schema for the User collection
// - Defines the structure of the User documents
// - Includes fields for username, email, password, and timestamps
// - Includes methods for password hashing and validation

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
  shoppingLists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShoppingList",
    },
  ],
  meals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal",
    },
  ],
});

export const UserModel = mongoose.model("User", userSchema);
