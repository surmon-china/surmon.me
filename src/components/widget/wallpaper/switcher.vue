<template>
  <div id="wallpaper">
    <div class="switcher" @click="toggleWallpaper">
      <div class="title">
        <i class="iconfont icon-bing" />
        <span class="text">BING</span>
      </div>
    </div>
  </div>
  <client-only>
    <popup :visible="isOnWallpaper" @close="toggleWallpaper">
      <wallpapers @close="toggleWallpaper" />
    </popup>
  </client-only>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useWallpaperStore } from '/@/store/wallpaper'
  import { GAEventCategories } from '/@/constants/gtag'
  import { Language } from '/@/language/data'
  import Wallpapers from './wall.vue'

  export default defineComponent({
    name: 'Wallpaper',
    components: {
      Wallpapers
    },
    setup() {
      const { i18n, gtag, globalState } = useEnhancer()
      const wallpaperStore = useWallpaperStore()
      const isOnWallpaper = computed(() => globalState.switchBox.wallpaper)
      const wallpapers = computed(() => wallpaperStore.papers(i18n.language.value as Language))

      const toggleWallpaper = () => {
        gtag?.event('wallpaper', {
          event_category: GAEventCategories.Widget
        })

        if (wallpapers.value?.length) {
          globalState.switchTogglers.wallpaper()
        } else {
          alert('Something went wrong！')
        }
      }

      return {
        isOnWallpaper,
        toggleWallpaper
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  #wallpaper {
    $width: 2.8rem;
    $height: 6.5rem;
    $offset: 0.6rem;
    position: fixed;
    top: 18%;
    right: 0;
    cursor: pointer;

    .switcher {
      position: relative;
      width: $width;
      height: $height;
      display: block;
      border-style: solid;
      border-color: $bing-primary;
      border-top-width: 4px;
      border-top-left-radius: $xs-radius;
      border-bottom-left-radius: $xs-radius;
      background-color: $yellow;
      opacity: 0.4;
      transform: translateX($offset);
      transition: opacity $transition-time-fast, transform $transition-time-fast;
      &:hover {
        opacity: 0.8;
        transform: translateX(0);
        .title {
          width: 100%;
        }
      }

      .title {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80%;
        height: 100%;
        font-family: 'webfont-bolder', DINRegular;
        writing-mode: tb-rl;
        color: $bing-primary;
        font-size: $font-size-small - 1;
        letter-spacing: 2px;
        text-align: center;
        transition: width $transition-time-fast;

        .iconfont {
          font-size: 16px;
          margin-bottom: $xs-gap;
        }

        .text {
          font-weight: bold;
        }
      }
    }
  }
</style>
