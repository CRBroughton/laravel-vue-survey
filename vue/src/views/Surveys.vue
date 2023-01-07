<script setup lang="ts">
import { computed } from 'vue'
import { PlusIcon } from '@heroicons/vue/20/solid'
import { store } from '../store'
import PageComponent from '../components/PageComponent.vue'

const surveys = computed(() => {
  return store.state.surveys
})
</script>

<template>
  <PageComponent>
    <template #header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">
          Surveys
        </h1>
        <router-link :to="{ name: 'SurveyCreate' }" class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600">
          Add New Survey
          <PlusIcon class="h-6 w-6 -mt-1 inline-block" aria-hidden="true" />
        </router-link>
      </div>
    </template>
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      <div v-for="survey in surveys" :key="survey.id" class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
        <img :src="survey.image" alt="survey image" class="w-full h-48 object-cover">
        <h4 class="mt-4 text-lg font-bold">
          {{ survey.title }}
        </h4>
        <div class="overflow-hidden flex-1" v-html="survey.description" />
      </div>
    </div>
  </PageComponent>
</template>

<style scoped>

</style>
