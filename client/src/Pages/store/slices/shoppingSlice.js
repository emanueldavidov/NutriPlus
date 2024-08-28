import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BACKEND_URL } from '../../../config/config';

const initialState = {
  shoppingList: [], // Initial state with an empty array for shopping lists
}

// Async thunk to fetch all shopping lists for a user
export const fetchAllShoppingLists = createAsyncThunk(
  'shopping/fetch',
  async (_, thunkAPI) => {
    const userId = thunkAPI.getState().auth?.user?._id; // Get user ID from the state
    const response = await fetch(`${BACKEND_URL}/api/shopping/${userId}/shoppingLists`);
    const data = await response.json(); // Parse the response data
    return data;
  }
);

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    setShoppingLists: (state, action) => {
      state.shoppingList = action.payload; // Set shopping list state with the payload data
    },
    addShoppingList: (state, action) => {
      state.shoppingList.push(action.payload); // Add a new shopping list to the state
    },
    deleteShoppingList: (state, action) => {
      state.shoppingList = state.shoppingList.filter(list => list._id !== action.payload); // Remove a shopping list by ID
    },
    updateShoppingList: (state, action) => {
      state.shoppingList = state.shoppingList.map(list => list._id === action.payload._id ? action.payload : list); // Update a shopping list by ID
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllShoppingLists.pending, (state) => {
        state.loading = true; // Set loading state when the fetch is pending
      })
      .addCase(fetchAllShoppingLists.fulfilled, (state, action) => {
        state.loading = false; // Reset loading state and update shopping lists when the fetch is successful
        state.shoppingList = action.payload;
      })
      .addCase(fetchAllShoppingLists.rejected, (state) => {
        state.shoppingList = []; // Clear shopping lists and reset loading state on fetch failure
        state.loading = false;
      });
  },
});

// Export the action creators and reducer
export const {
  setShoppingLists,
  addShoppingList,
  deleteShoppingList,
  updateShoppingList
} = shoppingListSlice.actions

export default shoppingListSlice.reducer;
