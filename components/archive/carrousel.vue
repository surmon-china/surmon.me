<template>
  <div class="carrousel" :class="{ mobile: isMobile }">
    <transition name="module" mode="out-in">
      <empty-box class="article-empty-box" key="empty" v-if="!article.data.data.length">
        <slot>{{ $i18n.text.article.empty }}</slot>
      </empty-box>
      <div class="swiper index" key="swiper" v-swiper:swiper="swiperOption" v-else-if="renderSwiper">
        <div class="swiper-wrapper">
          <div
            :key="index"
            class="swiper-slide slide-item"
            v-for="(article, index) in article.data.data.slice(0, 9)"
          >
            <div class="content">
              <img :src="buildThumb(article.thumb)" :alt="article.title">
              <nuxt-link :to="`/article/${article.id}`" class="title">
                <span>{{ article.title }}</span>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'index-carrousel',
    props: {
      article: {
        type: Object
      }
    },
    data() {
      return {
        renderSwiper: true,
        swiperOption: {
          autoplay: {
            delay: 3500,
            disableOnInteraction: false
          },
          pagination: {
            clickable: true,
            el: '.swiper-pagination'
          },
          setWrapperSize: true,
          // autoHeight: true,
          mousewheel: true,
          observeParents: true,
          grabCursor: true,
          preloadImages: false,
          lazy: true
        }
      }
    },
    computed: {
      ...mapState('global', ['imageExt', 'isMobile'])
    },
    methods: {
      buildThumb(thumb) {
        if (thumb) {
          if (this.isMobile) {
            return `${thumb}?imageView2/1/w/768/h/271/format/${this.imageExt}/interlace/1/q/80|watermark/2/text/U3VybW9uLm1l/font/Y2FuZGFyYQ==/fontsize/560/fill/I0ZGRkZGRg==/dissolve/30/gravity/SouthWest/dx/30/dy/15|imageslim`
          } else {
            return `${thumb}?imageView2/1/w/1190/h/420/format/${this.imageExt}/interlace/1/q/80|watermark/2/text/U3VybW9uLm1l/font/Y2FuZGFyYQ==/fontsize/680/fill/I0ZGRkZGRg==/dissolve/30/gravity/SouthWest/dx/30/dy/15|imageslim`
          }
        } else {
          return `${this.cdnUrl}/images/${this.isMobile ? 'mobile-' : ''}thumb-carrousel.jpg`
        }
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
  .index.swiper {

    .swiper-pagination {

      .swiper-pagination-bullet {

        &.swiper-pagination-bullet-active {
          width: 2rem;
          border-radius: 10px;
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
  $pc-carrousel-height: 15em;
  $mobile-carrousel-height: calc((100vw - 2rem) * .35);

  .carrousel {
    height: $pc-carrousel-height;
    margin-bottom: 1em;
    position: relative;
    overflow: hidden;
    background-color: $module-bg;

    > .swiper {

      .slide-item {

        > .content {
          width: 100%;
          height: $pc-carrousel-height;
          position: relative;
          overflow: hidden;

          > img {
            width: 100%;
            @include css3-prefix(transform, rotate(0deg) scale(1));
            @include css3-prefix(transition, transform 1s);

            &:hover {
              @include css3-prefix(transform, rotate(2deg) scale(1.1));
            }
          }

          > .title {
            position: absolute;
            margin: 0;
            top: 1.5rem;
            right: 2rem;
            color: $link-color;
            padding-right: .6em;
            padding-left: 1em;
            height: 2em;
            line-height: 2em;
            font-size: 1em;
            font-weight: bold;
            border-radius: 1px;
            letter-spacing: .3px;
            max-width: 75%;
            @include text-overflow;

            -webkit-background-clip: text;
            // background-color: $module-hover-bg-opacity-9;
            background: linear-gradient(90deg, transparent 0%, $module-bg 4em, $module-bg-opacity-9, $white);

            &:hover {
              color: $text-darken;
              // background: none;
              padding-left: .6em;
              background-color: $module-bg;
            }
          }
        }
      }
    }

    &.mobile {
      height: $mobile-carrousel-height;

      > .swiper {

        .slide-item {

          > .content {
            height: $mobile-carrousel-height;

            > .title {
              right: 1.7rem;
              max-width: 70%;
            }
          }
        }
      }
    }
  }
</style>
