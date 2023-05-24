import * as http from "../common/http";

const urlAPI = "http://localhost:8000";

export const getAllCartByUser = async (userID) => {
     try {
          const res = await http.get(`${urlAPI}/cart/${userID}`);
          return [res, null];
     } catch (error) {
          return [null, error];
     }
}

export const saveDataToCart = async (cartData) => {
     try {
          const res = await http.post(`${urlAPI}/cart`, cartData);
          return [res, null];
     } catch (error) {
          return [null, error];
     }
}

export const updateaCartQuantity = async (cartData) => {
     try {
          const res = await http.put(`${urlAPI}/cart`, cartData);
          return [res, null];
     } catch (error) {
          return [null, error];
     }
}

export const removeFromCart = async (cartId) => {
     try {
          const res = await http.remove(`${urlAPI}/cart/${cartId}`);
          return [res, null];
     } catch (error) {
          return [null, error];
     }
}