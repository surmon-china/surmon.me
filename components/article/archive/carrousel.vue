<template>
  <div class="carrousel">
    <transition name="module">
      <loading-box class="article-loading" v-if="!article.data.result.data.length"></loading-box>
    </transition>
    <transition name="module">
      <swiper class="swiper" :options="swiperOption" v-if="article.data.result.data.length">
        <swiper-slide class="item" v-for="(article, index) in article.data.result.data.slice(0, 9)">
          <div class="content">
            <img :data-src="article.thumb" class="swiper-lazy">
            <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            <router-link :to="`/article/${article.id}`" class="title">
              <span>{{ index + article.title }}</span>
            </router-link>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
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
          observeParents:true,
          grabCursor : true,
          preloadImages: false,
          lazyLoading: true
        }
      }
    },
    props: {
      article: {
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
            top: 1.5em;
            right: 2em;
            background-color: $module-bg;
            margin: 0;
            padding: 0 .5em;
            height: 2em;
            line-height: 2em;
            font-size: 15px;
            font-weight: bold;

            &:hover {
              background-color: $module-hover-bg;
            }
          }
        }
      }
    }
  }
</style>
