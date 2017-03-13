<template>
  <div class="carrousel" :class="{ mobile: mobileLayout }">
    <transition name="module" mode="out-in">
      <empty-box class="article-empty-box" v-if="!article.data.data.length">
        <slot>No Result Article.</slot>
      </empty-box>
      <div class="swiper-container swiper" ref="swiper" v-else>
        <div class="swiper-wrapper">
          <div class="swiper-slide item" v-for="(article, index) in article.data.data.slice(0, 9)" :key="index">
            <div class="content">
              <img :src="buildThumb(article.thumb)">
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
          autoplay: 3500,
          setWrapperSize :true,
          autoHeight: true,
          pagination : '.swiper-pagination',
          paginationClickable :true,
          mousewheelControl : true,
          autoplayDisableOnInteraction: false,
          observeParents:true,
          grabCursor : true,
          preloadImages: false,
          lazyLoading: true
        }
      }
    },
    props: {
      article: {
        type: Object
      }
    },
    mounted() {
      this.initSwiper()
    },
    beforeDestroy() {
      this.destroySwiper()
    },
    computed: {
      mobileLayout() {
        return this.$store.state.option.mobileLayout
      }
    },
    methods: {
      initSwiper() {
        if (!this.swiper) {
          this.swiper = new Swiper(this.$refs.swiper, this.swiperOption)
        }
      },
      destroySwiper() {
        if (this.swiper) {
          this.swiper.destroy()
        }
      },
      buildThumb(thumb) {
        return thumb
               ? `${thumb}?imageView2/1/w/${this.mobileLayout ? '768' : '1190'}/h/${this.mobileLayout ? '271' : '420'}/interlace/0/q/100|watermark/2/text/U3VybW9uLm1l/font/Y2FuZGFyYQ==/fontsize/698/fill/I0ZGRkZGRg==/dissolve/27/gravity/SouthWest/dx/30/dy/15`
               : `/images/${this.mobileLayout ? 'mobile-' : ''}thumb-carrousel.jpg`
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
            background-color: rgba($module-bg, .25);
            margin: 0;
            padding: 0 .5em;
            height: 2em;
            line-height: 2em;
            font-size: 1em;
            font-weight: bold;
            border-radius: 1px;
            letter-spacing: .3px;

            &:hover {
              background-color: $module-hover-bg;
            }
          }
        }
      }
    }

    &.mobile {
      height: auto;

      > .swiper {

        .item {

          > .content {
            height: auto;
          }
        }
      }
    }
  }
</style>
