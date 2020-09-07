import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGlobalState } from '/@/state'
import { useStore } from '/@/store'
import { useI18n } from '/@/services/i18n'
import { useTheme, Theme } from '/@/services/theme'
import { useDefer } from '/@/services/defer'
import { usePopup } from '/@/services/popup'
import { useGtag } from '/@/services/gtag'
import { Language } from '/@/language/data'

export const useEnhancer = () => {
  const store = useStore()
  const route = useRoute()
  const router = useRouter()
  const globalState = useGlobalState()
  const i18n = useI18n()
  const theme = useTheme()
  const defer = useDefer()
  const popup = usePopup()
  const gtag = useGtag()

  const isMobile = computed(() => globalState.userAgent.isMobile)
  const isDarkTheme = computed(() => theme.theme.value === Theme.Dark)
  const isZhLang = computed(() => i18n.language.value === Language.Zh)

  return {
    store,
    route,
    router,
    globalState,
    i18n,
    theme,
    defer,
    popup,
    gtag,
    isMobile,
    isDarkTheme,
    isZhLang
  }
}
