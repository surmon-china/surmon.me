<template>
  <div class="announcement">
    <transition name="module">
      <loading-box class="announcement-loading" v-if="!announcement.data.result.data.length"></loading-box>
    </transition>
    <div class="title">
      <i class="iconfont icon-radio"></i>
      <span>&nbsp;</span>
      <span>Announcements：</span>
    </div>
    <transition name="module">
      <swiper class="swiper" :options="swiperOption" v-if="announcement.data.result.data.length">
        <swiper-slide class="item" v-for="(announcement, index) in announcement.data.result.data.slice(0, 9)">
          <div class="content" v-html="announcement.content"></div>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev">
          <i class="iconfont icon-announcement-prev"></i>
        </div>
        <div class="swiper-button-next" slot="button-next">
          <i class="iconfont icon-announcement-next"></i>
        </div>
      </swiper>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'index-announcement',
    data() {
      return {
        swiperOption: {
          setWrapperSize :true,
          direction: 'vertical',
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          slidesPerView: 1,
          paginationClickable: true,
          spaceBetween: 30,
          loop: true
        }
      }
    },
    props: {
      announcement: {
        type: Object,
        default: {
          result: {
            data: []
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/variables';
  @import '~assets/sass/mixins';
  .announcement {
    height: 2.8em;
    line-height: 2.8em;
    font-size: .9em;
    margin-bottom: 1em;
    overflow: hidden;
    background-color: $module-bg;

    > .title {
      float: left;
      width: 30%;
      text-align: center;

      > .iconfont {
        font-size: 1em;
      }
    }

    > .swiper {
      float: right;
      width: 70%;

      .item {

        > .content {
          width: 100%;
          position: relative;
          overflow: hidden;

          p {
            margin: 0;
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
