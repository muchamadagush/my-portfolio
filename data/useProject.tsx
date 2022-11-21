import { useQuery, UseQueryOptions } from 'react-query'
import ApiCall from '../services/ApiCall'
import useUrlQuery, { UseUrlQueryOptions } from '../helpers/QueryUrl/useUrlQuery'
import { BASE_API_URL } from '../constant'
import { get } from 'lodash'
import { AxiosError } from 'axios'

export interface UseProjectData {
  id: string
  title: string
  description: string
  slug: string
  mainTechnology: string
  demoLink: boolean
  repoLink: boolean
  technologies: string
  fileId: number
  thumbnailImg: any
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export interface UseCourseResult {
  data: UseProjectData
  count: number
}

function useProject(
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<UseCourseResult[]>,
) {
  const urlQuery = useUrlQuery(urlOptions)
  const query = useQuery<UseCourseResult[], AxiosError>(
    urlQuery.transformKey('/get-all-project'),
    () =>
      ApiCall.api.get(
        urlQuery.transformUrl(`${BASE_API_URL}/project?`),
      ),
    {
      // refetchInterval: 1000 * 60 * 1, // 1 minute
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      select: (res: any) => res?.data,
      keepPreviousData: true,
      ...options,
    },
  )

  const data = get(query, 'data.data', [])
  const count = get(query, 'data.count', 0)

  return {
    ...query,
    data,
    count,
    helper: urlQuery,
  }
}

export default useProject
