import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import authApi from '@/api/auth';
import userApi from '@/api/user';
import categoriesApi from '@/api/categories';
import { useRouter } from 'vue-router';

export const useUserStore = defineStore('user', () => {
  const accessToken = useStorage('accessToken', '');
  const refreshToken = useStorage('refreshToken', '');
  const categories = ref([]);
  const profile = ref({});
  const router = useRouter();

  const setTokens = (newAccessToken, newRefreshToken) => {
    accessToken.value = newAccessToken;
    refreshToken.value = newRefreshToken;
  }

  const login = (username, password) => {
    return authApi.login(username, password).then((response) => {
      accessToken.value = response.data.data.accessToken;
      refreshToken.value = response.data.data.refreshToken;
      return response;
    });
  }

  const getCategories = async () => {
    try {
      const response = await categoriesApi.getCategories();
      categories.value = response.data.data;
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      return null;
    }
  }

  const getProfile = async () => {
    try {
      const response = await userApi.getProfile();
      profile.value = response.data.data;
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      return null;
    }
  }

  const deleteAccount = () => {
    userApi.deleteUser().then((response) => {
      alert(response.data.message);
    });
  }

  const registerUser = () => {
    userApi.registerUser().then((response) => {
      alert(response.data.message);
    });
  }

  const logout = () => {
    accessToken.value = '';
    refreshToken.value = '';
    router.push('/login');
  }

  return {
    accessToken,
    refreshToken,
    categories,
    profile,
    setTokens,
    login,
    getCategories,
    getProfile,
    deleteAccount,
    registerUser,
    logout
  }
})
