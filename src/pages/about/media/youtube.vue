<script lang="ts" setup>
  import { onMounted } from 'vue'
  import { useYouTubePlayListStore } from '/@/stores/media'
  import { getYouTubePlaylistURL } from '/@/transforms/media'
  import { VALUABLE_LINKS } from '/@/config/app.config'

  const youtubeStore = useYouTubePlayListStore()
  onMounted(() => youtubeStore.fetch())
</script>

<template>
  <div class="youtube">
    <span v-if="youtubeStore.fetching"></span>
    <ul v-else class="list">
      <li
        class="item"
        :title="item.snippet.title"
        :key="index"
        v-for="(item, index) in youtubeStore.data.slice(0, 5)"
      >
        <ulink class="link" :href="getYouTubePlaylistURL(item.id)">
          <uimage class="cover" :src="item.snippet.thumbnails.medium.url" />
          <p class="title">
            <span class="text">{{ item.snippet.title }}</span>
          </p>
        </ulink>
      </li>
      <li class="item">
        <ulink class="link more" :href="VALUABLE_LINKS.YOUTUBE_CHANNEL">
          <i class="iconfont icon-youtube"></i>
          <span class="text">•••</span>
        </ulink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .list {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 120px;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 1rem;

    .item {
      position: relative;

      .link {
        display: block;
        width: 100%;
        height: 100%;
        background-color: #000;
        border-radius: $xs-radius;
        overflow: hidden;
        color: $white;
        opacity: 0.8;
        @include visibility-transition();
        &:hover {
          opacity: 1;
          .mask {
            @include visible();
          }
        }

        &.more {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .iconfont {
            font-size: $font-size-h1 * 1.5;
            /* color: $youtube-primary; */
          }
          .text {
            font-size: $font-size-h2;
          }
        }

        .cover {
          margin-top: 10px;
          width: 100%;
          height: 80px;
          object-fit: cover;
        }

        .title {
          height: 30px;
          line-height: 30px;
          margin: 0;
          font-size: $font-size-small;
          text-align: center;

          .text {
            display: inline-block;
            max-width: 80%;
            @include text-overflow();
          }
        }
      }
    }
  }
</style>
