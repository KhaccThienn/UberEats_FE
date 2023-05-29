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

export const getAllOrderByUserID = async (userId) => {
     try {
          const res = await http.get(`${urlAPI}/order?orderUser=${userId}`);
          return [res, null]
     } catch (error) {
          return [null, error]
     }
}

export const getAllOrdersByStatus = async (status, params) => {
     try {
          const res = await http.get(`${urlAPI}/order?status=${status}&${params}`);
          return [res, null]
     } catch (error) {
          return [null, error]
     }
}

export const getOrderByOrderId = async (orderId) => {
     try {
          const res = await http.get(`${urlAPI}/order?orderId=${orderId}`);
          return [res, null]
     } catch (error) {
          return [null, error]
     }
}

export const updateOrderStatus = async (id, data) => {
     try {
          const res = await http.put(`${urlAPI}/order/${id}`, data);
          return [res, null]
     } catch (error) {
          return [null, error]
     }
}

export const updateOrderDelivery = async (id, deliveryId, data) => {
     try {
          const res = await http.put(`${urlAPI}/order/${id}/${deliveryId}`, data);
          return [res, null]
     } catch (error) {
          return [null, error]
     }
}