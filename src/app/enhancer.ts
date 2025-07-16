/**
 * @file App enhancers
 * @module app/enhancer
 * @author Surmon <https://github.com/surmon-china>
 */

import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCdnDomain, useCountryCode } from '/@/app/context'
import { useGlobalState } from '/@/app/state'
import { useI18n } from '/@/composables/i18n'
import { useGtag, Gtag } from '/@/composables/gtag'
import { useTheme, Theme } from '/@/composables/theme'
import { useDefer, Defer } from '/@/composables/defer'
import type { Popup } from '/@/composables/popup'
import { usePopup } from '/@/composables/popup/hook'
import { useAppOptionStore } from '/@/stores/basic'
import { isCNCode } from '/@/transforms/region'
import { isClient } from '/@/configs/app.env'
import { Language } from '/@/locales'

export const useEnhancer = () => {
  const route = useRoute()
  const router = useRouter()
  const i18n = useI18n()
  const theme = useTheme()
  const globalState = useGlobalState()
  const appOptionStore = useAppOptionStore()

  const cdnDomain = useCdnDomain()
  const countryCode = useCountryCode()

  const adConfig = computed(() => appOptionStore.adConfig)
  const isDarkTheme = computed(() => theme.theme.value === Theme.Dark)
  const isZhLang = computed(() => i18n.language.value === Language.Chinese)

  return {
    route,
    router,
    i18n,
    theme,
    globalState,

    cdnDomain,
    countryCode,
    isCNUser: isCNCode(countryCode || 'GLOBAL'),

    adConfig,
    isDarkTheme,
    isZhLang,

    defer: (isClient ? useDefer() : undefined) as Defer,
    popup: (isClient ? usePopup() : undefined) as Popup,
    gtag: (isClient ? useGtag() : undefined) as Gtag
  }
}
