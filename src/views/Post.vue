<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Layout from '@/layout/Layout.vue'
import postsApi  from '@/api/posts'
import commentsApi from '@/api/comments'

const post = ref(null)
const comments = ref([])
const $route = useRoute()

onMounted(async()=>{
  const id = $route.params.id
  try {
    const res = await postsApi.getPostDetail(id)
    post.value = res.data.data
    const commentsRes = await commentsApi.getComments(post.value.postId)
    comments.value = commentsRes.data.data
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <Layout>
    <h1 class="my-3 font-bold text-center text-4xl">
      {{ post?.title }}
    </h1>

    <p v-text="post?.body"></p>

    <div class="flex justify-end">
      <div class="mx-3 mt-2 flex flex-row px-2 py-3">
        <div class="h-auto w-auto rounded-full border-2">
          <img
            class="h-12 w-12 rounded-full object-cover shadow"
            alt="User avatar"
            :src="post?.user?.avatar"
          />
        </div>
        <div class="mb-2 ml-4 mt-1 flex flex-col">
          <div class="text-sm font-semibold text-gray-600">
            {{ post?.user?.username }}
          </div>
          <div class="mt-1 flex w-full">
            <div class="text-xs font-thin text-gray-400">
              2022/04/01
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-b-1 border-gray-300 my-4">

    <div class="w-full">
      <h3 class="mb-5 text-2xl">Comments</h3>

      <div class="grid w-full gap-2 px-4">
        <template v-for="comment in comments" :key="comment.id">
          <div class="flex">
            <div class="flex justify-center items-center flex-shrink-0">
              <img
                class="h-8 w-8 rounded-full sm:h-10 sm:w-10"
                :src="comment.user.avatar"
                alt=""
              />
            </div>
            <div
              class="flex-1 rounded-lg border px-4 py-2 leading-relaxed sm:px-6 sm:py-4"
            >
              <strong>{{ comment.user.username }}</strong>
              <p class="text-sm">{{ comment.body }}</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </Layout>
</template>

<style lang="scss" scoped></style>