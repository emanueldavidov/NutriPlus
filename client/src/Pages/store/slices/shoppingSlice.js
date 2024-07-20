import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BACKEND_URL } from '../../../config/config';

const initialState = {
  shoppingList: []
}
export const fetchAllShoppingLists = createAsyncThunk(
  'shopping/fetch',
  async (_,thunkAPI) => {
    const userId = thunkAPI.getState().auth?.user?._id;
    const response = await fetch(`${BACKEND_URL}/api/shopping/${userId}/shoppingLists`);
    const data = await response.json();
    return data;
  }
);
const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    setShoppingLists: (state, action) => {
      state.shoppingList = action.payload
    },
    addRecipe: (state, action) => {
      state.shoppingList.push(action.payload)
    },
    deleteRecipe: (state, action) => {
      state.shoppingList = state.shoppingList.filter(recipe => recipe._id !== action.payload)
    },
    updateRecipe: (state, action) => {
      state.shoppingList = state.shoppingList.map(recipe => recipe._id === action.payload._id ? action.payload : recipe)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllShoppingLists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllShoppingLists.fulfilled, (state, action) => {
        state.loading = false;
        state.shoppingList = action.payload;
      })
      .addCase(fetchAllShoppingLists.rejected, (state, action) => {
        state.shoppingList = 'failed';
        state.loading = false;
      });
  },
});




export const {
  setShoppingLists,
  addShoppingList,
  deleteShoppingList,
  updateShoppingList
} = shoppingListSlice.actions

export default shoppingListSlice.reducer