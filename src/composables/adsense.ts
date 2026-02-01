/**
 * @file Google Adsense
 * @module composable/adsense
 * @author Surmon <https://github.com/surmon-china>
 */

import type { App, Plugin } from 'vue'
import { defineComponent, h } from 'vue'
import { LocalesKey } from '/@/locales'
import { useEnhancer } from '/@/app/enhancer'

const ADS_SCRIPT = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'

const createComponent = (clientId: string) => {
  return defineComponent({
    name: 'Adsense',
    props: {
      class: String,
      insClass: {
        type: String,
        default: ''
      },
      insStyle: {
        type: String,
        default: 'display:block;'
      },
      dataAdClient: String,
      dataAdSlot: String,
      dataAdLayoutKey: String,
      dataAdTest: String,
      dataAdFormat: String,
      dataFullWidthResponsive: [Boolean, String]
    },
    setup(props) {
      const { i18n } = useEnhancer()

      return () => {
        const {
          class: rootClass,
          insClass,
          insStyle,
          dataAdClient,
          dataAdSlot,
          dataAdLayoutKey,
          dataAdTest,
          dataAdFormat,
          dataFullWidthResponsive,
          ...restAttrs
        } = props

        return h(
          'div',
          {
            class: ['mammon-box', rootClass],
            placeholder: i18n.t(LocalesKey.AD)
          },
          [
            h('script', {
              type: 'text/javascript',
              async: 'true',
              src: `${ADS_SCRIPT}?client=${dataAdClient || clientId}`
            }),
            h('ins', {
              class: ['adsbygoogle', insClass],
              style: insStyle,
              'data-ad-client': dataAdClient || clientId,
              'data-ad-slot': dataAdSlot,
              'data-ad-layout-key': dataAdLayoutKey,
              'data-ad-test': dataAdTest,
              'data-ad-format': dataAdFormat,
              'data-full-width-responsive': dataFullWidthResponsive,
              ...restAttrs
            }),
            h('script', `(adsbygoogle = window.adsbygoogle || []).push({})`)
          ]
        )
      }
    }
  })
}

export interface GoogleAdsenseConfig {
  id: string
}

export const adsense: Plugin<GoogleAdsenseConfig> = {
  install(app: App, adsenseConfig: GoogleAdsenseConfig) {
    const component = createComponent(adsenseConfig.id)
    app.component(component.name!, component)
  }
}

declare module 'vue' {
  interface GlobalComponents {
    Adsense: ReturnType<typeof createComponent>
  }
}
