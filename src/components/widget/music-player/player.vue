<template>
  <div class="music-player">
    <div class="panel">
      <div class="song">
        <img class="cover" :src="currentSong?.cover_art_url" draggable="false" />
        <div class="info" v-if="currentSong && player">
          <p class="title">
            <span class="name">{{ currentSong.name }}</span>
            <span class="artist">{{ currentSong.artist }}</span>
          </p>
          <p class="duration">
            <span>{{ getSecondsView(player.state.speeds) }}</span>
            <span> / </span>
            <span>{{ getSecondsView(currentSong.duration / 1000) }}</span>
          </p>
        </div>
      </div>
      <div class="control">
        <button class="cut-song prev" :disabled="!player?.state?.ready" @click="player?.prevSong()">
          <i class="iconfont icon-music-prev"></i>
        </button>
        <button class="toggle-play" :disabled="!player?.state.ready" @click="player?.togglePlay()">
          <i
            class="iconfont"
            :class="player?.state.playing ? 'icon-music-pause' : 'icon-music-play'"
          ></i>
        </button>
        <button class="cut-song next" :disabled="!player?.state.ready" @click="player?.nextSong()">
          <i class="iconfont icon-music-next"></i>
        </button>
      </div>
      <div class="tools">
        <span class="indexed" v-if="player">
          {{ player.state.index + 1 }} / {{ player?.state.count }}
        </span>
        <ulink class="list-link" :href="VALUABLE_LINKS.MUSIC_163">
          <i class="iconfont icon-new-window-s"></i>
        </ulink>
        <button
          class="toggle-muted"
          :disabled="!player?.state.ready"
          @click="player?.toggleMuted()"
        >
          <i class="iconfont" :class="muted ? 'icon-music-muted' : 'icon-music-unmuted'" />
        </button>
      </div>
    </div>
    <div class="progress">
      <div class="played" :style="{ width: `${player.state.progress}%` }" v-if="player"></div>
    </div>
    <div class="songs">
      <ul class="list">
        <li
          class="item"
          :class="{ playing: player?.state.index === index }"
          :key="index"
          v-for="(song, index) in player?.state.songs"
        >
          <div class="index">{{ String(index + 1).padStart(2, '0') }}</div>
          <span v-if="player?.state.index === index" class="play">
            <i class="iconfont icon-music-unmuted"></i>
          </span>
          <button v-else class="play" @click="handlePlayByIndex(index)">
            <i class="iconfont icon-music-play"></i>
          </button>
          <ulink class="name" :title="song.name" :href="get163MusicSongDetailURL(song.id)">
            <span class="text">{{ song.name }}</span>
            <i class="iconfont icon-new-window-s"></i>
          </ulink>
          <div class="artist" :title="song.artist">{{ song.artist }}</div>
          <div class="duration">{{ getSecondsView(song.duration / 1000) }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useMusic } from '/@/composables/music'
  import { get163MusicSongDetailURL } from '/@/transforms/media'
  import { VALUABLE_LINKS } from '/@/config/app.config'
  import { isClient } from '/@/app/environment'

  export default defineComponent({
    name: 'MusicPlayer',
    setup() {
      const musicPlayer = isClient ? useMusic() : null
      const muted = computed(() => Boolean(musicPlayer?.muted.value))
      const currentSong = computed(() => musicPlayer?.currentSong.value)
      const handlePlayByIndex = (index: number) => musicPlayer?.play(index)
      const getSecondsView = (seconds: number) => {
        const minutesText = String(Math.floor(seconds / 60)).padStart(2, '0')
        const secondsText = String(Math.floor(seconds % 60)).padStart(2, '0')
        return `${minutesText}:${secondsText}`
      }

      return {
        VALUABLE_LINKS,
        player: musicPlayer,
        muted,
        currentSong,
        handlePlayByIndex,
        get163MusicSongDetailURL,
        getSecondsView
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .music-player {
    position: relative;
    overflow: auto;
    width: 50vw;
    height: 70vh;
    display: flex;
    flex-direction: column;

    .panel {
      width: 100%;
      display: grid;
      grid-template-columns: 35% 30% 35%;
      background-color: $module-bg-lighter;

      .song {
        padding: $gap;
        overflow: hidden;
        display: flex;

        .cover {
          $size: 4rem;
          width: $size;
          height: $size;
          border-radius: $sm-radius;
          margin-right: $gap;
          background-color: $module-bg-darker-1;
        }

        .info {
          font-weight: bold;

          .title {
            display: flex;
            align-items: baseline;
            margin-bottom: $xs-gap;
            white-space: nowrap;

            .name,
            .artist {
              display: inline-block;
              @include text-overflow();
            }

            .name {
              margin-top: 1px;
              max-width: 8rem;
              font-size: $font-size-h4;
            }

            .artist {
              max-width: 7rem;
              margin-left: $xs-gap;
              color: $text-disabled;
            }
          }

          .duration {
            margin: 0;
            color: $text-disabled;
          }
        }
      }

      .control {
        display: flex;
        justify-content: center;
        align-items: center;

        .toggle-play {
          margin: 0 $lg-gap;
          font-size: $font-size-h1 * 1.2;
          transition: all $transition-time-fast;
          &:hover {
            color: $link-color;
          }
        }

        .cut-song {
          width: 3rem;
          font-size: $font-size-h3;
          color: $text-disabled;
          &:hover {
            color: $text;
          }
        }
      }

      .tools {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: $lg-gap;
        font-size: $font-size-h4;

        .list-link,
        .toggle-muted {
          margin-left: $lg-gap;
          color: $text-disabled;
          &:hover {
            color: $text;
          }
        }

        .indexed {
          display: block;
          padding: $xs-gap $sm-gap;
          border-radius: $xs-radius;
          font-size: $font-size-small;
          font-weight: bold;
          color: $text-disabled;
          background-color: $module-bg-darker-1;
        }
      }
    }

    .progress {
      position: relative;
      width: 100%;
      height: $sm-gap;
      box-sizing: content-box;
      background-color: $module-bg-darker-1;

      .played {
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
        background-color: $module-bg-darker-3;
        transition: width $transition-time-fast;
        will-change: width;
      }
    }

    .songs {
      flex: 1;
      overflow-y: scroll;
      @include scroll-snap-y();

      .list {
        width: 100%;
        margin: 0;
        padding: 0;

        .item {
          display: grid;
          grid-template-columns: 5% 5% 60% 20% 10%;
          width: 100%;
          height: 3rem;
          line-height: 3rem;
          @include scroll-snap-item();
          &.playing,
          &:hover {
            background-color: $module-bg-lighter;
          }
          &.playing {
            .play {
              color: $link-color;
            }
          }

          .index {
            padding-left: 1em;
            font-weight: bold;
            color: $text-disabled;
          }

          .play {
            text-align: center;
            color: $text-disabled;
            &:hover {
              color: $text;
            }
          }

          .name .text,
          .artist {
            max-width: 80%;
            @include text-overflow();
          }

          .name {
            display: flex;
            align-items: baseline;
            &:hover {
              .text {
                text-decoration: underline;
                color: $link-color;
              }
              .iconfont {
                color: $text;
              }
            }

            .text {
              display: inline-block;
              font-weight: bold;
              color: $text;
            }
            .iconfont {
              margin-left: $xs-gap;
              font-size: $font-size-small;
              color: $text-disabled;
            }
          }

          .artist {
            color: $text-secondary;
          }

          .duration {
            text-align: center;
            color: $text-divider;
          }
        }
      }
    }
  }
</style>
