export const useStrapiApi = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.strapiUrl || 'https://cms.remakojayaabadi.com'
  const apiToken = config.strapiApiToken

  const getHeaders = () => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    if (apiToken) {
      headers['Authorization'] = `Bearer ${apiToken}`
    }
    return headers
  }

  const fetchApi = async <T>(endpoint: string, params?: Record<string, any>): Promise<T> => {
    const url = new URL(`/api/${endpoint}`, baseUrl)
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value))
        }
      })
    }

    try {
      const response = await $fetch<T>(url.toString(), {
        headers: getHeaders(),
      })
      return response
    } catch (error) {
      console.error(`Strapi API error for ${endpoint}:`, error)
      throw error
    }
  }

  // Generic fetch methods
  const findMany = async <T>(contentType: string, params?: Record<string, any>) => {
    return fetchApi<{ data: T[]; meta: any }>(contentType, params)
  }

  const findOne = async <T>(contentType: string, id: number | string, params?: Record<string, any>) => {
    return fetchApi<{ data: T; meta: any }>(`${contentType}/${id}`, params)
  }

  const findBySlug = async <T>(contentType: string, slug: string, params?: Record<string, any>) => {
    return fetchApi<{ data: T[]; meta: any }>(contentType, {
      ...params,
      'filters[slug][$eq]': slug,
    })
  }

  // Media helper
  const getMediaUrl = (media: any): string => {
    if (!media || !media.data) return ''
    const { url } = media.data.attributes
    if (url.startsWith('http')) return url
    return `${baseUrl}${url}`
  }

  return {
    baseUrl,
    fetchApi,
    findMany,
    findOne,
    findBySlug,
    getMediaUrl,
  }
}
