import * as http from "../common/http";

const urlAPI = process.env.REACT_APP_URL_API;

export const getAllRestaurantByUser = async (userID) => {
    try {
        const res = await http.get(`${urlAPI}/user/${userID}`);
        return [res, null]
    } catch (error) {
        return [null, error]
    }
}

export const getRestaurantByID = async (id) => {
    try {
        const res = await http.get(`${urlAPI}/restaurant/${id}`);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}

export const createRestaurant = async (userID, data) => {
    try {
        const res = await http.post(`${urlAPI}/restaurant/${userID}`, data);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}

export const updateRestaurantData = async (userId, id, data) => {
    try {
        try {
            const res = await http.put(`${urlAPI}/restaurant/${userId}/${id}`, data);
            return [res, null];
        } catch (error) {
            return [null, error];
        }
    } catch (error) {

    }
}