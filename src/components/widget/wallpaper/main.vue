<template>
  <div id="wallpaper" :class="{ dark: isDarkTheme }">
    <div class="switcher" @click="toggleWallpaper">
      <div class="up">
        <span
          class="title"
          :class="language"
          v-i18n="LANGUAGE_KEYS.WALLPAPER"
        />
      </div>
      <div class="down"></div>
    </div>
  </div>
  <popup v-model:visible="isOnWallpaper">
    <wallpapers />
  </popup>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, watch, toRef, onMounted } from 'vue'
  import { Theme } from '/@/services/theme'
  import { useEnhancer } from '/@/enhancer'
  import { getNamespace, Modules } from '/@/store'
  import { WallpaperModuleGetters, WallpaperModuleActions } from '/@/store/wallpaper'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { GAEventActions, GAEventTags } from '/@/constants/ga'
  import Wallpapers from './wall.vue'

  export default defineComponent({
    name: 'Wallpaper',
    components: {
      Wallpapers
    },
    setup() {
      const { store, i18n, globalState, isDarkTheme } = useEnhancer()
      const isOnWallpaper = toRef(globalState.switchBox, 'wallpaper')
      const wallpapers = computed<any[]>(() => store.getters[
        getNamespace(Modules.Wallpaper, WallpaperModuleGetters.Papers)
      ](i18n.language.value))
      console.log('-----wallpapers', wallpapers)

      const toggleWallpaper = () => {
        // this.$ga.event(
        //   '今日壁纸',
        //   GAEventActions.Toggle,
        //   GAEventTags.Tool
        // )
        if (wallpapers.value?.length) {
          globalState.switchTogglers.wallpaper()
        } else {
          alert('可能 Bing 又被墙了吧我有什么办法！')
        }
      }

      onMounted(() => {
        watch(
          () => i18n.language.value,
          language => {
            store.dispatch(
              getNamespace(Modules.Wallpaper, WallpaperModuleActions.FetchPapers),
              language
            )
          },
          { immediate: true, flush: 'post' }
        )
      })

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
  @import 'src/assets/styles/init.scss';

  #wallpaper {
    position: fixed;
    left: 0;
    top: 70%;
    cursor: pointer;
    $offset: 6px;

    &.dark {
      .switcher {
        .up {
          .title {
            color: $text-reversal;
          }
        }
      }
    }

    > .switcher {
      width: 4rem;
      height: 8rem;
      opacity: .6;
      display: block;
      position: relative;
      transform: translateX(-$offset * 2);
      transition: opacity $transition-time-fast, transform $transition-time-fast;

      &:hover {
        opacity: .8;
        transform: translateX(-$offset);
      }

      @keyframes wallpaper-y {
        0% { transform: translateY(-$offset) }
        50% { transform: translateY($offset) }
        100% { transform: translateY(-$offset) }
      }

      > .up,
      > .down {
        width: 3rem;
        height: 6.8rem;
        position: absolute;
        border-top-right-radius: $xs-radius;
        border-bottom-right-radius: $xs-radius;
      }

      > .down {
        top: 0;
        left: $offset;
        z-index: $z-index-normal + 1;
        background-color: $primary;
        animation: wallpaper-y 1.5s .75s infinite;
      }

      > .up {
        top: 0;
        left: 0;
        z-index: $z-index-normal + 2;
        background-color: $yellow;
        animation: wallpaper-y 1.5s 0s infinite;

        > .title {
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
