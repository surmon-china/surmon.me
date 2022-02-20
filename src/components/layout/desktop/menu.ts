import { RouteName, CategorySlug } from '/@/app/router'
import { getPageRoute, getCategoryFlowRoute } from '/@/transforms/route'
import { LanguageKey } from '../../../language'
import { VALUABLE_LINKS } from '/@/config/app.config'

export interface MenuItem {
  id: string
  icon: string
  i18nKey: LanguageKey
  divider?: boolean
  newWindow?: boolean
  hot?: boolean
  route?: string
  url?: string
}

export const menus: Array<MenuItem> = [
  {
    id: RouteName.Home,
    route: '/',
    icon: 'icon-home-fill',
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
    icon: 'icon-thinking',
    i18nKey: LanguageKey.CATEGORY_INSIGHT
  },
  {
    id: 'github',
    url: VALUABLE_LINKS.GITHUB,
    icon: 'icon-github',
    newWindow: true,
    i18nKey: LanguageKey.PAGE_GITHUB
  },
  {
    id: RouteName.Lens,
    route: getPageRoute(RouteName.Lens),
    icon: 'icon-lens',
    i18nKey: LanguageKey.PAGE_LENS
  },
  {
    id: RouteName.About,
    route: getPageRoute(RouteName.About),
    icon: 'icon-swordsman',
    i18nKey: LanguageKey.PAGE_ABOUT
  },
  /*
  {
    id: RouteName.Job,
    route: getPageRoute(RouteName.Job),
    icon: 'icon-horse',
    i18nKey: LanguageKey.PAGE_JOB
  },
  */
  {
    id: RouteName.Freelancer,
    route: getPageRoute(RouteName.Freelancer),
    icon: 'icon-coin-s',
    i18nKey: LanguageKey.PAGE_FREELANCER
  },
  {
    id: RouteName.Guestbook,
    route: getPageRoute(RouteName.Guestbook),
    icon: 'icon-comment',
    i18nKey: LanguageKey.PAGE_GUESTBOOK
  },
  {
    id: RouteName.App,
    route: getPageRoute(RouteName.App),
    divider: true,
    icon: 'icon-app',
    i18nKey: LanguageKey.PAGE_APP
  },
  {
    id: RouteName.Merch,
    route: getPageRoute(RouteName.Merch),
    divider: true,
    hot: true,
    icon: 'icon-rubik',
    i18nKey: LanguageKey.PAGE_MERCH
  }
]
