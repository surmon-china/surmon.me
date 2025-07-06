<script lang="ts" setup>
  import { computed } from 'vue'
  import { useStores } from '/@/stores'
  import type { GitHubSponsorsResponse } from '/@/server/getters/github'

  const props = defineProps<{
    maxCount: number
    listData: GitHubSponsorsResponse | null
  }>()

  const { goLink } = useStores()
  const allSponsors = computed(() => {
    if (!props.listData) {
      return []
    }

    return [
      ...props.listData.currentSponsors.map((sponsor) => ({
        active: true,
        _: sponsor
      })),
      ...props.listData.pastSponsors.map((sponsor) => ({
        active: false,
        _: sponsor
      }))
    ]
  })
</script>

<template>
  <div class="github-sponsors">
    <ulink class="link" :href="goLink.map['github-sponsors']">
      <uimage class="icon" src="/images/third-party/github-sponsors-heart.svg" alt="GitHub Sponsors" />
      <span class="text">
        <i18n en="Sponsor me on GitHub" zh="通过 GitHub Sponsor 赞助我" />
      </span>
    </ulink>
    <transition name="module">
      <div class="sponsor-box" v-if="props.listData && allSponsors.length">
        <p class="total">
          <i18n>
            <template #zh>
              我在 GitHub Sponsors 累计已得到
              <span class="active-total"> {{ props.listData.currentSponsors.length }} </span>
              + {{ props.listData.pastSponsors.length }} 位赞助者的支持
            </template>
            <template #en>
              I have accumulated
              <span class="active-total">{{ props.listData.currentSponsors.length }}</span>
              + {{ props.listData.pastSponsors.length }} backers on GitHub Sponsors
            </template>
          </i18n>
        </p>
        <div class="sponsors">
          <ulink
            v-for="({ _: item, active }, index) in allSponsors.slice(0, props.maxCount)"
            :href="item.url"
            :title="item.name"
            :class="['item', active ? 'active' : 'inactive']"
            :key="index"
          >
            <uimage class="avatar" :src="item.avatarUrl" :alt="'@' + item.login" />
          </ulink>
          <ulink v-if="allSponsors.length > props.maxCount" class="more-link" :href="goLink.map['github-sponsors']">
            + {{ allSponsors.length - props.maxCount }}
          </ulink>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .github-sponsors {
    text-align: center;

    .link {
      display: inline-flex;
      padding: 0 1em;
      height: $gap-lg * 3;
      align-items: center;
      border-radius: $radius-sm;
      background-color: $module-bg-darker-2;
      transition: background-color $motion-duration-fast;
      &:hover {
        background-color: $module-bg-darker-3;
        .text {
          color: $color-link;
        }
      }

      .icon {
        width: $font-size-h2;
        margin-right: $gap-sm;
      }

      .text {
        color: $color-text;
        font-weight: bold;
        text-box-trim: trim-both;
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
            background-color: $module-bg-darker-2;
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
</style>
