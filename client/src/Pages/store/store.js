import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import darkModeReducer from "./slices/darkMode";
import recipesReducer from "./slices/recipesSlice";
import mealsReducer from "./slices/mealSlice";
import shoppingReducer from "./slices/shoppingSlice";
import nutritionReducer from "./slices/nutritionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    darkMode: darkModeReducer,
    recipes: recipesReducer,
    meals: mealsReducer,
    shopping: shoppingReducer,
    nutrition: nutritionReducer
  },
});
