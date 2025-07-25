<script lang="ts" setup>
  import { ref } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useWallpaperStore } from '/@/stores/wallpaper'
  import { GAEventCategories } from '/@/constants/google-analytics'
  import { Language } from '/@/locales'
  import Wallpapers from './wall.vue'

  const { i18n: _i18n, gtag, isDarkTheme } = useEnhancer()
  const wallpaperStore = useWallpaperStore()
  const isOnWallpaper = ref(false)

  const handleCloseWallpaper = () => {
    isOnWallpaper.value = false
  }

  const handleOpenWallpaper = () => {
    if (wallpaperStore.papers(_i18n.language.value as Language)?.length) {
      isOnWallpaper.value = true
    } else {
      alert('Something went wrong！')
    }
    gtag?.event('wallpaper_modal', {
      event_category: GAEventCategories.Widget
    })
  }
</script>

<template>
  <div id="wallpaper" v-disabled-wallflower>
    <div class="switcher" :class="{ dark: isDarkTheme }" @click="handleOpenWallpaper">
      <div class="title">
        <i class="iconfont icon-bing" />
        <span class="text">BING</span>
      </div>
    </div>
  </div>
  <client-only>
    <popup v-model:visible="isOnWallpaper" :mask-close="false" :scroll-close="false">
      <wallpapers @close="handleCloseWallpaper" />
    </popup>
  </client-only>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  #wallpaper {
    $width: 2rem;
    $height: 6.6rem;
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
      border-top-left-radius: $radius-xs;
      border-bottom-left-radius: $radius-xs;
      opacity: 0.5;
      transition: opacity $motion-duration-fast;
      background-color: #ffffff;
      &.dark {
        background-color: #ececec;
      }
      &:hover {
        opacity: 0.8;
      }

      .title {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        writing-mode: tb-rl;
        color: $bing-primary;
        font-size: $font-size-small - 1;
        letter-spacing: 2px;
        text-align: center;
        transition: width $motion-duration-fast;

        .iconfont {
          font-size: 16px;
          margin-bottom: $gap-xs;
        }

        .text {
          font-weight: bold;
        }
      }
    }
  }
</style>
