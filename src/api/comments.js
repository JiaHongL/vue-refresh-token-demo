import axios from './axios.js';

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const prefixUrl = apiUrl + '/comments';

const getComments = (postId) => {
  return axios.get(prefixUrl, {
    params: {
      postId
    },
  });
}

export default {
  getComments
}
