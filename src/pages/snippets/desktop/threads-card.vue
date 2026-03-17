<script lang="ts" setup>
  import { type ThreadsMedia as ThreadsMediaType } from '/@/server/getters/threads'
  import ThreadsText from '../threads-text.vue'
  import ThreadsMedia from './threads-media.vue'

  const props = defineProps<{
    media: ThreadsMediaType
  }>()

  const emit = defineEmits<{
    (e: 'click-image', url: string): void
    (e: 'click-video', url: string): void
  }>()
</script>

<template>
  <div class="threads-card">
    <div class="icon-background">
      <i class="iconfont icon-threads"></i>
    </div>
    <div class="header">
      <ulink class="link" :title="media.username" :href="media.permalink">
        {{ media.username }}
      </ulink>
      <div class="timestamp">
        <udate to="ago" :date="media.timestamp" />
      </div>
    </div>
    <div class="body">
      <threads-text class="text" :text="media.text" v-if="!!media.text" />
      <threads-media
        class="media"
        :media-type="media.media_type"
        :media-url="media.media_url"
        :thumbnail-url="media.thumbnail_url"
        @click-image="emit('click-image', $event)"
        @click-video="emit('click-video', $event)"
        v-if="media.media_url"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .threads-card {
    position: relative;
    display: block;
    padding-inline: $gap-sm;
    padding-block: $gap-sm;
    @include mix.radius-box($radius-sm);
    @include mix.common-bg-module($motion-duration-fast);

    .icon-background {
      font-size: 226px;
      position: absolute;
      top: 0;
      right: 0;
      margin-right: -20%;
      margin-top: -50%;
      color: $color-text-divider;
      opacity: 0.1;
    }

    .header {
      margin-bottom: $gap-sm;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .link {
        color: $color-text;
        line-height: 1;
        font-weight: bold;
        font-family: $font-family-monospace;
        &:hover {
          text-decoration: underline;
          text-underline-offset: 4px;
        }
      }

      .timestamp {
        font-size: $font-size-h6;
        color: $color-text-secondary;
      }
    }

    .body {
      .text {
        color: $color-text;
        transition: color $motion-duration-fast;
      }

      .media {
        filter: saturate(0.7) brightness(0.85);
        transition: filter $motion-duration-mid;
      }

      .text + .media {
        margin-top: $gap-xs;
      }
    }

    &:hover {
      .body {
        .text {
          color: $color-link-hover;
        }

        .media {
          filter: saturate(1) brightness(1);
        }
      }
    }
  }
</style>
