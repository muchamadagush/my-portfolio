import axios, { AxiosError, AxiosInstance } from 'axios'
import Router from 'next/router'
import { toast } from 'react-toastify'
import { BASE_API_URL } from '../constant'

function createAuthAxios(
  baseURL: string,
  keyLocalStorage?: string,
): AxiosInstance {
  const instanceAxios = axios.create({
    baseURL,
  })

  if (typeof window !== 'undefined')
    instanceAxios.interceptors.request.use((conf) => {
      const configHeaders = { ...conf }

      return configHeaders
    })

  if (keyLocalStorage) {
    instanceAxios.interceptors.request.use((config) => {
      const curConfig = { ...config }

      // ALWAYS READ UPDATED TOKEN
      try {
        const headers = curConfig.headers
        headers!.Authorization = `Bearer ${localStorage.getItem(
          keyLocalStorage,
        )}`
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
      return curConfig
    })
  }

  instanceAxios.interceptors.response.use(
    function onSuccess(response) {
      return response
    },
    function onError(error: AxiosError & any) {
      const { method } = error.config

      if (
        ['post', 'put', 'delete'].includes(method) &&
        error.config?.notifError !== false
      ) {
        toast.error(
          error?.response?.data?.message || error.message,
        )
      }

      if (window.localStorage.getItem('token-user')) {
        const status = error?.response?.status
        const originalRequest = error?.config

        if (status === 401) {
          const refreshToken = localStorage.getItem('refresh-token')
          const username = localStorage.getItem('username')

          return axios
            .post(`${BASE_API_URL}/auth/refresh-token`, {
              username,
              refreshToken,
            })
            .then((response) => {
              localStorage.setItem(
                'refresh-token',
                response?.data?.refreshToken,
              )
              localStorage.setItem('token-user', response?.data?.accessToken)
              localStorage.setItem('username', response?.data?.user?.username)

              // changeToken
              originalRequest.headers[
                'Authorization'
              ] = `Bearer ${response.data.accessToken}`

              return axios(originalRequest)
            })
            .catch(() => {
              window.localStorage.removeItem('token-user')
              window.localStorage.removeItem('refresh-token')
              window.localStorage.removeItem('username')
              Router.replace('/login').then(() => {
                window.location.reload()
              })
            })
        }
      }
      return Promise.reject(error)
    },
  )

  return instanceAxios
}

const Fetcher = {
  createAuthAxios,
}

export default Fetcher
