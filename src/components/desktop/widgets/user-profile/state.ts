import { ref, computed } from 'vue'
import { useEnhancer } from '/@/app/enhancer'
import { GAEventCategories } from '/@/constants/google-analytics'
import { createLogger } from '/@/utils/logger'

export const logger = createLogger('APP:User')

export enum TabKeys {
  Profile = 'profile',
  Connections = 'connections',
  Comments = 'comments'
}

export const TABS = [
  {
    id: TabKeys.Profile,
    i18n: { zh: '个人资料', en: 'Profile' }
  },
  {
    id: TabKeys.Connections,
    i18n: { zh: '账号绑定', en: 'Connections' }
  },
  {
    id: TabKeys.Comments,
    i18n: { zh: '我的评论', en: 'Comments' }
  }
]

export const useTabState = (initialTabKey: TabKeys) => {
  const { gtag } = useEnhancer()
  const activeId = ref<TabKeys>(initialTabKey)
  const activeTab = computed(() => TABS.find((t) => t.id === activeId.value)!)

  const setTabKey = (id: TabKeys) => {
    activeId.value = id
    gtag?.event('user_tab_switch', {
      event_category: GAEventCategories.User
    })
  }

  return {
    activeId,
    activeProvider: activeTab,
    setTabKey
  }
}
