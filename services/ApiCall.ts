/* eslint-disable no-param-reassign */
import Fetcher from "./Fetcher"
import { AxiosInstance } from "axios"
import { BASE_API_URL } from "../constant"

export interface IProjectPost {
  title: string
  description: string
  fileId: string
  mainTechnology: string
  technologies: string[]
  demoLink: string
  repoLink: string
}

class BaseApiCall {
  public api: AxiosInstance

  constructor() {
    this.api = Fetcher.createAuthAxios(BASE_API_URL, "token-user")
  }

  Project = {
    create: (data: IProjectPost) => {
      return this.api.post(`/project`, data)
    },
    getAll: () => {
      return this.api.get(`/project`)
    },
    getById: (id: string) => {
      return this.api.get(`/project/${id}`)
    },
    getBySlug: (slug: string) => {
      return this.api.get(`/project/${slug}`)
    },
    delete: (id: string) => {
      return this.api.delete(`/project/${id}`)
    },
  }

  Upload = {
    create: (data: { dokumen: File }, setProgress?: any) => {
      const config = {
        onUploadProgress: function (progressEvent: any) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )

          setProgress(percentCompleted)
        },
      }

      const { dokumen } = data

      const formData = new FormData()

      formData.append("dokumen", dokumen)

      return this.api.post("/upload", formData, config)
    },
  }
}

const ApiCall = new BaseApiCall()

export default ApiCall
