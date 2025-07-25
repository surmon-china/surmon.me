<script lang="ts" setup>
  import { onMounted } from 'vue'
  import { useStores } from '/@/stores'
  import { useYouTubePlayListStore } from '/@/stores/media'
  import { getYouTubePlaylistURL } from '/@/transforms/media'
  import { IDENTITIES } from '/@/configs/app.config'

  const { goLink } = useStores()
  const youtubeStore = useYouTubePlayListStore()
  onMounted(() => youtubeStore.fetch().catch(() => []))
</script>

<template>
  <div class="youtube">
    <span v-if="youtubeStore.fetching"></span>
    <empty size="large" bold v-else-if="!youtubeStore.data.length" />
    <ul v-else class="list">
      <li
        class="item"
        :title="item.snippet.title"
        :key="index"
        v-for="(item, index) in youtubeStore.data.slice(0, 5)"
      >
        <ulink class="link" :href="getYouTubePlaylistURL(item.id)">
          <uimage class="cover" proxy :src="item.snippet.thumbnails.medium.url" />
          <span class="count">
            <i class="iconfont icon-video"></i>
            <span class="number">{{ item.contentDetails.itemCount }}</span>
          </span>
          <p class="title">
            <i class="iconfont icon-playlist"></i>
            <span class="text">{{ item.snippet.title }}</span>
          </p>
          <div class="mask">
            <i class="iconfont icon-eye"></i>
          </div>
        </ulink>
      </li>
      <li class="item">
        <ulink class="link more" :href="goLink.map.youtube">
          <i class="iconfont icon-youtube"></i>
          <span class="username">{{ IDENTITIES.YOUTUBE_CHANNEL_SHORT_ID }}</span>
          <span class="text">•••</span>
        </ulink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 1rem;

    .item {
      position: relative;
      overflow: hidden;

      .link {
        $cover-size: 6.8rem;
        $title-size: 2.6rem;
        display: block;
        height: $cover-size + $title-size;
        background-color: $module-bg-darker-1;
        border-radius: $radius-xs;
        overflow: hidden;
        opacity: 0.8;
        @include mix.visibility-transition();
        &:hover {
          opacity: 1;
          .mask {
            @include mix.visible();
          }
        }

        .count {
          position: absolute;
          top: $gap-sm;
          right: $gap-sm;
          height: 1.8rem;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          padding: 0 $gap-xs;
          border-radius: $radius-sm;
          background-color: rgba(#000, 0.3);
          font-size: $font-size-root;
          z-index: $z-index-normal + 1;
          color: $white;

          .number {
            margin-left: $gap-xs;
            font-weight: bold;
          }
        }

        .cover {
          width: 100%;
          height: $cover-size;
          object-fit: cover;
          background-color: $module-bg-darker-2;
        }

        .title {
          display: flex;
          align-items: center;
          margin: 0;
          padding: 0 1em;
          height: $title-size;
          line-height: $title-size;
          font-size: $font-size-small;

          .iconfont {
            margin-right: $gap-xs;
          }

          .text {
            font-weight: bold;
            @include mix.text-overflow();
          }
        }

        .mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: $cover-size;
          display: flex;
          justify-content: center;
          align-items: center;
          color: $white;
          font-size: $font-size-h2;
          background-color: rgba(0, 0, 0, 0.3);
          @include mix.visibility-transition();
          @include mix.hidden();
        }

        &.more {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .iconfont {
            line-height: 1;
            font-size: $font-size-h1 * 1.5;
            color: $youtube-primary;
          }
          .username {
            font-weight: bold;
            &:first-letter {
              font-family: system-ui;
            }
          }

          .text {
            font-size: $font-size-h2;
          }
        }
      }
    }
  }
</style>
