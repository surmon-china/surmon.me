<template>
  <div class="announcement">
    <color-block-box :left="-59" :gray="true" />
    <div class="title">
      <i class="iconfont icon-radio"></i>
    </div>
    <transition name="module" mode="out-in">
      <empty-box class="announcement-empty-box" key="empty" v-if="!announcement.data.length">
        <slot>{{ $i18n.text.announcement.empty }}</slot>
      </empty-box>
      <div class="swiper" key="swiper" v-swiper:swiper="swiperOption" v-else-if="renderSwiper">
        <div class="swiper-wrapper">
          <div
            :key="index"
            class="swiper-slide slide-item"
            v-for="(announcement, index) in announcement.data"
          >
            <div class="content" v-html="markedContent(announcement.content)"></div>
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
  import { mapState } from 'vuex'
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
    methods: {
      markedContent(content) {
        return marked(content, null, true)
      }
    },
    activated() {
      this.renderSwiper = true
    },
    deactivated() {
      this.renderSwiper = false
    }
  }
</script>

<style lang="scss">
  $announcement-height: 2.8em;

  .announcement {
    height: $announcement-height;
    line-height: 2.75em;
    font-size: .9em;
    margin-bottom: 1em;
    overflow: hidden;
    position: relative;
    background-color: $module-bg;
    color: $white;

    .announcement-empty-box {
      min-height: auto;
    }

    > .title {
      float: left;
      width: 10%;
      text-align: center;

      > .iconfont {
        font-size: 1.3rem;
      }
    }

    > .swiper {
      float: right;
      width: 90%;

      .slide-item {
        height: $announcement-height;

        > .content {
          width: 100%;
          position: relative;
          @include text-overflow();

          p {
            width: 90%;
            margin: 0;
            @include text-overflow();
          }

          a {
            text-decoration: underline;
          }
        }
      }

      .swiper-button-prev,
      .swiper-button-next {
        position: absolute;
        left: auto;
        right: .5em;
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