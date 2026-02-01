import { ExtraKeyValue } from './extra'

export interface Category {
  _id: string
  id: number
  pid: string
  name: string
  slug: string
  description: string
  extras: ExtraKeyValue[]
  updated_at: string
  created_at: string
  article_count: number
}
