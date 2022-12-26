<template>
  <div class="sponsor-provider" :class="activeProvider.id">
    <p class="external" v-if="activeProvider.link || activeProvider.address || activeProvider.text">
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
          <div class="sponsor-box" v-if="allGitHubSponsors.length">
            <p class="total">
              <i18n>
                <template #zh>
                  我在 GitHub Sponsors 累计已得到 {{ pastGitHubSponsors.length }}
                  <span class="current-total"> + {{ currentGitHubSponsors.length }}</span>
                  位赞助者的支持
                </template>
                <template #en>
                  I have accumulated {{ pastGitHubSponsors.length }}
                  <span class="current-total"> + {{ currentGitHubSponsors.length }}</span>
                  backers on GitHub Sponsors
                </template>
              </i18n>
            </p>
            <div class="sponsors">
              <ulink
                v-for="(item, index) in allGitHubSponsors.slice(0, maxSponsors)"
                :href="item.sponsor.url"
                :title="item.sponsor.name"
                :class="['item', item.active ? 'active' : 'inactive']"
                :key="index"
              >
                <uimage
                  class="avatar"
                  :src="item.sponsor.avatarUrl"
                  :alt="'@' + item.sponsor.login"
                />
              </ulink>
              <ulink
                class="more-link"
                v-if="allGitHubSponsors.length > maxSponsors"
                :href="VALUABLE_LINKS.GITHUB_SPONSORS"
                >+ {{ allGitHubSponsors.length - maxSponsors }}</ulink
              >
            </div>
          </div>
        </transition>
      </client-only>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue'
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
        default: 19
      }
    },
    setup(props) {
      const { isZhLang } = useEnhancer()
      const activeProvider = computed(() => props.state.activeProvider.value)
      const currentGitHubSponsors = computed(() => props.state.currentGitHubSponsors.value)
      const pastGitHubSponsors = computed(() => props.state.pastGitHubSponsors.value)
      const allGitHubSponsors = computed(() => {
        return [
          ...currentGitHubSponsors.value.map((sponsor) => ({
            active: true,
            sponsor
          })),
          ...pastGitHubSponsors.value.map((sponsor) => ({
            active: false,
            sponsor
          }))
        ]
      })

      const handleCopyAddress = (content: any) => {
        copy(content).then(() => {
          alert(isZhLang.value ? '地址已复制到剪贴板！' : 'Address copied!')
        })
      }

      return {
        VALUABLE_LINKS,
        ProviderId,
        providers,
        activeProvider,
        currentGitHubSponsors,
        pastGitHubSponsors,
        allGitHubSponsors,
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
        padding: 0 1em;
        line-height: 3em;
        border-radius: $sm-radius;
        background-color: $module-bg-darker-2;
        transition: background-color $transition-time-fast;
        &:hover {
          background-color: $module-bg-darker-3;
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

      .sponsor-box {
        margin-top: 2rem;
        margin-bottom: $sm-gap;

        .total {
          margin-bottom: 2rem;
          font-weight: bold;
          .current-total {
            color: $github-sponsor-primary;
          }
        }

        .sponsors {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          grid-column-gap: $sm-gap;
          grid-row-gap: $gap;

          .item {
            display: flex;
            flex-direction: column;
            &.active {
              .avatar {
                padding: 1px;
                outline: 1px solid $github-sponsor-primary;
                opacity: 0.8;
              }
              &:hover {
                .avatar {
                  opacity: 1;
                }
              }
            }
            &.inactive {
              .avatar {
                filter: grayscale(1);
                opacity: 0.7;
              }
              &:hover {
                .avatar {
                  filter: grayscale(0);
                  opacity: 1;
                }
              }
            }

            .avatar {
              width: 3rem;
              height: 3rem;
              border-radius: 100%;
              overflow: hidden;
              background-color: $module-bg-darker-1;
              transition: opacity $transition-time-fast;
            }
          }

          .more-link {
            margin-left: $sm-gap;
            display: inline-flex;
            align-items: center;
            font-weight: bold;
            font-size: $font-size-h4;
            color: $text-secondary;
            &:hover {
              color: $link-color;
            }
          }
        }
      }
    }
  }
</style>
