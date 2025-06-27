import { VALUABLE_LINKS } from '/@/configs/app.config'
import { LanguageKey } from '/@/language'
import { RouteName, CategorySlug } from '/@/app/router'
import { getPageRoute, getCategoryFlowRoute } from '/@/transforms/route'
import { getPageURL } from '/@/transforms/url'

export interface MenuItem {
  id: string
  route?: string
  url?: string
  i18nKey: LanguageKey
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
    i18nKey: LanguageKey.PAGE_HOME
  },
  {
    id: CategorySlug.Code,
    route: getCategoryFlowRoute(CategorySlug.Code),
    icon: 'icon-code',
    i18nKey: LanguageKey.CATEGORY_CODE
  },
  {
    id: CategorySlug.Insight,
    route: getCategoryFlowRoute(CategorySlug.Insight),
    icon: 'icon-insight',
    i18nKey: LanguageKey.CATEGORY_INSIGHT
  },
  {
    id: 'github',
    url: VALUABLE_LINKS.GITHUB,
    icon: 'icon-github',
    i18nKey: LanguageKey.PAGE_GITHUB,
    newWindow: true
  },
  {
    id: RouteName.Photography,
    route: getPageRoute(RouteName.Photography),
    icon: 'icon-lens',
    i18nKey: LanguageKey.PAGE_PHOTOGRAPHY
  },
  {
    id: RouteName.Snippets,
    route: getPageRoute(RouteName.Snippets),
    i18nKey: LanguageKey.PAGE_SNIPPETS,
    icon: 'icon-buddhism'
  },
  {
    id: RouteName.About,
    route: getPageRoute(RouteName.About),
    icon: 'icon-swordsman',
    i18nKey: LanguageKey.PAGE_ABOUT
  },
  {
    id: RouteName.Guestbook,
    route: getPageRoute(RouteName.Guestbook),
    i18nKey: LanguageKey.PAGE_GUESTBOOK,
    icon: 'icon-comment'
  },
  {
    id: 'sponsor',
    route: getPageRoute(RouteName.Sponsor),
    icon: 'icon-peachblossom',
    i18nKey: LanguageKey.PAGE_SPONSOR,
    hot: true,
    divider: true
  }
  // {
  //   id: RouteName.App,
  //   route: getPageRoute(RouteName.App),
  //   imageIcon: getPageURL('/images/page-app/logo.png'),
  //   i18nKey: LanguageKey.PAGE_APP,
  //   divider: true
  // }
]
