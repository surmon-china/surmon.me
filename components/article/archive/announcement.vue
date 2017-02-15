<template>
  <div class="announcement">
    <transition name="module">
      <empty-box class="announcement-empty-box" v-if="!announcement.data.result.data.length">
        <slot>No Result Announcement.</slot>
      </empty-box>
    </transition>
    <div class="title">
      <i class="iconfont icon-horn"></i>
    </div>
    <transition name="module">
      <div class="swiper-container swiper" ref="swiper" v-if="announcement.data.result.data.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide item" v-for="(announcement, index) in announcement.data.result.data.slice(0, 9)">
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
  import marked from '~plugins/marked'
  export default {
    name: 'index-announcement',
    data() {
      return {
        swiperOption: {
          autoplay: 3500,
          setWrapperSize :true,
          direction: 'vertical',
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          slidesPerView: 1,
          paginationClickable: true,
          autoplayDisableOnInteraction: false,
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
    },
    mounted() {
      this.initSwiper()
    },
    beforeDestroy() {
      this.destroySwiper()
    },
    methods: {
      initSwiper() {
        if (!this.swiper) {
          this.swiper = new Swiper(this.$refs.swiper, this.swiperOption)
        }
      },
      destroySwiper() {
        if (!this.swiper) {
          this.swiper.destroy()
        }
      },
      markedContent(content) {
        return marked(content)
      }
    }
  }
</script>

<style lang="scss">
  @import '~assets/sass/variables';
  @import '~assets/sass/mixins';
  .announcement {
    height: 2.8em;
    line-height: 2.8em;
    font-size: .9em;
    margin-bottom: 1em;
    overflow: hidden;
    background-color: $module-bg;

    .announcement-empty-box {
      min-height: auto;
    }

    > .title {
      float: left;
      width: 10%;
      text-align: center;
    }

    > .swiper {
      float: right;
      width: 90%;

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
