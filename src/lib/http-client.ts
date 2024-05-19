import { env } from "./env.js"

export const httpClient = async <T>({
  url,
  method,
  params,
  headers,
  data
}: {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  params?: any,
  data?: unknown
  headers?: any,
}): Promise<T> => {

  const response = await fetch(
    buildUrl(url, params),
    {
      method,
      headers: {
        'Authorization': `Bearer ${env.ARGOCD_API_TOKEN}`,
        ...headers
      },
      ...(data ? { body: JSON.stringify(data) } : {}),
    },
  )

  validateResponse(response.status)

  return response.json()
}

export const buildUrl = (url: string, params?: any) => {
  let completeUrl = `${env.ARGOCD_API_URL}${url}`
  if (params) completeUrl += `?${new URLSearchParams(params)}`
  return completeUrl
}

export enum HttpClientErrors {
  NotFound = 'Not found.',
  ServerError = 'Server error.',
  AccessDenied = 'Access denied.'
}

export const validateResponse = (status: number) => {
  switch (status) {
    case 404:
      throw Error(HttpClientErrors.NotFound)

    case 500:
      throw Error(HttpClientErrors.ServerError)

    case 403:
      throw Error(HttpClientErrors.AccessDenied)
  }
}

export default httpClient



