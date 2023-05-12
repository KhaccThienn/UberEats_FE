import axios from "axios";

// const getToken = () => {
//   const token = localStorage.getItem("access_token");
//   return token.toString();
// };

// console.log(getToken());

const http = axios.create({
  // headers: {
  //   "Content-Type": "application/json",
  //   Accept: "application/json",
  //   Authorization: `Bearer ${getToken()}`,
  // },
});

export const get = async (url, config = {}) => {
  const res = await http.get(url, config);
  return res.data;
};

export const post = async (url, data, config = {}) => {
  const res = await http.post(url, data, config);
  return res.data;
};

export const put = async (url, data, config = {}) => {
  const res = await http.put(url, data, config);
  return res.data;
};

export const remove = async (url, config = {}) => {
  const res = await http.delete(url, config);
  return res.data;
};

export default http;
