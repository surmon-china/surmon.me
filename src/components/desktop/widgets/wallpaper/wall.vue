<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useWallpaperStore } from '/@/stores/wallpaper'
  import { Language } from '/@/locales'

  const emit = defineEmits<{
    (e: 'close'): void
  }>()

  const { i18n: _i18n } = useEnhancer()
  const wallpaperStore = useWallpaperStore()
  const wallpapers = computed(() => wallpaperStore.papers(_i18n.language.value as Language)!)

  const index = ref(0)
  const activePaper = computed(() => wallpapers.value?.[index.value])
  const handleClose = () => emit('close')
</script>

<template>
  <div class="wall" v-disabled-wallflower>
    <transition name="module" mode="out-in">
      <div
        ref="picture-box"
        class="picture-box"
        :key="activePaper.humanizedImageUrl"
        :title="activePaper.copyright"
        :style="{ backgroundImage: `url(${activePaper.humanizedImageUrl})` }"
      />
    </transition>
    <div class="story-box">
      <template v-if="activePaper.title">
        <h2 class="title">{{ activePaper.title }}</h2>
        <p class="sub-title">{{ activePaper.copyright }}</p>
      </template>
      <template v-else>
        <h2 class="title lonely">{{ activePaper.copyright }}</h2>
      </template>
      <p class="description">{{ activePaper.desc }}</p>
      <div class="tools">
        <ulink class="button" :href="activePaper.humanizedCopyrightUrl" :title="activePaper.bsTitle">
          <i class="iconfont icon-bing"></i>
        </ulink>
        <button class="button" title="Prev" :disabled="index <= 0" @click="index--">
          <i class="iconfont icon-prev"></i>
        </button>
        <button class="button" title="Next" :disabled="index >= wallpapers.length - 1" @click="index++">
          <i class="iconfont icon-next"></i>
        </button>
        <button class="button" title="Close" @click="handleClose">
          <i class="iconfont icon-cancel"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .wall {
    position: relative;
    width: 88vw;
    height: 88vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background-color: $module-bg;

    .picture-box {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .story-box {
      position: absolute;
      padding: 1.5rem 3rem;
      background-color: $module-bg-translucent;
      bottom: 0;
      width: 100%;
      height: auto;

      .title,
      .sub-title,
      .description {
        @include mix.title-shadow();
      }

      .title {
        margin-top: 0;
        &.lonely {
          margin-bottom: 2rem;
        }
      }

      .description {
        line-height: $line-height-loose;
        margin-bottom: $gap-lg;
      }

      .tools {
        display: flex;
        $size: 2.4rem;

        .button {
          display: block;
          width: $size;
          height: $size;
          line-height: $size;
          margin-right: $gap;
          text-align: center;
          font-size: $font-size-h4;
          background-color: $module-bg;
          @include mix.radius-box($radius-xs);

          &[disabled] {
            opacity: 0.6;
          }

          &:not([disabled]) {
            &:hover {
              background-color: $module-bg-darker-1;
            }
          }
        }
      }
    }
  }
</style>
