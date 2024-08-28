import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BACKEND_URL } from '../../../config/config';

const initialState = {
  meals: [], // Initial state with an empty array for meals
}

// Async thunk to fetch all meals for a user
export const fetchAllMeals = createAsyncThunk(
  'meals/fetch',
  async (_, thunkAPI) => {
    const userId = thunkAPI.getState().auth?.user?._id; // Get user ID from the state
    const response = await fetch(`${BACKEND_URL}/api/meal/${userId}/meals`);
    const data = await response.json(); // Parse the response data
    return data;
  }
);

const mealSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    setMeals: (state, action) => {
      state.meals = action.payload; // Set meals with the payload data
    },
    addMeal: (state, action) => {
      state.meals.push(action.payload); // Add a new meal to the state
    },
    deleteMeal: (state, action) => {
      state.meals = state.meals.filter(meal => meal._id !== action.payload); // Remove a meal by ID
    },
    updateMeal: (state, action) => {
      state.meals = state.meals.map(meal => meal._id === action.payload._id ? action.payload : meal); // Update a meal by ID
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMeals.pending, (state) => {
        state.loading = true; // Set loading state when the fetch is pending
      })
      .addCase(fetchAllMeals.fulfilled, (state, action) => {
        state.loading = false; // Reset loading state and update meals when the fetch is successful
        state.meals = action.payload;
      })
      .addCase(fetchAllMeals.rejected, (state) => {
        state.meals = []; // Clear meals and reset loading state on fetch failure
        state.loading = false;
      });
  },
});

// Export the action creators and reducer
export const {
  setMeals,
  addMeal,
  deleteMeal,
  updateMeal
} = mealSlice.actions

export default mealSlice.reducer;
