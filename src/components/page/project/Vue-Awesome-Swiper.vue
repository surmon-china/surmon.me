<template>
  <div class="project">
    <p>我是Vue-awesome-swiper</p>
     <div style="height: 500px">
      <swiper :options="swiperOptionTop" class="gallery-top">
        <swiper-slide style="background-image:url(http://cdn.gousa.cn/sites/default/files/styles/original_with_watermark/public/kennedy_meadows_0.jpg)"></swiper-slide>
        <swiper-slide style="background-image:url(http://cdn.gousa.cn/sites/default/files/styles/original_with_watermark/public/yosemite_national_park_0.jpg)"></swiper-slide>
        <swiper-slide style="background-image:url(http://cdn.gousa.cn/sites/default/files/styles/original_with_watermark/public/mount_rainier.jpg)"></swiper-slide>
        <swiper-slide style="background-image:url(http://cdn.gousa.cn/sites/default/files/styles/original_with_watermark/public/snoqualmie_pass_0.jpg)"></swiper-slide>
        <swiper-slide style="background-image:url(http://cdn.gousa.cn/sites/default/files/styles/original_with_watermark/public/three_sisters_wilderness_0.jpg)"></swiper-slide>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
      </swiper>
      <swiper :options="swiperOptionThumbs" class="gallery-thumbs">
        <swiper-slide style="background-image:url(http://cdn.gousa.cn/sites/default/files/styles/original_with_watermark/public/kennedy_meadows_0.jpg)"></swiper-slide>
        <swiper-slide style="background-image:url(http://cdn.gousa.cn/sites/default/files/styles/original_with_watermark/public/yosemite_national_park_0.jpg)"></swiper-slide>
        <swiper-slide style="background-image:url(http://cdn.gousa.cn/sites/default/files/styles/original_with_watermark/public/mount_rainier.jpg)"></swiper-slide>
        <swiper-slide style="background-image:url(http://cdn.gousa.cn/sites/default/files/styles/original_with_watermark/public/snoqualmie_pass_0.jpg)"></swiper-slide>
        <swiper-slide style="background-image:url(http://cdn.gousa.cn/sites/default/files/styles/original_with_watermark/public/three_sisters_wilderness_0.jpg)"></swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Project-Vue-Awesome-Swiper',
    data() {
      return {
        swiperOptionTop: {
          name: 'swiperTop',
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          spaceBetween: 10
        },
        swiperOptionThumbs: {
          name: 'swiperThumbs',
          spaceBetween: 10,
          centeredSlides: true,
          slidesPerView: 'auto',
          touchRatio: 0.2,
          slideToClickedSlide: true
        }
      }
    },
    mounted() {
      console.log(this)
      const swiperTop = this.$children.find((children) => children.options.name == 'swiperTop').swiper
      const swiperThumbs = this.$children.find((children) => children.options.name == 'swiperThumbs').swiper
      swiperTop.params.control = swiperThumbs
      swiperThumbs.params.control = swiperTop
    }
  }
</script>

<style scoped>
  .swiper-container {
    background-color: #000;
  }
  .swiper-slide {
    background-size: cover;
    background-position: center;
  }
  .gallery-top {
    height: 80%;
    width: 100%;
  }
  .gallery-thumbs {
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0;
  }
  .gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  }
  .gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }
</style>
