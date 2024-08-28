import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BACKEND_URL } from '../../../config/config';

const initialState = {
  nutrition: [], // Initial state with an empty array for nutrition data
}

// Async thunk to fetch all nutrition data for a user
export const fetchAllNutrition = createAsyncThunk(
  'nutrition/fetch',
  async (_, thunkAPI) => {
    const userId = thunkAPI.getState().auth?.user?._id; // Get user ID from the state
    const response = await fetch(`${BACKEND_URL}/api/nutrition/${userId}/nutritions`);
    const data = await response.json(); // Parse the response data
    return data;
  }
);

const nutritionSlice = createSlice({
  name: "nutrition",
  initialState,
  reducers: {
    setNutrition: (state, action) => {
      state.nutrition = action.payload; // Set nutrition state with the payload data
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNutrition.pending, (state) => {
        state.loading = true; // Set loading state when the fetch is pending
      })
      .addCase(fetchAllNutrition.fulfilled, (state, action) => {
        state.loading = false; // Reset loading state and update nutrition data when the fetch is successful
        state.nutrition = action.payload;
      })
      .addCase(fetchAllNutrition.rejected, (state) => {
        state.nutrition = []; // Clear nutrition data and reset loading state on fetch failure
        state.loading = false;
      });
  },
});

// Export the action creator and reducer
export const {
  setNutrition,
} = nutritionSlice.actions

export default nutritionSlice.reducer;
