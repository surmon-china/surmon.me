<script lang="ts" setup>
  import SwiperClass, { Swiper, SwiperSlide } from '/@/effects/swiper'
  import { ref, shallowRef } from 'vue'
  import { LocalesKey } from '/@/locales'
  import type { Announcement } from '/@/interfaces/announcement'
  import Markdown from '/@/components/common/markdown.vue'

  defineProps<{
    announcements: Array<Announcement>
    fetching: boolean
  }>()

  const activeIndex = ref(0)
  const swiperRef = shallowRef<SwiperClass>()
  const setSwiper = (_swiper: SwiperClass) => {
    swiperRef.value = _swiper
  }

  const prevSlide = () => swiperRef.value?.slidePrev()
  const nextSlide = () => swiperRef.value?.slideNext()
  const handleSwiperTransitionStart = () => {
    activeIndex.value = swiperRef.value?.activeIndex || 0
  }
</script>

<template>
  <div class="announcement">
    <placeholder :data="announcements.length" :loading="fetching">
      <template #placeholder>
        <empty class="announcement-empty" key="empty">
          <i18n :k="LocalesKey.EMPTY_PLACEHOLDER" />
        </empty>
      </template>
      <template #loading>
        <div class="announcement-skeleton" key="skeleton">
          <div class="left">
            <skeleton-line />
          </div>
          <div class="right">
            <skeleton-line />
          </div>
        </div>
      </template>
      <template #default>
        <div class="wrapper" key="wrapper">
          <div class="background" :data-content="announcements[activeIndex]?.content" />
          <div class="title">
            <span class="icon-box" :style="{ transform: `rotate(-${activeIndex * 135}deg)` }">
              <i class="iconfont icon-windmill" />
            </span>
          </div>
          <div class="swiper-box">
            <swiper
              class="swiper"
              direction="vertical"
              :height="42"
              :allow-touch-move="false"
              :slides-per-view="1"
              :set-wrapper-size="true"
              :autoplay="{ delay: 3500, disableOnInteraction: false }"
              @transition-start="handleSwiperTransitionStart"
              @swiper="setSwiper"
            >
              <swiper-slide v-for="(ann, index) in announcements" :key="index">
                <markdown class="content" :plain="true" :markdown="ann.content" />
                <div class="date" data-allow-mismatch>
                  <udate to="ago" :date="ann.created_at" />
                </div>
              </swiper-slide>
            </swiper>
            <div class="navigation">
              <div class="button prev" :class="{ disabled: activeIndex === 0 }" @click="prevSlide">
                <i class="iconfont icon-announcement-prev" />
              </div>
              <div
                class="button next"
                :class="{ disabled: activeIndex === announcements.length - 1 }"
                @click="nextSlide"
              >
                <i class="iconfont icon-announcement-next" />
              </div>
            </div>
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

  $announcement-height: 42px;
  $title-width: 10%;
  $content-width: 100% - $title-width;
  $demarcation-width: 74%;

  .announcement {
    position: relative;
    margin-bottom: $gap-lg;
    height: $announcement-height;
    line-height: $announcement-height;
    font-size: $font-size-h6;
    color: $color-text-secondary;
    @include mix.common-bg-module();
    @include mix.radius-box($radius-xs);

    .announcement-empty {
      height: 100%;
      min-height: auto;
    }

    .announcement-skeleton {
      display: flex;
      width: 100%;
      height: 100%;
      padding: $gap-sm;

      .left {
        width: 68%;
        margin-right: $gap;
      }
      .right {
        flex: 1;
      }
    }

    .background {
      position: absolute;
      width: $demarcation-width;
      height: 100%;
      background: linear-gradient(66deg, $module-bg-opaque, $module-bg-lighter 66%);

      &::before {
        content: attr(data-content);
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        font-size: 6em;
        font-weight: bold;
        direction: rtl;
        opacity: 0.2;
        z-index: -1;
        @include mix.text-overflow(clip);
      }

      &::after {
        $size: 1rem;
        content: '';
        display: block;
        position: absolute;
        width: $size;
        height: 200%;
        top: -50%;
        right: -#{math.div($size, 2)};
        background: $body-bg;
        transform: rotate(18deg);
      }
    }

    .title {
      float: left;
      width: $title-width;
      text-align: center;
      font-size: $font-size-base;

      .icon-box {
        display: inline-block;
        transform: rotate(0deg);
        transition: transform 0.3s;
      }
    }

    .swiper-box {
      float: right;
      display: flex;
      width: $content-width;

      .swiper {
        flex: 1;
        height: $announcement-height;

        ::v-deep(.swiper-wrapper) {
          flex-direction: column;
          // Filter for slide when transitioning
          &[style*='300ms'] {
            .swiper-slide-active {
              .content {
                @include global.motion-blur-filter('vertical-small');
              }
            }
          }
        }

        .swiper-slide {
          width: auto;
          display: flex;
          justify-content: space-between;
          height: $announcement-height;

          .content {
            max-width: 76%;
            position: relative;
            font-weight: bold;
            @include mix.text-overflow();
          }

          .date {
            color: $color-text-divider;
            margin-right: $gap-xs;
          }
        }
      }

      .navigation {
        display: flex;
        flex-direction: column;
        width: 3rem;
        height: $announcement-height;

        .button {
          height: 50%;
          text-align: center;
          color: $color-text-divider;
          cursor: pointer;
          @include mix.color-transition();

          &:hover {
            color: $color-text;
          }

          &.disabled {
            opacity: 0.8;
            color: $color-text-divider;
            cursor: no-drop;
          }

          &.prev {
            line-height: 2;
          }

          &.next {
            line-height: 1.4;
          }
        }
      }
    }
  }
</style>
