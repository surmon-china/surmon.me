<template>
  <div id="wallpaper" :class="{ dark: isDarkTheme }">
    <div class="switcher" @click="toggleWallpaper">
      <div class="up">
        <span class="title" :class="language">
          <i18n :lkey="LANGUAGE_KEYS.WALLPAPER" />
        </span>
      </div>
      <div class="down"></div>
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
  import { GAEventActions, GAEventTags } from '/@/constants/gtag'
  import { Language } from '/@/language/data'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import Wallpapers from './wall.vue'

  export default defineComponent({
    name: 'Wallpaper',
    components: {
      Wallpapers
    },
    setup() {
      const { i18n, gtag, globalState, isDarkTheme } = useEnhancer()
      const wallpaperStore = useWallpaperStore()
      const isOnWallpaper = computed(() => globalState.switchBox.wallpaper)
      const wallpapers = computed(() => wallpaperStore.papers(i18n.language.value as Language))

      const toggleWallpaper = () => {
        if (wallpapers.value?.length) {
          globalState.switchTogglers.wallpaper()
        } else {
          alert('Something was wrong！')
        }
        if (globalState.switchBox.wallpaper) {
          gtag?.event('今日壁纸', {
            event_category: GAEventActions.Toggle,
            event_label: GAEventTags.Tool
          })
        }
      }

      return {
        LANGUAGE_KEYS,
        language: i18n.language,
        isDarkTheme,
        isOnWallpaper,
        toggleWallpaper
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  #wallpaper {
    $offset: 6px;
    position: fixed;
    left: 0;
    top: 70%;
    cursor: pointer;

    &.dark {
      .switcher {
        .up {
          .title {
            color: $text-reversal;
          }
        }
      }
    }

    .switcher {
      width: 4rem;
      height: 8rem;
      opacity: 0.6;
      display: block;
      position: relative;
      transform: translateX(-$offset * 2);
      transition: opacity $transition-time-fast, transform $transition-time-fast;

      &:hover {
        opacity: 0.8;
        transform: translateX(-$offset);
      }

      @keyframes wallpaper-y {
        0% {
          transform: translateY(-$offset);
        }
        50% {
          transform: translateY($offset);
        }
        100% {
          transform: translateY(-$offset);
        }
      }

      > .up,
      > .down {
        width: 3rem;
        height: 6.8rem;
        position: absolute;
        border-top-right-radius: $xs-radius;
        border-bottom-right-radius: $xs-radius;
      }

      .down {
        top: 0;
        left: $offset;
        z-index: $z-index-normal + 1;
        background-color: $primary;
        animation: wallpaper-y 1.5s 0.75s infinite;
      }

      .up {
        top: 0;
        left: 0;
        z-index: $z-index-normal + 2;
        background-color: $yellow;
        animation: wallpaper-y 1.5s 0s infinite;

        .title {
          display: block;
          width: 100%;
          height: 100%;
          line-height: 2rem;
          font-family: 'webfont-bolder', DINRegular;
          writing-mode: tb-rl;
          color: $primary;

          &.zh {
            letter-spacing: -2.5px;
          }

          &.en {
            text-align: center;
            font-weight: bold;
            letter-spacing: 2px;
            text-transform: uppercase;
            font-size: $font-size-small;
          }
        }
      }
    }
  }
</style>
