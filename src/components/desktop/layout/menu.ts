import { LocalesKey } from '/@/locales'
import { RouteName, CategorySlug } from '/@/app/router'
import { getPageRoute, getCategoryFlowRoute } from '/@/transforms/route'
import { GO_LINKS_MAP } from '/@/configs/app.config'

export interface MenuItem {
  id: string
  route?: string
  url?: string
  i18nKey: LocalesKey
  iconFont?: string
  iconImage?: string
  divider?: boolean
  newWindow?: boolean
  badgeText?: string
}

export const menus: Array<MenuItem> = [
  {
    id: RouteName.Home,
    route: '/',
    iconFont: 'icon-home',
    i18nKey: LocalesKey.PAGE_HOME
  },
  {
    id: CategorySlug.Code,
    route: getCategoryFlowRoute(CategorySlug.Code),
    iconFont: 'icon-code',
    i18nKey: LocalesKey.CATEGORY_CODE
  },
  {
    id: CategorySlug.Insight,
    route: getCategoryFlowRoute(CategorySlug.Insight),
    iconFont: 'icon-insight',
    i18nKey: LocalesKey.CATEGORY_INSIGHT
  },
  {
    id: 'github',
    url: GO_LINKS_MAP.github,
    iconFont: 'icon-github',
    i18nKey: LocalesKey.PAGE_GITHUB,
    newWindow: true
  },
  {
    id: RouteName.Photography,
    route: getPageRoute(RouteName.Photography),
    iconFont: 'icon-lens',
    i18nKey: LocalesKey.PAGE_PHOTOGRAPHY
  },
  {
    id: RouteName.Snippets,
    route: getPageRoute(RouteName.Snippets),
    i18nKey: LocalesKey.PAGE_SNIPPETS,
    iconFont: 'icon-buddhism'
  },
  {
    id: RouteName.About,
    route: getPageRoute(RouteName.About),
    iconFont: 'icon-swordsman',
    i18nKey: LocalesKey.PAGE_ABOUT
  },
  {
    id: RouteName.Guestbook,
    route: getPageRoute(RouteName.Guestbook),
    i18nKey: LocalesKey.PAGE_GUESTBOOK,
    iconFont: 'icon-comment'
  },
  {
    id: 'sponsor',
    route: getPageRoute(RouteName.Sponsor),
    iconFont: 'icon-peachblossom',
    i18nKey: LocalesKey.PAGE_SPONSOR,
    badgeText: 'HOT',
    divider: true
  }
  // {
  //   id: RouteName.App,
  //   route: getPageRoute(RouteName.App),
  //   iconImage: '/images/page-app/logo.png',
  //   i18nKey: LocalesKey.PAGE_APP,
  //   divider: true
  // }
]
