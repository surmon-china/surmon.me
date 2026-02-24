<script lang="ts" setup>
  import { ref, shallowRef } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { GAEventCategories } from '/@/constants/google-analytics'
  import SwiperClass, { Swiper, SwiperSlide } from '/@/effects/swiper'
  import type { ThreadsProfile, ThreadsMedia } from '/@/server/getters/threads'
  import { unescape } from '/@/transforms/text'

  defineProps<{
    profile: ThreadsProfile | null
    medias: Array<ThreadsMedia>
    fetching: boolean
  }>()

  const { gtag, goLinks, isCNUser } = useEnhancer()

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

  const isMediaPost = (media: ThreadsMedia) => {
    return ['AUDIO', 'IMAGE', 'VIDEO', 'CAROUSEL_ALBUM'].includes(media.media_type)
  }

  const handleGtagEvent = (name: string) => {
    gtag?.event(name, {
      event_category: GAEventCategories.Index
    })
  }
</script>

<template>
  <div class="threads">
    <placeholder :loading="fetching" :has-data="!!profile">
      <template #placeholder>
        <empty class="threads-empty" bold />
      </template>
      <template #loading>
        <div class="threads-skeleton">
          <skeleton class="profile" />
          <skeleton class="content" />
        </div>
      </template>
      <template #default>
        <div class="threads-content">
          <div class="profile" v-if="profile">
            <ulink
              class="link"
              :href="goLinks.threads"
              :title="profile.name"
              @mousedown="handleGtagEvent('threads_homepage')"
            >
              <uimage class="avatar" :src="profile.avatar_url" :proxy="isCNUser" defer />
              <span class="logo"><i class="iconfont icon-threads" /></span>
            </ulink>
            <div class="count">
              <p class="title">
                <i18n en="Latest" zh="近时" />
              </p>
              <p class="secondary">
                <i18n en="threads" zh="一念" />
              </p>
            </div>
          </div>
          <div class="posts">
            <empty class="posts-empty" bold key="empty" v-if="!medias.length" />
            <swiper
              v-else
              class="posts-swiper"
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
              <swiper-slide class="post-item" :key="index" v-for="(media, index) in medias">
                <div class="content">
                  <div
                    v-if="media.text"
                    :title="media.text"
                    v-html="unescape(media.text)"
                    :class="['main', { 'has-media': isMediaPost(media) }]"
                  ></div>
                  <ulink
                    v-if="isMediaPost(media)"
                    :class="['medias', { empty: !media.text }]"
                    :href="media.permalink"
                    @mousedown="handleGtagEvent('threads_image_link')"
                  >
                    <template v-if="media.media_type === 'VIDEO'">
                      <i class="iconfont media icon-video"></i>
                    </template>
                    <template v-else-if="media.media_type === 'AUDIO'">
                      <i class="iconfont media icon-audio"></i>
                    </template>
                    <template
                      v-else-if="media.media_type === 'IMAGE' || media.media_type === 'CAROUSEL_ALBUM'"
                    >
                      <i class="iconfont media icon-image"></i>
                    </template>
                    <span class="count" v-if="media.children?.data?.length"
                      >[{{ media.children.data.length }}]</span
                    >
                    <i class="iconfont window icon-new-window-s"></i>
                  </ulink>
                </div>
                <div class="meta">
                  <ulink
                    class="link"
                    title="To Post"
                    :href="media.permalink"
                    @mousedown="handleGtagEvent('threads_detail_link')"
                  >
                    <i class="iconfont icon-repost" v-if="media.is_quote_post"></i>
                    <i class="iconfont icon-threads" v-else></i>
                    <span>thread</span>
                    <span class="new-window-icon">
                      <i class="iconfont icon-new-window-s"></i>
                    </span>
                  </ulink>
                  <div class="divider" />
                  <span class="date" v-if="media.timestamp">
                    <udate to="ago" :date="media.timestamp" />
                  </span>
                </div>
              </swiper-slide>
            </swiper>
          </div>
          <div class="navigation">
            <button class="button prev" :disabled="!medias.length || activeIndex === 0" @click="prevSlide">
              <i class="iconfont icon-totop" />
            </button>
            <button
              class="button next"
              :disabled="!medias.length || activeIndex === medias.length - 1"
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
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  $threads-height: 66px;
  $content-height: 42px;

  .threads-empty,
  .threads-skeleton,
  .threads-content {
    width: 100%;
    height: $threads-height;
    display: flex;
  }

  .threads-empty {
    @include mix.common-bg-module();
    @include mix.radius-box($radius-sm);
  }

  .threads-skeleton {
    padding: $gap-sm;
    background-color: $module-bg;
    @include mix.radius-box($radius-sm);

    .profile {
      width: 10rem;
      margin-right: $gap;
    }
    .content {
      flex: 1;
    }
  }

  .threads-content {
    .profile,
    .posts {
      @include mix.common-bg-module();
    }

    .profile {
      width: auto;
      height: 100%;
      padding: 0 0.8rem;
      margin-right: $gap-xs;
      display: flex;
      justify-content: center;
      align-items: center;
      @include mix.radius-box($radius-sm);
      border-top-right-radius: $radius-tiny;
      border-bottom-right-radius: $radius-tiny;

      .link {
        position: relative;
        border-radius: $radius-xs;
        overflow: hidden;
        &:hover {
          .logo {
            @include mix.visible();
          }
        }

        .avatar {
          width: $content-height;
          height: $content-height;
          background-color: $module-bg-darker-2;
        }

        .logo {
          position: absolute;
          width: 100%;
          height: 100%;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba($threads-primary, 0.4);
          color: $white;
          @include mix.visibility-transition();
          @include mix.hidden();
        }
      }

      .count {
        min-width: 2rem;
        margin-left: 1.2rem;
        position: relative;
        display: inline-flex;
        flex-direction: column;
        justify-content: space-around;
        height: $content-height;
        padding: 0.2rem 0.4rem;
        border-radius: $radius-xs;
        background-color: $module-bg-darker-1;
        &::before {
          $size: 4px;
          content: '';
          position: absolute;
          left: -$size * 2;
          top: 25%;
          width: 0;
          height: 0;
          border-top: $size solid transparent;
          border-right: $size * 2 solid $module-bg-darker-1;
          border-bottom: $size solid transparent;
        }

        .title {
          margin: 0;
          font-weight: bold;
          color: $color-text-secondary;
        }

        .secondary {
          margin: 0;
          color: $color-text-disabled;
          font-size: $font-size-tertiary;
        }
      }
    }

    .posts {
      flex: 1;
      height: $threads-height;
      @include mix.radius-box($radius-tiny);

      .posts-empty {
        min-height: auto;
      }

      .posts-swiper {
        ::v-deep(.swiper-wrapper) {
          flex-direction: column;
          &[style*='300ms'] {
            .swiper-slide-active {
              @include global.motion-blur-filter('vertical-small');
            }
          }
        }
      }

      .post-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
        width: 100%;
        height: $threads-height;
        padding: 0 $gap;

        .content {
          display: flex;
          height: 20px;
          line-height: 20px;
          margin-bottom: 6px;
          $content-gap: 0.3em;

          .main {
            font-weight: bold;
            max-width: 100%;
            @include mix.text-overflow();
            &.has-media {
              max-width: #{calc(100% - 42px)};
            }
            & + .medias {
              margin-left: $content-gap;
            }
          }

          .medias {
            position: relative;
            color: $color-text-secondary;
            &.empty {
              color: $color-text;
            }
            &:hover {
              &,
              .iconfont {
                color: $color-link !important;
              }
            }

            .iconfont {
              vertical-align: top;
              @include mix.color-transition();

              &.media {
                font-size: $font-size-base + 1;
              }

              &.window {
                color: $color-text-disabled;
                position: absolute;
                top: -0.6em;
                right: -1.2em;
                font-size: 8px;
              }
            }

            .count {
              margin-left: $gap-tiny;
              vertical-align: top;
              font-size: $font-size-h6;
              @include mix.color-transition();
            }
          }
        }

        .meta {
          width: 100%;
          display: flex;
          align-items: center;
          overflow: hidden;
          $meta-color: $color-text-divider;

          .link {
            display: inline-block;
            font-size: $font-size-tertiary;
            color: $meta-color;
            @include mix.color-transition();
            &:hover {
              color: $color-text;
            }

            > .iconfont {
              margin-right: math.div($gap-tiny, 2);
              font-size: $font-size-tertiary;
            }

            .new-window-icon {
              margin-left: math.div($gap-tiny, 2);
              font-size: $font-size-quinary;
            }
          }

          .divider {
            height: 0.6em;
            width: 1px;
            background-color: $meta-color;
            margin-inline: $gap;
          }

          .date {
            font-size: $font-size-tertiary;
            color: $meta-color;
          }
        }
      }
    }

    .navigation {
      width: 2.6rem;
      height: 100%;
      margin-left: $gap-xs;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .button {
        flex: 1;
        text-align: center;
        font-size: $font-size-h5;
        color: $color-text-disabled;
        @include mix.color-transition();
        @include mix.common-bg-module();
        @include mix.radius-box($radius-tiny);

        &:not([disabled]):hover {
          color: $color-link;
        }
        &[disabled] {
          opacity: 0.8;
          color: $color-text-divider;
          cursor: no-drop;
        }

        &.prev {
          margin-bottom: $gap-xs;
          border-top-right-radius: $radius-sm;
        }

        &.next {
          border-bottom-right-radius: $radius-sm;
        }
      }
    }
  }
</style>
