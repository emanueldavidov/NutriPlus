import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BACKEND_URL } from '../../../config/config';

const initialState = {
  recipes: [], // Initial state with an empty array for recipes
}

// Async thunk to fetch all recipes
export const fetchAllRecipes = createAsyncThunk(
  'recipes/fetch',
  async () => {
    const response = await fetch(`${BACKEND_URL}/api/recipe/recipes`);
    const data = await response.json(); // Parse the response data
    return data;
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload; // Set recipes state with the payload data
    },
    addRecipe: (state, action) => {
      state.recipes.push(action.payload); // Add a new recipe to the state
    },
    deleteRecipe: (state, action) => {
      state.recipes = state.recipes.filter(recipe => recipe._id !== action.payload); // Remove a recipe by ID
    },
    updateRecipe: (state, action) => {
      state.recipes = state.recipes.map(recipe => recipe._id === action.payload._id ? action.payload : recipe); // Update a recipe by ID
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRecipes.pending, (state) => {
        state.loading = true; // Set loading state when the fetch is pending
      })
      .addCase(fetchAllRecipes.fulfilled, (state, action) => {
        state.loading = false; // Reset loading state and update recipes when the fetch is successful
        state.recipes = action.payload;
      })
      .addCase(fetchAllRecipes.rejected, (state) => {
        state.recipes = []; // Clear recipes and reset loading state on fetch failure
        state.loading = false;
      });
  },
});

// Export the action creators and reducer
export const {
  setRecipes,
  addRecipe,
  deleteRecipe,
  updateRecipe
} = recipesSlice.actions

export default recipesSlice.reducer;
