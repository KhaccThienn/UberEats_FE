import * as http from "../common/http";

const urlAPI = "http://localhost:8000";

export const getOrderInfoByID = async (orderId) => {
     try {
          const res = await http.get(`${urlAPI}/order/${orderId}`);
          return [res, null]
     } catch (error) {
          return [null, error]
     }
}

export const getAllOrderDTByOrder = async (orderId) => {
     try {
          const res = await http.get(`${urlAPI}/order_details/${orderId}`);
          return [res, null]
     } catch (error) {
          return [null, error]
     }
}