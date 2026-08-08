/** Flattened Strapi Project entry (Strapi v5 flat format) */
export interface StrapiProject {
  id: number
  documentId: string
  slug: string
  title: string
  client: string
  location: string
  category: string
  year: string
  summary: string
  description: string
  image: string
  alt: string
  gallery: string[]
  featured: boolean
}
