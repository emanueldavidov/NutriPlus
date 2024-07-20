import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BACKEND_URL } from '../../../config/config';

const initialState = {
  meals: []
}
export const fetchAllMeals = createAsyncThunk(
  'meals/fetch',
  async (_, thunkAPI) => {
    const userId = thunkAPI.getState().auth?.user?._id;
    const response = await fetch(`${BACKEND_URL}/api/meal/${userId}/meals`);
    const data = await response.json();
    return data;
  }
);
const mealSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    setMeals: (state, action) => {
      state.meals = action.payload
    },
    addMeal: (state, action) => {
      state.meals.push(action.payload)
    },
    deleteMeal: (state, action) => {
      state.meals = state.meals.filter(meal => meal._id !== action.payload)
    },
    updateMeal: (state, action) => {
      state.meals = state.meals.map(meal => meal._id === action.payload._id ? action.payload : meal)
    },
  }, extraReducers: (builder) => {
    builder
      .addCase(fetchAllMeals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllMeals.fulfilled, (state, action) => {
        state.loading = false;
        state.meals = action.payload;
      })
      .addCase(fetchAllMeals.rejected, (state, action) => {
        state.meals = [];
        state.loading = false;
      });
  },
});

export const {
  setMeals,
  addMeal,
  deleteMeal,
  updateMeal
} = mealSlice.actions

export default mealSlice.reducer