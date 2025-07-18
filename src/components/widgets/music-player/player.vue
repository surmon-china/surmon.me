<script lang="ts" setup>
  import { shallowRef, onMounted, watch, nextTick } from 'vue'
  import { useMusic } from '/@/composables/music'
  import { get163MusicSongDetailURL } from '/@/transforms/media'
  import { VALUABLE_LINKS } from '/@/configs/app.config'
  import { useCoverArtURL } from './helper'

  const player = useMusic()
  const { state, playlist, currentSong } = player

  const songsRef = shallowRef<Array<HTMLLIElement>>([])

  const isUnPlayableSong = (index: number) => {
    return playlist.unplayableIndexs.includes(index)
  }

  const handleSetVolume = (event: any) => {
    player.setVolume(Number(event.target.value))
  }

  const getSecondsView = (seconds: number) => {
    const minutesText = String(Math.floor(seconds / 60)).padStart(2, '0')
    const secondsText = String(Math.floor(seconds % 60)).padStart(2, '0')
    return `${minutesText}:${secondsText}`
  }

  onMounted(() => {
    watch(
      () => state.index,
      (index) => songsRef.value[index]?.scrollIntoView({ behavior: 'smooth' })
    )
    nextTick(() => {
      songsRef.value[state.index]?.scrollIntoView({ behavior: 'instant' })
    })
  })
</script>

<template>
  <div class="music-player" v-disabled-wallflower>
    <div class="panel">
      <div class="song">
        <img class="cover" :src="useCoverArtURL(currentSong?.cover_art_url)" draggable="false" />
        <div class="info" v-if="currentSong">
          <p class="title">
            <span class="name">{{ currentSong.name }}</span>
            <span class="artist">{{ currentSong.artist }}</span>
          </p>
          <p class="duration">
            <span>{{ getSecondsView(state.currentTime) }}</span>
            <span> / </span>
            <span>{{ getSecondsView(currentSong.duration / 1000) }}</span>
          </p>
        </div>
      </div>
      <div class="control">
        <button class="cut-song prev" :disabled="!state.initialized" @click="player.prevSong">
          <i class="iconfont icon-music-prev"></i>
        </button>
        <button class="toggle-play" :disabled="!state.initialized" @click="player.togglePlay">
          <i class="iconfont" :class="state.playing ? 'icon-music-pause' : 'icon-music-play'"></i>
        </button>
        <button class="cut-song next" :disabled="!state.initialized" @click="player.nextSong">
          <i class="iconfont icon-music-next"></i>
        </button>
      </div>
      <div class="tools">
        <span class="indexed">{{ state.index + 1 }} / {{ playlist.total }}</span>
        <ulink class="playlist-link" :href="VALUABLE_LINKS.MUSIC_163_PLAYLIST">
          <i class="iconfont icon-new-window-s"></i>
        </ulink>
        <button class="toggle-muted" :disabled="!state.initialized" @click="player.toggleMuted">
          <i class="iconfont" :class="state.muted ? 'icon-music-muted' : 'icon-music-unmuted'" />
        </button>
        <input
          class="volume"
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          :value="state.volume"
          @input="handleSetVolume($event)"
        />
      </div>
    </div>
    <div class="progress">
      <div class="played" :style="{ width: `${state.progress * 100}%` }"></div>
    </div>
    <div class="songs">
      <ul class="list">
        <li
          ref="songsRef"
          class="item"
          :class="{ playing: state.index === index, unplayable: isUnPlayableSong(index) }"
          v-for="(song, index) in playlist.songs"
          :key="index"
        >
          <div class="index">{{ String(index + 1).padStart(2, '0') }}</div>
          <span v-if="state.index === index" class="play">
            <i class="iconfont icon-music-unmuted"></i>
          </span>
          <button v-else class="play" @click="player.play(index)" :disabled="isUnPlayableSong(index)">
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

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

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
          border-radius: $radius-sm;
          margin-right: $gap;
          background-color: $module-bg-darker-1;
          background-image: global.surl('/images/music.webp');
          background-size: cover;
        }

        .info {
          font-weight: bold;

          .title {
            display: flex;
            align-items: baseline;
            margin-bottom: $gap-xs;
            white-space: nowrap;

            .name,
            .artist {
              display: inline-block;
              @include mix.text-overflow();
            }

            .name {
              margin-top: 1px;
              max-width: 10rem;
              font-size: $font-size-h4;
            }

            .artist {
              max-width: 6rem;
              margin-left: $gap-xs;
              color: $color-text-disabled;
            }
          }

          .duration {
            margin: 0;
            color: $color-text-disabled;
          }
        }
      }

      .control {
        display: flex;
        justify-content: center;
        align-items: center;

        .toggle-play {
          margin: 0 $gap-lg;
          font-size: $font-size-h1 * 1.2;
          transition: all $motion-duration-fast;
          &:hover {
            color: $color-link;
          }
        }

        .cut-song {
          width: 3rem;
          font-size: $font-size-h3;
          color: $color-text-disabled;
          &:hover {
            color: $color-text;
          }
        }
      }

      .tools {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0 $gap-lg;
        font-size: $font-size-h4;

        .indexed {
          display: block;
          padding: 0.1em $gap-sm;
          border-radius: $radius-xs;
          font-size: $font-size-root;
          font-weight: bold;
          color: $color-text-disabled;
          background-color: $module-bg-darker-1;
        }

        .playlist-link,
        .toggle-muted {
          color: $color-text-disabled;
          &:hover {
            color: $color-text;
          }
        }

        .toggle-muted {
          width: 2rem;
          margin-right: $gap-sm;
        }

        .playlist-link {
          margin: 0 $gap-sm;
        }

        .volume {
          $size: 12px;
          width: 4.6rem;
          height: $size + 2;
          padding: 0 1px;
          background: $module-bg-darker-1;
          outline: none;
          appearance: none;

          &::-webkit-slider-thumb {
            width: $size;
            height: $size;
            background: $module-bg-darker-3;
            cursor: pointer;
            appearance: none;
          }
          &::-moz-range-thumb {
            width: $size;
            height: $size;
            border: none;
            border-radius: 0;
            background: $module-bg-darker-3;
            cursor: pointer;
          }
        }
      }
    }

    .progress {
      position: relative;
      width: 100%;
      height: $gap-sm;
      box-sizing: content-box;
      background-color: $module-bg-darker-1;

      .played {
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
        background-color: $module-bg-darker-3;
        transition: width $motion-duration-fast;
        will-change: width;
      }
    }

    .songs {
      flex: 1;
      overflow-y: scroll;
      @include mix.scroll-snap-y();

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
          @include mix.scroll-snap-item();
          &.playing,
          &:hover {
            background-color: $module-bg-lighter;
          }
          &.playing {
            .play {
              color: $color-link;
            }
          }
          &.unplayable {
            opacity: 0.3;
          }

          .index {
            padding-left: 1em;
            font-weight: bold;
            color: $color-text-disabled;
          }

          .play {
            text-align: center;
            color: $color-text-disabled;
          }
          &:not(.unplayable) {
            .play:hover {
              color: $color-text;
            }
          }

          .name .text,
          .artist {
            max-width: 80%;
            @include mix.text-overflow();
          }

          .name {
            display: flex;
            align-items: baseline;
            &:hover {
              .text {
                text-decoration: underline;
                color: $color-link;
              }
              .iconfont {
                color: $color-text;
              }
            }

            .text {
              display: inline-block;
              font-weight: bold;
              color: $color-text;
            }
            .iconfont {
              margin-left: $gap-xs;
              font-size: $font-size-small;
              color: $color-text-disabled;
            }
          }

          .artist {
            color: $color-text-secondary;
          }

          .duration {
            text-align: center;
            color: $color-text-divider;
          }
        }
      }
    }
  }
</style>
