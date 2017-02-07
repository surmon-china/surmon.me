<template>
  <div class="project">
    <p>我是Vue-awesome-swiper</p>
     <div style="height: 500px">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'project-vue-awesome-swiper',
    data() {
      return {
      }
    },
    mounted() {
      // console.log(this)
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
