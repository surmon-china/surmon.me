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
import { useTheme } from '/@/composables/theme'
import { useGtag, Gtag } from '/@/composables/gtag'
import { useDefer, Defer } from '/@/composables/defer'
import { usePopup, Popup } from '/@/composables/popup'
import { useAppOptionsStore } from '/@/stores/foundation'
import { useGoLinksStore } from '/@/stores/go-links'
import { useIdentityStore } from '/@/stores/identity'
import { isCNCode } from '/@/transforms/region'
import { isClient } from '/@/configs/app.env'
import { Language } from '/@/locales'

export const useEnhancer = () => {
  const route = useRoute()
  const router = useRouter()
  const i18n = useI18n()
  const theme = useTheme()
  const globalState = useGlobalState()
  const appOptionsStore = useAppOptionsStore()
  const goLinksStore = useGoLinksStore()
  const identityStore = useIdentityStore()
  const cdnDomain = useCdnDomain()
  const countryCode = useCountryCode()

  return {
    route,
    router,
    i18n,
    theme,
    globalState,

    isZhLang: computed(() => i18n.language.value === Language.Chinese),
    appOptions: computed(() => appOptionsStore.data),
    appConfig: computed(() => appOptionsStore.appConfig),
    goLinks: computed(() => goLinksStore.mixedLinksMap),
    identity: identityStore,

    cdnDomain,
    countryCode,
    isCNUser: isCNCode(countryCode || 'GLOBAL'),

    defer: (isClient ? useDefer() : undefined) as Defer,
    popup: (isClient ? usePopup() : undefined) as Popup,
    gtag: (isClient ? useGtag() : undefined) as Gtag
  }
}
