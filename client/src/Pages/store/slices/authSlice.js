import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) ?? null,
  loggedIn: JSON.parse(localStorage.getItem("user")) ? true : false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
      state.loggedIn = true
    },
    logout: (state) => {
      state.user = {}
      state.loggedIn = false
    }
  }
});

export const { logout, setUser } = authSlice.actions

export default authSlice.reducer