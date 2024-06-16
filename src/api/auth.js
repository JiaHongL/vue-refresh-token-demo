import axios from './axios.js';

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const prefixUrl = apiUrl + '/auth';

const login = (username, password) => {
  return axios.post(`${prefixUrl}/login`, { username, password });
}

const refreshToken = (refreshToken) => {
  return axios.post(`${prefixUrl}/refreshToken`, { refreshToken });
}

export default {
  login,
  refreshToken
}