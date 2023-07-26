<script lang="ts" setup="">
  import { ref, computed } from 'vue'
  import type { InstagramMediaItem } from '/@/server/getters/instagram'

  const props = defineProps<{
    media: InstagramMediaItem
    index: number
    count: number
  }>()

  const embedURL = computed(() => {
    const link = props.media.permalink
    return link.endsWith('/') ? `${link}embed` : `${link}/embed`
  })

  const captionText = computed(() => {
    const text = props.media.caption?.split('#')[0].trim().replaceAll('\n', ' ')
    return (text ? text : props.media.caption) || '-'
  })

  const isLoaded = ref(false)
  const handleIframeLoaded = () => {
    isLoaded.value = true
  }
</script>

<template>
  <div class="instagram-embed">
    <transition name="module">
      <div class="topbar" v-if="isLoaded">
        <div class="left"></div>
        <div class="right">
          <p class="timestamp">
            <udate to="YMDm" :date="media.timestamp" separator="/" />
          </p>
          <p class="caption" :title="media.caption" v-html="captionText"></p>
        </div>
      </div>
    </transition>
    <iframe
      name="ins-embed"
      class="iframe"
      :src="embedURL"
      frameborder="0"
      scrolling="no"
      @load="handleIframeLoaded"
      @error="handleIframeLoaded"
    ></iframe>
    <transition name="module">
      <div class="mask" v-if="isLoaded"></div>
    </transition>
    <transition name="module">
      <div class="loading" v-if="!isLoaded">
        <spin />
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  /* MARK: This attrs should follow the structure of Ins Embed's content */
  $ins-embed-height: 64.6rem;
  $ins-embed-header-height: 54px;
  $ins-embed-header-width: 17rem;

  .instagram-embed {
    position: relative;
    background: $black !important;
    width: 38rem;
    height: $ins-embed-height;

    .topbar {
      position: absolute;
      top: 0;
      left: 0;
      margin: 0;
      width: 100%;
      height: $ins-embed-header-height;
      display: flex;
      pointer-events: none;

      .left {
        width: $ins-embed-header-width;
        flex-shrink: 0;
      }

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        padding: 0 1em;
        overflow: hidden;
        background-color: $white;
        z-index: $z-index-normal + 2;
        pointer-events: all;
      }

      .timestamp {
        margin-bottom: 0.1em;
        font-weight: bold;
        font-size: $font-size-small;
        color: rgba($black, 0.8);
      }

      .caption {
        margin: 0;
        font-size: $font-size-small;
        color: rgba($black, 0.5);
        @include text-overflow();
        max-width: 92%;
      }
    }

    .iframe {
      width: 100%;
      height: 100%;
      border: none;
      overflow: hidden;
    }

    .mask {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 12rem;
      background: linear-gradient(transparent, $white);
      pointer-events: none;
    }

    .loading {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: $z-index-normal + 2;
    }
  }
</style>
