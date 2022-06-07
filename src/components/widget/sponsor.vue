<template>
  <div class="sponsor">
    <div class="tab">
      <template v-for="(target, index) in targets" :key="index">
        <button
          class="item"
          :class="[target.id, { active: activeTid === target.id }]"
          :title="target.title"
          @click="handleSwitch(target.id)"
        >
          <span class="logo">
            <uimage class="image" :alt="target.title" :src="target.logo" cdn />
          </span>
          <span class="title" v-if="!hideTitle">{{ target.title }}</span>
        </button>
      </template>
    </div>
    <div class="target" :class="activeTarget.id">
      <p class="external">
        <template v-if="activeTarget.link">
          <ulink class="link" :href="activeTarget.link">
            <code>{{ activeTarget.link }}</code>
          </ulink>
          <i class="iconfont icon-new-window-s"></i>
        </template>
        <template v-if="activeTarget.address">
          <code class="link" @click="handleCopyAddress(activeTarget.address)">
            {{ activeTarget.address }}
          </code>
          <i class="iconfont icon-copy"></i>
        </template>
        <template v-if="activeTarget.text">
          {{ activeTarget.text }}
          <i class="iconfont icon-qrcode"></i>
        </template>
      </p>
      <uimage class="qrcode" v-if="activeTarget.qrcode" :src="activeTarget.qrcode" cdn />
      <div class="github-sponsors" v-if="activeTarget.id == 'github'">
        <ulink class="link" :href="VALUABLE_LINKS.GITHUB_SPONSORS">
          <i class="iconfont icon-heart"></i>
          <span class="text">Sponsor me on GitHub</span>
        </ulink>
        <client-only>
          <transition name="module">
            <div v-if="ghSponsors">
              <p class="total">
                <i18n>
                  <template #zh>
                    我在 GitHub Sponsors 已得到 {{ ghSponsors.totalCount }} 位赞助者的支持。
                  </template>
                  <template #en>
                    I have {{ ghSponsors.totalCount }} backers on GitHub Sponsors.
                  </template>
                </i18n>
              </p>
              <div class="users">
                <ulink
                  class="item"
                  :href="edge.node.url"
                  :title="edge.node.name"
                  v-for="(edge, index) in ghSponsors.edges.slice(0, maxSponsors)"
                  :key="index"
                >
                  <uimage class="avatar" :src="edge.node.avatarUrl" :alt="edge.node.name" />
                </ulink>
                <ulink
                  class="more-link"
                  v-if="ghSponsors.edges.length > maxSponsors"
                  :href="VALUABLE_LINKS.GITHUB_SPONSORS + '#sponsors'"
                >
                  + {{ ghSponsors.edges.length - maxSponsors }}
                </ulink>
              </div>
            </div>
          </transition>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, onMounted } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { GAEventCategories } from '/@/constants/gtag'
  import { TunnelModule } from '/@/constants/tunnel'
  import { copy } from '/@/utils/clipboard'
  import tunnel from '/@/services/tunnel'
  import { IDENTITIES, VALUABLE_LINKS } from '/@/config/app.config'

  export default defineComponent({
    name: 'Sponsor',
    props: {
      initId: String,
      maxSponsors: {
        type: Number,
        default: 20
      },
      hideTitle: {
        type: Boolean,
        default: false
      }
    },
    setup(props) {
      const targets = [
        {
          id: 'github',
          title: 'GitHub Sponsors',
          logo: '/images/third-party/github-sponsors-logo.svg'
        },
        {
          id: 'paypal',
          title: 'PayPal me',
          link: VALUABLE_LINKS.PAYPAL,
          logo: '/images/third-party/paypal-logo.svg',
          qrcode: '/images/third-party/paypal-qrcode.png'
        },
        {
          id: 'alipay',
          title: '支付宝',
          text: '通过支付宝客户端扫码',
          logo: '/images/third-party/alipay-logo.svg',
          qrcode: '/images/third-party/alipay-qrcode.png'
        },
        {
          id: 'wechat-pay',
          title: '微信赞赏',
          text: '通过微信客户端扫码',
          logo: '/images/third-party/wechat-pay-logo.svg',
          qrcode: '/images/third-party/wechat-pay-qrcode.jpg'
        },
        {
          id: 'bitcoin',
          title: 'BTC',
          address: IDENTITIES.BTC_ADDRESS,
          logo: '/images/third-party/btc-logo.svg',
          qrcode: '/images/third-party/btc-qrcode.png'
        },
        {
          id: 'ethereum',
          title: 'ETH',
          address: IDENTITIES.ETH_ADDRESS,
          logo: '/images/third-party/eth-logo.svg',
          qrcode: '/images/third-party/eth-qrcode.png'
        }
      ]

      const { gtag } = useEnhancer()
      const activeTid = ref(targets[0].id)
      const activeTarget = computed(() => targets.find((t) => t.id === activeTid.value)!)
      const handleSwitch = (id: string) => {
        activeTid.value = id
        gtag?.event('sponsor_modal_switch', {
          event_category: GAEventCategories.Widget
        })
      }

      const handleCopyAddress = (content: any) => {
        copy(content).then(() => {
          alert(`Address copied to clipboard`)
        })
      }

      const ghSponsors = ref<any>(null)
      const ghSponsorsLoading = ref<any>(null)
      const fetchGitHubSponsors = () => {
        ghSponsorsLoading.value = true
        tunnel
          .dispatch(TunnelModule.GitHubSponsors)
          .then((response) => {
            ghSponsors.value = response
          })
          .finally(() => {
            ghSponsorsLoading.value = false
          })
      }

      onMounted(() => {
        fetchGitHubSponsors()
        if (props.initId) {
          if (targets.map((t) => t.id).includes(props.initId)) {
            activeTid.value = props.initId
          }
        }
      })

      return {
        VALUABLE_LINKS,
        activeTid,
        activeTarget,
        targets,
        ghSponsors,
        ghSponsorsLoading,
        handleSwitch,
        handleCopyAddress
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .sponsor {
    display: flex;
    flex-direction: column;

    .tab {
      display: flex;
      justify-content: space-evenly;
      align-items: center;

      .item {
        height: 5rem;
        min-width: 4rem;
        position: relative;
        display: inline-flex;
        justify-content: center;
        align-items: center;

        .logo {
          $size: 2rem;
          width: $size;
          height: $size;
          display: inline-block;
          filter: grayscale(1);
          text-align: right;

          img {
            height: $size;
            object-fit: contain;
          }
        }

        .title {
          font-weight: bold;
          margin-left: $gap;
          padding: 3px 0;
          color: $text-secondary;
          transition: color $transition-time-fast;
          border-bottom: 2px solid transparent;
        }

        &.github {
          .logo {
            img {
              height: 2.2rem;
            }
          }
        }

        &.active,
        &:hover {
          .logo {
            filter: grayscale(0);
          }
          .title {
            color: $link-color;
            border-color: $link-color;
          }
        }
      }
    }

    .target {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      min-height: 18rem;

      .external {
        margin-bottom: $gap;
        color: $text-secondary;

        .link {
          margin-left: $sm-gap;
          cursor: pointer;
          text-decoration: underline;
          color: $text-secondary;
          &:hover {
            color: $link-color;
          }
        }

        .iconfont {
          font-size: $font-size-small;
          color: $text-secondary;
          margin-left: $xs-gap;
        }
      }

      .qrcode {
        height: 14rem;
        max-height: 60%;
        border-radius: $xs-radius;
      }

      .github-sponsors {
        text-align: center;

        .link {
          display: inline-block;
          margin-bottom: 2rem;
          padding: 0 1em;
          line-height: 3em;
          border-radius: $sm-radius;
          background: $module-bg-darker-1;
          transition: background $transition-time-fast;
          &:hover {
            background: $module-bg-darker-2;
            .text {
              color: $link-color;
            }
          }

          .iconfont {
            margin-right: $sm-gap;
            color: $github-sponsor-primary;
          }

          .text {
            color: $text;
            font-weight: bold;
          }
        }

        .total {
          margin-bottom: 2rem;
          font-weight: bold;
        }

        .users {
          max-width: 40rem;
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          .more-link {
            margin-left: $sm-gap;
            line-height: 2em;
            font-weight: bold;
            font-size: $font-size-h4;
            color: $text-secondary;
            &:hover {
              color: $link-color;
            }
          }

          .item {
            display: flex;
            flex-direction: column;
            margin: $sm-gap $xs-gap;

            .avatar {
              width: 3rem;
              height: 3rem;
              border-radius: 100%;
              background-color: $module-bg-darker-1;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
</style>
