import * as http from "../common/http";
import env from "react-dotenv";

const urlAPI = process.env.REACT_APP_URL_API;

export const getAllRestaurant = async (params) => {
     try {
          const res = await http.get(`${urlAPI}/restaurant?${params}`);
          return [res, null];
     } catch (error) {
          return [null, error];
     }
}

export const getProductByRestaurant = async (resID, slugs, status, params) => {
     try {
          // const res = await http.get(`${urlAPI}/product?restaurantID=${resID}&${params}`);
          const res = await http.get(`${urlAPI}/restaurant/${resID}-${slugs}?status=${status}&${params}`);
          return [res, null];
     } catch (error) {
          return [null, error];
     }
}