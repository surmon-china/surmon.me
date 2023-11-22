<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue'
  import { useUniversalFetch } from '/@/universal'
  import { useArchiveStore } from '/@/stores/archive'
  import { LanguageKey } from '/@/language'
  import { numberSplit } from '/@/transforms/text'
  import { getArticleDetailRoute } from '/@/transforms/route'
  import PageBanner from '/@/components/common/banner.vue'
  import ArchiveTree from './tree.vue'
  import { i18ns, useArchivePageMeta, useArchivePageStatistics } from './shared'

  const archiveStore = useArchiveStore()
  const statisticState = useArchivePageStatistics()
  const statisticFetching = ref(true)
  const statistics = computed(() => [
    statisticState.statistics.value.todayViews,
    statisticState.statistics.value.articles,
    statisticState.statistics.value.comments,
    statisticState.statistics.value.totalLikes,
    statisticState.statistics.value.totalViews
  ])

  useArchivePageMeta()
  useUniversalFetch(() => archiveStore.fetch())
  onMounted(() => {
    statisticState.fetch().finally(() => {
      statisticFetching.value = false
    })
  })
</script>

<template>
  <div class="archive-page">
    <page-banner image="/images/page-archive/banner.webp" :image-position="34" cdn>
      <template #title>
        <webfont><i18n v-bind="i18ns.title" /></webfont>
      </template>
      <template #description>
        <i18n v-bind="i18ns.description" />
      </template>
    </page-banner>
    <container class="statistic-warpper">
      <transition name="module" mode="out-in">
        <div class="skeletons" v-if="statisticFetching">
          <skeleton-base class="item" :key="s" v-for="s in statistics.length" />
        </div>
        <div class="statistics" v-else>
          <div class="item" :key="index" v-for="(s, index) in statistics">
            <p class="title">
              <span class="text">{{ s.title }}</span>
              <span class="icon">
                <i class="iconfont" :class="s.icon"></i>
              </span>
            </p>
            <div class="content">{{ s.content }}</div>
          </div>
        </div>
      </transition>
    </container>
    <container class="archive-warpper">
      <placeholder :data="archiveStore.data?.articles.length" :loading="archiveStore.fetching">
        <template #placeholder>
          <empty class="archive-empty" bold key="empty">
            <i18n :k="LanguageKey.ARTICLE_PLACEHOLDER" />
          </empty>
        </template>
        <template #loading>
          <ul class="archive-skeleton" key="skeleton">
            <li v-for="item in 9" :key="item" class="item">
              <skeleton-line v-for="i in 3" :key="i" class="line" />
            </li>
          </ul>
        </template>
        <template #default>
          <archive-tree class="archive-content" :tree="archiveStore.tree" key="content">
            <template #title="{ title }">
              <h1 class="archive-title">{{ title }}</h1>
            </template>
            <template #article="{ article, day }">
              <div class="archive-article">
                <div class="left">
                  <h3 class="title">
                    <span class="date">D{{ day }}</span>
                    <a
                      class="link"
                      target="_blank"
                      :title="article.title"
                      :href="getArticleDetailRoute(article.id)"
                    >
                      {{ article.title }}
                    </a>
                  </h3>
                  <p class="description" v-html="article.description" />
                </div>
                <div class="metas">
                  <div class="item views">
                    <i class="iconfont icon-eye"></i>
                    <span class="text">{{ numberSplit(article.meta.views) }}</span>
                  </div>
                  <divider type="vertical" />
                  <div class="item likes">
                    <i class="like-icon iconfont icon-like"></i>
                    <span class="text">{{ article.meta.likes }}</span>
                  </div>
                  <divider type="vertical" />
                  <div class="item comments">
                    <i class="iconfont icon-comment"></i>
                    <span class="text">{{ article.meta.comments }}</span>
                  </div>
                </div>
              </div>
            </template>
          </archive-tree>
        </template>
      </placeholder>
    </container>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .archive-page {
    .statistic-warpper {
      padding: 3rem 0;
      background-color: $module-bg-translucent;

      .skeletons,
      .statistics {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }

      .skeletons {
        .item {
          width: 5em;
          height: 2em;
        }
      }

      .statistics {
        .item {
          display: inline-flex;
          flex-direction: column;

          .title {
            display: flex;
            align-items: center;
            margin-bottom: 0;

            .text {
              text-transform: uppercase;
              color: $text-secondary;
            }

            .icon {
              margin-left: $sm-gap;
              display: inline-block;
              font-size: $font-size-h6;
              color: $text-divider;
            }
          }

          .content {
            font-size: $font-size-h1 * 1.3;
            font-weight: bold;
          }
        }
      }
    }

    .archive-warpper {
      padding: 3rem 0;
      overflow: hidden;

      .archive-empty {
        min-height: 28rem;
      }

      .archive-skeleton {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 3rem;

        .item {
          width: 100%;
          padding: 2rem;
          background-color: $module-bg-translucent;
          @include radius-box($lg-radius);
          &:last-child {
            margin-bottom: 0;
          }

          .line {
            height: 2rem;
            margin-bottom: 2rem;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }

      .archive-content {
        margin-top: -1rem;

        .archive-title {
          margin: 2em 0;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.2em;
        }

        .archive-article {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: $gap * 3;
          padding-left: $gap * 4;
          padding-right: $gap * 3;

          .left {
            .title {
              margin: $gap 0;
              .date {
                display: inline-block;
                width: 2rem;
                margin-right: $gap;
                color: $text-divider;
                font-size: $font-size-h4;
                font-weight: bold;
              }

              .link {
                @include text-underline(0.4em);
                text-decoration-color: $text-secondary;
              }
            }

            .description {
              margin-bottom: $gap;
              padding-left: 3rem;
            }
          }

          .metas {
            margin-left: 2em;
            display: inline-flex;
            align-items: center;
            font-size: $font-size-h4;
            color: $text-disabled;

            .item {
              width: 4em;
              text-align: center;
              &.views {
                width: 5em;
              }

              .iconfont {
                margin-right: $sm-gap;
              }
              .text {
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }
</style>
