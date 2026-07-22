/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useQuery, type UseQueryOptions } from 'react-query'
import ApiCall from '../services/ApiCall'
import { get } from 'lodash'

export interface UseProjectData {
  id: string
  _id?: string
  title: string
  description: string
  technologies: string[]
  imageUrl?: string
  demoUrl?: string
  githubUrl?: string
  status: 'completed' | 'in-progress' | 'planning'
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface UseProjectResult {
  success: boolean
  data: UseProjectData[]
}

function useProject (
  options?: UseQueryOptions<UseProjectResult>
) {
  const query = useQuery<UseProjectResult, any>(
    ['projects'],
    async () => {
      const response = await ApiCall.Project.getAll()
      return response.data
    },
    {
      refetchInterval: false,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      ...options
    }
  )

  const rawData = get(query, 'data.data', [])
  // Ensure each project item has _id set to id for compatibility
  const data = rawData.map((item: any) => ({
    ...item,
    _id: item._id || item.id
  }))

  const success = get(query, 'data.success', false)

  return {
    ...query,
    data,
    success
  }
}

export default useProject
