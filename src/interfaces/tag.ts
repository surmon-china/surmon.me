import { UniversalKeyValue } from './common'

export interface Tag {
  _id: string
  id: number
  name: string
  slug: string
  description: string
  updated_at: string
  created_at: string
  extends: UniversalKeyValue[]
  article_count: number
}
