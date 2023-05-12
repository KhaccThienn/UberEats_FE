import * as http from "../common/http";

const urlAPI = "http://localhost:8000";

export const login = async (data) => {
  try {
    const res = await http.post(`${urlAPI}/auth/login`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};
