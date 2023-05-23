import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cart";
import userReducer from "./reducers/users";
export const store = configureStore({
  reducer: {
    user: userReducer,
    carts: cartReducer,
  },
});
