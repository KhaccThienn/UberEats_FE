import * as http from "../common/http";

const urlAPI = "http://localhost:8000";

export const getAllRestaurant = async (params) => {
     try {
          const res = await http.get(`${urlAPI}/restaurant?${params}`);
          return [res, null];
     } catch (error) {
          return [null, error];
     }
}

export const getProductByRestaurant = async (resID, params) => {
     try {
          // const res = await http.get(`${urlAPI}/product?restaurantID=${resID}&${params}`);
          const res = await http.get(`${urlAPI}/restaurant/${resID}?${params}`);
          return [res, null];
     } catch (error) {
          return [null, error];
     }
}