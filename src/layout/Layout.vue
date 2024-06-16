<script setup>
import Navbar from './Navbar.vue'
</script>
<template>
  <div class="min-h-screen flex flex-col h-screen">
  <Navbar></Navbar>
  <div class="flex-1 w-full p-3  mx-auto overflow-x-auto bg-gray-200">
    <slot></slot>
  </div>
</div>
</template>

<style lang="scss" scoped></style>