<template>
  <div id="share">
    <div class="share-box">
      <div class="a2a_kit a2a_kit_size_32 a2a_default_style sidebar-share">
        <a class="share-button a2a_button_wechat"></a>
        <a class="share-button a2a_button_sina_weibo"></a>
        <a class="share-button a2a_button_qzone"></a>
        <a class="share-button a2a_button_douban"></a>
        <a class="share-button a2a_button_facebook"></a>
        <a class="share-button a2a_button_twitter"></a>
        <a class="share-button a2a_dd" @click="fullShareMenu()"></a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'share',
    methods: {
      fullShareMenu() {
        window.a2a.show_full()
      }
    }
  }
</script>

<style lang="scss">
  @import '~assets/sass/variables';
  #share {
    position: fixed;
    width: auto;
    left: 0;
    top: 30%;

    > .share-box {
      width: 3em;

      > .sidebar-share {

        > .share-button {
          padding: 0;
          outline: none;
          margin: .2em 0;

          > .a2a_svg {
            padding: .35em;
            border-radius: 0;
            filter: grayscale(1);
            opacity: .2;
          }

          &:hover {

            > .a2a_svg {
              filter: grayscale(0);
              opacity: .8;
            }
          }
        }
      }
    }
  }
</style>
