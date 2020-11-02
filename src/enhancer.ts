import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGlobalState } from '/@/state'
import { useStore, getNamespace, Modules } from '/@/store'
import { useI18n } from '/@/services/i18n'
import { useHelmet } from '/@/services/helmet'
import { useTheme, Theme } from '/@/services/theme'
import { useLoading } from '/@/services/loading'
import { useDefer } from '/@/services/defer'
import { usePopup } from '/@/services/popup'
import { useGtag } from '/@/services/gtag'
import { Language } from '/@/language/data'
import { OptionModuleGetters, AD_CONFIG } from '/@/store/option'

export const useEnhancer = () => {
  const store = useStore()
  const route = useRoute()
  const router = useRouter()
  const globalState = useGlobalState()
  const i18n = useI18n()
  const helmet = useHelmet()
  const theme = useTheme()
  const defer = useDefer()
  const popup = usePopup()
  const gtag = useGtag()
  const loading = useLoading()

  const isMobile = computed(() => globalState.userAgent.isMobile)
  const isDarkTheme = computed(() => theme.theme.value === Theme.Dark)
  const isZhLang = computed(() => i18n.language.value === Language.Zh)
  const adConfig = computed<AD_CONFIG>(() => store.getters[
    getNamespace(Modules.Option, OptionModuleGetters.ADConfig
  )])

  return {
    store,
    route,
    router,
    globalState,
    i18n,
    helmet,
    theme,
    defer,
    popup,
    gtag,
    adConfig,
    loading,
    isMobile,
    isDarkTheme,
    isZhLang
  }
}
