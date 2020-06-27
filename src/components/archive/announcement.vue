<template>
  <div
    class="announcement"
    :class="{
      mobile: isMobile,
      dark: isDarkTheme
    }"
  >
    <div v-if="!isMobile" class="background"></div>
    <div class="title">
      <span
        class="icon-box"
        :style="{ transform: `rotate(-${activeIndex * 90}deg)` }"
      >
        <i class="iconfont icon-windmill" />
      </span>
    </div>
    <transition name="module" mode="out-in">
      <su-empty v-if="!announcement.data.length" key="empty" class="announcement-su-empty">
        <i18n :lkey="LANGUAGE_KEYS.ANNOUNCEMENT_PLACEHOLDER" />
      </su-empty>
      <div v-else key="swiper" class="swiper-box">
        <div
          class="swiper"
          v-swiper="swiperOption"
          @ready="updateSwiperContext"
          @transition-start="handleSwiperTransitionStart"
        >
          <div class="swiper-wrapper">
            <div
              v-for="(ann, index) in announcement.data"
              :key="index"
              class="swiper-slide"
            >
              <div class="content" v-html="parseContent(ann.content)" />
              <div v-if="!isMobile" class="date">~ {{ humanlizeDate(ann.create_at) }}</div>
            </div>
          </div>
        </div>
        <div class="navigation">
          <div
            class="button prev"
            :class="{ disabled: activeIndex === 0 }"
            @click="prevSlide"
          >
            <i class="iconfont icon-announcement-prev" />
          </div>
          <div
            class="button next"
            :class="{ disabled: activeIndex === announcement.data.length - 1 }"
            @click="nextSlide"
          >
            <i class="iconfont icon-announcement-next" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import { useSwiperRef, NameId } from '/@/todo/swiper'
  import { useI18n } from '/@/services/i18n'
  import { useTheme, Theme } from '/@/services/theme'
  import marked from '/@/services/marked'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { useGlobalState } from '/@/state'
  import { timeAgo } from '/@/transforms/moment'
  import * as APP_CONFIG from '/@/config/app.config'

  export default defineComponent({
    name: 'ArchiveAnnouncement',
    props: {
      announcement: {
        type: Object
      }
    },
    setup(props) {
      const i18n = useI18n()
      const theme = useTheme()
      const globalState = useGlobalState()
      const isDarkTheme = computed(() => theme.theme.value === Theme.Dark)
      const isMobile = computed(() => globalState.userAgent.isMobile)
      const [swiperContext, updateSwiperContext] = useSwiperRef()
      const swiper = computed(() => swiperContext.value?.$swiper.value)

      const activeIndex = ref(0)
      const swiperOption = {
        height: 34,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false
        },
        allowTouchMove: false,
        slidesPerView: 1,
        setWrapperSize: true,
        direction: 'vertical'
      }

      const humanlizeDate = (date: string) => {
        return timeAgo(date, i18n.language.value as any)
      }

      const parseContent = (content) => {
        return marked(content, null, true)
      }

      const prevSlide = () => swiper.value?.slidePrev()
      const nextSlide = () => swiper.value?.slideNext()
      const handleSwiperTransitionStart = () => {
        activeIndex.value = swiper.value?.activeIndex || 0
      } 

      return {
        LANGUAGE_KEYS,
        swiperOption,
        isMobile,
        isDarkTheme,
        activeIndex,
        humanlizeDate,
        parseContent,
        updateSwiperContext,
        handleSwiperTransitionStart
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  $announcement-height: 3rem;

  .announcement {
    position: relative;
    margin-bottom: $lg-gap;
    height: $announcement-height;
    line-height: 2.75em;
    overflow: hidden;
    color: $text-reversal;
    font-size: $font-size-h6;
    background-color: $module-bg;
    user-select: none;

    &.dark {
      color: $text-secondary;
    }

    &.mobile {
      margin-bottom: $gap;
      background-color: $module-hover-bg-darken-10;

      > .swiper {
        .swiper-slide {
          > .content {
            max-width: 90%;
          }
        }
      }
    }

    .announcement-su-empty {
      min-height: auto;
    }

    > .background {
      position: absolute;
      width: 66%;
      height: 100%;
      background: linear-gradient(66deg, $module-hover-bg-darken-40, $module-hover-bg 90%);

      &::after {
        $size: 1rem;
        content: '';
        display: block;
        position: absolute;
        width: $size;
        height: 200%;
        top: -50%;
        right: -($size / 2);
        background: $body-bg;
        transform: rotate(18deg);
      }
    }

    > .title {
      float: left;
      width: 10%;
      text-align: center;
      font-size: $font-size-base;

      .icon-box {
        display: inline-block;
        transform: rotate(0deg);
        transition: transform .3s;
      }
    }

    > .swiper-box {
      float: right;
      width: 90%;
      display: flex;

      .swiper {
        flex: 1;

        // Filter for slide when transitioning
        .swiper-wrapper[style*="300ms"] {
          .swiper-slide-active {
            .content {
              @include blur-filter('vertical-small');
            }
          }
        }

        .swiper-slide {
          width: auto;
          display: flex;
          justify-content: space-between;
          height: $announcement-height;

          > .content {
            max-width: 76%;
            position: relative;
            @include text-overflow();

            p {
              margin: 0;
              @include text-overflow();
            }

            a {
              text-decoration: underline;
            }
          }

          .date {
            color: $text-dividers;
          }
        }
      }

      .navigation {
        width: 3rem;
        height: $announcement-height;
        display: flex;
        flex-direction: column;

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
            opacity: .8;
            color: $text-dividers;
            cursor: no-drop;
          }

          &.prev {
            line-height: 1.8;
          }

          &.next {
            line-height: 1.2;
          }
        }
      }
    }
  }
</style>
