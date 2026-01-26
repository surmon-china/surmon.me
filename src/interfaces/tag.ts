import { ExtraKeyValue } from './common'

export interface Tag {
  _id: string
  id: number
  name: string
  slug: string
  description: string
  extras: ExtraKeyValue[]
  updated_at: string
  created_at: string
  article_count: number
}
