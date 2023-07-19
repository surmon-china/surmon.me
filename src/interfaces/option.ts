import { UniversalKeyValue } from './common'

export interface AppAdConfig {
  PC_CARROUSEL?: {
    index: number
    url: string
    src: string
    title: string
  }
  PC_NAV?: Array<{
    icon: string
    color: string
    url: string
    text?: string
    i18n: {
      en: string
      zh: string
    }
  }>
  PC_ASIDE_SWIPER?: Array<{
    url: string
    src: string
  }>
}

export interface AppOption {
  title: string
  sub_title: string
  description: string
  keywords: Array<string>
  statement: string
  site_url: string
  site_email: string
  meta: {
    likes: number
  }
  friend_links: Array<UniversalKeyValue>
  ad_config: string
}

export interface AdminInfo {
  name: string
  slogan: string
  avatar: string
}
