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
        name: 'Tom Cook',
        email: 'tom@example.com',
        imageUrl:
                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      token: 123,
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
