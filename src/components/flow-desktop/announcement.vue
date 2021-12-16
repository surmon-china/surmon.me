<template>
  <div class="announcement" :class="{ dark: isDarkTheme }">
    <placeholder :data="announcements.length" :loading="fetching">
      <template #placeholder>
        <empty class="announcement-empty" key="empty">
          <i18n :lkey="LANGUAGE_KEYS.ARTICLE_PLACEHOLDER" />
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
        <div class="warpper" key="warpper">
          <div
            class="background"
            :data-content="parseContent(announcements[activeIndex]?.content)"
          />
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
              @swiper="onSwiper"
            >
              <swiper-slide v-for="(ann, index) in announcements" :key="index">
                <div class="content" v-html="parseContent(ann.content)" />
                <div class="date">{{ humanlizeDate(ann.create_at) }}</div>
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

<script lang="ts">
  import { defineComponent, ref, PropType } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import SwiperClass, { Swiper, SwiperSlide } from '/@/services/swiper'
  import { markdownToHTML } from '/@/transforms/markdown'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { timeAgo } from '/@/transforms/moment'

  export default defineComponent({
    name: 'FlowAnnouncement',
    components: {
      Swiper,
      SwiperSlide
    },
    props: {
      announcements: {
        type: Array as PropType<Array<$TODO>>,
        required: true
      },
      fetching: {
        type: Boolean,
        required: true
      }
    },
    setup() {
      const { i18n, isDarkTheme } = useEnhancer()
      const activeIndex = ref(0)
      const swiper = ref<SwiperClass>()
      const onSwiper = (_swiper: SwiperClass) => {
        swiper.value = _swiper
      }

      const humanlizeDate = (date: string) => {
        return timeAgo(date, i18n.language.value as any)
      }

      const parseContent = (content: string) => {
        return markdownToHTML(content)
      }

      const prevSlide = () => swiper.value?.slidePrev()
      const nextSlide = () => swiper.value?.slideNext()
      const handleSwiperTransitionStart = () => {
        activeIndex.value = swiper.value?.activeIndex || 0
      }

      return {
        LANGUAGE_KEYS,
        isDarkTheme,
        activeIndex,
        humanlizeDate,
        parseContent,
        prevSlide,
        nextSlide,
        onSwiper,
        handleSwiperTransitionStart
      }
    }
  })
</script>

<style lang="scss" scoped>
  @use 'sass:math';
  @import 'src/styles/init.scss';

  $announcement-height: 42px;
  $title-width: 10%;
  $content-width: 100% - $title-width;
  $demarcation-width: 74%;

  .announcement {
    position: relative;
    margin-bottom: $lg-gap;
    height: $announcement-height;
    line-height: $announcement-height;
    font-size: $font-size-h6;
    color: $text-secondary;
    @include common-bg-module();
    @include radius-box($xs-radius);

    .announcement-empty {
      height: 100%;
      min-height: auto;
    }

    .announcement-skeleton {
      display: flex;
      width: 100%;
      height: 100%;
      padding: $sm-gap;

      .left {
        width: 68%;
        margin-right: $gap;
      }
      .right {
        flex: 1;
      }
    }

    &.dark {
      .background {
        &::after {
          background: $module-bg-darker-1;
        }
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
        @include text-overflow(clip);
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
                @include blur-filter('vertical-small');
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
            @include text-overflow();

            ::v-deep(p) {
              margin: 0;
              max-width: 100%;
              @include text-overflow();
            }

            a {
              border-bottom: 1px solid;
            }
          }

          .date {
            color: $text-dividers;
            margin-right: $xs-gap;
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
          color: $text-dividers;
          cursor: pointer;
          @include color-transition();

          &:hover {
            color: $text;
          }

          &.disabled {
            opacity: 0.8;
            color: $text-dividers;
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
