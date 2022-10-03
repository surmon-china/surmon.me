<template>
  <div class="sponsor-provider" :class="activeProvider.id">
    <p class="external">
      <template v-if="activeProvider.link">
        <ulink class="link" :href="activeProvider.link">
          <code>{{ activeProvider.link }}</code>
        </ulink>
        <i class="iconfont icon-new-window-s"></i>
      </template>
      <template v-if="activeProvider.address">
        <code class="link" @click="handleCopyAddress(activeProvider.address)">
          {{ activeProvider.address }}
        </code>
        <i class="iconfont icon-copy"></i>
      </template>
      <template v-if="activeProvider.text">
        {{ activeProvider.text }}
        <i class="iconfont icon-qrcode"></i>
      </template>
    </p>
    <uimage class="qrcode" v-if="activeProvider.qrcode" :src="activeProvider.qrcode" cdn />
    <div class="github-sponsors" v-if="activeProvider.id == ProviderId.GitHub">
      <ulink class="link" :href="VALUABLE_LINKS.GITHUB_SPONSORS">
        <i class="iconfont icon-heart"></i>
        <span class="text">
          <i18n en="Sponsor me on GitHub" zh="通过 GitHub Sponsor 赞助我" />
        </span>
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
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import { useEnhancer } from '/@/app/enhancer'
  import { copy } from '/@/utils/clipboard'
  import { ProviderId, providers, SponsorState } from './state'
  export default defineComponent({
    name: 'SponsorProvider',
    props: {
      state: {
        type: Object as PropType<SponsorState>,
        required: true
      },
      maxSponsors: {
        type: Number,
        default: 20
      }
    },
    setup(props) {
      const { isZhLang } = useEnhancer()
      const handleCopyAddress = (content: any) => {
        copy(content).then(() => {
          alert(isZhLang.value ? '地址已复制到剪贴板！' : 'Address copied!')
        })
      }

      return {
        VALUABLE_LINKS,
        ProviderId,
        providers,
        activeProvider: props.state.activeProvider,
        ghSponsors: props.state.ghSponsors,
        ghSponsorsLoading: props.state.ghSponsorsLoading,
        handleCopyAddress
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .sponsor-provider {
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
        background: $module-bg-darker-2;
        transition: background $transition-time-fast;
        &:hover {
          background: $module-bg-darker-3;
          .text {
            color: $link-color;
          }
        }

        .iconfont {
          margin-right: $sm-gap;
          font-size: $font-size-h4;
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
        justify-content: center;
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
</style>
