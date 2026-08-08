import type { StrapiProject } from '~/types/strapi'

const STRAPI_URL = 'https://cms.remakojayaabadi.com'

/**
 * Fetch all published projects from Strapi, flattened for the frontend.
 * Runs at build time (SSG) via nuxt generate.
 */
export const fetchStrapiProjects = async (): Promise<StrapiProject[]> => {
  const params = new URLSearchParams({
    'pagination[pageSize]': '100',
    'sort[0]': 'completionYear:desc',
    'populate[coverImage][fields][0]': 'url',
    'populate[coverImage][fields][1]': 'alternativeText',
    'populate[gallery][fields][0]': 'url',
    'populate[gallery][fields][1]': 'alternativeText',
  })

  const res = await $fetch<{ data: any[] }>(`${STRAPI_URL}/api/projects?${params.toString()}`, {
    headers: { Accept: 'application/json' },
  })

  return res.data.map((item) => {
    const cover = item.coverImage?.data ?? item.coverImage ?? null
    const gallery = Array.isArray(item.gallery?.data)
      ? item.gallery.data
      : Array.isArray(item.gallery)
        ? item.gallery
        : []

    const mediaUrl = (m: any): string => {
      if (!m) return ''
      const url = m.url || m.attributes?.url || ''
      if (!url) return ''
      return url.startsWith('http') ? url : `${STRAPI_URL}${url}`
    }

    return {
      id: item.id,
      documentId: item.documentId,
      slug: item.slug,
      title: item.title,
      client: item.client || '',
      location: item.location || '',
      category: item.category || '',
      year: item.completionYear ? String(item.completionYear) : '',
      summary: item.summary || '',
      description: item.description || '',
      image: mediaUrl(cover),
      alt: cover?.alternativeText || cover?.attributes?.alternativeText || item.title,
      gallery: gallery.map(mediaUrl).filter(Boolean),
      featured: !!item.featured,
    }
  })
}
