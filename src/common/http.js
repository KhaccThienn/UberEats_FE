import axios from "axios";
const getToken = () => {
  const token = localStorage.getItem("access_token")
    ? localStorage.getItem("access_token")
    : "";
  return token.toString();
};

// console.log(getToken());

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.accessToken =  token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const get = async (url, config = {}) => {
  const res = await axiosInstance.get(url, config);
  return res.data;
};

export const post = async (url, data, config = {}) => {
  const res = await axiosInstance.post(url, data, config);
  return res.data;
};

export const put = async (url, data, config = {}) => {
  const res = await axiosInstance.put(url, data, config);
  return res.data;
};

export const remove = async (url, config = {}) => {
  const res = await axiosInstance.delete(url, config);
  return res.data;
};

export default axiosInstance;
