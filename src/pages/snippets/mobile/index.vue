<script lang="ts" setup>
  import { useUniversalFetch } from '/@/universal'
  import { LanguageKey } from '/@/language'
  import { IDENTITIES, VALUABLE_LINKS } from '/@/configs/app.config'
  import PageBanner from '/@/components/common/banner.vue'
  import Loadmore from '/@/components/common/loadmore.vue'
  import { scrollToNextScreen } from '/@/utils/scroller'
  import { i18nTitle, useSnippetsPageMeta } from '../shared'
  import { useThreadsMediasData } from '../threads/shared'
  import ThreadsCard from '../threads/card.vue'

  const { latestThreadsStore, loading, finished, allMedias, fetchMoreMedias } = useThreadsMediasData()

  const fetchMoreMediasAndNextScreen = () => {
    fetchMoreMedias().then(() => {
      scrollToNextScreen()
    })
  }

  useSnippetsPageMeta()
  useUniversalFetch(() => latestThreadsStore.fetch())
</script>

<template>
  <div class="snippets-page">
    <page-banner :is-mobile="true" image="/images/page-snippets/banner-mobile.webp" :image-position="80" cdn>
      <template #title><i18n :k="LanguageKey.PAGE_SNIPPETS" /></template>
      <template #description><i18n v-bind="i18nTitle" /></template>
    </page-banner>
    <placeholder :data="latestThreadsStore.data?.data" :loading="latestThreadsStore.fetching">
      <template #loading>
        <div class="snippets-loading" key="loading">
          <div class="socials">
            <skeleton-base class="item" :key="s" v-for="s in 3" />
          </div>
          <div class="cards" v-for="item in 3" :key="item">
            <div class="item" v-for="i in 2" :key="i">
              <skeleton-line />
            </div>
          </div>
        </div>
      </template>
      <template #default>
        <div class="snippets-content">
          <div class="socials">
            <ulink class="item" :href="VALUABLE_LINKS.THREADS_FOLLOW">
              <p class="platform">
                <i class="iconfont icon-threads"></i>
                <span class="text">Threads</span>
              </p>
              <p class="username">@{{ IDENTITIES.INSTAGRAM_USERNAME }}</p>
            </ulink>
            <divider type="vertical" />
            <ulink class="item" :href="VALUABLE_LINKS.ZHIHU">
              <p class="platform">
                <i class="iconfont icon-zhihu-full"></i>
                <span class="text">回答</span>
              </p>
              <p class="username">@{{ IDENTITIES.ZHIHU_USERNAME }}</p>
            </ulink>
          </div>
          <ul class="cards">
            <li class="item" v-for="(media, index) in allMedias" :key="index" data-allow-mismatch>
              <ulink :href="media.permalink">
                <threads-card :media="media" />
              </ulink>
            </li>
          </ul>
          <loadmore
            v-if="!latestThreadsStore.fetching && !finished"
            class="loadmore"
            :loading="loading"
            @loadmore="fetchMoreMediasAndNextScreen"
          >
            <template #normal>
              <button class="normal" @click="fetchMoreMediasAndNextScreen">
                <i class="iconfont icon-loadmore"></i>
              </button>
            </template>
            <template #loading>
              <loading-indicator class="loading" width="2rem" height="1.2rem" gap="0.68rem" />
            </template>
          </loadmore>
        </div>
      </template>
    </placeholder>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .snippets-page {
    $item-gap: 1.4rem;

    .snippets-loading {
      padding: 0;
      margin-top: $item-gap;

      .socials,
      .cards {
        padding: $gap-lg;
        margin-bottom: $item-gap;
        @include mix.common-bg-module();
        @include mix.radius-box($radius-sm);
      }

      .socials {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .item {
          width: 28%;
          height: 4rem;
        }
      }

      .cards {
        &:last-child {
          margin-bottom: 0;
        }

        .item {
          height: 2rem;
          margin-bottom: 2rem;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    .snippets-content {
      margin-top: $item-gap;

      .socials {
        margin: $item-gap 0;
        padding: $gap-lg;
        border-radius: $radius-lg;
        background-color: $module-bg-translucent;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .item {
          flex: 1;
          text-align: center;

          .platform {
            margin-bottom: $gap-sm;
            font-size: $font-size-h4;

            .iconfont {
              margin-right: $gap-xs;
            }
            .text {
              font-weight: bold;
            }
          }

          .username {
            margin: 0;
            font-family: $font-family-monospace;
            font-size: $font-size-small;
            color: $color-text-secondary;
          }
        }
      }

      .cards {
        margin: 0;
        padding: 0;
        list-style: none;

        .item {
          @include mix.radius-box($radius-sm);
          margin-bottom: 1.4rem;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }

      .loadmore {
        margin-top: $gap-lg;
        color: $color-text-disabled;

        .normal {
          width: 100%;
          font-size: $font-size-h2;
        }

        .loading {
          margin: $gap-sm 0;
        }

        .finished {
          margin: $gap-xs 0;
          color: $color-text-divider;
          font-weight: bold;
        }
      }
    }
  }
</style>
