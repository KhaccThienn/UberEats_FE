import axios from "axios";
import jwtDecode from "jwt-decode";
import Swal from "sweetalert2";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

//get token in cookie
const getCookie = (name) => {
  const cookieValue = document.cookie?.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)') || null;
  return cookieValue ? cookieValue.pop() : null;
}
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${getCookie('access_token')}`
  }
});

//default url
axiosInstance.defaults.baseURL = 'http://localhost:́8000'

// refreshtoken
const refreshtoken = async () => {
  try {
    const response = await axiosInstance.get("/auth/refresh");
    console.log("Refreshing token", response.data);
    await cookies.set('access_token', response.data.token.access_token, { maxAge: 100000000000 });
    await cookies.set('refresh_token', response.data.token.refresh_token, { maxAge: 100000000000 });
    return response;
  } catch (error) {
    console.log(error);
    window.location.href = '/login'
  }
}
// request parse
axiosInstance.interceptors.request.use(async (config) => {
  if (Number(config.url?.indexOf('/login')) >= 0 || Number(config.url?.indexOf('refresh')) >= 0) {
    return config
  }
  if (getCookie('access_token')) {
    const access_token = jwtDecode(getCookie('access_token'))
    const now = Math.floor(new Date().getTime() / 1000);
    console.log('now', now, 'access token', access_token.exp);
    if (access_token.exp <= now) {
      console.log('refresh..');
      const choose = await Swal.fire({
        title: "Session Has Expired, Please Login Again",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
      });
      if (choose.isConfirmed) {
        await refreshtoken()
      } else {
        window.location.href = '/'
      }
    }
  }
  if (getCookie('refresh_token') && !getCookie('access_token')) {
    await refreshtoken()
  }
  return config

}, async (error) => {
  console.log(error);
})

//response
axiosInstance.interceptors.response.use(config => {
  console.log(config);
  config.headers.Authorization = `Bearer ${getCookie('access_token')}`;
  return config;
},
  error => {
    return Promise.reject(error);
  }
)

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
