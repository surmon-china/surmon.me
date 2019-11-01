<template>
  <div class="announcement" :class="{ mobile: isMobile }">
    <color-block-box
      :left="-59"
      :gray="true"
      v-if="!isMobile"
    />
    <div class="title">
      <span
        class="icon-box"
        :style="{
          transform: `rotate(-${windmillTimes * 60}deg)`
        }"
      >
        <i class="iconfont icon-windmill"></i>
      </span>
    </div>
    <transition name="module" mode="out-in">
      <empty-box class="announcement-empty-box" key="empty" v-if="!announcement.data.length">
        <slot>{{ $i18n.text.announcement.empty }}</slot>
      </empty-box>
      <div
        class="swiper"
        key="swiper"
        v-swiper:swiper="swiperOption"
        v-else-if="renderSwiper"
        @transitionStart="handleSwiperTransitionStart"
        @transitionEnd="handleSwiperTransitionEnd"
      >
        <div class="swiper-wrapper">
          <div
            :key="index"
            class="swiper-slide slide-item"
            v-for="(announcement, index) in announcement.data"
          >
            <div
              class="content filter"
              :class="{
                'motion-blur-vertical-small': transitioning
              }"
              v-html="parseByMarked(announcement.content)"
            ></div>
            <div v-if="!isMobile" class="date">~ {{ announcement.create_at | timeAgo(language) }}</div>
          </div>
        </div>
        <div class="swiper-button-prev">
          <i class="iconfont icon-announcement-prev"></i>
        </div>
        <div class="swiper-button-next">
          <i class="iconfont icon-announcement-next"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import marked from '~/plugins/marked'
  export default {
    name: 'index-announcement',
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
      language() {
        return this.$store.state.global.language
      }
    },
    methods: {
      parseByMarked(content) {
        return marked(content, null, true)
      },
      handleSwiperTransitionStart() {
        this.transitioning = true
        this.windmillTimes =  this.swiper.activeIndex || 0
      },
      handleSwiperTransitionEnd() {
        this.transitioning = false
      }
    },
    activated() {
      this.renderSwiper = true
      this.handleSwiperTransitionEnd()
    },
    deactivated() {
      this.renderSwiper = false
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

    > .title {
      float: left;
      width: 10%;
      text-align: center;
      font-size: $font-size-base;

      .icon-box {
        display: inline-block;
        transform: rotate(0deg);
        transition: transform .5s;
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
        width: 2em;
        height: 1em;
        text-align: center;
        line-height: 1em;
        background-image: none;
        color: $module-hover-bg;
        cursor: pointer;

        &:hover {
          color: $text;
        }
      }

      .swiper-button-prev {
        top: .5em;
      }

      .swiper-button-next {
        top: 1.5em;
      }
    }
  }
</style>