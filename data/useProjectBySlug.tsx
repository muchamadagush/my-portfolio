import { useQuery, UseQueryOptions } from 'react-query'
import ApiCall from '../services/ApiCall'
import useUrlQuery, { UseUrlQueryOptions } from '../helpers/QueryUrl/useUrlQuery'
import { BASE_API_URL } from '../constant'
import { get } from 'lodash'
import { AxiosError } from 'axios'
import { UseProjectData } from './useProject'

type UseProjectResult = UseProjectData

function useProjectBySlug(
  slug: any,
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<UseProjectResult>,
) {
  const urlQuery = useUrlQuery(urlOptions)
  const query = useQuery<UseProjectResult, AxiosError>(
    urlQuery.transformKey(['/get-project-by-slug', slug]),
    () =>
      ApiCall.api.get(
        urlQuery.transformUrl(`${BASE_API_URL}/project/find-by-slug/${slug}`),
      ),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      select: (res: any) => res?.data?.data,
      enabled: Boolean(slug),
      ...options,
    },
  )

  return {
    ...query,
    helper: urlQuery,
  }
}

export default useProjectBySlug
