import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import authApi from '@/api/auth';


export const useAuthStore = defineStore('user', () => {
  const accessToken = useStorage('accessToken', '');
  const refreshToken = useStorage('refreshToken', '');


  const login = (username, password) => {
    return authApi.login(username, password).then((response) => {
      console.log(response);
      accessToken.value = response.data.data.accessToken;
      refreshToken.value = response.data.data.refreshToken;
    });
  }

  return {
    accessToken,
    refreshToken,
    login
  }
})
