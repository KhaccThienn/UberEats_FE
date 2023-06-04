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

export const getAllRestaurantNamesExeptedOne = async (id) => {
    try {
        const res = await http.get(`${urlAPI}/restaurant/names/${id}`);
        return [res, null]
    } catch (error) {
        return [null, error];
    }
}
export const getAllRestaurantPhonesExeptedOne = async (id) => {
    try {
        const res = await http.get(`${urlAPI}/restaurant/phones/${id}`);
        return [res, null]
    } catch (error) {
        return [null, error];
    }
}
export const getAllRestaurantEmailsExeptedOne = async (id) => {
    try {
        const res = await http.get(`${urlAPI}/restaurant/emails/${id}`);
        return [res, null]
    } catch (error) {
        return [null, error];
    }
}
export const getAllRestaurantAddressExeptedOne = async (id) => {
    try {
        const res = await http.get(`${urlAPI}/restaurant/address/${id}`);
        return [res, null]
    } catch (error) {
        return [null, error];
    }
}

export const getAllRestaurantPhone = async () => {
    try {
        const res = await http.get(`${urlAPI}/restaurant/phones`);
        return [res, null]
    } catch (error) {
        return [null, error];
    }
}
export const getAllRestaurantEmails = async () => {
    try {
        const res = await http.get(`${urlAPI}/restaurant/emails`);
        return [res, null]
    } catch (error) {
        return [null, error];
    }
}
export const getAllRestaurantAddress = async () => {
    try {
        const res = await http.get(`${urlAPI}/restaurant/address`);
        return [res, null]
    } catch (error) {
        return [null, error];
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
        const res = await http.put(`${urlAPI}/restaurant/${userId}/${id}`, data);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}