<template>
  <div class="carrousel" :class="{ mobile: mobileLayout }">
    <transition name="module" mode="out-in">
      <empty-box class="article-empty-box" v-if="!article.data.data.length">
        <slot>No Result Article.</slot>
      </empty-box>
      <div class="swiper" v-swiper:swiper="swiperOption" v-else>
        <div class="swiper-wrapper">
          <div class="swiper-slide item" v-for="(article, index) in article.data.data.slice(0, 9)" :key="index">
            <div class="content">
              <img :src="buildThumb(article.thumb)" :alt="article.title">
              <router-link :to="`/article/${article.id}`" class="title">
                <span>{{ article.title }}</span>
              </router-link>
            </div>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'index-carrousel',
    data() {
      return {
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
          autoHeight: true,
          mousewheel: true,
          observeParents: true,
          grabCursor: true,
          preloadImages: false,
          lazy: true
        }
      }
    },
    props: {
      article: {
        type: Object
      }
    },
    computed: {
      mobileLayout() {
        return this.$store.state.option.mobileLayout
      },
      imgExt() {
        return this.$store.state.option.imgExt
      }
    },
    methods: {
      buildThumb(thumb) {
        if (thumb) {
          if (this.mobileLayout) {
            return `${thumb}?imageView2/1/w/768/h/271/format/${this.imgExt}/interlace/1/q/80|watermark/2/text/U3VybW9uLm1l/font/Y2FuZGFyYQ==/fontsize/560/fill/I0ZGRkZGRg==/dissolve/30/gravity/SouthWest/dx/30/dy/15|imageslim`
          } else {
            return `${thumb}?imageView2/1/w/1190/h/420/format/${this.imgExt}/interlace/1/q/80|watermark/2/text/U3VybW9uLm1l/font/Y2FuZGFyYQ==/fontsize/680/fill/I0ZGRkZGRg==/dissolve/30/gravity/SouthWest/dx/30/dy/15|imageslim`
          }
        } else {
          return `${this.cdnUrl}/images/${this.mobileLayout ? 'mobile-' : ''}thumb-carrousel.jpg`
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/variables';
  @import '~assets/sass/mixins';
  .carrousel {
    height: 15em;
    margin-bottom: 1em;
    position: relative;
    overflow: hidden;
    background-color: $module-bg;

    > .swiper {

      .item {

        > .content {
          width: 100%;
          height: 15em;
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
            top: 1.5rem;
            right: 2rem;
            color: #333;
            background-color: rgba($module-hover-bg, .5);
            margin: 0;
            padding: 0 .5em;
            height: 2em;
            line-height: 2em;
            font-size: 1em;
            font-weight: bold;
            border-radius: 1px;
            letter-spacing: .3px;

            &:hover {
              color: #000;
              background-color: rgba($module-hover-bg, .9);
            }
          }
        }
      }
    }

    &.mobile {
      min-height: 8rem;
      height: auto;

      > .swiper {

        .item {

          > .content {
            min-height: 8rem;
            height: auto;

            > .title {
              max-width: 75%;
              @include text-overflow;
            }
          }
        }
      }
    }
  }
</style>
