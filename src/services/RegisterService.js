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
