import { CommentParentId } from '/@/constants/state'
import { UniversalKeyValue } from './common'

export interface Author {
  name: string
  site?: string
  email?: string
  email_hash?: string
}

export interface IPLocation {
  country: string
  country_code: string
  region: string
  region_code: string
  city: string
  zip: string
}

export interface Comment {
  id: number
  post_id: number
  pid: number | typeof CommentParentId.Self
  content: string
  agent?: string
  author: Author
  likes: number
  dislikes: number
  ip?: string
  ip_location?: IPLocation
  extends: UniversalKeyValue[]
  created_at: string
  updated_at: string
}
