import { ref, computed } from 'vue'
import { useEnhancer } from '/@/app/enhancer'
import { GAEventCategories } from '/@/constants/gtag'
import { IDENTITIES, GO_LINK_MAP } from '/@/configs/app.config'

export enum ProviderId {
  GitHub = 'github',
  PayPal = 'paypal',
  Alipay = 'alipay',
  WeChatPay = 'wechat-pay',
  BitCoin = 'bitcoin',
  Ethereum = 'ethereum'
}

export const PROVIDER_IDS = Object.values(ProviderId)
export const PROVIDERS = [
  {
    id: ProviderId.GitHub,
    title: 'GitHub Sponsors',
    logo: '/images/third-party/github-sponsors-logo.svg'
  },
  {
    id: ProviderId.PayPal,
    title: 'PayPal me',
    logo: '/images/third-party/paypal-logo.svg',
    qrcode: '/images/third-party/paypal-qrcode.webp',
    link: GO_LINK_MAP.paypal
  },
  {
    id: ProviderId.Alipay,
    title: '支付宝',
    logo: '/images/third-party/alipay-logo.svg',
    qrcode: '/images/third-party/alipay-qrcode.webp',
    text: '通过支付宝扫码'
  },
  {
    id: ProviderId.WeChatPay,
    title: '微信赞赏',
    logo: '/images/third-party/wechat-pay-logo.svg',
    qrcode: '/images/third-party/wechat-pay-qrcode.webp',
    text: '通过微信扫码'
  },
  {
    id: ProviderId.BitCoin,
    title: 'BTC',
    logo: '/images/third-party/btc-logo.svg',
    address: IDENTITIES.BTC_ADDRESS,
    qrcode: '/images/third-party/btc-qrcode.webp'
  },
  {
    id: ProviderId.Ethereum,
    title: 'ETH',
    logo: '/images/third-party/eth-logo.svg',
    address: IDENTITIES.ETH_ADDRESS,
    qrcode: '/images/third-party/eth-qrcode.webp'
  }
] as const

export type SponsorState = ReturnType<typeof useSponsorState>
export const useSponsorState = (initId?: ProviderId) => {
  const { gtag } = useEnhancer()
  const activeId = ref(initId && PROVIDER_IDS.includes(initId) ? initId : PROVIDERS[0].id)
  const activeProvider = computed(() => PROVIDERS.find((t) => t.id === activeId.value)!)

  const setProviderId = (id: ProviderId) => {
    if (PROVIDER_IDS.includes(id)) {
      activeId.value = id
      gtag?.event('sponsor_tab_switch', {
        event_category: GAEventCategories.Widget
      })
    }
  }

  return {
    activeId,
    activeProvider,
    setProviderId
  }
}
