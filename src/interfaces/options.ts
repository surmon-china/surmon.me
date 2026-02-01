export interface AppRemoteConfig {
  [key: string]: any
  ABOUT_BIOGRAPHY_ZH?: string
  ABOUT_BIOGRAPHY_EN?: string
  ABOUT_GEO_TITLE_ZH?: string
  ABOUT_GEO_TITLE_EN?: string
  ABOUT_GEO_COORDINATES?: [number, number]
  ABOUT_SPECIAL_LINKS?: Array<{
    name: string
    url: string
  }>
  AD_PC_CARROUSEL?: {
    index: number
    url: string
    src: string
    title: string
  }
  AD_PC_NAV?: Array<{
    icon: string
    color: string
    url: string
    text?: string
    i18n: {
      en: string
      zh: string
    }
  }>
  AD_PC_SIDEBAR_SWIPER?: Array<{
    url: string
    src: string
  }>
}

export interface AppOptions {
  title: string
  sub_title: string
  description: string
  keywords: Array<string>
  site_url: string
  site_email: string
  statement: string
  friend_links: Array<{ name: string; url: string }>
  app_config: string
}

export interface AdminProfile {
  name: string
  slogan: string
  avatar: string
}
