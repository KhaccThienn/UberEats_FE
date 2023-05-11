import * as http from "../common/http";

const urlAPI = "http://localhost:8000";

export const register = async (data) => {
  return await http.post(`${urlAPI}/auth/login`, data);
};
