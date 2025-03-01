<script lang="ts" setup>
  import { computed } from 'vue'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import { useEnhancer } from '/@/app/enhancer'
  import { copy } from '/@/utils/clipboard'
  import { ProviderId, SponsorState } from './state'

  interface Props {
    state: SponsorState
    maxSponsors?: number
  }

  const props = withDefaults(defineProps<Props>(), {
    maxSponsors: 19
  })

  const { isZhLang } = useEnhancer()
  const activeProvider = computed(() => props.state.activeProvider.value)
  const allGitHubSponsors = computed(() => {
    if (!props.state.githubSponsors.data) {
      return []
    }
    return [
      ...props.state.githubSponsors.data.currentSponsors.map((sponsor) => ({
        active: true,
        _: sponsor
      })),
      ...props.state.githubSponsors.data.pastSponsors.map((sponsor) => ({
        active: false,
        _: sponsor
      }))
    ]
  })

  const handleCopyAddress = (content: any) => {
    copy(content).then(() => {
      alert(isZhLang.value ? '地址已复制到剪贴板！' : 'Address copied!')
    })
  }
</script>

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
      <transition name="module">
        <div class="sponsor-box" v-if="allGitHubSponsors.length">
          <p class="total">
            <i18n>
              <template #zh>
                我在 GitHub Sponsors 累计已得到
                <span class="active-total"> {{ state.githubSponsors.data?.currentSponsors.length }} </span>
                + {{ state.githubSponsors.data?.pastSponsors.length }} 位赞助者的支持
              </template>
              <template #en>
                I have accumulated
                <span class="active-total">{{ state.githubSponsors.data?.currentSponsors.length }}</span>
                + {{ state.githubSponsors.data?.pastSponsors.length }} backers on GitHub Sponsors
              </template>
            </i18n>
          </p>
          <div class="sponsors">
            <ulink
              v-for="({ _: item, active }, index) in allGitHubSponsors.slice(0, maxSponsors)"
              :href="item.url"
              :title="item.name"
              :class="['item', active ? 'active' : 'inactive']"
              :key="index"
            >
              <uimage class="avatar" :src="item.avatarUrl" :alt="'@' + item.login" />
            </ulink>
            <ulink
              class="more-link"
              :href="VALUABLE_LINKS.GITHUB_SPONSORS"
              v-if="allGitHubSponsors.length > maxSponsors"
            >
              + {{ allGitHubSponsors.length - maxSponsors }}
            </ulink>
          </div>
        </div>
      </transition>
    </div>
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

    .external {
      margin-bottom: $gap;
      color: $color-text-secondary;

      .link {
        margin-left: $gap-sm;
        cursor: pointer;
        text-decoration: underline;
        color: $color-text-secondary;
        &:hover {
          color: $color-link;
        }
      }

      .iconfont {
        font-size: $font-size-small;
        color: $color-text-secondary;
        margin-left: $gap-xs;
      }
    }

    .qrcode {
      height: 14rem;
      max-height: 60%;
      border-radius: $radius-xs;
    }

    .github-sponsors {
      text-align: center;

      .link {
        display: inline-block;
        padding: 0 1em;
        line-height: 3em;
        border-radius: $radius-sm;
        background-color: $module-bg-darker-2;
        transition: background-color $motion-duration-fast;
        &:hover {
          background-color: $module-bg-darker-3;
          .text {
            color: $color-link;
          }
        }

        .iconfont {
          margin-right: $gap-sm;
          font-size: $font-size-h4;
          color: $github-sponsor-primary;
        }

        .text {
          color: $color-text;
          font-weight: bold;
        }
      }

      .sponsor-box {
        margin-top: 2rem;
        margin-bottom: $gap-sm;

        .total {
          margin-bottom: 2rem;
          font-weight: bold;
          .active-total {
            color: $github-sponsor-primary;
          }
        }

        .sponsors {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          grid-column-gap: $gap-sm;
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
              transition: opacity $motion-duration-fast;
            }
          }

          .more-link {
            margin-left: $gap-sm;
            display: inline-flex;
            align-items: center;
            font-weight: bold;
            font-size: $font-size-h4;
            color: $color-text-secondary;
            &:hover {
              color: $color-link;
            }
          }
        }
      }
    }
  }
</style>
