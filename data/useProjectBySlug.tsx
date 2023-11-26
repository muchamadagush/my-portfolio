/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useQuery, type UseQueryOptions } from 'react-query'
import ApiCall from '../services/ApiCall'
import useUrlQuery, { type UseUrlQueryOptions } from '../helpers/QueryUrl/useUrlQuery'
import { BASE_API_URL } from '../constant'
import { type UseProjectData } from './useProject'

type UseProjectResult = UseProjectData

function useProjectBySlug (
  slug: any,
  urlOptions?: UseUrlQueryOptions,
  options?: UseQueryOptions<UseProjectResult>
) {
  const urlQuery = useUrlQuery(urlOptions)
  const query = useQuery<UseProjectResult, any>(
    urlQuery.transformKey(['/get-project-by-slug', slug]),
    async () =>
      await ApiCall.api.get(
        urlQuery.transformUrl(`${BASE_API_URL}/project/find-by-slug/${slug}`)
      ),
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      select: (res: any) => res?.data?.data,
      enabled: Boolean(slug),
      ...options
    }
  )

  return {
    ...query,
    helper: urlQuery
  }
}

export default useProjectBySlug
