import * as http from "../common/http";

const urlAPI = "http://localhost:8000";

export const getAllRestaurantByUser = async (userID) => {
    try {
        const res = await http.get(`${urlAPI}/user/${userID}`);
        return [res, null]
    } catch (error) {
        return [null, error]
    }
}

export const createProduct = async (data) => {
    try {
        const res = await http.post(`${urlAPI}/product`, data);
        return [res, null]
    } catch (error) {
        return [null, error]
    }
}

export const getAllProduct = async (params) => {
    try {
        const res = await http.get(`${urlAPI}/product?${params}`);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}