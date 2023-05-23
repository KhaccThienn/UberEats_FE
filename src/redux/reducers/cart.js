import { createSlice } from "@reduxjs/toolkit";
const carts =
     localStorage.getItem("carts") !== null
          ? JSON.parse(localStorage.getItem("carts"))
          : [];

const setItemFunc = (items) => {
     localStorage.setItem("carts", JSON.stringify(items));
};
const initialState = {
     carts
}
export const cartSlice = createSlice({
     name: 'cart',
     initialState: initialState,
     reducers: {
          addToCart: (state, action) => {
               console.log(state.carts);
               const itemInCart = state.carts.find((item) => item.id === action.payload.id);
               if (itemInCart) {
                    console.log(itemInCart);
                    itemInCart.quantity++;
               } else {
                    state.carts.push({ ...action.payload, quantity: 1 });
                    console.log(state.carts);
                    // setItemFunc(state.carts);
               }
          },
          incrementQuantity: (state, action) => {
               const item = state.carts.find((item) => item.id === action.payload);
               item.quantity++;
               setItemFunc(state.carts);
          },
          decrementQuantity: (state, action) => {
               const item = state.carts.find((item) => item.id === action.payload);
               if (item.quantity === 1) {
                    item.quantity = 1
               } else {
                    item.quantity--;
               }
               setItemFunc(state.carts);
          },
          removeItem: (state, action) => {
               const removeItem = state.carts.filter((item) => item.id !== action.payload);
               state.carts = removeItem;
               setItemFunc(state.carts);
          },
     }
})

export const {
     addToCart,
     incrementQuantity,
     decrementQuantity,
     removeItem,
} = cartSlice.actions;

export const selectCartsData = (state) => state.carts;

export default cartSlice.reducer;