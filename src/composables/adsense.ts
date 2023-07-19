/**
 * @file Google Adsense
 * @module composable.adsense
 * @author Surmon <https://github.com/surmon-china>
 */

import { App, defineComponent, h } from 'vue'
import { useEnhancer } from '/@/app/enhancer'
import { LanguageKey } from '/@/language'
import { loadScript } from '/@/utils/scripter'

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export interface AdSenseConfig {
  id: string
  enabledAutoAd?: boolean
}

const ADS_SCRIPT = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'

const getComponent = (clientId: string) =>
  defineComponent({
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
            placeholder: i18n.t(LanguageKey.AD)
          },
          [
            h('script', {
              type: 'text/javascript',
              async: 'true',
              src: ADS_SCRIPT
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

export default {
  install(app: App, adsenseConfig: AdSenseConfig) {
    const component = getComponent(adsenseConfig.id)
    app.component(component.name, component)
    // auto ad
    if (adsenseConfig.enabledAutoAd) {
      loadScript(ADS_SCRIPT, { async: true }).then(() => {
        const adsbygoogle = window.adsbygoogle || []
        adsbygoogle.push({
          google_ad_client: adsenseConfig.id,
          enable_page_level_ads: true
        })
      })
    }
  }
}
