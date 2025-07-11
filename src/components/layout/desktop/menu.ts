import { LocaleKey } from '/@/locales'
import { RouteName, CategorySlug } from '/@/app/router'
import { getPageRoute, getCategoryFlowRoute } from '/@/transforms/route'
import { GO_LINK_MAP } from '/@/configs/app.config'

export interface MenuItem {
  id: string
  route?: string
  url?: string
  i18nKey: LocaleKey
  icon?: string
  imageIcon?: string
  divider?: boolean
  newWindow?: boolean
  disabledUppercase?: boolean
  hot?: boolean
}

export const menus: Array<MenuItem> = [
  {
    id: RouteName.Home,
    route: '/',
    icon: 'icon-home',
    i18nKey: LocaleKey.PAGE_HOME
  },
  {
    id: CategorySlug.Code,
    route: getCategoryFlowRoute(CategorySlug.Code),
    icon: 'icon-code',
    i18nKey: LocaleKey.CATEGORY_CODE
  },
  {
    id: CategorySlug.Insight,
    route: getCategoryFlowRoute(CategorySlug.Insight),
    icon: 'icon-insight',
    i18nKey: LocaleKey.CATEGORY_INSIGHT
  },
  {
    id: 'github',
    url: GO_LINK_MAP.github,
    icon: 'icon-github',
    i18nKey: LocaleKey.PAGE_GITHUB,
    newWindow: true
  },
  {
    id: RouteName.Photography,
    route: getPageRoute(RouteName.Photography),
    icon: 'icon-lens',
    i18nKey: LocaleKey.PAGE_PHOTOGRAPHY
  },
  {
    id: RouteName.Snippets,
    route: getPageRoute(RouteName.Snippets),
    i18nKey: LocaleKey.PAGE_SNIPPETS,
    icon: 'icon-buddhism'
  },
  {
    id: RouteName.About,
    route: getPageRoute(RouteName.About),
    icon: 'icon-swordsman',
    i18nKey: LocaleKey.PAGE_ABOUT
  },
  {
    id: RouteName.Guestbook,
    route: getPageRoute(RouteName.Guestbook),
    i18nKey: LocaleKey.PAGE_GUESTBOOK,
    icon: 'icon-comment'
  },
  {
    id: 'sponsor',
    route: getPageRoute(RouteName.Sponsor),
    icon: 'icon-peachblossom',
    i18nKey: LocaleKey.PAGE_SPONSOR,
    hot: true,
    divider: true
  }
  // {
  //   id: RouteName.App,
  //   route: getPageRoute(RouteName.App),
  //   imageIcon: getPageURL('/images/page-app/logo.png'),
  //   i18nKey: LocaleKey.PAGE_APP,
  //   divider: true
  // }
]
