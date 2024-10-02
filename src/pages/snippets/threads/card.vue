<script lang="ts" setup>
  import { computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { useCountry } from '/@/app/context'
  import { isCNCode } from '/@/transforms/region'
  import { getProxyURL } from '/@/transforms/url'
  import type { ThreadsMedia } from '/@/server/getters/threads'
  import Markdown from '/@/components/common/markdown.vue'

  const props = defineProps<{
    media: ThreadsMedia
    showIcon?: boolean
  }>()

  const emit = defineEmits<{
    (e: 'click-image', url: string): void
  }>()

  const { cdnDomain } = useEnhancer()
  const mediaUrl = computed(() => {
    const url = props.media.media_url
    if (!url) return null
    const countryCode = useCountry()
    const isCNUser = isCNCode(countryCode ?? '')
    return isCNUser ? getProxyURL(cdnDomain, url) : url
  })
</script>

<template>
  <div class="threads-media-card">
    <div class="media" :class="{ audio: media.media_type === 'AUDIO' }" v-if="mediaUrl">
      <audio class="audio" :src="mediaUrl" controls v-if="media.media_type === 'AUDIO'" />
      <video class="video" :src="mediaUrl" controls v-else-if="media.media_type === 'VIDEO'" />
      <img
        class="image"
        :alt="media.text"
        :src="mediaUrl"
        loading="lazy"
        draggable="false"
        @click="emit('click-image', mediaUrl)"
        v-else
      />
    </div>
    <div class="content">
      <span class="icon" v-if="!mediaUrl && showIcon">
        <i class="iconfont icon-repost" v-if="media.is_quote_post"></i>
        <i class="iconfont icon-audio" v-else-if="media.media_type === 'AUDIO'"></i>
        <i class="iconfont icon-video" v-else-if="media.media_type === 'VIDEO'"></i>
        <i class="iconfont icon-image" v-else-if="media.media_type === 'IMAGE'"></i>
        <i class="iconfont icon-album" v-else-if="media.media_type === 'CAROUSEL_ALBUM'"></i>
        <i class="iconfont icon-threads" v-else></i>
      </span>
      <markdown class="text" compact :markdown="media.text" :title="media.text" />
    </div>
    <div class="info">
      <div class="left">
        <span class="item">
          <i class="iconfont icon-clock-outlined"></i>
          <udate to="ago" :date="media.timestamp" />
        </span>
      </div>
      <ulink class="right" :title="media.username" :href="media.permalink">
        <i class="iconfont icon-threads"></i>
        {{ media.username }}
      </ulink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '/src/styles/variables.scss';
  @import '/src/styles/mixins.scss';

  .threads-media-card {
    display: block;
    padding: $gap-lg;
    @include common-bg-module($motion-duration-fast);
    &:hover {
      .text {
        color: $color-link;
      }
    }

    .media {
      margin-bottom: $gap-sm;
      &:not(.audio) {
        background-color: $module-bg-darker-1;
      }

      .image,
      .video,
      .audio {
        width: 100%;
        border-radius: $radius-xs;
      }

      .audio::-webkit-media-controls-enclosure {
        border-radius: $radius-xs;
      }

      .image {
        cursor: pointer;
      }
    }

    .content {
      margin-bottom: $gap-sm;

      .icon {
        color: $color-text-divider;
        display: inline;
        float: left;
        line-height: 2;
        margin-right: $gap-sm;
      }

      .text {
        line-height: 1.72;
        color: $color-text;
      }
    }

    .info {
      display: flex;
      justify-content: space-between;
      color: $color-text-secondary;
      font-size: $font-size-small;

      .left {
        .item {
          display: inline-flex;
          align-items: center;
          margin-right: $gap * 2;
          .iconfont {
            margin-right: $gap-sm;
          }
        }
      }

      .right {
        display: inline-flex;
        align-items: center;
        color: $color-link;
      }
    }
  }
</style>
