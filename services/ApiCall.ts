/* eslint-disable no-param-reassign */
import Fetcher from "./Fetcher"
import { AxiosInstance } from "axios"

export interface IProjectPost {
  title: string
  description: string
  technologies: string[]
  imageUrl?: string
  demoUrl?: string
  githubUrl?: string
  status?: 'completed' | 'in-progress' | 'planning'
  featured?: boolean
}

class BaseApiCall {
  public api: AxiosInstance

  constructor() {
    // Use Next.js API routes instead of external API
    this.api = Fetcher.createAuthAxios("/api", "token-user")
    
    // Add timeout for Vercel deployment
    this.api.defaults.timeout = 30000 // 30 seconds timeout
  }

  Project = {
    create: (data: IProjectPost) => {
      return this.api.post(`/projects`, data)
    },
    getAll: () => {
      return this.api.get(`/projects`)
    },
    getById: (id: string) => {
      return this.api.get(`/projects/${id}`)
    },
    update: (id: string, data: Partial<IProjectPost>) => {
      return this.api.put(`/projects/${id}`, data)
    },
    delete: (id: string) => {
      return this.api.delete(`/projects/${id}`)
    },
  }

  Upload = {
    create: (data: { dokumen: File }, setProgress?: any) => {
      const config = {
        onUploadProgress: function (progressEvent: any) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )

          if (setProgress) {
            setProgress(percentCompleted)
          }
        },
      }

      const { dokumen } = data
      const formData = new FormData()
      formData.append("file", dokumen) // Changed from "dokumen" to "file"

      return this.api.post("/upload", formData, config)
    },
  }
}

const ApiCall = new BaseApiCall()

export default ApiCall
