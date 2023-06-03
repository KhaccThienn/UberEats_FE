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

export const getAllVouchersname = async () => {
    try {
        const res = await http.get(`${urlAPI}/voucher/vouchers`);
        return [res, null]
    } catch (error) {
        return [null, error]
    }
}

export const getAllVouchersExceptOne = async (id) => {
    try {
        const res = await http.get(`${urlAPI}/voucher/vouchers/${id}`);
        return [res, null]
    } catch (error) {
        return [null, error]
    }
}

export const getVoucherByRestaurantId = async (resID) => {
    try {
        const res = await http.get(`${urlAPI}/voucher/restaurant/${resID}`);
        return [res, null]
    } catch (error) {
        return [null, error]
    }
}

export const getAllVouchers = async (userId, params) => {
    try {
        const res = await http.get(`${urlAPI}/voucher?userId=${userId}&${params}`);
        return [res, null]
    } catch (error) {
        return [null, error]
    }
}

export const createVoucher = async (data) => {
    try {
        const res = await http.post(`${urlAPI}/voucher`, data);
        return [res, null]
    } catch (error) {
        return [null, error]
    }
}

export const getVoucherByID = async (id) => {
    try {
        const res = await http.get(`${urlAPI}/voucher/${id}`);
        return [res, null]
    } catch (error) {
        return [null, error]
    }
}

export const updateVoucher = async (id, data) => {
    try {
        const res = await http.put(`${urlAPI}/voucher/${id}`, data);
        return [res, null]
    } catch (error) {
        return [null, error]
    }
}

export const deleteVoucher = async (id) => {
    try {
        const res = await http.remove(`${urlAPI}/voucher/${id}`);
        return [res, null]
    } catch (error) {
        return [null, error]
    }
}