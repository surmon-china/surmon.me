import { OriginState } from '/@/constants/state'
import { Language } from '/@/language'
import { UniversalKeyValue } from './common'
import { Category } from './category'
import { Tag } from './tag'

export enum ArticleLang {
  Chinese = 'zh', // 简体中文
  English = 'en', // English
  Mixed = 'mix' // 多语言混合
}

export const ArticleLangI18n: Record<ArticleLang, Record<Language, string>> = {
  [ArticleLang.Chinese]: {
    [Language.Chinese]: '中文',
    [Language.English]: 'ZH'
  },
  [ArticleLang.English]: {
    [Language.Chinese]: '英文',
    [Language.English]: 'EN'
  },
  [ArticleLang.Mixed]: {
    [Language.Chinese]: '多语',
    [Language.English]: 'MIX'
  }
}

export interface Article {
  _id: string
  id: number
  title: string
  description: string
  keywords: string[]
  content: string
  thumbnail: string
  origin: OriginState
  lang: ArticleLang
  featured: boolean
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
