<template>
  <div id="player" :class="{ playing: music.state.playing }" v-if="music?.currentSong.value">
    <div class="panel">
      <div class="control">
        <button
          class="prev-song button"
          :disabled="!music.state.ready"
          @click="music.prevSong"
          @mousedown="handleTouchEvent('prev song')"
        >
          <i class="iconfont icon-music-prev"></i>
        </button>
        <button
          class="next-song button"
          :disabled="!music.state.ready"
          @click="music.nextSong"
          @mousedown="handleTouchEvent('next song')"
        >
          <i class="iconfont icon-music-next"></i>
        </button>
        <button
          class="muted-toggle button"
          :disabled="!music.state.ready"
          @click="music.toggleMuted"
          @mousedown="handleTouchEvent('toggle muted')"
        >
          <i class="iconfont" :class="muted ? 'icon-music-muted' : 'icon-music-unmuted'"></i>
        </button>
      </div>
      <div class="song">
        <router-link
          class="link"
          :to="getPageRoute(RouteName.Music)"
          @mousedown="handleTouchEvent('music player page')"
        >
          <span v-if="currentSong"
            >{{ currentSong.name }} By {{ currentSong.artist }} |
            {{ currentSong.album || 'unknow' }}</span
          >
          <i18n v-else :lkey="LANGUAGE_KEYS.MUSIC_PLACEHOLDER" />
        </router-link>
      </div>
    </div>
    <div class="cd">
      <img class="image" :src="currentSong?.cover_art_url" />
      <button
        class="toggle-button"
        :disabled="!music.state.ready"
        @click="music.togglePlay"
        @mousedown="handleTouchEvent('toggle play')"
      >
        <i
          class="iconfont"
          :class="music.state.playing ? 'icon-music-pause' : 'icon-music-play'"
        ></i>
      </button>
    </div>
    <div class="trigger">
      <i class="iconfont icon-music"></i>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { GAEventCategories } from '/@/constants/gtag'
  import { isClient } from '/@/app/environment'
  import { RouteName } from '/@/app/router'
  import { useMusic } from '/@/services/music'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { getPageRoute } from '/@/transforms/route'

  export default defineComponent({
    name: 'PlayerControl',
    setup() {
      const { gtag } = useEnhancer()
      const music = isClient ? useMusic() : null
      const muted = computed(() => Boolean(music?.muted.value))
      const currentSong = computed(() => music?.currentSong.value)

      const handleTouchEvent = (label) => {
        gtag?.event('music_player_widget', {
          event_category: GAEventCategories.Widget,
          event_label: label
        })
      }

      return {
        LANGUAGE_KEYS,
        RouteName,
        music,
        muted,
        currentSong,
        getPageRoute,
        handleTouchEvent
      }
    }
  })
</script>

<style lang="scss" scoped>
  @use 'sass:math';
  @import 'src/styles/init.scss';

  #player {
    $size: 5rem;
    position: fixed;
    left: 0;
    bottom: 18%;
    z-index: $z-index-toolbox;
    transition: opacity $transition-time-fast,
      transform $transition-time-normal cubic-bezier(0.65, 0.05, 0.36, 1);
    height: $size;
    transform: translateX(-18rem);
    display: flex;
    align-items: center;
    border-top-right-radius: $sm-radius;
    border-bottom-right-radius: $sm-radius;
    background-color: $module-bg-opaque;
    overflow: hidden;
    opacity: 0.5;
    &.playing {
      transform: translateX(-13rem);
    }
    &:hover {
      opacity: 0.9;
      transform: translateX(0);
    }

    .panel {
      padding: $gap;

      .control {
        display: flex;
        justify-content: flex-start;
        margin-bottom: $xs-gap;

        > .button {
          margin-right: $lg-gap;

          &:hover {
            .iconfont {
              color: $link-hover;
            }
          }
        }
      }

      .song {
        max-width: 11rem;
        @include text-overflow();

        .link {
          color: $text-secondary;
          @include color-transition();

          &:hover {
            color: $link-hover;
          }
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
        background-image: cdn-url('/images/page-music/background.jpg');
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
