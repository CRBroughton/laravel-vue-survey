import type { InjectionKey } from 'vue'
import type { Store } from 'vuex'
import { useStore as baseUseStore, createStore } from 'vuex'
import axiosClient from '../axios'

interface State {
  user: {
    data: {
      name?: string
      email?: string
      imageUrl?: string
    }
    token: string | null
  }
}

export const store = createStore<State>({
  state: {
    user: {
      data: {
      },
      token: sessionStorage.getItem('TOKEN'),
    },
  },
  getters: {},
  actions: {
    async register({ commit }, user) {
      const { data } = await axiosClient.post('/register', user)
      commit('setUser', data)
      return data
    },
    async login({ commit }, user) {
      const { data } = await axiosClient.post('/login', user)
      commit('setUser', data)
      return data
    },
    async logout({ commit }) {
      const response = await axiosClient.post('/logout')
      commit('logout')
      return response
    },
  },
  mutations: {
    logout: (state) => {
      state.user.data = {}
      state.user.token = null
    },
    setUser: (state, userData) => {
      state.user.token = userData.token
      state.user.data = userData.user
      sessionStorage.setItem('TOKEN', userData.token)
    },
  },
  modules: {},
})

export const userStoreKey: InjectionKey<Store<State>> = Symbol('user-store')
export function useStore() {
  return baseUseStore(userStoreKey)
}
