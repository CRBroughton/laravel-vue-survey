import type { AxiosHeaders, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { store } from './store'

interface CustomHeaders extends AxiosHeaders {
  Authorization: string

}

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api',
})

axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers)
    (config.headers as CustomHeaders).Authorization = `Bearer ${store.state.user.token}`
  config.withCredentials = false

  return config
})

export default axiosClient
