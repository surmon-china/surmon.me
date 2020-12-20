<template>
  <header id="header" class="header">
    <div class="header-container container">
      <div class="header-header">
        <uimage cdn src="/images/logo.svg" class="header-logo" />
        <span class="header-slogan">
          <i18n :lkey="LANGUAGE_KEYS.APP_SLOGAN" />
        </span>
        <router-link to="/" class="header-link" :title="t(LANGUAGE_KEYS.APP_SLOGAN)" />
      </div>
      <client-only transition>
        <div class="header-player" v-if="music">
          <div class="panel">
            <button
              class="prev-song button"
              :disabled="!music.state.ready || music.state.index === 0"
              @click="music.prevSong"
            >
              <i class="iconfont icon-music-prev"></i>
            </button>
            <button
              class="toggle-play button"
              :disabled="!music.state.ready"
              @click="music.togglePlay"
            >
              <i
                class="iconfont"
                :class="music.state.playing ? 'icon-music-pause' : 'icon-music-play'"
              ></i>
            </button>
            <button
              class="next-song button"
              :disabled="!music.state.ready"
              @click="music.nextSong"
            >
              <i class="iconfont icon-music-next"></i>
            </button>
            <button
              class="muted-toggle button"
              :disabled="!music.state.ready"
              @click="music.toggleMuted"
            >
              <i
                class="iconfont"
                :class="music.muted ? 'icon-music-muted' : 'icon-music-volume'"
              ></i>
            </button>
          </div>
          <div v-if="music.currentSong" class="song">
            <router-link
              class="link"
              :to="getPageRoute(RouteName.Music)"
              :title="`${music.currentSong.name} / ${music.currentSong.album || 'unknow'}`"
            >
              <span>{{ music.currentSong.name }} By {{ music.currentSong.artists.join(' / ') }} | {{ music.currentSong.album || 'unknow' }}</span>
            </router-link>
          </div>
          <div v-else class="song">
            <i18n :lkey="LANGUAGE_KEYS.MUSIC_PLACEHOLDER" />
          </div>
        </div>
      </client-only>
    </div>
    <div class="pre-load">
      <uimage
        defer
        :src="music.currentSongPicUrl"
        alt="song-thumb"
        v-if="music?.currentSongPicUrl"
      />
      <uimage defer cdn src="/images/sponsor.png" alt="sponsor" />
      <uimage defer cdn src="/images/page-app/hot.png" alt="app-download" />
      <uimage defer cdn src="/images/page-app/logo.png" alt="app-logo" />
      <uimage defer cdn src="/images/page-feeelancer/banner.jpg" alt="service" />
      <uimage defer cdn src="/images/page-about/background-be-1.jpg" alt="background" />
      <uimage defer cdn src="/images/page-about/background-be-2.jpg" alt="background" />
      <uimage defer cdn src="/images/page-about/background-star-1.png" alt="background" />
      <uimage defer cdn src="/images/page-about/background-star-2.png" alt="background" />
    </div>
  </header>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, computed } from 'vue'
  import { isClient } from '/@/environment'
  import { RouteName } from '/@/router'
  import { useI18n } from '/@/services/i18n'
  import { useMusic } from '/@/services/music'
  import { LANGUAGE_KEYS } from '/@/language/key'
  import { getPageRoute } from '/@/transforms/route'

  export default defineComponent({
    name: 'PcHeader',
    setup() {
      const i18n = useI18n()
      const music = isClient && useMusic()
      return {
        LANGUAGE_KEYS,
        RouteName,
        t: i18n.t,
        music,
        getPageRoute
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $header-height;
    z-index: $z-index-header;
    background-color: $module-bg;
    @include backdrop-blur();

    .header-container {
      height: 100%;
      display: flex;
      justify-content: space-between;

      .header-header {
        height: 100%;
        display: flex;
        position: relative;
        align-items: center;
        padding-left: $sm-gap;
        width: 29em;
        overflow: hidden;

        @keyframes logo-blink {
          0% { mask-position: -30% }
          100% { mask-position: 666% }
        }

        .header-logo {
          width: 11rem;
          margin-right: $gap * 4;
          filter: $theme-logo-rotate;
          /* mask-size: 88%;
          mask-position: -30%;
          mask-image: linear-gradient(
            to bottom right,
            rgba(255, 255, 255, 0.2),
            rgba(255, 255, 255, 0.9),
            rgba(255, 255, 255, 0.2)
          );
          animation: logo-blink 8s ease-in 1s infinite; */

          .logo-st {
            fill: $primary;
          }
        }

        .header-slogan {
          color: $primary;
          font-family: 'webfont-normal', DINRegular;
        }

        .header-link {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }

      .header-player {
        width: 14rem;
        display: flex;
        flex-direction: column;
        align-items: inherit;
        justify-content: center;
        opacity: .3;
        @include text-overflow();
        @include visibility-transition();

        &:hover {
          opacity: 1;
        }

        > .panel {
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

        > .song {
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

        .iconfont {
          color: $text-dividers;
          @include color-transition();
        }
      }
    }

    > .pre-load {
      width: 0;
      height: 0;
      @include hidden();
    }
  }
</style>
