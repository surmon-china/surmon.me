import { ref, computed } from 'vue'
import { useEnhancer } from '/@/app/enhancer'
import { GAEventCategories } from '/@/constants/gtag'
import { TunnelModule } from '/@/constants/tunnel'
import tunnel from '/@/services/tunnel'
import { IDENTITIES, VALUABLE_LINKS } from '/@/config/app.config'
import type { GitHubSponsorsResponse } from '/@/server/getters/github'

export enum ProviderId {
  GitHub = 'github',
  PayPal = 'paypal',
  Alipay = 'alipay',
  WeChatPay = 'wechat-pay',
  BitCoin = 'bitcoin',
  Ethereum = 'ethereum'
}

export const providerIds = Object.values(ProviderId)
export const providers = [
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
    qrcode: '/images/third-party/paypal-qrcode.png'
  },
  {
    id: ProviderId.Alipay,
    title: '支付宝',
    text: '通过支付宝客户端扫码',
    logo: '/images/third-party/alipay-logo.svg',
    qrcode: '/images/third-party/alipay-qrcode.png'
  },
  {
    id: ProviderId.WeChatPay,
    title: '微信赞赏',
    text: '通过微信客户端扫码',
    logo: '/images/third-party/wechat-pay-logo.svg',
    qrcode: '/images/third-party/wechat-pay-qrcode.jpg'
  },
  {
    id: ProviderId.BitCoin,
    title: 'BTC',
    address: IDENTITIES.BTC_ADDRESS,
    logo: '/images/third-party/btc-logo.svg',
    qrcode: '/images/third-party/btc-qrcode.png'
  },
  {
    id: ProviderId.Ethereum,
    title: 'ETH',
    address: IDENTITIES.ETH_ADDRESS,
    logo: '/images/third-party/eth-logo.svg',
    qrcode: '/images/third-party/eth-qrcode.png'
  }
]

export type SponsorState = ReturnType<typeof useSponsorState>
export const useSponsorState = (initId?: ProviderId) => {
  const { gtag } = useEnhancer()
  const activeId = ref(initId && providerIds.includes(initId) ? initId : providers[0].id)
  const activeProvider = computed(() => providers.find((t) => t.id === activeId.value)!)

  const githubSponsorsLoading = ref<boolean>(false)
  const githubSponsorsResponse = ref<GitHubSponsorsResponse | null>(null)
  const currentGitHubSponsors = computed(() => {
    return githubSponsorsResponse.value?.sponsors.edges.map((edge) => edge.node) || []
  })
  const pastGitHubSponsors = computed(() => {
    // 1. sort by TIMESTAMP/DESC
    // 2. filter out current sponsors
    // 3. the latest user to cancel is at the head of the array
    // 4. no cancellation events for one-time sponsor
    const list = githubSponsorsResponse.value?.sponsorsActivities.nodes || []
    const currentSponsorsLogin = currentGitHubSponsors.value.map((sponsor) => sponsor.login)
    const pastList = list.filter((node) => {
      return (
        !currentSponsorsLogin.includes(node.sponsor.login) &&
        node.sponsor.login !== 'ghost' &&
        (node.action === 'CANCELLED_SPONSORSHIP' || node.sponsorsTier.isOneTime)
      )
    })
    return pastList.map((item) => item.sponsor)
  })

  const ensureGitHubSponsors = () => {
    if (githubSponsorsResponse.value || githubSponsorsLoading.value) {
      return
    }
    githubSponsorsLoading.value = true
    tunnel
      .dispatch(TunnelModule.GitHubSponsors)
      .then((response) => {
        githubSponsorsResponse.value = response
      })
      .finally(() => {
        githubSponsorsLoading.value = false
      })
  }

  const setProviderId = (id: ProviderId) => {
    if (!providerIds.includes(id)) {
      return
    }
    // set provider ID
    activeId.value = id
    // fetch github sponsors
    if (id === ProviderId.GitHub) {
      ensureGitHubSponsors()
    }
    // push event
    gtag?.event('sponsor_modal_switch', {
      event_category: GAEventCategories.Widget
    })
  }

  // init github sponsors
  if (activeId.value === ProviderId.GitHub) {
    ensureGitHubSponsors()
  }

  return {
    activeId,
    activeProvider,
    setProviderId,
    githubSponsorsResponse,
    currentGitHubSponsors,
    pastGitHubSponsors,
    githubSponsorsLoading
  }
}
