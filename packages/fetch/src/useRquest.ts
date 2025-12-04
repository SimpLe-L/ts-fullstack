import type { AxiosInstance } from 'axios'
import axios from 'axios'

const axiosConfig = {
  baseUrl: '/api'
}

const requestInstance: AxiosInstance = axios.create({
  baseURL: axiosConfig.baseUrl
})

requestInstance.interceptors.request.use((config) => {

  return config
}, (error) => {

  return Promise.reject(error)
})

requestInstance.interceptors.response.use((response) => {

  return response
}, (error) => {

  const { response } = error

  if (!response) {
    return Promise.reject(error)
  }

  const { data, status } = response.data

  const message = data.message || "unknown error"

  switch (status) {
    case 401:

      break;
    case 403:
      break;
    case 404:
      break;
    case 500:
      break;
    default:
      break;
  }

  return Promise.reject(error)

})


export function useRequest() {
  return {
    requestInstance,
    axios: requestInstance
  }
}