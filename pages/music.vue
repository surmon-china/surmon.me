<template>
  <div class="page" :style="{ height: height + 'px' }">
    <div class="player">
      <button class="prev-song" @click="prevSong" :disabled="!playerState.ready">
        <i class="iconfont icon-music-prev"></i>
      </button>
      <div class="album-box">
        <div class="circle-progress">
          <svg viewBox="0 0 100 100">
            <path class="circle-progress-circle-track" 
                  :d="trackPath" 
                  stroke="rgba(197, 197, 197, 0.4)" 
                  :stroke-width="relativeStrokeWidth" 
                  fill="none">
            </path>
            <path class="circle-progress-circle-path" 
                  :d="trackPath" 
                  stroke-linecap="bevel" 
                  stroke="rgba(190, 190, 190, 0.7)" 
                  :stroke-width="relativeStrokeWidth" 
                  fill="none" 
                  :style="circlePathStyle">
            </path>
          </svg>
        </div>
        <div class="song-bg-box" :class="{ 'playing': playerState.playing }">
          <img :src="currentSongPicUrl">
        </div>
        <div class="toggle-box">
          <transition name="module" mode="out-in">
            <button class="toggle-btn" @click="togglePlay" v-if="playerState.playing" :disabled="!playerState.ready">
              <i class="iconfont icon-music-pause"></i>
            </button>
            <button class="toggle-btn" @click="togglePlay" v-else :disabled="!playerState.ready">
              <i class="iconfont icon-music-play"></i>
            </button>
          </transition>
        </div>
        <div class="toggle-muted">
          <button class="muted-btn" @click="toggleMuted" :disabled="!playerState.ready">
            <i class="iconfont" :class="[playerState.muted ? 'icon-music-muted' : 'icon-music-volume']"></i>
          </button>
        </div>
      </div>
      <button class="next-song" @click="nextSong" :disabled="!playerState.ready">
        <i class="iconfont icon-music-next"></i>
      </button>
    </div>
    <div class="song-info">
      <h3 v-if="currentSong">
        <span>{{ currentSong.name }}</span>
        <span> By </span>
        <span v-for="artist in currentSong.artists">{{ artist.name }}</span>
        <span> / </span>
        <span>{{ currentSong.album.name || 'unknow' }}</span>
      </h3>
      <h3 v-else>Kind words are the music of the world.</h3>
    </div>
  </div>
</template>

<script>
  import EventBus from '~/utils/event-bus'
  export default {
    name: 'music',
    head: {
      title: 'Music',
    },
    data() {
      return {
        height: 0
      }
    },
    created() {
      if (this.$store.state.option.mobileLayout) {
        this.$router.back()
      }
    },
    mounted() {
      if (process.browser) {
        this.updateScreenHeight()
        window.addEventListener('resize', this.updateScreenHeight)
      }
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.updateScreenHeight)
    },
    computed: {
      player() {
        return EventBus.player.player
      },
      playerState() {
        return EventBus.player.playerState
      },
      currentSong() {
        return EventBus.currentSong
      },
      currentSongPicUrl() {
        if (this.currentSong) {
          let picUrl = this.currentSong.album.picUrl
          return picUrl 
                 ? picUrl.replace('http://', '/proxy/') + '?param=600y600' 
                 : `${this.cdnUrl}/images/music-bg.jpg`
        } else {
          return `${this.cdnUrl}/images/music-bg.jpg`
        }
      },
      relativeStrokeWidth() {
        return (15 / 450 * 100).toFixed(1)
      },
      trackPath() {
        var radius = parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10)
        return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`
      },
      perimeter() {
        var radius = 50 - parseFloat(this.relativeStrokeWidth) / 2
        return 2 * Math.PI * radius
      },
      circlePathStyle() {
        var perimeter = this.perimeter
        return {
          strokeDasharray: `${perimeter}px,${perimeter}px`,
          strokeDashoffset: (1 - (this.playerState.progress) / 100) * perimeter + 'px',
          transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
        };
      }
    },
    methods: {
      updateScreenHeight(event) {
        const screenHeight = window.innerHeight
        const minHeight = 14 * 53
        if (screenHeight - 14 * 4 > minHeight) {
          this.height = screenHeight - (14 * 12)
        } else {
          this.height = minHeight
        }
      },
      togglePlay() {
        if (this.playerState.ready) {
          this.player.togglePlay()
        }
      },
      toggleMuted() {
        if (this.playerState.ready) {
          this.player.toggleMuted()
        }
      },
      prevSong() {
        if (this.playerState.ready) {
          this.player.prevSong()
        }
      },
      nextSong() {
        if (this.playerState.ready) {
          this.player.nextSong()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';
  .page {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    > .player {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 2em;
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
          color: $dividers;
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
          padding: 1rem;
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
            background-image: url('/images/music-bg.jpg');
            background-size: cover;
          }
        }

        > .toggle-box {
          z-index: 9;

          > .toggle-btn {
            width: 6rem;
            height: 6rem;
            line-height: 6rem;
            text-align: center;
            background-color: $module-bg;
            border-radius: 100%;
            opacity: .5;

            &:hover {
              opacity: .8;
              transform: scale(1.2);
            }

            > .iconfont {
              color: #fff;
              font-size: 3em;
            }
          }
        }

        > .toggle-muted {
          position: absolute;
          bottom: 15%;

          > .muted-btn {

            > .iconfont {
              font-size: 2em;
              color: $module-hover-bg;
            }

            &:hover {

              > .iconfont {
                color: $module-bg;
              }
            }
          }
        }

        > .circle-progress {
          width: 100%;
          height: 100%;
          display: block;
          position: absolute;
        }
      }
    }

    > .song-info {
      text-align: center;
    }
  }
</style>
