<script lang="ts" setup>
  import { shallowRef } from 'vue'
  import { useUniversalFetch } from '/@/universal'
  import { LanguageKey } from '/@/language'
  import { NULL } from '/@/constants/value'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import type { ZhihuAnswerItem } from '/@/server/getters/zhihu'
  import PageBanner from '/@/components/common/banner.vue'
  import Loadmore from '/@/components/common/loadmore.vue'
  import { i18nTitle, useSnippetsPageMeta, useSnippetsPageData } from '../shared'
  import AnswerMasonryList from './masonry.vue'
  import AnswerDetail from '../detail.vue'
  import AnswerCard from '../card.vue'

  const modalActiveAnswer = shallowRef<ZhihuAnswerItem | null>(null)
  const openAnswerModal = (answer: ZhihuAnswerItem) => {
    modalActiveAnswer.value = answer
  }
  const closeAnswerModal = () => {
    modalActiveAnswer.value = NULL
  }

  const { zhihuLatestAnswers, loading, finished, allAnswers, fetchMoreAnswers } = useSnippetsPageData()

  useSnippetsPageMeta()
  useUniversalFetch(() => zhihuLatestAnswers.fetch())
</script>

<template>
  <div class="answers-page">
    <page-banner class="page-banner" video="/videos/clips/forest-1.mp4" :video-position="72" cdn>
      <template #title>
        <webfont><i18n v-bind="i18nTitle" /></webfont>
      </template>
      <template #description>
        <ulink :href="VALUABLE_LINKS.ZHIHU" class="link"><i class="iconfont icon-zhihu-full"></i></ulink>
        <divider type="vertical" size="lg" color="#ffffffcc" />
        <ulink :href="VALUABLE_LINKS.THREADS" class="link">
          <i class="iconfont icon-threads"></i>
          Threads
        </ulink>
        <divider type="vertical" size="lg" color="#ffffffcc" />
        <ulink :href="VALUABLE_LINKS.QUORA" class="link">
          <i class="iconfont icon-quora"></i>
          Quora
        </ulink>
      </template>
    </page-banner>
    <container class="page-bridge"></container>
    <container class="page-content">
      <placeholder :data="zhihuLatestAnswers.data?.data" :loading="zhihuLatestAnswers.fetching">
        <template #placeholder>
          <empty class="answers-empty" key="empty">
            <i18n :k="LanguageKey.EMPTY_PLACEHOLDER" />
          </empty>
        </template>
        <template #loading>
          <div key="loading" class="answers-loading">
            <div class="item" v-for="item in 3 * 3" :key="item">
              <div class="item-skeleton" v-for="i in 3" :key="i">
                <skeleton-line />
              </div>
            </div>
          </div>
        </template>
        <template #default>
          <div>
            <answer-masonry-list :answers="allAnswers" :cols="3">
              <template #answer="{ answer }">
                <answer-card :answer="answer" @click="openAnswerModal(answer)" />
              </template>
            </answer-masonry-list>
            <loadmore
              v-if="!zhihuLatestAnswers.fetching && !finished"
              class="loadmore"
              :loading="loading"
              @loadmore="fetchMoreAnswers"
            >
              <template #normal>
                <button class="normal" @click="fetchMoreAnswers">
                  <i class="iconfont icon-loadmore"></i>
                </button>
              </template>
              <template #loading>
                <loading-indicator class="loading" width="2.4rem" height="1.4rem" gap="1rem" />
              </template>
            </loadmore>
          </div>
        </template>
      </placeholder>
    </container>
    <client-only>
      <popup :visible="!!modalActiveAnswer" :scroll-close="false" @close="closeAnswerModal">
        <div class="answer-detail-wrapper">
          <answer-detail v-if="modalActiveAnswer" :answer="modalActiveAnswer" />
        </div>
      </popup>
    </client-only>
  </div>
</template>

<style lang="scss" scoped>
  @import '/src/styles/variables.scss';
  @import '/src/styles/mixins.scss';

  .answers-page {
    min-height: $full-page-active-content-height;

    .page-banner {
      .link {
        color: $white;
        text-decoration: underline;
        text-decoration-color: rgba($white, 0.6);
        text-underline-offset: 6px;

        .iconfont {
          font-weight: normal;
        }
      }
    }

    .page-bridge {
      position: relative;
      height: 4rem;
      background: linear-gradient(to right, transparent, $module-bg-opaque, transparent);
    }

    .page-content {
      margin: 4rem 0;

      .loadmore {
        margin-top: 4rem;
        color: $color-text-disabled;
        .normal {
          font-size: $font-size-h1;
        }
        .loading {
          margin: $gap-sm 0;
        }
      }
    }

    .answers-loading {
      padding: 0;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: $gap * 4;

      .item {
        padding: $gap * 2;
        @include common-bg-module();
        @include radius-box($radius-sm);

        .item-skeleton {
          height: 2rem;
          margin-bottom: 2rem;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    .answers-empty {
      font-weight: bold;
      font-size: $font-size-h3;
    }
  }
</style>
