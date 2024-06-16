import axios from "./axios.js";

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const prefixUrl = apiUrl + "/user";

const registerUser = () => {
  return axios.post(`${prefixUrl}/register`);
};

const deleteUser = () => {
  return axios.post(`${prefixUrl}/delete`);
};

const getProfile = () => {
  return axios.get(`${prefixUrl}/profile`);
}

export default {
  registerUser,
  deleteUser,
  getProfile
};