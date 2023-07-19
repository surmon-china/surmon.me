import { Tag } from '/@/interfaces/tag'
import { Category } from '/@/interfaces/category'
import { Article } from '/@/interfaces/article'

export interface Archive {
  tags: Tag[]
  categories: Category[]
  articles: Article[]
}
