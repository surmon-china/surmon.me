<script lang="ts" setup>
  import { LocalesKey } from '/@/locales'
  import { MusicPlayer } from './_state'
  import { useCoverArtURL } from './_helper'

  const props = defineProps<{
    player: MusicPlayer
  }>()

  const emit = defineEmits<{
    (e: 'operate', label: string): void
    (e: 'open-modal'): void
  }>()

  const handleAnyOperate = (label) => {
    emit('operate', label)
  }

  const handleOpenModel = () => {
    emit('open-modal')
  }

  const { state, currentSong } = props.player
</script>

<template>
  <div class="music-player-handle" :class="{ playing: state.playing }" v-disabled-wallflower>
    <div class="panel">
      <div class="control">
        <button
          class="button prev-song"
          :disabled="!state.initialized"
          @click="player.prevSong"
          @mousedown="handleAnyOperate('prev song')"
        >
          <i class="iconfont icon-music-prev"></i>
        </button>
        <button
          class="button next-song"
          :disabled="!state.initialized"
          @click="player.nextSong"
          @mousedown="handleAnyOperate('next song')"
        >
          <i class="iconfont icon-music-next"></i>
        </button>
        <button
          class="button muted-toggle"
          :disabled="!state.initialized"
          @click="player.toggleMuted"
          @mousedown="handleAnyOperate('toggle muted')"
        >
          <i class="iconfont" :class="state.muted ? 'icon-music-muted' : 'icon-music-unmuted'"></i>
        </button>
        <button class="button player" @click="handleOpenModel" @mousedown="handleAnyOperate('open player model')">
          <i class="iconfont icon-netease-music"></i>
        </button>
      </div>
      <button class="song-link" @click="handleOpenModel" @mousedown="handleAnyOperate('open player model')">
        <span v-if="currentSong">{{ currentSong.name }}</span>
        <i18n v-else :k="LocalesKey.MUSIC_PLACEHOLDER" />
      </button>
    </div>
    <div class="cd">
      <img
        class="image"
        :class="{ spinning: player.state.playing }"
        :src="useCoverArtURL(currentSong?.cover_art_url)"
      />
      <button
        class="toggle-button"
        :disabled="!state.initialized"
        @click="player.togglePlay"
        @mousedown="handleAnyOperate('toggle play')"
      >
        <i class="iconfont" :class="state.playing ? 'icon-music-pause' : 'icon-music-play'"></i>
      </button>
    </div>
    <div class="trigger">
      <i class="iconfont icon-music"></i>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use 'sass:math';
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  $cd-size: 4rem;
  $panel-size: 10rem;

  .music-player-handle {
    position: fixed;
    left: 0;
    bottom: 18%;
    z-index: $z-index-toolbox;
    transition:
      opacity $motion-duration-fast,
      transform $motion-duration-mid cubic-bezier(0.65, 0.05, 0.36, 1);
    height: $cd-size;
    transform: translateX(-($panel-size + $cd-size));
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
      padding: 0 $gap;

      .control {
        display: flex;
        justify-content: flex-start;
        margin-bottom: $gap-tiny;

        > .button {
          display: inline-block;
          width: 1.4rem;
          margin-right: $gap;

          &:hover {
            color: $color-link-hover;
          }
          &.player {
            margin-right: 0;
            color: $music163-primary;
          }
        }
      }

      .song-link {
        max-width: 8rem;
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
      width: $cd-size;
      height: $cd-size;
      overflow: hidden;
      background-color: $module-bg-darker-1;

      @keyframes spin {
        from {
          transform: scale(1.5) rotate(0deg);
        }
        to {
          transform: scale(1.5) rotate(360deg);
        }
      }

      .image {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: $module-bg-darker-1;
        background-image: global.surl('/images/music.webp');
        background-size: cover;
        &.spinning {
          animation: spin 30s linear infinite;
        }
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
      width: math.div($cd-size, 2);
      height: $cd-size;
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
