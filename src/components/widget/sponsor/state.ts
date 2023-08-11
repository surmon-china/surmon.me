import { ref, computed } from 'vue'
import { useEnhancer } from '/@/app/enhancer'
import { GAEventCategories } from '/@/constants/gtag'
import { useSponsorStore } from '/@/stores/sponsor'
import { IDENTITIES, VALUABLE_LINKS } from '/@/config/app.config'

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
    link: VALUABLE_LINKS.PAYPAL,
    logo: '/images/third-party/paypal-logo.svg',
    qrcode: '/images/third-party/paypal-qrcode.webp'
  },
  {
    id: ProviderId.Alipay,
    title: '支付宝',
    text: '通过支付宝客户端扫码',
    logo: '/images/third-party/alipay-logo.svg',
    qrcode: '/images/third-party/alipay-qrcode.webp'
  },
  {
    id: ProviderId.WeChatPay,
    title: '微信赞赏',
    text: '通过微信客户端扫码',
    logo: '/images/third-party/wechat-pay-logo.svg',
    qrcode: '/images/third-party/wechat-pay-qrcode.webp'
  },
  {
    id: ProviderId.BitCoin,
    title: 'BTC',
    address: IDENTITIES.BTC_ADDRESS,
    logo: '/images/third-party/btc-logo.svg',
    qrcode: '/images/third-party/btc-qrcode.webp'
  },
  {
    id: ProviderId.Ethereum,
    title: 'ETH',
    address: IDENTITIES.ETH_ADDRESS,
    logo: '/images/third-party/eth-logo.svg',
    qrcode: '/images/third-party/eth-qrcode.webp'
  }
]

export type SponsorState = ReturnType<typeof useSponsorState>
export const useSponsorState = (initId?: ProviderId) => {
  const { gtag } = useEnhancer()
  const githubSponsor = useSponsorStore()
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
    setProviderId,
    githubSponsor
  }
}
