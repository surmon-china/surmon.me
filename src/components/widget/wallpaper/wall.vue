<template>
  <div class="wall">
    <transition name="module" mode="out-in">
      <div
        ref="picture-box"
        :key="currentWallpaper.humanizedImageUrl"
        class="picture-box"
        :title="currentWallpaper.copyright"
        :style="{
          backgroundImage: `url(${currentWallpaper.humanizedImageUrl})`
        }"
      />
    </transition>
    <div class="story-box">
      <template v-if="currentWallpaper.title">
        <h2 class="title">{{ currentWallpaper.title }}</h2>
        <p class="sub-title">{{ currentWallpaper.copyright }}</p>
      </template>
      <template v-else>
        <h2 class="title lonely">{{ currentWallpaper.copyright }}</h2>
      </template>
      <p class="desc">{{ currentWallpaper.desc }}</p>
      <div class="tools">
        <transition name="module">
          <a
            key="location"
            class="location"
            target="_blank"
            rel="external nofollow noopenter"
            :href="currentWallpaper.humanizedCopyrightUrl"
            :title="currentWallpaper.bsTitle"
          >
            <i class="iconfont icon-location"></i>
            <span class="text">{{ currentWallpaper.bsTitle }}</span>
          </a>
        </transition>
        <button class="button" title="上一幅" :disabled="!canNext" @click="index++">
          <i class="iconfont icon-prev"></i>
        </button>
        <button class="button" title="下一幅" :disabled="!canPrev" @click="index--">
          <i class="iconfont icon-next"></i>
        </button>
        <button class="button" title="春尽江南" @click="close">
          <i class="iconfont icon-cancel"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, watch, toRef } from 'vue'
  import { useStore, getNamespace, Modules } from '/@/store'
  import { WallpaperModuleGetters, WallpaperModuleActions } from '/@/store/wallpaper'
  import { useGlobalState } from '/@/state'
  import { useI18n } from '/@/services/i18n'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { GAEventActions, GAEventTags } from '/@/constants/ga'

  export default defineComponent({
    name: 'WallpaperWall',
    setup() {
      const i18n = useI18n()
      const store = useStore()
      const globalState = useGlobalState()
      const index = ref(0)

      const wallpapers = computed<any[]>(() => {
        return store.getters[
          getNamespace(Modules.Wallpaper, WallpaperModuleGetters.Parpers)
        ](i18n.language)
      })
      const currentWallpaper = computed(() => {
        return wallpapers.value?.length && wallpapers.value?.[index.value]
      })

      const canPrev = computed(() => index.value > 0)
      const canNext = computed(() => wallpapers.value ? (index.value < wallpapers.value.length - 1) : false)

      watch(
        () => i18n.language,
        language => {
          store.dispatch(
            getNamespace(Modules.Wallpaper, WallpaperModuleActions.FetchPapers),
            language
          )
        },
        { immediate: true, flush: 'post' }
      )

      return {
        close: globalState.switchTogglers.wallpaper,
        currentWallpaper,
        canPrev,
        canNext
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .wall {
    position: relative;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 88vw;
    height: 88vh;
    border: solid $sm-gap $module-bg-hover;
    background-color: $module-bg;

    > .picture-box {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-repeat: no-repeat;
      background-size: cover;
    }

    > .story-box {
      position: absolute;
      padding: 2rem 4rem;
      background-color: $module-bg-hover;
      bottom: 0;
      width: 100%;
      height: auto;
      color: $text;

      > .title,
      > .sub-title,
      > .desc {
        @include title-shadow();
      }

      > .title {
        margin-top: 0;

        &.lonely {
          margin-bottom: 3rem;
        }
      }

      > .desc {
        line-height: 2rem;
      }

      > .tools {
        color: $text;

        > .location,
        > .button {
          display: block;
          float: left;
          height: 3rem;
          line-height: 3rem;
          padding: 0 $gap;
          margin-right: $gap;
          background-color: $module-bg;
          @include background-transition();

          &:hover {
            background-color: $module-bg-darker-4;
          }
        }

        > .button {
          &[disabled] {
            opacity: .6;
          }
        }
      }
    }
  }
</style>
