<template>
  <div class="twitter">
    <placeholder :data="completedTweets.length" :loading="fetching">
      <template #placeholder>
        <div class="twitter-empty" key="empty">
          <empty class="empty-content">
            <i18n :k="LanguageKey.EMPTY_PLACEHOLDER" />
          </empty>
        </div>
      </template>
      <template #loading>
        <div class="twitter-skeleton" key="skeleton">
          <div class="left"><skeleton-line /></div>
          <div class="right"><skeleton-line /></div>
        </div>
      </template>
      <template #default>
        <div class="twitter-content" key="content">
          <div class="userinfo" v-if="userinfo" :title="userinfo.username">
            <ulink
              class="logo-link"
              :href="VALUABLE_LINKS.TWITTER"
              @mousedown="handleGtagEvent('twitter_homepage')"
            >
              <uimage class="avatar" proxy :src="userinfo.profile_image_url" />
              <span class="logo">
                <i class="iconfont icon-twitter" />
              </span>
            </ulink>
            <div class="counts">
              <div class="item top">
                <span class="count">{{
                  padStart(userinfo.public_metrics.tweet_count, 3, '0')
                }}</span>
                <span class="text">TS</span>
              </div>
              <div class="item bottom">
                <span class="count">{{
                  padStart(userinfo.public_metrics.followers_count, 3, '0')
                }}</span>
                <span class="text">FS</span>
              </div>
            </div>
          </div>
          <swiper
            v-if="completedTweets.length"
            class="tweets"
            direction="vertical"
            :height="66"
            :mousewheel="true"
            :allow-touch-move="false"
            :slides-per-view="1"
            :prevent-clicks="false"
            :autoplay="{ delay: 3500, disableOnInteraction: false }"
            @transition-start="handleSwiperTransitionStart"
            @swiper="handleSwiperReady"
          >
            <swiper-slide class="tweet-item" v-for="(t, index) in completedTweets" :key="index">
              <div class="content" :title="t.tweet.text">
                <div
                  class="reference"
                  v-if="t.tweet.referenced_tweets?.length"
                  :title="t.tweet.referenced_tweets[0].type"
                >
                  <i
                    class="iconfont icon-retweet"
                    v-if="['quoted', 'retweeted'].includes(t.tweet.referenced_tweets[0].type)"
                  ></i>
                  <i class="iconfont icon-follow-up" v-else></i>
                </div>
                <div
                  class="main"
                  :class="{ 'has-media': t.medias.length }"
                  v-if="t.html"
                  v-html="t.html"
                ></div>
                <ulink
                  v-if="t.medias.length"
                  class="end-link"
                  :class="{ empty: !t.html }"
                  :href="t.url"
                  @mousedown="handleGtagEvent('twitter_image_link')"
                >
                  <template v-if="t.medias.find((m) => m.type === 'video')">
                    <i class="iconfont media icon-video"></i>
                  </template>
                  <template v-else>
                    <i class="iconfont media icon-image"></i>
                  </template>
                  <span class="text">[{{ t.medias.length }}]</span>
                  <i class="iconfont window icon-new-window-s"></i>
                </ulink>
              </div>
              <div class="meta">
                <ulink
                  class="item link"
                  title="To Tweet"
                  :href="t.url"
                  @mousedown="handleGtagEvent('twitter_detail_link')"
                >
                  <i class="iconfont twitter icon-twitter"></i>
                  <span>Tweet</span>
                  <i class="iconfont window icon-new-window-s"></i>
                </ulink>
                <span class="item reply">
                  <i class="iconfont icon-comment"></i>
                  <span>{{ t.tweet.public_metrics.reply_count }}</span>
                </span>
                <span class="item like">
                  <i class="iconfont icon-heart"></i>
                  <span>{{ t.tweet.public_metrics.like_count }}</span>
                </span>
                <span class="item date">
                  <i class="iconfont icon-clock"></i>
                  <udate to="ago" :date="t.tweet.created_at" />
                </span>
                <!-- <span class="item location" :title="t.location" v-if="t.location">
                  <i class="iconfont icon-location"></i>
                  <span>{{ t.location }}</span>
                </span> -->
              </div>
            </swiper-slide>
          </swiper>
          <div class="navigation">
            <button class="button prev" :disabled="activeIndex === 0" @click="prevSlide">
              <i class="iconfont icon-totop" />
            </button>
            <button
              class="button next"
              :disabled="activeIndex === completedTweets.length - 1"
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

<script lang="ts">
  import { defineComponent, ref, computed, PropType } from 'vue'
  import { THIRD_IDS, VALUABLE_LINKS } from '/@/config/app.config'
  import { GAEventCategories } from '/@/constants/gtag'
  import { LanguageKey } from '/@/language'
  import { useEnhancer } from '/@/app/enhancer'
  import SwiperClass, { Swiper, SwiperSlide } from '/@/effects/swiper'
  import { getTwitterTweetDetailURL } from '/@/transforms/media'
  import { unescape, padStart } from '/@/transforms/text'

  export default defineComponent({
    name: 'IndexTwitter',
    components: {
      Swiper,
      SwiperSlide
    },
    props: {
      userinfo: {
        type: Object as PropType<Record<string, any>>,
        default: null
      },
      tweets: {
        type: Object,
        default: null
      },
      fetching: {
        type: Boolean,
        required: true
      }
    },
    setup(props) {
      const { gtag } = useEnhancer()
      const swiper = ref<SwiperClass>()
      const prevSlide = () => swiper.value?.slidePrev()
      const nextSlide = () => swiper.value?.slideNext()
      const handleSwiperReady = (_swiper: SwiperClass) => {
        swiper.value = _swiper
      }
      const activeIndex = ref(0)
      const handleSwiperTransitionStart = () => {
        activeIndex.value = swiper.value?.activeIndex || 0
      }

      const handleGtagEvent = (name: string) => {
        gtag?.event(name, {
          event_category: GAEventCategories.Index
        })
      }

      const getLocation = (tweet: any) => {
        if (tweet.geo?.place_id) {
          const places = props.tweets.includes.places || []
          const target = places.find((place) => place.id === tweet.geo?.place_id)
          if (target) {
            return `${target.country_code} · ${target.name}`
          }
        }
        return null
      }

      const getMedias = (tweet: any): any[] => {
        const mediaKeys = tweet.attachments?.media_keys || []
        if (mediaKeys.length) {
          const medias = props.tweets.includes.media || []
          return mediaKeys
            .map((key) => medias.find((media) => media.media_key === key))
            .filter(Boolean)
        }
        return []
      }

      const completedTweets = computed(() => {
        const tweets = props.tweets
        if (!tweets?.data) {
          return []
        }

        return tweets.data.map((tweet) => {
          const completedTweet: any = {
            tweet,
            url: getTwitterTweetDetailURL(THIRD_IDS.TWITTER_USER_ID, tweet.id),
            location: getLocation(tweet),
            medias: getMedias(tweet),
            html: unescape(tweet.text)
          }

          // text (image_url | original_tweet_url | link)
          tweet.entities?.urls?.forEach((url) => {
            if (
              // remove image | original urls from text
              url.display_url?.startsWith('pic.twitter.com/') ||
              url.display_url?.startsWith('twitter.com/')
            ) {
              completedTweet.html = completedTweet.html.replace(url.url, '')
            } else {
              // replace link urls to text
              completedTweet.html = completedTweet.html.replace(
                url.url,
                `<a
                    class="link"
                    target="_blank"
                    rel="external nofollow noopener"
                    title="${url.expanded_url}"
                    href="${url.url}"
                  >
                    <span class="text">[${url.display_url}]</span>
                  </a>
                `
              )
            }
          })
          return completedTweet
        })
      })

      return {
        VALUABLE_LINKS,
        LanguageKey,
        completedTweets,
        activeIndex,
        padStart,
        prevSlide,
        nextSlide,
        handleSwiperReady,
        handleSwiperTransitionStart,
        handleGtagEvent
      }
    }
  })
</script>

<style lang="scss" scoped>
  @use 'sass:math';
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  $twitter-height: 66px;
  $content-height: 42px;
  $userinfo-width: 140px;

  .twitter-empty,
  .twitter-skeleton,
  .twitter-content {
    position: relative;
    width: 100%;
    height: $twitter-height;
    display: flex;
  }

  .twitter-empty,
  .twitter-skeleton {
    @include common-bg-module();
    @include radius-box($sm-radius);
  }

  .twitter-empty {
    .empty-content {
      height: 100%;
      min-height: auto;
      font-weight: bold;
    }
  }

  .twitter-skeleton {
    padding: $gap;
    .left {
      width: $userinfo-width;
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
      width: $userinfo-width;
      height: 100%;
      margin-right: $gap;
      display: flex;
      justify-content: center;
      align-items: center;
      @include radius-box($sm-radius);

      .logo-link {
        position: relative;
        margin-right: 1.5rem;
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
          font-size: $font-size-small;
        }
      }

      .counts {
        position: relative;
        display: inline-flex;
        flex-direction: column;
        justify-content: space-around;
        height: $content-height;
        padding: 0.2em 0.3em 0.26em 0.5em;
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

        .item {
          .count {
            font-size: $font-size-small + 1;
            margin-right: 6px;
            font-weight: bold;
            color: $text-secondary;
          }

          .text {
            color: $text-disabled;
            font-size: $font-size-small;
            letter-spacing: 1px;
          }
        }
      }
    }

    .tweets {
      flex: 1;
      height: $twitter-height;
      @include radius-box($sm-radius);
      border-top-right-radius: $mini-radius;
      border-bottom-right-radius: $mini-radius;

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

          .reference {
            margin-right: $xs-gap;
            color: $text-secondary;
          }

          .main {
            max-width: 96%;
            font-weight: bold;
            @include text-overflow();
            &.has-media {
              max-width: #{calc(100% - 40px)};
            }

            & + .end-link {
              margin-left: $content-gap;
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

              .iconfont {
                margin-right: -3px;
                color: $text-secondary;
              }
            }
          }

          .end-link {
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

            .text {
              margin-left: $xs-gap;
              vertical-align: top;
              font-size: $font-size-small;
              @include color-transition();
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
        @include radius-box($sm-radius);
        border-top-left-radius: $mini-radius;
        border-bottom-left-radius: $mini-radius;

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
          border-bottom-right-radius: $mini-radius;
        }

        &.next {
          border-top-right-radius: $mini-radius;
        }
      }
    }
  }
</style>
