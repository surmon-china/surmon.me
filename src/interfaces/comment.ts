import { ExtraKeyValue } from './extra'
import { UserPublic } from './user'

export enum CommentTargetType {
  Article = 'article',
  Page = 'page'
}

export enum CommentAuthorType {
  Guest = 'guest',
  User = 'user'
}

export enum CommentAuthorStatus {
  Guest = 'guest',
  Active = 'active',
  Ghost = 'ghost'
}

export interface IPLocation {
  country: string
  country_code: string
  region: string
  region_code: string
  city: string
}

export interface Comment {
  id: number
  target_type: CommentTargetType
  target_id: number
  parent_id: number | null
  content: string
  user: UserPublic | null
  author_name: string
  author_email: string | null
  author_website: string | null
  author_email_hash: string | null
  author_type: CommentAuthorType
  author_status: CommentAuthorStatus
  likes: number
  dislikes: number
  ip: string | null
  ip_location: IPLocation | null
  user_agent: string | null
  extras: ExtraKeyValue[]
  updated_at: string
  created_at: string
  orphaned: boolean
}
