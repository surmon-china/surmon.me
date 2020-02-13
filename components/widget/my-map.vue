<template>
  <div id="my-map">
    <div class="content">
      <iframe
        src="https://www.google.com/maps/d/embed?mid=1sRx6t0Yj1TutbwORCvjwTMgr70r62Z6w"
        class="gmap"
      ></iframe>
      <span class="close" @click="close">
        <i class="iconfont icon-cancel"></i>
      </span>
    </div>
  </div>
</template>

<script>
  import { isDevMode, isBrowser } from '~/environment'
  export default {
    name: 'MyMap',
    methods: {
      close() {
        this.$store.commit('global/toggleMyMapOnState')
      }
    }
  }
</script>

<style lang="scss" scoped>
  #my-map {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding-top: $header-height;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: $z-index-header - 1;
    background-color: $module-hover-bg-darken-20;
    @include backdrop-blur();

    > .content {
      width: 80%;
      height: 80%;
      position: relative;
      border: $sm-gap solid $module-bg-opacity-5;
      background-color: $module-bg;

      .gmap {
        width: 100%;
        height: 100%;
      }

      .close {
        $size: 3rem;
        display: block;
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        z-index: $z-index-normal + 1;
        width: $size;
        height: $size;
        line-height: $size;
        text-align: center;
        color: $text;
        background-color: $module-bg;
        @include background-transition();
        cursor: pointer;

        &:hover {
          background-color: $module-bg-opacity-9;
        }
      }
    }
  }
</style>
