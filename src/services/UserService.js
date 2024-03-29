import * as http from "../common/http";

const urlAPI = "http://localhost:8000";

export const register = async (data) => {
  try {
    const res = await http.post(`${urlAPI}/auth/register`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const login = async (data) => {
  try {
    const res = await http.post(`${urlAPI}/auth/login`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const logout = async (config) => {
  try {
    const res = await http.get(`${urlAPI}/auth/logout`, config);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};
