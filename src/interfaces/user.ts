import { ExtraKeyValue } from './extra'

export enum UserType {
  Moderator = 1,
  Standard = 2,
  Patron = 3
}

export enum UserIdentityProvider {
  GitHub = 'github',
  Google = 'google'
}

export interface UserIdentity {
  provider: UserIdentityProvider
  uid: string
  email: string | null
  username: string | null
  display_name: string | null
  avatar_url: string | null
  profile_url: string | null
  linked_at: string
}

export interface User {
  id: number
  type: UserType
  name: string
  email: string | null
  website: string | null
  avatar_url: string | null
  identities: UserIdentity[]
  extras: ExtraKeyValue[]
  disabled: boolean
  created_at: string
  updated_at: string
}

export type UserPublic = Required<Pick<User, 'id' | 'type' | 'name' | 'website' | 'avatar_url'>>
