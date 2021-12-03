/**
 * @file App enhancers
 * @module app.enhancer
 * @author Surmon <https://github.com/surmon-china>
 */

import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGlobalState } from '/@/app/state'
import { isClient } from '/@/app/environment'
import { useI18n } from '/@/services/i18n'
import { useMeta, meatTitle } from '/@/services/meta'
import { useTheme, Theme } from '/@/services/theme'
import { useDefer, Defer } from '/@/services/defer'
import { useLoading, Loading } from '/@/services/loading'
import { useGtag, Gtag } from '/@/services/gtag'
import type { Popup } from '/@/services/popup'
import { usePopup } from '/@/services/popup/hook'
import { Language } from '/@/language/data'
import { useMetaStore } from '/@/store/meta'

export const useEnhancer = () => {
  const route = useRoute()
  const router = useRouter()
  const i18n = useI18n()
  const theme = useTheme()
  const globalState = useGlobalState()
  const metaStore = useMetaStore()

  const adConfig = computed(() => metaStore.adConfig)
  const isMobile = computed(() => globalState.userAgent.isMobile)
  const isDarkTheme = computed(() => theme.theme.value === Theme.Dark)
  const isZhLang = computed(() => i18n.language.value === Language.Zh)

  return {
    route,
    router,
    globalState,
    i18n,
    meta: useMeta,
    title: meatTitle,
    theme,

    adConfig,
    isMobile,
    isDarkTheme,
    isZhLang,

    defer: (isClient && useDefer()) as Defer,
    popup: (isClient && usePopup()) as Popup,
    gtag: (isClient && useGtag()) as Gtag,
    loading: (isClient && useLoading()) as Loading
  }
}
