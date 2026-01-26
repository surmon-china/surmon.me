<script lang="ts" setup>
  import { ref } from 'vue'
  import { LocalesKey } from '/@/locales'
  import { GAEventCategories } from '/@/constants/google-analytics'
  import { useEnhancer } from '/@/app/enhancer'
  import { useMusic } from '/@/composables/music'
  import { useCoverArtURL } from './helper'
  import MusicPlayer from './player.vue'

  const { gtag } = useEnhancer()
  const player = useMusic()
  const { state, currentSong } = player

  const isOnPlayerModel = ref(false)
  const togglePlayerModel = () => {
    isOnPlayerModel.value = !isOnPlayerModel.value
  }

  const handleTouchEvent = (label) => {
    gtag?.event('music_player_widget', {
      event_category: GAEventCategories.Widget,
      event_label: label
    })
  }
</script>

<template>
  <div id="player" :class="{ playing: state.playing }" v-disabled-wallflower>
    <div class="panel">
      <div class="control">
        <button
          class="prev-song button"
          :disabled="!state.initialized"
          @click="player.prevSong"
          @mousedown="handleTouchEvent('prev song')"
        >
          <i class="iconfont icon-music-prev"></i>
        </button>
        <button
          class="next-song button"
          :disabled="!state.initialized"
          @click="player.nextSong"
          @mousedown="handleTouchEvent('next song')"
        >
          <i class="iconfont icon-music-next"></i>
        </button>
        <button
          class="muted-toggle button"
          :disabled="!state.initialized"
          @click="player.toggleMuted"
          @mousedown="handleTouchEvent('toggle muted')"
        >
          <i class="iconfont" :class="state.muted ? 'icon-music-muted' : 'icon-music-unmuted'"></i>
        </button>
        <button class="player button" @click="togglePlayerModel" @mousedown="handleTouchEvent('open player model')">
          <i class="iconfont icon-netease-music"></i>
        </button>
      </div>
      <button class="song-link" @click="togglePlayerModel" @mousedown="handleTouchEvent('open player model')">
        <span v-if="currentSong">{{ currentSong.name }}</span>
        <i18n v-else :k="LocalesKey.MUSIC_PLACEHOLDER" />
      </button>
    </div>
    <div class="cd">
      <img class="image" :src="useCoverArtURL(currentSong?.cover_art_url)" />
      <button
        class="toggle-button"
        :disabled="!state.initialized"
        @click="player.togglePlay"
        @mousedown="handleTouchEvent('toggle play')"
      >
        <i class="iconfont" :class="state.playing ? 'icon-music-pause' : 'icon-music-play'"></i>
      </button>
    </div>
    <div class="trigger">
      <i class="iconfont icon-music"></i>
    </div>
  </div>
  <client-only>
    <popup v-model:visible="isOnPlayerModel" :scroll-close="false">
      <music-player @close="togglePlayerModel" />
    </popup>
  </client-only>
</template>

<style lang="scss" scoped>
  @use 'sass:math';
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  #player {
    $size: 5rem;
    $panel-size: 13rem;
    position: fixed;
    left: 0;
    bottom: 18%;
    z-index: $z-index-toolbox;
    transition:
      opacity $motion-duration-fast,
      transform $motion-duration-mid cubic-bezier(0.65, 0.05, 0.36, 1);
    height: $size;
    transform: translateX(-18rem);
    display: flex;
    align-items: center;
    border-top-right-radius: $radius-sm;
    border-bottom-right-radius: $radius-sm;
    background-color: $module-bg-opaque;
    overflow: hidden;
    opacity: 0.5;
    &.playing {
      transform: translateX(-$panel-size);
    }
    &:hover {
      opacity: 0.9;
      transform: translateX(0);
    }

    .panel {
      width: $panel-size;
      padding: $gap;

      .control {
        display: flex;
        justify-content: flex-start;
        margin-bottom: $gap-xs;

        > .button {
          margin-right: $gap-lg;
          &:hover {
            color: $color-link-hover;
          }
          &.player {
            color: $music163-primary;
          }
        }
      }

      .song-link {
        max-width: 11rem;
        color: $color-text-secondary;
        @include mix.color-transition();
        @include mix.text-overflow();
        &:hover {
          color: $color-link-hover;
        }
      }
    }

    .cd {
      position: relative;
      display: block;
      width: $size;
      height: $size;
      overflow: hidden;
      background-color: $module-bg-darker-1;

      .image {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: $module-bg-darker-1;
        background-image: global.surl('/images/music.webp');
        background-size: cover;
      }

      .toggle-button {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        font-size: $font-size-h1;
        color: $white;
      }
    }

    .trigger {
      width: math.div($size, 2);
      height: $size;
      display: flex;
      justify-content: center;
      align-items: center;
      writing-mode: tb-rl;
      color: $white;
      background-image: linear-gradient(0deg, #ff5a4c 0%, #ff1d12 100%);

      .iconfont {
        font-size: $font-size-h4;
      }
    }
  }
</style>
