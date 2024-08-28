import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false, // Initial state: dark mode is off
};

const darkMode = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    // Toggles the dark mode state and updates the body class
    toggleDarkModeState: (state) => {
      state.darkMode = !state.darkMode; // Toggle dark mode state
      document.body.classList.toggle("dark-mode"); // Apply/remove "dark-mode" class on body
    },
  },
});

// Export the action for use in components
export const { toggleDarkModeState } = darkMode.actions;

// Export the reducer to include in the Redux store
export default darkMode.reducer;
