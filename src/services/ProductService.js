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

export const getProductByName = async (name, params) => {
    try {
        const res = await http.get(`${urlAPI}/product?keyWord=${name}&${params}`);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}

// export const getAllShowedProduct = async ()

export const getAllProduct = async (userId, params) => {
    try {
        const res = await http.get(`${urlAPI}/product?userId=${userId}&${params}`);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}

export const getProductByID = async (id, slugs) => {
    try {
        const res = await http.get(`${urlAPI}/product/${id}-${slugs}`);
        return [res, null];
    } catch (error) {
        return [null, error];
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

export const updateProduct = async (id, data) => {
    try {
        const res = await http.put(`${urlAPI}/product/${id}`, data);
        return [res, null]
    } catch (error) {
        return [null, error]
    }
}

export const deleteProduct = async (id) => {
    try {
        const res = await http.remove(`${urlAPI}/product/${id}`);
        return [res, null]
    } catch (error) {
        return [null, error]
    }
}