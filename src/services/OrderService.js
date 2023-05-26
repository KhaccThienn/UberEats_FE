import * as http from "../common/http";

const urlAPI = "http://localhost:8000";

export const postCheckoutData = async (data) => {
     try {
          const res = await http.post(`${urlAPI}/order`, data);
          return [res, null]
     } catch (error) {
          return [null, error]
     }
}

export const getAllOrderByResOwner = async (userId, params) => {
     try {
          const res = await http.get(`${urlAPI}/order?userId=${userId}&${params}`);
          return [res, null]
     } catch (error) {
          return [null, error]
     }
}