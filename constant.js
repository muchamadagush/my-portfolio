const env = process.env.URL_ENV || 'development'
const URL_API_DEV = process.env.URL_API_DEV
const URL_API_STAGING = process.env.URL_API_STAGING
const URL_API_PRODUCTION = process.env.URL_API_PRODUCTION

const mapApiUrl = {
  development: `${URL_API_DEV}/v1` || 'http://localhost:8080/v1',
  staging: `${URL_API_STAGING}/v1`,
  production: `${URL_API_PRODUCTION}/v1`,
}

if (typeof window !== 'undefined') {
  const host = window.location.host
  const xHost = window.location.host.split(':')
  const hostOnly = xHost[0]

  if (hostOnly !== 'localhost' && mapDomain[host]) {
    const apiUrl = `https://${mapDomain[host].api}/v1` 

    mapApiUrl.development = apiUrl
    mapApiUrl.staging = apiUrl
    mapApiUrl.production = apiUrl
  }
}

module.exports = {
  BASE_API_URL: mapApiUrl[env],
}
