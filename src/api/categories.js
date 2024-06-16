import axios from "./axios.js";

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const prefixUrl = apiUrl + "/categories";

const getCategories = ()=>{
  return axios.get(`${prefixUrl}`);
}

export default {
  getCategories
}