<script setup lang="ts">
import { computed } from 'vue'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/vue/20/solid'
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

        <div class="flex justify-between items-center mt-3">
          <router-link :to="{ name: 'SurveyView', params: { id: survey.id } }" class="flex py-2 px-4 border border-transparent text-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <PencilIcon class="h-6 w-6 -mt-1 inline-block" aria-hidden="true" />
            Edit
          </router-link>
          <button v-if="survey.id" type="button" class="h-8 w-8 flex items-center justify-center rounded-full border border-transparent text-sm text-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-500" @click="deleteSurvey(survey)">
            <PencilIcon class="h-6 w-6 -mt-1 inline-block" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </PageComponent>
</template>

<style scoped>

</style>
