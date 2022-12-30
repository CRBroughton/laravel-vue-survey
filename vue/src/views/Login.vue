<script setup lang=ts>
import { LockClosedIcon } from '@heroicons/vue/20/solid'
import type { AxiosError, AxiosResponse } from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store'

const router = useRouter()

const errorMsg = ref()

const user = {
  email: '',
  password: '',
  rememeber: false,
}

function login() {
  store.dispatch('login', user)
    .then(() => {
      router.push({
        name: 'Dashboard',
      })
    })
    .catch((err: AxiosError<{ error: string }>) => {
      errorMsg.value = err.response?.data.error
    })
}
</script>

<template>
  <div>
    <img
      class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
      alt="Your Company"
    >
    <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
      Sign in to your account
    </h2>
    <p class="mt-2 text-center text-sm text-gray-600">
      Or
      {{ ' ' }}
      <router-link :to="{ name: 'Register' }" class="font-medium text-indigo-600 hover:text-indigo-500">
        register for free
      </router-link>
    </p>
  </div>
  <form class="mt-8 space-y-6" @submit.prevent="login">
    <div v-if="errorMsg" class="flex items-center justify-between py-2 px-5 bg-red-500 text-white rounded">
      {{ errorMsg }}
      <span class="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-[rgba(0,0,0,0.2)]" @click="errorMsg = ''">
        <svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" /></svg>
      </span>
    </div>
    <input type="hidden" name="remember" value="true">
    <div class="-space-y-px rounded-md shadow-sm">
      <div>
        <label for="email-address" class="sr-only">Email address</label>
        <input
          id="email-address" v-model="user.email" name="email" type="email" autocomplete="email"
          required="true"
          class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address"
        >
      </div>
      <div>
        <label for="password" class="sr-only">Password</label>
        <input
          id="password" v-model="user.password" name="password" type="password" autocomplete="current-password"
          required="true"
          class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password"
        >
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <input id="remember-me" v-model="user.rememeber" class="h-4 w-4 text-indigo-600 focus:text-indigo-500 border-gray-300 rounded" name="remember-me" type="checkbox">
        <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
      </div>
    </div>

    <div>
      <button
        type="submit"
        class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
        </span>
        Sign in
      </button>
    </div>
  </form>
</template>
