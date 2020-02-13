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
          transform: `rotate(-${windmillTimes * 60}deg)`
        }"
      >
        <i class="iconfont icon-windmill" />
      </span>
    </div>
    <transition name="module" mode="out-in">
      <empty-box v-if="!announcement.data.length" key="empty" class="announcement-empty-box">
        <slot>{{ $i18n.text.announcement.empty }}</slot>
      </empty-box>
      <div
        v-else-if="renderSwiper"
        key="swiper"
        v-swiper:swiper="swiperOption"
        class="swiper"
        @transitionStart="handleSwiperTransitionStart"
        @transitionEnd="handleSwiperTransitionEnd"
      >
        <div class="swiper-wrapper">
          <div
            v-for="(ann, index) in announcement.data"
            :key="index"
            class="swiper-slide slide-item"
          >
            <div
              class="content filter"
              :class="{
                'motion-blur-vertical-small': isEnableFilterStyle(index)
              }"
              v-html="parseByMarked(ann.content)"
            />
            <div v-if="!isMobile" class="date">~ {{ ann.create_at | timeAgo(language) }}</div>
          </div>
        </div>
        <div class="swiper-button-prev">
          <i class="iconfont icon-announcement-prev" />
        </div>
        <div class="swiper-button-next">
          <i class="iconfont icon-announcement-next" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import marked from '~/plugins/marked'
  export default {
    name: 'IndexAnnouncement',
    props: {
      announcement: {
        type: Object
      }
    },
    data() {
      return {
        renderSwiper: true,
        windmillTimes: 0,
        transitioning: false,
        swiperOption: {
          height: 34,
          autoplay: {
            delay: 3500,
            disableOnInteraction: false
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          pagination: {
            clickable: true
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
    activated() {
      this.renderSwiper = true
      this.handleSwiperTransitionEnd()
    },
    deactivated() {
      this.renderSwiper = false
    },
    methods: {
      parseByMarked(content) {
        return marked(content, null, true)
      },
      isEnableFilterStyle(index) {
        return this.transitioning && this.swiper && this.swiper.activeIndex === index
      },
      handleSwiperTransitionStart() {
        this.transitioning = true
        this.windmillTimes =  this.swiper.activeIndex || 0
      },
      handleSwiperTransitionEnd() {
        this.transitioning = false
      }
    }
  }
</script>

<style lang="scss">
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
        transition: transform $transition-time-slow;
      }
    }

    > .swiper {
      float: right;
      width: 90%;

      .slide-item {
        width: auto;
        display: flex;
        justify-content: space-between;
        padding-right: $gap * 3;
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

      .swiper-button-prev,
      .swiper-button-next {
        position: absolute;
        left: auto;
        right: $sm-gap;
        height: 10px;
        margin: 0;
        width: 2rem;
        height: 1rem;
        text-align: center;
        line-height: 1rem;
        background-image: none;
        color: $text-dividers;
        cursor: pointer;
        @include color-transition();

        &:hover {
          color: $text;
        }
      }

      .swiper-button-prev {
        top: .5rem;
      }

      .swiper-button-next {
        top: 1.5rem;
      }
    }
  }
</style>
