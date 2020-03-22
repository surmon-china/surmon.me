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
        :style="{
          transform: `rotate(-${activeIndex * 90}deg)`
        }"
      >
        <i class="iconfont icon-windmill" />
      </span>
    </div>
    <transition name="module" mode="out-in">
      <empty-box v-if="!announcement.data.length" key="empty" class="announcement-empty-box">
        <slot>{{ $i18n.text.announcement.empty }}</slot>
      </empty-box>
      <div v-else key="swiper" class="swiper-box">
        <div
          v-swiper:swiper="swiperOption"
          class="swiper"
          @transition-start="handleSwiperTransitionStart"
        >
          <div class="swiper-wrapper">
            <div
              v-for="(ann, index) in announcement.data"
              :key="index"
              class="swiper-slide slide-item"
            >
              <div class="content" v-html="parseByMarked(ann.content)" />
              <div v-if="!isMobile" class="date">~ {{ ann.create_at | timeAgo(language) }}</div>
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

<script>
  import Vue from 'vue'
  import marked from '~/plugins/marked'

  export default Vue.extend({
    name: 'IndexAnnouncement',
    props: {
      announcement: {
        type: Object
      }
    },
    data() {
      return {
        activeIndex: 0,
        swiperOption: {
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
      }
    },
    computed: {
      isMobile() {
        return this.$store.state.global.isMobile
      },
      isDarkTheme() {
        return this.$store.getters['global/isDarkTheme']
      },
      language() {
        return this.$store.state.global.language
      }
    },
    methods: {
      parseByMarked(content) {
        return marked(content, null, true)
      },
      prevSlide() {
        this.swiper.slidePrev()
      },
      nextSlide() {
        this.swiper.slideNext()
      },
      handleSwiperTransitionStart() {
        this.activeIndex =  this.swiper.activeIndex || 0
      }
    }
  })
</script>

<style lang="scss" scoped>
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
        .slide-item {
          > .content {
            max-width: 90%;
          }
        }
      }
    }

    .announcement-empty-box {
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

        .slide-item {
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
