<script setup>
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()

const {
  logout,
  deleteAccount
} = userStore;

const {
  categories,
  profile
} = storeToRefs(userStore);

</script>

<template>
<div class="navbar bg-blue-500">
  <div class="flex-1">
    <RouterLink
      to="/home"
      class="btn-ghost btn text-xl normal-case text-white"
    >
      vue-refresh-token-demo
    </RouterLink>
    <ul class="menu menu-horizontal p-0 text-white hidden md:flex">
      <li v-for="category in categories" :key="category">
        <a>{{category}}</a>
      </li>
    </ul>
  </div>
  <div class="flex-none gap-2">
    <div class="dropdown-end dropdown">
      <label tabindex="0" class="btn-ghost btn-circle online avatar btn">
        <div class="w-10 rounded-full">
          <img :src="profile?.avatar" />
        </div>
      </label>
      <ul
        tabindex="0"
        class="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
      >
        <li>
          <a class="justify-start">
            <label tabindex="0" class="btn-ghost btn-circle avatar btn">
              <div class="w-10 rounded-full">
                <img :src="profile?.avatar" />
              </div>
            </label>
            <div class="text-xl">
              {{ profile?.username }}
            </div>
          </a>
        </li>
        <li><a @click="deleteAccount">刪除帳號</a></li>
        <li><a @click="logout">登出</a></li>
      </ul>
    </div>
  </div>
</div>

</template>

<style lang="scss" scoped></style>