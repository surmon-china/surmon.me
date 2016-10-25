<template>
  <div class="carrousel">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide class="item" v-for="(slide, index) in slides">
        <div class="content">
          <img :src="slide.src">
          <router-link to="/article/asdasdasd">
            <h5 class="title">{{ index + slide.title }}</h5>
          </router-link>
        </div>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  export default {
    name: 'index-carrousel',
    data() {
      const slide = {
        src: 'http://surmon.me/wp-content/themes/Surmon/timthumb.php?src=http://surmon.me/wp-content/uploads/2015/09/7916805876895932453.jpg&h=210&w=595&q=90&zc=1',
        title: ' 一个只有高手分享的技术社区，立即加入...'
      }
      return {
        slides: [slide, slide, slide, slide, slide, slide, slide, slide, slide],
        swiperOption: {
          name: 'currentSwiper',
          autoplay: 3000,
          setWrapperSize :true,
          autoHeight: true,
          pagination : '.swiper-pagination',
          paginationClickable :true,
          mousewheelControl : true,
          observeParents:true,
          grabCursor : true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../sass/variables';
  @import '../../sass/mixins';
  .carrousel {
    height: 15em;
    margin-bottom: 1em;
    background-color: $module-bg;

    .swiper {

      .item {

        .content {
          width: 100%;
          height: 15em;
          position: relative;
          overflow: hidden;

          img {
            max-width: 100%;
            @include css3-prefix(transform, rotate(0deg) scale(1));
            @include css3-prefix(transition, transform 1s);

            &:hover {
              @include css3-prefix(transform, rotate(2deg) scale(1.1));
            }
          }

          .title {
            position: absolute;
            top: 1em;
            right: 1em;
            background-color: $module-bg;
            margin: 0;
            padding: 0 .5em;
            height: 2em;
            line-height: 2em;

            &:hover {
              background-color: $module-hover-bg;
            }
          }
        }
      }
    }
  }
</style>
