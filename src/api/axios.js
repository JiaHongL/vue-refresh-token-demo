import axios from "axios";
import { useUserStore } from "@/stores/userStore";
import authApi from "@/api/auth";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const userStore = useUserStore();
    const originalRequest = error.config;

    // 判斷是否為 401 錯誤，且不是 /login 或 /auth/refreshToken 的 API
    if (
      error.response.status === 401 &&
      ['/login', '/auth/refreshToken'].every((url) => !originalRequest.url.includes(url))
    ) {
      try {
        const { accessToken, refreshToken } = await refreshAccessToken();
        userStore.setTokens(accessToken, refreshToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return instance(originalRequest);
      } catch (err) {
        userStore.logout();
        return Promise.reject(err);
      }
    }

    // 判斷是否為 403 錯誤，若是則登出
    if (error.response.status === 403) {
      userStore.logout();
    }

    // 若不是 401 或 403 錯誤，則直接回傳錯誤
    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  try {
    const userStore = useUserStore();
    const { refreshToken } = userStore;
    const response = await authApi.refreshToken(refreshToken);
    if (response.data.success) {
      const { accessToken, refreshToken } = response.data.data;
      userStore.setTokens(accessToken, refreshToken);
      return { accessToken, refreshToken };
    } else {
      throw new Error('Failed to refresh token');
    }
  } catch (error) {
    throw error;
  }
};

export default instance;
