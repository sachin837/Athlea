import axios, {AxiosResponse} from 'axios'
import {API_LINKS} from '../../_constants'


export const axiosInstance = axios.create({
  baseURL: API_LINKS.baseURL,
})

//chopChopAxios.defaults.headers.common.Authorization = token e.g 'Bearer ...' or else

export const request = {
  get: <Response, RequestData = any>(path: string, params = {}, data?: any) => axiosInstance.get<Response, AxiosResponse<Response, RequestData>>(path, {params, data}),
  post: <Response, RequestData = any>(path: string, params = {}) => axiosInstance.post<Response, AxiosResponse<Response, RequestData>>(path, params),
  put: <Response, RequestData = any>(path: string, params = {}) => axiosInstance.put<Response, AxiosResponse<Response, RequestData>>(path, params),
  patch: <Response, RequestData = any>(path: string, params = {}) => axiosInstance.patch<Response, AxiosResponse<Response, RequestData>>(path, params),
  delete: <Response, RequestData = any>(path: string, params = {}, data?: any) => axiosInstance.delete<Response, AxiosResponse<Response, RequestData>>(path, {params, data}),
}
