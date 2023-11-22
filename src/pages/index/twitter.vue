<script lang="ts" setup>
  import { ref, shallowRef } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import { GAEventCategories } from '/@/constants/gtag'
  import SwiperClass, { Swiper, SwiperSlide } from '/@/effects/swiper'
  import { unescape, padStart, numberSplit } from '/@/transforms/text'
  import { getTwitterTweetDetailURL } from '/@/transforms/media'
  import type { TwitterAggregate } from '/@/server/getters/twitter'

  defineProps<{
    aggregate: TwitterAggregate | null
    fetching: boolean
  }>()

  const { gtag } = useEnhancer()
  const swiperRef = shallowRef<SwiperClass>()
  const prevSlide = () => swiperRef.value?.slidePrev()
  const nextSlide = () => swiperRef.value?.slideNext()
  const setSwiper = (_swiper: SwiperClass) => {
    swiperRef.value = _swiper
  }
  const activeIndex = ref(0)
  const handleSwiperTransitionStart = () => {
    activeIndex.value = swiperRef.value?.activeIndex || 0
  }

  const handleGtagEvent = (name: string) => {
    gtag?.event(name, {
      event_category: GAEventCategories.Index
    })
  }
</script>

<template>
  <div class="twitter">
    <placeholder :data="!!aggregate?.tweets.length" :loading="fetching">
      <template #placeholder>
        <empty class="twitter-empty" bold key="empty" />
      </template>
      <template #loading>
        <div class="twitter-skeleton" key="skeleton">
          <div class="left"><skeleton-line /></div>
          <div class="right"><skeleton-line /></div>
        </div>
      </template>
      <template #default>
        <div class="twitter-content" key="content">
          <div class="userinfo" v-if="aggregate?.userinfo" :title="aggregate.userinfo.name">
            <ulink class="link" :href="VALUABLE_LINKS.TWITTER" @mousedown="handleGtagEvent('twitter_homepage')">
              <uimage class="avatar" proxy :src="aggregate.userinfo.avatar" />
              <span class="logo"><i class="iconfont icon-twitter" /></span>
            </ulink>
            <div class="count">
              <p class="title">
                <template v-if="aggregate.userinfo.tweetCount">
                  {{ padStart(numberSplit(aggregate.userinfo.tweetCount), 3, '0') }}
                </template>
                <template v-else>
                  <i18n en="Latest" zh="碎碎" />
                </template>
              </p>
              <p class="secondary">
                <i18n en="tweets" :zh="aggregate.userinfo.tweetCount ? '碎碎念' : '念念'" />
              </p>
            </div>
          </div>
          <swiper
            v-if="aggregate?.tweets.length"
            class="tweets"
            direction="vertical"
            :height="66"
            :mousewheel="true"
            :allow-touch-move="false"
            :slides-per-view="1"
            :prevent-clicks="false"
            :autoplay="{ delay: 3500, disableOnInteraction: false }"
            @transition-start="handleSwiperTransitionStart"
            @swiper="setSwiper"
          >
            <swiper-slide class="tweet-item" :key="index" v-for="(tweet, index) in aggregate.tweets">
              <div class="content" :title="tweet.text">
                <div
                  v-if="tweet.text"
                  v-html="unescape(tweet.text)"
                  :class="['main', { 'has-media': tweet.mediaCount }]"
                ></div>
                <ulink
                  v-if="tweet.mediaCount"
                  :class="['medias', { empty: !tweet.text }]"
                  :href="getTwitterTweetDetailURL(tweet.owner, tweet.id)"
                  @mousedown="handleGtagEvent('twitter_image_link')"
                >
                  <template v-if="tweet.hasVideo">
                    <i class="iconfont media icon-video"></i>
                  </template>
                  <template v-else-if="tweet.hasImage">
                    <i class="iconfont media icon-image"></i>
                  </template>
                  <span class="count">[{{ tweet.mediaCount }}]</span>
                  <i class="iconfont window icon-new-window-s"></i>
                </ulink>
              </div>
              <div class="meta">
                <ulink
                  class="item link"
                  title="To Tweet"
                  :href="getTwitterTweetDetailURL(tweet.owner, tweet.id)"
                  @mousedown="handleGtagEvent('twitter_detail_link')"
                >
                  <i class="iconfont icon-retweet" v-if="tweet.isQuote || tweet.isRetweet"></i>
                  <i class="iconfont icon-follow-up" v-else-if="tweet.isReply"></i>
                  <i class="iconfont twitter icon-twitter" v-else></i>
                  <span>Tweet</span>
                  <i class="iconfont window icon-new-window-s"></i>
                </ulink>
                <span class="item reply" v-if="Number.isInteger(tweet.commentCount)">
                  <i class="iconfont icon-comment"></i>
                  <span>{{ tweet.commentCount }}</span>
                </span>
                <span class="item like" v-if="Number.isInteger(tweet.favoriteCount)">
                  <i class="iconfont icon-heart"></i>
                  <span>{{ tweet.favoriteCount }}</span>
                </span>
                <span class="item date" v-if="tweet.date">
                  <i class="iconfont icon-clock"></i>
                  <udate to="ago" :date="tweet.date" />
                </span>
                <span class="item location" :title="tweet.location" v-if="tweet.location">
                  <i class="iconfont icon-location"></i>
                  <span>{{ tweet.location }}</span>
                </span>
              </div>
            </swiper-slide>
          </swiper>
          <div class="navigation">
            <button class="button prev" :disabled="activeIndex === 0" @click="prevSlide">
              <i class="iconfont icon-totop" />
            </button>
            <button
              class="button next"
              :disabled="!!aggregate && activeIndex === aggregate?.tweets.length - 1"
              @click="nextSlide"
            >
              <i class="iconfont icon-tobottom" />
            </button>
          </div>
        </div>
      </template>
    </placeholder>
  </div>
</template>

<style lang="scss" scoped>
  @use 'sass:math';
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  $twitter-height: 66px;
  $content-height: 42px;

  .twitter-empty,
  .twitter-skeleton,
  .twitter-content {
    width: 100%;
    height: $twitter-height;
    display: flex;
  }

  .twitter-empty {
    @include common-bg-module();
    @include radius-box($sm-radius);
  }

  .twitter-skeleton {
    padding: $gap;
    background-color: $module-bg;
    @include radius-box($sm-radius);

    .left {
      width: 140px;
      margin-right: $lg-gap;
    }
    .right {
      flex: 1;
    }
  }

  .twitter-content {
    .userinfo,
    .tweets {
      @include common-bg-module();
    }

    .userinfo {
      width: auto;
      height: 100%;
      padding: 0 $gap;
      margin-right: $sm-gap;
      display: flex;
      justify-content: center;
      align-items: center;
      @include radius-box($sm-radius);
      border-top-right-radius: $mini-radius;
      border-bottom-right-radius: $mini-radius;

      .link {
        position: relative;
        background-color: $twitter-primary;
        color: $white;
        opacity: 0.9;
        @include radius-box($xs-radius);
        @include visibility-transition();
        &:hover {
          opacity: 1;
        }

        .avatar {
          width: $content-height;
          height: $content-height;
        }

        .logo {
          position: absolute;
          width: 50%;
          height: 50%;
          bottom: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          border-top-left-radius: $xs-radius;
          background-color: rgba($twitter-primary, 0.9);
        }
      }

      .count {
        min-width: 4rem;
        margin-left: 1.5rem;
        position: relative;
        display: inline-flex;
        flex-direction: column;
        justify-content: space-around;
        height: $content-height;
        padding: 0.2em 0.5em 0.26em;
        border-radius: $xs-radius;
        background-color: $module-bg-darker-1;
        &::before {
          $size: 5px;
          content: '';
          position: absolute;
          left: -$size * 2;
          top: 20%;
          width: 0;
          height: 0;
          border-top: $size solid transparent;
          border-right: $size * 2 solid $module-bg-darker-1;
          border-bottom: $size solid transparent;
        }

        .title {
          margin: 0;
          font-size: $font-size-small + 1;
          font-weight: bold;
          color: $text-secondary;
        }

        .secondary {
          margin: 0;
          color: $text-disabled;
          font-size: $font-size-root;
        }
      }
    }

    .tweets {
      flex: 1;
      height: $twitter-height;
      @include radius-box($mini-radius);

      ::v-deep(.swiper-wrapper) {
        flex-direction: column;
        &[style*='300ms'] {
          .swiper-slide-active {
            @include motion-blur-filter('vertical-small');
          }
        }
      }

      .tweet-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
        width: 100%;
        height: $twitter-height;
        padding: 0 $lg-gap;

        .content {
          display: flex;
          height: 20px;
          line-height: 20px;
          margin-bottom: 6px;
          $content-gap: 0.3em;

          .main {
            font-weight: bold;
            max-width: 100%;
            @include text-overflow();
            &.has-media {
              max-width: #{calc(100% - 40px)};
            }

            & + .medias {
              margin-left: $content-gap;
            }

            /* for html */
            ::v-deep(p) {
              margin: 0;
              max-width: 100%;
              @include text-overflow();
            }
            ::v-deep(img),
            ::v-deep(video) {
              display: none;
            }
            ::v-deep(.link) {
              font-weight: normal;
              font-size: $font-size-base - 1;
              color: $text-secondary;
              @include color-transition();
              &:hover {
                color: $link-color;
                text-decoration: underline;
              }

              & + .link {
                margin-left: $content-gap;
              }
            }
          }

          .medias {
            position: relative;
            color: $text-secondary;
            &.empty {
              color: $text;
            }
            &:hover {
              &,
              .iconfont {
                color: $link-color !important;
              }
            }

            .iconfont {
              vertical-align: top;
              @include color-transition();

              &.media {
                font-size: $font-size-base + 1;
              }

              &.window {
                color: $text-disabled;
                position: absolute;
                top: -0.6em;
                right: -1.2em;
                font-size: 8px;
              }
            }

            .count {
              margin-left: $xs-gap;
              vertical-align: top;
              font-size: $font-size-small;
              @include color-transition();
            }
          }
        }

        .meta {
          display: flex;
          align-items: center;
          width: 100%;
          overflow: hidden;

          .item {
            display: inline-block;
            margin-right: $lg-gap;
            font-size: $font-size-small;
            color: $text-divider;
            @include color-transition();
            .iconfont {
              margin-right: $xs-gap;
              font-size: $font-size-small - 1;
            }

            &.link {
              .window {
                margin-right: 0;
                margin-left: 2px;
                font-size: 10px;
              }

              &:hover {
                color: $text;
              }
            }

            &.location {
              flex: 1;
              margin-right: 0;
              @include text-overflow();
            }
          }
        }
      }
    }

    .navigation {
      width: 3rem;
      height: 100%;
      margin-left: $sm-gap;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .button {
        flex: 1;
        font-size: $font-size-small;
        text-align: center;
        color: $text-disabled;
        @include color-transition();
        @include common-bg-module();
        @include radius-box($mini-radius);

        &:not([disabled]):hover {
          color: $link-color;
        }
        &[disabled] {
          opacity: 0.8;
          color: $text-divider;
          cursor: no-drop;
        }

        &.prev {
          margin-bottom: $sm-gap;
          border-top-right-radius: $sm-radius;
        }

        &.next {
          border-bottom-right-radius: $sm-radius;
        }
      }
    }
  }
</style>
