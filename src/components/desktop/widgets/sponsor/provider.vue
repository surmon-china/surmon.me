<script lang="ts" setup>
  import { computed } from 'vue'
  import { ProviderId, SponsorState } from './state'
  import type { GitHubSponsorsResponse } from '/@/server/getters/github'
  import CryptoProvider from './providers/_crypto.vue'
  import PaypalProvider from './providers/paypal.vue'
  import AlipayProvider from './providers/alipay.vue'
  import WechatpayProvider from './providers/wechat-pay.vue'
  import GithubSponsorsProvider from './providers/github-sponsors.vue'

  const props = withDefaults(
    defineProps<{
      state: SponsorState
      githubSponsorsData: GitHubSponsorsResponse | null
      githubSponsorsMaxCount?: number
    }>(),
    {
      githubSponsorsMaxCount: 19
    }
  )

  const activeProvider = computed(() => props.state.activeProvider.value)
</script>

<template>
  <div class="sponsor-provider" :class="activeProvider.id">
    <!-- github sponsors -->
    <github-sponsors-provider
      v-if="activeProvider.id == ProviderId.GitHub"
      :list-data="props.githubSponsorsData"
      :max-count="props.githubSponsorsMaxCount"
    />
    <!-- other providers -->
    <paypal-provider
      v-if="activeProvider.id == ProviderId.PayPal"
      :qrcode="activeProvider.qrcode"
      :link="activeProvider.link"
    />
    <alipay-provider
      v-if="activeProvider.id == ProviderId.Alipay"
      :qrcode="activeProvider.qrcode"
      :text="activeProvider.text"
    />
    <wechatpay-provider
      v-if="activeProvider.id == ProviderId.WeChatPay"
      :qrcode="activeProvider.qrcode"
      :text="activeProvider.text"
    />
    <crypto-provider v-if="activeProvider.id == ProviderId.BitCoin" :address="activeProvider.address" />
    <crypto-provider v-if="activeProvider.id == ProviderId.Ethereum" :address="activeProvider.address" />
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .sponsor-provider {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 18rem;
  }
</style>
