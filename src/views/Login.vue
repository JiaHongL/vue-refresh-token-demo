<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const userStore = useUserStore()
const { registerUser } = userStore

const username = ref('joe')
const password = ref('test')
const isFormValid = computed(() => {
  return username.value && password.value
})

const onSubmit = () => {
  if (isFormValid.value) {
    userStore
    .login(username.value, password.value)
    .then((res) => {
      router.push({ name: 'Home' })
    })
    .catch((error) => {
      alert(error.response.data.message)
    })
  }
}
</script>

<template>
  <div class="relative bg-cover bg-center bg-no-repeat bg-gradient-to-b from-blue-500 to-blue-400">
  <div class="z-50 mx-0 min-h-screen justify-center sm:flex sm:flex-row">
    <div class="z-10 flex flex-col self-center p-10 sm:max-w-5xl xl:max-w-2xl">
      <div class="hidden flex-col self-start text-white lg:flex">
        <img src="" class="mb-3" />
        <h1 class="mb-3 text-5xl font-bold">Hi ? Welcome Back !</h1>
        <p class="pr-3">
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries for previewing layouts and visual mockups
        </p>
      </div>
    </div>
    <div class="z-10 flex justify-center self-center">
      <div class="w-100 mx-auto rounded-2xl bg-white p-12">
        <div class="mb-4">
          <h3 class="text-2xl font-semibold text-gray-800">Sign In</h3>
          <p class="text-gray-500">Please sign in to your account.</p>
        </div>
        <form @submit.prevent="onSubmit">
          <div class="space-y-5">
            <div class="space-y-2">
              <label class="text-sm font-medium tracking-wide text-gray-700"
                >UserName</label
              >
              <input
                v-model="username"
                class="w-full rounded-lg border border-gray-300 px-4 py-2 text-base focus:border-blue-400 focus:outline-none"
                type="text"
                placeholder="Enter your username"
              />
            </div>
            <div class="space-y-2">
              <label
                class="mb-5 text-sm font-medium tracking-wide text-gray-700"
              >
                Password
              </label>
              <input
                v-model="password"
                class="w-full content-center rounded-lg border border-gray-300 px-4 py-2 text-base focus:border-blue-400 focus:outline-none"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <button
                :disabled="!isFormValid"
                type="submit"
                class="flex w-full cursor-pointer justify-center rounded-full bg-blue-400 p-3 font-semibold tracking-wide text-gray-100 shadow-lg transition duration-500 ease-in hover:bg-blue-500 disabled:opacity-50"
              >
                Sign in
              </button>
            </div>
            <hr />
            <div>
              <button
                @click="registerUser"
                type="button"
                class="flex w-full cursor-pointer justify-center rounded-full bg-green-400 p-3 font-semibold tracking-wide text-gray-100 shadow-lg transition duration-500 ease-in hover:bg-green-500"
              >
                Create New Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped></style>