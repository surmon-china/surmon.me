import { Language } from '/@/locales'
import { ExtraKeyValue } from './extra'
import { Category } from './category'
import { Tag } from './tag'

export enum ArticleOrigin {
  Original = 0, // 原创
  Reprint = 1, // 转载
  Hybrid = 2 // 混合
}

export enum ArticleLanguage {
  Chinese = 'zh', // 简体中文
  English = 'en', // English
  Multiple = 'mul' // 多语言混合
}

export const ArticleLanguageI18n: Record<ArticleLanguage, Record<Language, string>> = {
  [ArticleLanguage.Chinese]: {
    [Language.Chinese]: '中文',
    [Language.English]: 'ZH'
  },
  [ArticleLanguage.English]: {
    [Language.Chinese]: '英文',
    [Language.English]: 'EN'
  },
  [ArticleLanguage.Multiple]: {
    [Language.Chinese]: '多语',
    [Language.English]: 'MUL'
  }
}

export interface Article {
  id: number
  title: string
  summary: string
  keywords: string[]
  content: string
  thumbnail: string
  origin: ArticleOrigin
  lang: ArticleLanguage
  featured: boolean
  disabled_comments: boolean
  tags: Tag[]
  categories: Category[]
  stats: {
    likes: number
    views: number
    comments: number
  }
  extras: ExtraKeyValue[]
  updated_at: string
  created_at: string
}

export type ArticleListItem = Omit<Article, 'content' | 'extras'>
