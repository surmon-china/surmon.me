<script lang="ts" setup>
  import { useUniversalFetch } from '/@/universal'
  import { LanguageKey } from '/@/language'
  import type { ZhihuAnswerItem } from '/@/server/getters/zhihu'
  import PageBanner from '/@/components/common/banner.vue'
  import Loadmore from '/@/components/common/loadmore.vue'
  import { getZhihuAnswerDetailURL } from '/@/transforms/media'
  import { scrollToNextScreen } from '/@/utils/scroller'
  import { openNewWindow } from '/@/utils/opener'
  import { i18nTitle, useAnswersPageData, useAnswersPageMeta } from '../shared'
  import AnswerCard from '../card.vue'

  const { zhihuLatestAnswers, loading, finished, allAnswers, fetchMoreAnswers } = useAnswersPageData()

  const fetchMoreAnswersAndNextScreen = () => {
    fetchMoreAnswers().then(() => {
      scrollToNextScreen()
    })
  }

  const openZhihuLink = (answer: ZhihuAnswerItem) => {
    openNewWindow(getZhihuAnswerDetailURL(answer.question.id, answer.id))
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
          <ul class="answer-list">
            <li class="answer-item" v-for="(answer, index) in allAnswers" :key="index">
              <answer-card :answer="answer" @click="openZhihuLink(answer)" />
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
