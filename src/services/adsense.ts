/**
 * @file Google Adsense
 * @module service/adsense
 * @author Surmon <https://github.com/surmon-china>
 */

import { App, defineComponent, h } from 'vue'
import { useEnhancer } from '../app/enhancer'
import loadScript from '/@/utils/script-loader'
import { LANGUAGE_KEYS } from '/@/language/key'

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export interface IAdsenseConfig {
  ID: string
  enabledAutoAD?: boolean
}

const ADS_SCRIPT = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'

const getComponent = (clientID: string) =>
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
        const { class: rootClass, insClass, insStyle, ...restAttrs } = props
        return h(
          'div',
          {
            class: ['mammon-box', rootClass],
            placeholder: i18n.t(LANGUAGE_KEYS.AD)
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
              'data-ad-client': clientID,
              ...restAttrs
            }),
            h('script', `(adsbygoogle = window.adsbygoogle || []).push({})`)
          ]
        )
      }
    }
  })

export default {
  install(app: App, adsenseConfig: IAdsenseConfig) {
    const component = getComponent(adsenseConfig.ID)
    app.component(component.name, component)
    if (adsenseConfig.enabledAutoAD) {
      loadScript(ADS_SCRIPT, { async: true }).then(() => {
        const adsbygoogle = window.adsbygoogle || []
        adsbygoogle.push({
          google_ad_client: adsenseConfig.ID,
          enable_page_level_ads: true
        })
      })
    }
  }
}
