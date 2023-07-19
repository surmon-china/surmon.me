import { Language } from '/@/language'
import { OriginState } from '/@/constants/state'
import { UniversalKeyValue } from './common'
import { Category } from './category'
import { Tag } from './tag'

export interface Article {
  _id: string
  id: number
  title: string
  description: string
  keywords: string[]
  content: string
  thumbnail: string
  origin: OriginState
  lang: Language
  disabled_comments: boolean
  tags: Tag[]
  categories: Category[]
  meta: {
    likes: number
    views: number
    comments: number
  }
  updated_at: string
  created_at: string
  extends: UniversalKeyValue[]
}
