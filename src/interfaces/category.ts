import { UniversalKeyValue } from './common'

export interface Category {
  _id: string
  id: number
  pid: string
  name: string
  slug: string
  description: string
  updated_at: string
  created_at: string
  extends: UniversalKeyValue[]
  article_count: number
}
