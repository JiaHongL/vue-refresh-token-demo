import axios from './axios.js';

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const prefixUrl = apiUrl + '/auth';

const login = (username, password) => {
  return axios.post(`${prefixUrl}/login`, { username, password });
}

const register = (refreshToken) => {
  return axios.post(`${prefixUrl}/register`, { refreshToken });
}

export default {
  login,
  register
}