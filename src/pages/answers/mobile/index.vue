<script lang="ts" setup>
  import { useUniversalFetch } from '/@/universal'
  import { LanguageKey } from '/@/language'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import PageBanner from '/@/components/common/banner.vue'
  import Loadmore from '/@/components/common/loadmore.vue'
  import { getZhihuAnswerDetailURL } from '/@/transforms/media'
  import { scrollToNextScreen } from '/@/utils/scroller'
  import { i18nTitle, useAnswersPageData, useAnswersPageMeta } from '../shared'
  import AnswerCard from '../card.vue'

  const { zhihuLatestAnswers, loading, finished, allAnswers, fetchMoreAnswers } = useAnswersPageData()

  const fetchMoreAnswersAndNextScreen = () => {
    fetchMoreAnswers().then(() => {
      scrollToNextScreen()
    })
  }

  useAnswersPageMeta()
  useUniversalFetch(() => zhihuLatestAnswers.fetch())
</script>

<template>
  <div class="answers-page">
    <page-banner :is-mobile="true" image="/images/page-answers/banner-mobile.webp" :image-position="80" cdn>
      <template #title><i18n :k="LanguageKey.PAGE_ANSWERS" /></template>
      <template #description><i18n v-bind="i18nTitle" /></template>
    </page-banner>
    <placeholder :data="zhihuLatestAnswers.data?.data" :loading="zhihuLatestAnswers.fetching">
      <template #loading>
        <div class="module-loading" key="loading">
          <div class="item" v-for="item in 3" :key="item">
            <div class="item-skeleton" v-for="i in 3" :key="i">
              <skeleton-line />
            </div>
          </div>
        </div>
      </template>
      <template #default>
        <div class="module-content">
          <div class="statistics">
            <ulink class="item" :href="VALUABLE_LINKS.ZHIHU">
              <div class="logo"><i class="iconfont icon-zhihu-full"></i></div>
              <div class="description">
                {{ zhihuLatestAnswers?.data?.paging.totals ?? '-' }}
                <i18n zh="个回答" en="answers" />
              </div>
            </ulink>
            <divider type="vertical" />
            <ulink class="item" :href="VALUABLE_LINKS.QUORA">
              <div class="logo quora"><i class="iconfont icon-quora-full"></i></div>
              <div class="description">-</div>
            </ulink>
          </div>
          <ul class="answer-list">
            <li class="answer-item" v-for="(answer, index) in allAnswers" :key="index" data-allow-mismatch>
              <ulink :href="getZhihuAnswerDetailURL(answer.question.id, answer.id)">
                <answer-card :answer="answer" />
              </ulink>
            </li>
          </ul>
          <loadmore
            v-if="!zhihuLatestAnswers.fetching && !finished"
            class="loadmore"
            :loading="loading"
            @loadmore="fetchMoreAnswersAndNextScreen"
          >
            <template #normal>
              <button class="normal" @click="fetchMoreAnswersAndNextScreen">
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
  @import '/src/styles/variables.scss';
  @import '/src/styles/mixins.scss';

  .answers-page {
    $item-gap: 1.4rem;

    .module-loading {
      padding: 0;
      margin-top: $item-gap;

      .item {
        padding: $gap-lg;
        margin-bottom: $item-gap;
        @include common-bg-module();
        @include radius-box($radius-sm);
        &:last-child {
          margin-bottom: 0;
        }

        .item-skeleton {
          height: 2rem;
          margin-bottom: $gap-lg;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    .module-content {
      margin-top: $item-gap;

      .statistics {
        margin: $item-gap 0;
        padding: 1.8rem $gap-lg;
        border-radius: $radius-lg;
        background-color: $module-bg-translucent;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

        .item {
          text-align: center;

          .logo {
            margin-bottom: $gap-xs;
            font-size: $font-size-h1;
            &.quora {
              display: flex;
              $size: $font-size-h3 * 2;
              height: $size;
              line-height: $size;
              font-size: $size;
            }
          }

          .description {
            font-weight: bold;
            font-size: $font-size-small;
            color: $color-text-secondary;
            text-transform: uppercase;
          }
        }
      }

      .answer-list {
        margin: 0;
        padding: 0;
        list-style: none;

        .answer-item {
          @include radius-box($radius-sm);
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
