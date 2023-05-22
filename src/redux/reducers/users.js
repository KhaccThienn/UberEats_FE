import { createSlice } from "@reduxjs/toolkit";

const userData =
  localStorage.getItem("user") !== null
    ? JSON.parse(localStorage.getItem("user"))
    : {};

const setItemFunc = (item) => {
  localStorage.setItem("user", JSON.stringify(item));
};

const initState = {
  user: userData,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    // setUser: {
    //   reducer: (state, action) => {
    //     state.user = action.payload;
    //     console.log(state);
    //     return state;
    //   },
    // },
    setUser(state, action) {
      state.user = action.payload;
      console.log(state);
      setItemFunc(state.user);
    },
    getUser: (state, action) => {
      return {
        ...state.user,
      };
    },
    clearUser: (state) => {
      return {};
    },
  },
});

export const { setUser, clearUser, getUser } = userSlice.actions;
export const selectUserData = (state) => state.user;
export default userSlice.reducer;
