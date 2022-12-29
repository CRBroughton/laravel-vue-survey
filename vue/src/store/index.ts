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
    token: number | null
  }
}

export const store = createStore<State>({
  state: {
    user: {
      data: {
      },
      token: null,
    },
  },
  getters: {},
  actions: {},
  mutations: {
    logout: (state) => {
      state.user.data = {}
      state.user.token = null
    },
  },
  modules: {},
})

export const userStoreKey: InjectionKey<Store<State>> = Symbol('user-store')
export function useStore() {
  return baseUseStore(userStoreKey)
}
