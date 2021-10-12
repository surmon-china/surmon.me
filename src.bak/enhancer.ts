/**
 * @file App enhancers
 * @module app/enhancer
 * @author Surmon <https://github.com/surmon-china>
 */

import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGlobalState } from '/@/state'
import { useStore, getNamespace, Modules } from '/@/store'
import { isClient } from '/@/environment'
import { useI18n } from '/@/services/i18n'
import { useHelmet } from '/@/services/helmet'
import { useTheme, Theme } from '/@/services/theme'
import { useDefer, Defer } from '/@/services/defer'
import { useLoading, Loading } from '/@/services/loading'
import { useGtag, Gtag } from '/@/services/gtag'
import type { Popup } from '/@/services/popup'
import { usePopup } from '/@/services/popup/hook'
import { Language } from '/@/language/data'
import { OptionModuleGetters, AD_CONFIG } from '/@/store/option'

export const useEnhancer = () => {
  const store = useStore()
  const route = useRoute()
  const router = useRouter()
  const i18n = useI18n()
  const theme = useTheme()
  const helmet = useHelmet()
  const globalState = useGlobalState()

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

    adConfig,
    isMobile,
    isDarkTheme,
    isZhLang,

    defer: (isClient && useDefer()) as Defer,
    popup: (isClient && usePopup()) as Popup,
    gtag: (isClient && useGtag()) as Gtag,
    loading: (isClient && useLoading()) as Loading,
  }
}
