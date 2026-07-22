/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useQuery, type UseQueryOptions } from 'react-query'
import ApiCall from '../services/ApiCall'
import { type UseProjectData } from './useProject'

type UseProjectResult = UseProjectData

function useProjectBySlug (
  slug: any,
  options?: UseQueryOptions<UseProjectResult>
) {
  const query = useQuery<UseProjectResult, any>(
    ['project-by-slug', slug],
    async () => {
      const response = await ApiCall.Project.getBySlug(slug)
      return response.data.data
    },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: Boolean(slug),
      ...options
    }
  )

  return {
    ...query
  }
}

export default useProjectBySlug
