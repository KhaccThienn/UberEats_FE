import { createSlice } from "@reduxjs/toolkit";
import * as CartService from '../../services/CartService';
const carts =
     localStorage.getItem("carts") !== null
          ? JSON.parse(localStorage.getItem("carts"), "[]")
          : [];

const setItemFunc = (items) => {
     localStorage.setItem("carts", JSON.stringify(items));
};
const initialState = {
     carts: carts
}
export const cartSlice = createSlice({
     name: 'cart',
     initialState: initialState,
     reducers: {
          addToCart: (state, action) => {
               console.log("state.carts", state.carts);
               const itemInCart = state.carts.find((item) => item.id === action.payload.id);
               if (!itemInCart) {
                    state.carts.push({ ...action.payload, quantity: 1 });
                    console.log(state.carts);
                    setItemFunc(state.carts);
               } else {
                    console.log(itemInCart);
                    itemInCart.quantity++;
                    setItemFunc(state.carts);
               }
          },
          incrementQuantity: (state, action) => {
               const item = state.carts.find((item) => item.id === action.payload.id);
               item.quantity++;
               setItemFunc(state.carts);
          },
          decrementQuantity: (state, action) => {
               const item = state.carts.find((item) => item.id === action.payload.id);
               if (item.quantity === 1) {
                    item.quantity = 1
               } else {
                    item.quantity--;
               }
               setItemFunc(state.carts);
          },
          changeQuantity: (state, action) => {
               console.log(action.payload.id);
               const item = state.carts.find((item) => item.id === action.payload.id);
               if (item) {
                    console.log(item);
                    item.quantity = action.payload.quantity > 1 ? action.payload.quantity : 1;
                    setItemFunc(state.carts);
               }
          },
          removeItem: (state, action) => {
               console.log(action.payload);
               // const removeItemIndex = state.carts.findIndex((item) => item.id === action.payload.id);
               // const removeItem = state.carts.splice(removeItemIndex, 1)
               // if (state.carts.length === 0) {
               //      state.carts = [];
               //      setItemFunc(state.carts);
               // }
               // state.carts = removeItem;
               // setItemFunc(state.carts);
          },
          deleteAllCarts: (state, action) => {
               state.carts = [];
               setItemFunc(state.carts);
          }
     }
})

export const {
     addToCart,
     incrementQuantity,
     decrementQuantity,
     removeItem,
     changeQuantity
} = cartSlice.actions;

export const selectCartsData = (state) => state.carts;

export default cartSlice.reducer;