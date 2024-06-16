import axios from './axios.js';

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const prefixUrl = apiUrl + '/posts';

const getPosts = () => {
  return axios.get(prefixUrl);
}

const getPostDetail = (postId) => {
  return axios.get(prefixUrl + '/' + postId);
}

export default {
  getPosts,
  getPostDetail
}
