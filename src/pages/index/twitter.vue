<template>
  <div class="twitter">
    <placeholder :data="completedTweets.length" :loading="fetching">
      <template #placeholder>
        <empty class="twitter-empty" key="empty">
          <i18n :lkey="LANGUAGE_KEYS.EMPTY_PLACEHOLDER" />
        </empty>
      </template>
      <template #loading>
        <div class="twitter-skeleton" key="skeleton">
          <div class="left">
            <skeleton-line />
          </div>
          <div class="right">
            <skeleton-line />
          </div>
        </div>
      </template>
      <template #default>
        <div class="warpper" key="warpper" v-if="userinfo && tweets">
          <div class="user">
            <div class="userinfo" :title="userinfo.username">
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
                  <span class="text">TWES</span>
                </div>
                <div class="item bottom">
                  <span class="count">{{
                    padStart(userinfo.public_metrics.followers_count, 3, '0')
                  }}</span>
                  <span class="text">FOLS</span>
                </div>
              </div>
            </div>
          </div>
          <swiper
            class="swiper"
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
                <div class="reference" v-if="t.tweet.referenced_tweets?.length">[R]</div>
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
                  <span>{{ humanlizeDate(t.tweet.created_at) }}</span>
                </span>
                <span class="item location" :title="t.location" v-if="t.location">
                  <i class="iconfont icon-location"></i>
                  <span>{{ t.location }}</span>
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
  import { useEnhancer } from '/@/app/enhancer'
  import { THIRD_IDS, VALUABLE_LINKS } from '/@/config/app.config'
  import { GAEventCategories } from '/@/constants/gtag'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import SwiperClass, { Swiper, SwiperSlide } from '/@/services/swiper'
  import { getTwitterTweetDetailURL } from '/@/transforms/media'
  import { timeAgo } from '/@/transforms/moment'
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
      const { i18n, gtag } = useEnhancer()
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

      const humanlizeDate = (date: string) => {
        return timeAgo(date, i18n.language.value as any)
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

          // text (urls | image | link)
          tweet.entities?.urls?.forEach((url) => {
            if (url.display_url?.startsWith('pic.twitter.com')) {
              // remove image urls from text
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
        LANGUAGE_KEYS,
        completedTweets,
        activeIndex,
        padStart,
        humanlizeDate,
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
  @import 'src/styles/init.scss';

  $twitter-height: 66px;
  $content-height: 42px;
  $userinfo-width: 12rem;

  .twitter {
    position: relative;
    height: $twitter-height;
    @include common-bg-module();
    @include radius-box($sm-radius);

    .twitter-empty {
      height: 100%;
      min-height: auto;
      font-weight: bold;
    }

    .twitter-skeleton {
      display: flex;
      width: 100%;
      height: 100%;
      padding: $sm-gap;

      .left {
        width: $userinfo-width;
        margin-right: $lg-gap;
      }
      .right {
        flex: 1;
      }
    }

    .warpper {
      display: flex;

      .user {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: $userinfo-width;
        height: $twitter-height;
        border-right: 2px solid $module-bg-darker-1;

        .userinfo {
          display: flex;

          .logo-link {
            position: relative;
            margin-right: 10px;
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
            display: inline-flex;
            flex-direction: column;
            justify-content: space-between;
            height: $content-height;

            .item {
              &.top {
                margin-top: -1px;
              }
              &.bottom {
                /* margin-bottom: -1px; */
              }

              .count {
                font-size: $font-size-small + 1;
                margin-right: 6px;
                font-weight: bold;
              }

              .text {
                color: $text-disabled;
                font-size: $font-size-small;
                letter-spacing: 1px;
              }
            }
          }
        }
      }

      .swiper {
        flex: 1;
        height: $twitter-height;

        ::v-deep(.swiper-wrapper) {
          flex-direction: column;
          &[style*='300ms'] {
            .swiper-slide-active {
              @include blur-filter('vertical-small');
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 3rem;
        height: $twitter-height;
        border-left: 1px solid $module-bg-darker-1;

        .button {
          height: 40%;
          line-height: -#{math.div($twitter-height, 2)};
          font-size: $font-size-small;
          text-align: center;
          color: $text-disabled;
          @include color-transition();
          &:not([disabled]):hover {
            color: $link-color;
          }

          &[disabled] {
            opacity: 0.8;
            color: $text-divider;
            cursor: no-drop;
          }
        }
      }
    }
  }
</style>
