<template>
  <div id="player">
    <div class="panel" v-if="music">
      <div class="cd">
        <img class="image" :src="currentSong?.cover_art_url" alt="" />
        <button class="toggle-button" :disabled="!music.state.ready" @click="music.togglePlay">
          <i
            class="iconfont"
            :class="music.state.playing ? 'icon-music-pause' : 'icon-music-play'"
          ></i>
        </button>
      </div>
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
      <div v-if="currentSong" class="song">
        <router-link
          class="link"
          :to="getPageRoute(RouteName.Music)"
          :title="`${currentSong.name} / ${currentSong.album || 'unknow'}`"
        >
          <span
            >{{ currentSong.name }} By {{ currentSong.artist }} |
            {{ currentSong.album || 'unknow' }}</span
          >
        </router-link>
      </div>
      <div v-else class="song">
        <i18n :lkey="LANGUAGE_KEYS.MUSIC_PLACEHOLDER" />
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
    position: fixed;
    right: 0;
    top: 20%;
    opacity: 0.4;
    transform: translateX(178px);
    transition: opacity $transition-time-fast, transform $transition-time-normal ease-in-out;
    &:hover {
      opacity: 1;
      transform: translateX(0);
    }

    .panel {
      $size: 5rem;
      position: relative;
      width: 14rem;
      height: $size;
      padding-left: 3rem;
      padding-right: $gap;
      display: flex;
      flex-direction: column;
      align-items: inherit;
      justify-content: center;
      @include common-bg-module();
      @include visibility-transition();

      .cd {
        display: block;
        width: $size;
        height: $size;
        position: absolute;
        left: math.div(-$size, 2);
        top: 0;
        overflow: hidden;
        border-radius: 100%;
        border: 3px solid transparent;
        background-color: $module-bg;
        /* background: linear-gradient(60deg, $primary, $red, $yellow, $accent, $primary) border-box; */
        border-left-color: $primary;
        border-top-color: $red;
        border-bottom-color: $accent;
        border-right-color: $yellow;

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
          color: $text-reversal;
        }
      }

      .control {
        display: flex;
        justify-content: flex-start;
        margin-bottom: $sm-gap;

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
        font-size: $font-size-small;
        @include text-overflow();

        > .link {
          color: $text-dividers;
          @include color-transition();

          &:hover {
            color: $link-color-hover;
          }
        }
      }
    }
  }
</style>
