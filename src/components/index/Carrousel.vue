<template>
  <div class="carrousel">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide class="item" v-for="slide in slides">
        <div>
          <img :src="slide.src">
        </div>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  export default {
    name: 'carrousel',
    data() {
      return {
        slides: [{
          src: 'http://surmon.me/wp-content/themes/Surmon/timthumb.php?src=http://surmon.me/wp-content/uploads/2015/09/7916805876895932453.jpg&h=208&w=644&q=90&zc=1',
        }, {
          src: 'http://surmon.me/wp-content/themes/Surmon/timthumb.php?src=http://surmon.me/wp-content/uploads/2015/09/9b0ebdca3e038f08.png&h=208&w=644&q=90&zc=1',
        },{
          src: 'http://surmon.me/wp-content/themes/Surmon/timthumb.php?src=http://surmon.me/wp-content/themes/Surmon/images/random/2.jpg&h=208&w=644&q=100&zc=1',
        },{
          src: 'http://surmon.me/wp-content/themes/Surmon/timthumb.php?src=http://surmon.me/wp-content/uploads/2015/08/53475e1b938c5.jpg&h=208&w=644&q=90&zc=1',
        },{
          src: 'http://surmon.me/wp-content/themes/Surmon/timthumb.php?src=http://surmon.me/wp-content/uploads/2015/09/7916805876895932453.jpg&h=208&w=644&q=90&zc=1',
        }],
        swiperOption: {
          autoplay: 3000,
          setWrapperSize :true,
          autoHeight: true,
          pagination : '.swiper-pagination',
          paginationClickable :true,
          mousewheelControl : true,
          observeParents:true
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
