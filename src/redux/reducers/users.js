import { createSlice } from "@reduxjs/toolkit";

const initState = {
  subject: "",
  role: "",
  iat: 0,
  exp: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    clearUser: (state) => {
      return {};
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUserData = (state) => state.user;
export default userSlice.reducer;
