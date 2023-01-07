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

interface Survey {
  id: number
  title: string
  slug: string
  status: 'active' | 'draft'
  image: string
  description: string
  created_at: string
  updated_at: string
  expire_date: string
  questions: Questions[]
}

interface Questions {
  id: number
  type: string
  question: string
  description: string | null
  data: Options
}

interface Options {
  option?: Option[]
}

interface Option {
  uuid: string
  text: string
}

const tmpSurveys: Survey[] = [
  {
    id: 100,
    title: 'Title for my survey',
    slug: 'survey-slug',
    status: 'draft',
    image: 'https://google.com',
    description: 'lorem ipsum',
    created_at: '2023-10-10',
    updated_at: '2023-10-10',
    expire_date: '2023-10-10',
    questions: [
      {
        id: 1,
        type: 'select',
        question: 'my question',
        description: null,
        data: {
          option: [
            { uuid: 'uuid', text: 'GB' },
          ],
        },
      },
      {
        id: 2,
        type: 'checkbox',
        question: 'my question',
        description: 'my description',
        data: {
          option: [
            { uuid: 'uuid', text: 'GB' },
          ],
        },
      },
      {
        id: 3,
        type: 'radio',
        question: 'my question',
        description: 'my description',
        data: {
          option: [
            { uuid: 'uuid', text: 'GB' },
          ],
        },
      },
      {
        id: 4,
        type: 'checkbox',
        question: 'my question',
        description: 'my description',
        data: {
          option: [
            { uuid: 'uuid', text: 'GB' },
          ],
        },
      },
      {
        id: 5,
        type: 'checkbox',
        question: 'my question',
        description: 'my description',
        data: {
          option: [
            { uuid: 'uuid', text: 'GB' },
          ],
        },
      },
      {
        id: 6,
        type: 'text',
        question: 'my question',
        description: null,
        data: {},
      },
      {
        id: 7,
        type: 'textarea',
        question: 'my question',
        description: 'my description',
        data: {},
      },
    ],
  },
  {
    id: 200,
    title: 'Title for my survey',
    slug: 'survey-slug',
    status: 'active',
    image: 'https://google.com',
    description: 'lorem ipsum',
    created_at: '2023-10-10',
    updated_at: '2023-10-10',
    expire_date: '2023-10-10',
    questions: [],
  },
  {
    id: 300,
    title: 'Title for my survey',
    slug: 'survey-slug',
    status: 'draft',
    image: 'https://google.com',
    description: 'lorem ipsum',
    created_at: '2023-10-10',
    updated_at: '2023-10-10',
    expire_date: '2023-10-10',
    questions: [],
  },
]

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
