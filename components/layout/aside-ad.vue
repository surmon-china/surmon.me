<template>
  <div class="aside-ad">
    <div class="swiper" v-swiper:swiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide item" v-for="(ad, index) in ads" :key="index">
          <div class="content">
            <a 
              :href="ad.url"
              rel="external nofollow noopener"
              target="_blank"
              class="ad-box">
              <img :src="ad.src" alt="aliyun-ad" />
            </a>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'aside-ad',
    data() {
      return {
        swiperOption: {
          simulateTouch: false,
          direction : 'vertical',
          autoplay: {
            delay: 2500,
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
          preloadImages: false,
          lazy: true
        },
        ads: [
          {
            url: 'https://s.click.taobao.com/6JBRDTw',
            src: '/images/mammon/aliyun-300-100.jpg'
          },
          {
            url: 'https://s.click.taobao.com/EshFMKw',
            src: '/images/mammon/tmail-1111-300-100.jpg'
          },
          {
            url: 'https://s.click.taobao.com/mqUFMKw',
            src: '/images/mammon/aliyun-1111-300-100.jpg'
          },
          {
            url: 'https://s.click.taobao.com/5OFFMKw',
            src: '/images/mammon/taobao-300-100.jpg'
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .aside-ad {
    width: 100%;
    overflow: hidden;

    .swiper {
      height: 7.4rem;

      .swiper-wrapper {

        .swiper-slide {

          .content {

            .ad-box {
              width: 100%;
              height: 100%;

              img {
                width: 100%;
                height: auto;
              }
            }
          }
        }
      }
    }
  }
</style>

