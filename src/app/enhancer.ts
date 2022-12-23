/**
 * @file App enhancers
 * @module app.enhancer
 * @author Surmon <https://github.com/surmon-china>
 */

import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGlobalState } from '/@/app/state'
import { useI18n } from '/@/composables/i18n'
import { useHead } from '/@/composables/head'
import { useGtag, Gtag } from '/@/composables/gtag'
import { useTheme, Theme } from '/@/composables/theme'
import { useDefer, Defer } from '/@/composables/defer'
import { useLoading, Loading } from '/@/composables/loading'
import type { Popup } from '/@/composables/popup'
import { usePopup } from '/@/composables/popup/hook'
import { useAppOptionStore } from '/@/stores/basic'
import { Language } from '/@/language'
import { UNDEFINED } from '/@/constants/value'
import { isClient } from './environment'

export const useEnhancer = () => {
  const route = useRoute()
  const router = useRouter()
  const i18n = useI18n()
  const theme = useTheme()
  const globalState = useGlobalState()
  const appOptionState = useAppOptionStore()

  const adConfig = computed(() => appOptionState.adConfig)
  const isMobile = computed(() => globalState.userAgent.isMobile)
  const isDarkTheme = computed(() => theme.theme.value === Theme.Dark)
  const isZhLang = computed(() => i18n.language.value === Language.Chinese)

  return {
    route,
    router,
    globalState,
    i18n,
    head: useHead,
    theme,

    adConfig,
    isMobile,
    isDarkTheme,
    isZhLang,

    defer: (isClient ? useDefer() : UNDEFINED) as Defer,
    popup: (isClient ? usePopup() : UNDEFINED) as Popup,
    gtag: (isClient ? useGtag() : UNDEFINED) as Gtag,
    loading: (isClient ? useLoading() : UNDEFINED) as Loading
  }
}
