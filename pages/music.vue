<template>
  <div class="music-page">
    <div class="player">
      <button
        class="prev-song"
        :disabled="!musicPlayer.ready || musicPlayer.index === 0"
        @click="musicPlayer.prevSong"
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
        <div class="song-bg-box" :class="{ 'playing': musicPlayer.playing }">
          <img :src="musicPlayer.currentSongPicUrl" draggable="false">
        </div>
        <div class="toggle-box">
          <transition name="module" mode="out-in">
            <button
              :key="musicPlayer.playing ? 'pause' : 'play'"
              :disabled="!musicPlayer.ready"
              class="toggle-btn"
              @click="musicPlayer.togglePlay"
            >
              <i v-if="musicPlayer.playing" class="iconfont icon-music-pause"></i>
              <i v-else class="iconfont icon-music-play"></i>
            </button>
          </transition>
        </div>
        <div class="toggle-muted">
          <button class="muted-btn" :disabled="!musicPlayer.ready" @click="musicPlayer.toggleMuted">
            <i class="iconfont" :class="musicPlayer.muted ? 'icon-music-muted' : 'icon-music-volume'"></i>
          </button>
        </div>
      </div>
      <button class="next-song" :disabled="!musicPlayer.ready" @click="musicPlayer.nextSong">
        <i class="iconfont icon-music-next"></i>
      </button>
    </div>
    <div class="song-info">
      <h3 class="name">
        <span v-if="currentSong">{{ currentSong.name }} By {{ currentSong.artist }} / {{ currentSong.album || 'unknow' }}</span>
        <span v-else>Kind words are the music of the world.</span>
      </h3>
      <transition name="fade">
        <p v-if="musicPlayer.currentSongLrcData && musicPlayer.currentSongLrcData.version >= 3" class="lrc">
          <transition name="module" mode="out-in">
            <span
              :key="musicPlayer.currentSongRealTimeLrc"
              class="lrc-text"
            >{{ musicPlayer.currentSongRealTimeLrc }}</span>
          </transition>
        </p>
      </transition>
    </div>
  </div>
</template>

<script>
  import { isBrowser } from '~/environment'
  import musicPlayer from '~/services/music-player'
  export default {
    name: 'Music',
    head() {
      return {
        title: `${this.isEnLang ? '' : this.$i18n.nav.music + ' | '}Music`
      }
    },
    computed: {
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      },
      musicPlayer() {
        return musicPlayer
      },
      currentSong() {
        return musicPlayer.currentSong
      },
      relativeStrokeWidth() {
        return (15 / 450 * 100).toFixed(1)
      },
      trackPath() {
        const radius = parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10)
        return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`
      },
      perimeter() {
        const radius = 50 - parseFloat(this.relativeStrokeWidth) / 2
        return 2 * Math.PI * radius
      },
      circlePathStyle() {
        const perimeter = this.perimeter
        return {
          strokeDasharray: `${perimeter}px, ${perimeter}px`,
          strokeDashoffset: (1 - (this.musicPlayer.progress) / 100) * perimeter + 'px'
        }
      }
    },
    created() {
      if (this.$store.state.global.isMobile) {
        this.$router.back()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .music-page {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    min-height: 58rem;
    height: $active-content-full-height;

    > .player {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 2rem;
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
            background-color: darkgray;
            background-image: cdn-url('/images/music-bg.jpg');
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
            stroke: $module-hover-bg;
          }

          .circle-progress-circle-path {
            stroke: $module-hover-bg-darken-20;
            transition: all 0.6s;
          }
        }
      }
    }

    > .song-info {
      text-align: center;

      > .lrc {
        .lrc-text {
          color: $primary;
        }
      }
    }
  }
</style>
