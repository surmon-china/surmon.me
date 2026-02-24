import { ExtraKeyValue } from './extra'

export interface Tag {
  id: number
  name: string
  slug: string
  description: string
  extras: ExtraKeyValue[]
  updated_at: string
  created_at: string
  article_count: number
}
