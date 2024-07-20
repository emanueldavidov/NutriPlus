import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
};

const darkMode = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkModeState: (state) => {
      state.darkMode = !state.darkMode;
      document.body.classList.toggle("dark-mode");
    },
  },
});

export const {toggleDarkModeState} = darkMode.actions;

export default darkMode.reducer;
