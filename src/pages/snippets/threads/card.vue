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
    <div class="publish">
      <ulink class="link" :title="media.username" :href="media.permalink">
        <i class="iconfont icon-repost" v-if="media.is_quote_post"></i>
        <i class="iconfont icon-threads" v-else></i>
        <span class="username">{{ media.username }}</span>
      </ulink>
      <div class="timestamp">
        <udate to="ago" :date="media.timestamp" />
      </div>
    </div>
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
    <markdown
      class="content"
      compact
      :title="media.text"
      :markdown="media.text"
      :render-options="{ codeLineNumbers: false }"
    />
    <div class="meta">
      <span class="characters">
        <i18n>
          <template #en>{{ media.text?.length ?? 0 }} characters</template>
          <template #zh>共 {{ media.text?.length ?? 0 }} 字</template>
        </i18n>
      </span>
      <span class="type">
        <i class="iconfont icon-repost" v-if="media.is_quote_post"></i>
        <i class="iconfont icon-audio" v-else-if="media.media_type === 'AUDIO'"></i>
        <i class="iconfont icon-video" v-else-if="media.media_type === 'VIDEO'"></i>
        <i class="iconfont icon-image" v-else-if="media.media_type === 'IMAGE'"></i>
        <i class="iconfont icon-album" v-else-if="media.media_type === 'CAROUSEL_ALBUM'"></i>
        <i class="iconfont icon-threads" v-else></i>
        <span class="text">{{ media.media_type }}</span>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .threads-media-card {
    display: block;
    padding: $gap-lg;
    @include mix.common-bg-module($motion-duration-fast);
    &:hover {
      .content {
        color: $color-link;
      }
    }

    .publish {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .link {
        display: inline-flex;
        &:hover {
          .username {
            text-decoration: underline;
            text-underline-offset: 4px;
          }
        }

        .iconfont {
          margin-right: 2px;
        }

        .username {
          color: $color-text;
          font-family: monospace;
          font-weight: bold;
          line-height: 1.2;
        }
      }

      .timestamp {
        font-size: $font-size-small;
        color: $color-text-secondary;
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
      color: $color-text;
    }

    .meta {
      display: flex;
      justify-content: space-between;
      color: $color-text-divider;
      font-size: $font-size-small;

      .type {
        .text {
          margin-left: $gap-xs;
          text-transform: uppercase;
        }
      }
    }
  }
</style>
