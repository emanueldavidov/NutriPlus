import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BACKEND_URL } from '../../../config/config';

const initialState = {
  nutrition: []
}
export const fetchAllNutrition = createAsyncThunk(
  'nutrition/fetch',
  async (_, thunkAPI) => {
    const userId = thunkAPI.getState().auth?.user?._id;
    const response = await fetch(`${BACKEND_URL}/api/nutrition/${userId}/nutritions`);
    const data = await response.json();
    return data;
  }
);
const nutritionSlice = createSlice({
  name: "nutrition",
  initialState,
  reducers: {
    setNutrition: (state, action) => {
      state.nutrition = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNutrition.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllNutrition.fulfilled, (state, action) => {
        state.loading = false;
        state.nutrition = action.payload;
      })
      .addCase(fetchAllNutrition.rejected, (state, action) => {
        state.nutrition = 'failed';
        state.loading = false;
      });
  },
});




export const {
  setNutrition,

} = nutritionSlice.actions

export default nutritionSlice.reducer