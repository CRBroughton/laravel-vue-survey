import type { InjectionKey } from 'vue'
import type { Store } from 'vuex'
import { useStore as baseUseStore, createStore } from 'vuex'

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
    register({ commit }, user) {
      return fetch('http://localhost:8000/api/register', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(user),
      })
        .then(res => res.json())
        .then((res) => {
          commit('setUser', res)
          return res
        })
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
