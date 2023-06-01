import * as http from "../common/http";

const urlAPI = process.env.REACT_APP_URL_API;

const getCookie = (name) => {
  const cookieValue = document.cookie?.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)') || null;
  return cookieValue ? cookieValue.pop() : null;
}

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
    const res = await http.get(`${urlAPI}/auth/logout`, {
      headers: {
        Authorization: `Bearer ${getCookie('access_token')}`
      }
    });
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const getUserProfile = async (userID) => {
  try {
    const res = await http.get(`${urlAPI}/user/${userID}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const updateUserData = async (userId, data) => {
  try {
    const res = await http.put(`${urlAPI}/user/${userId}`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const changePassword = async (userId, data) => {
  try {
    const res = await http.put(`${urlAPI}/user/password/${userId}`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};


export const getAllUsersByRole = async (roleId) => {
  try {
    const res = await http.get(`${urlAPI}/user/role/${roleId}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
}