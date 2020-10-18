<template>
  <div class="music-page">
    <div class="player">
      <button
        class="prev-song"
        :disabled="!player.state.ready || player.state.index === 0"
        @click="player.prevSong"
      >
        <i class="iconfont icon-music-prev"></i>
      </button>
      <div class="album-box">
        <div class="circle-progress">
          <svg viewBox="0 0 100 100">
            <path
              class="circle-progress-circle-track"
              fill="none"
              :d="trackPath"
              :stroke-width="relativeStrokeWidth"
            />
            <path
              class="circle-progress-circle-path"
              stroke-linecap="bevel"
              fill="none"
              :d="trackPath"
              :stroke-width="relativeStrokeWidth"
              :style="circlePathStyle"
            />
          </svg>
        </div>
        <div class="song-bg-box" :class="{ 'playing': player.state.playing }">
          <img :src="player.currentSongPicUrl" draggable="false">
        </div>
        <div class="toggle-box">
          <transition name="module" mode="out-in">
            <button
              :key="player.state.playing ? 'pause' : 'play'"
              :disabled="!player.state.ready"
              class="toggle-btn"
              @click="player.togglePlay"
            >
              <i
                class="iconfont"
                :class="player.state.playing
                  ? 'icon-music-pause'
                  : 'icon-music-play'"
              ></i>
            </button>
          </transition>
        </div>
        <div class="toggle-muted">
          <button
            class="muted-btn"
            :disabled="!player.state.ready"
            @click="player.toggleMuted"
          >
            <i
              class="iconfont"
              :class="player.muted ? 'icon-music-muted' : 'icon-music-volume'"
            />
          </button>
        </div>
      </div>
      <button
        class="next-song"
        :disabled="!player.state.ready"
        @click="player.nextSong"
      >
        <i class="iconfont icon-music-next"></i>
      </button>
    </div>
    <div class="song-info">
      <h4 class="name">
        <template v-if="currentSong">{{ currentSong.name }} By {{ currentSong.artist }} / {{ currentSong.album || 'unknow' }}</template>
        <template v-else>Kind words are the music of the world.</template>
      </h4>
      <transition name="fade">
        <p v-if="player.currentSongRealTimeLrc !== null" class="lrc">
          <transition name="module" mode="out-in">
            <span :key="player.currentSongRealTimeLrc" class="lrc-text">
              {{ player.currentSongRealTimeLrc }}
            </span>
          </transition>
        </p>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useMusic } from '/@/services/music'
  export default defineComponent({
    name: 'Music',
    // head() {
    //   return {
    //     title: `${this.isEnLang ? '' : this.$i18n.nav.music + ' | '}Music`
    //   }
    // },
    setup() {
      const musicPlayer = useMusic()
      const currentSong = computed(() => {
        return musicPlayer?.currentSong
      })

      const relativeStrokeWidth = parseFloat((15 / 450 * 100).toFixed(1))
      const radius = 50 - relativeStrokeWidth / 2
      const perimeter = 2 * Math.PI * radius
      const trackPath = (() => {
        const _radius = parseInt(String(radius), 10)
        return `M 50 50 m 0 -${_radius} a ${_radius} ${_radius} 0 1 1 0 ${_radius * 2} a ${_radius} ${_radius} 0 1 1 0 -${_radius * 2}`
      })()

      const circlePathStyle = computed(() => ({
        strokeDasharray: `${perimeter}px, ${perimeter}px`,
        strokeDashoffset: (1 - (musicPlayer.state.progress) / 100) * perimeter + 'px'
      }))

      return {
        player: musicPlayer,
        currentSong,
        trackPath,
        relativeStrokeWidth,
        circlePathStyle
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .music-page {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    min-height: 58rem;
    height: $full-page-active-content-height;

    > .player {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;

      > .prev-song,
      > .next-song {
        width: 3rem;

        &:hover {
          > .iconfont {
            color: $text;
          }
        }

        > .iconfont {
          font-size: 3em;
          color: $text-dividers;
        }
      }

      > .album-box {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 38rem;
        height: 38rem;
        opacity: .9;
        @include visibility-transition();

        &:hover {
          opacity: 1;
        }

        @keyframes rotation {
          from { transform: rotate(0deg) }
          to { transform: rotate(360deg) }
        }

        > .song-bg-box {
          position: absolute;
          width: 100%;
          height: 100%;
          padding: $gap;
          overflow: hidden;
          border-radius: 100%;
          animation: rotation 26s linear infinite;
          animation-play-state: paused;

          &.playing {
            animation-play-state: running;
          }

          > img {
            width: 100%;
            height: 100%;
            border-radius: 100%;
            background-color: $module-bg-darker-1;
            background-image: cdn-url('/images/page-music/background.jpg');
            background-size: cover;
          }
        }

        > .toggle-box {
          > .toggle-btn {
            width: 6rem;
            height: 6rem;
            line-height: 6rem;
            background-color: $module-bg;
            border-radius: 100%;
            opacity: .8;
            font-size: 3em;
            text-align: center;
            transition: all $transition-time-fast;

            &:hover {
              opacity: 1;
              transform: scale(1.2);
            }

            > .iconfont {
              color: $text-reversal;
            }
          }
        }

        > .toggle-muted {
          position: absolute;
          top: 15%;

          > .muted-btn {
            > .iconfont {
              font-size: 2em;
              color: $module-bg;
            }

            &:hover {
              > .iconfont {
                color: $text-reversal;
              }
            }
          }
        }

        > .circle-progress {
          width: 100%;
          height: 100%;
          display: block;
          position: absolute;

          .circle-progress-circle-track {
            stroke: $module-bg-darker-2;
          }

          .circle-progress-circle-path {
            stroke: $module-bg-darker-4;
            transition: all 0.6s;
          }
        }
      }
    }

    > .song-info {
      margin-top: $lg-gap * 3;
      text-align: center;

      > .lrc {
        .lrc-text {
          color: $primary;
        }
      }
    }
  }
</style>
