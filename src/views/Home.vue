<script setup>
import { ref, onMounted } from 'vue'
import Layout from '@/layout/Layout.vue'
import postsApi  from '@/api/posts'
import { useRouter } from 'vue-router'

const postList = ref([])
const router = useRouter()

onMounted(async () => {
  const { data } = await postsApi.getPosts()
  postList.value = data.data;
})

const goToDetail = (id) => {
  router.push(`/post/${id}`)
}

</script>

<template>
  <Layout>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2">
      <template v-for="post in postList" :key="post.postId">
        <div
          class="mx-auto flex max-w-xl overflow-hidden rounded-lg bg-white shadow-md"
        >
          <div class="flex w-full items-center">
            <div class="w-full h-full">
              <div class="mx-3 mt-2 flex flex-row px-2 py-3">
                <div class="h-auto w-auto rounded-full border-2">
                  <img
                    class="h-12 w-12 rounded-full object-cover shadow"
                    alt="User avatar"
                    :src="post.user.avatar"
                  />
                </div>
                <div class="mb-2 ml-4 mt-1 flex flex-col">
                  <div class="text-sm font-semibold text-gray-600">
                    {{ post.user.username }}
                  </div>
                  <div class="mt-1 flex w-full">
                    <div class="text-xs font-thin text-gray-400">
                      • 30 seconds ago
                    </div>
                  </div>
                </div>
              </div>
              <div 
                class="cursor-pointer" 
                @click="goToDetail(post.id)"
              >
                <div class="border-b border-gray-100"></div>
                <div class="mx-3 mb-7 mt-6 px-2 text-sm font-medium text-gray-400">
                  <img class="rounded" :src="post.cover" />
                </div>
                <div class="mx-3 mb-2 px-2 text-lg font-semibold text-gray-600">
                  {{ post.title }}
                </div>
                <div class="mx-3 mb-6 px-2 text-sm font-thin text-gray-500">
                  {{ post.body }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </Layout>
</template>

<style lang="scss" scoped></style>