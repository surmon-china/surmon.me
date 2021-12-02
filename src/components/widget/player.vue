<template>
  <div id="player" v-if="music">
    <div class="cd">
      <!-- <img class="image" :src="currentSong?.cover_art_url" /> -->
      <img class="image" src="/images/page-music/background.jpg" />
      <button class="toggle-button" :disabled="!music.state.ready" @click="music.togglePlay">
        <i
          class="iconfont"
          :class="music.state.playing ? 'icon-music-pause' : 'icon-music-play'"
        ></i>
      </button>
    </div>
    <div class="panel">
      <div class="control">
        <button class="prev-song button" :disabled="!music.state.ready" @click="music.prevSong">
          <i class="iconfont icon-music-prev"></i>
        </button>
        <button class="next-song button" :disabled="!music.state.ready" @click="music.nextSong">
          <i class="iconfont icon-music-next"></i>
        </button>
        <button
          class="muted-toggle button"
          :disabled="!music.state.ready"
          @click="music.toggleMuted"
        >
          <i class="iconfont" :class="muted ? 'icon-music-muted' : 'icon-music-unmuted'"></i>
        </button>
      </div>
      <div class="song">
        <router-link class="link" :to="getPageRoute(RouteName.Music)">
          <span v-if="currentSong"
            >{{ currentSong.name }} By {{ currentSong.artist }} |
            {{ currentSong.album || 'unknow' }}</span
          >
          <i18n v-else :lkey="LANGUAGE_KEYS.MUSIC_PLACEHOLDER" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { isClient } from '/@/app/environment'
  import { RouteName } from '/@/app/router'
  import { useI18n } from '/@/services/i18n'
  import { useMusic } from '/@/services/music'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { getPageRoute } from '/@/transforms/route'

  export default defineComponent({
    name: 'PlayerControl',
    setup() {
      const i18n = useI18n()
      const music = isClient ? useMusic() : null

      return {
        LANGUAGE_KEYS,
        RouteName,
        t: i18n.t,
        music,
        muted: music?.muted,
        currentSong: music?.currentSong,
        getPageRoute
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
    right: 0;
    top: 20%;
    z-index: $z-index-toolbox;
    opacity: 0.7;
    transform: translateX(16rem);
    transition: opacity $transition-time-fast, transform $transition-time-normal ease-in-out;
    height: $size;
    display: flex;
    align-items: center;
    background-color: $module-bg-opaque;
    &:hover {
      opacity: 1;
      transform: translateX(0);
    }

    .cd {
      position: relative;
      display: block;
      width: $size;
      height: $size;
      overflow: hidden;
      border-top-left-radius: $sm-radius;
      border-bottom-left-radius: $sm-radius;
      border-left: 4px solid $primary;
      background-color: $module-bg-darker-1;
      background: linear-gradient(60deg, $primary, $red, $yellow, $accent, $primary) border-box;

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
              color: $link-color-hover;
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
            color: $link-color-hover;
          }
        }
      }
    }
  }
</style>
