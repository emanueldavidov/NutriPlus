import { createSlice } from '@reduxjs/toolkit'

// Initial state is set up with 'user' and 'loggedIn' status.
// The 'user' is retrieved from localStorage, or set to null if not available.
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) ?? null,
  loggedIn: JSON.parse(localStorage.getItem("user")) ? true : false,
}

// 'authSlice' manages authentication-related state, such as the current user and login status.
const authSlice = createSlice({
  name: "auth", 
  initialState, 
  reducers: {
    // Action to set the user in the state and in localStorage
    setUser: (state, action) => {
      state.user = action.payload; // Update state with the user data
      localStorage.setItem('user', JSON.stringify(action.payload)); // Store user data in localStorage
      state.loggedIn = true; // Set loggedIn status to true
    },
    
    // Action to log out the user, which clears the user from the state and localStorage
    logout: (state) => {
      state.user = {}; // Reset user state to an empty object
      state.loggedIn = false; // Set loggedIn status to false
      localStorage.removeItem('user'); // Remove user data from localStorage
    }
  }
});

// Export the actions to be used in components for dispatching
export const { logout, setUser } = authSlice.actions;

// Export the reducer to be included in the store
export default authSlice.reducer;
