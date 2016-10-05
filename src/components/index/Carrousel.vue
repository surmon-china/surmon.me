<template>
  <div class="carrousel">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide class="item" v-for="slide in [1, 2, 3, 4, 5]">
        <div>初始化后的Swiper实例{{ slide }}</div>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
      <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
      <!-- <div class="swiper-button-next" slot="button-next"></div> -->
      <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
    </swiper>
  </div>
</template>

<script>
  export default {
    name: 'carrousel',
    data() {
      return {
        swiperOption: {
          autoplay: 3000,
          // direction : 'vertical',
          // grabCursor : true,
          setWrapperSize :true,
          autoHeight: true,
          pagination : '.swiper-pagination',
          paginationClickable :true,
          // prevButton:'.swiper-button-prev',
          // nextButton:'.swiper-button-next',
          // scrollbar:'.swiper-scrollbar',
          mousewheelControl : true,
          observeParents:true,
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .carrousel {
    height: 13em;
    margin-bottom: 1em;
    background-color: white;
    
    .swiper-container {
    }
  }
</style>
