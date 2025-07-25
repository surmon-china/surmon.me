<script lang="ts" setup>
  import { shallowRef, computed, onMounted } from 'vue'
  import type { InstagramMediaItem } from '/@/server/getters/instagram'
  import { TunnelModule } from '/@/constants/tunnel'
  import tunnel from '/@/services/tunnel'

  const props = defineProps<{
    media: InstagramMediaItem
  }>()

  const emit = defineEmits<{
    (e: 'load'): void
  }>()

  const mediaChildren = shallowRef<Array<InstagramMediaItem>>([])
  const fetchMediaChildren = async (mediaId: string) => {
    mediaChildren.value = await tunnel.fetch<Array<InstagramMediaItem>>(TunnelModule.InstagramMediaChildren, {
      id: mediaId
    })
  }

  const activeIndex = shallowRef(0)
  const canGoPrev = computed(() => activeIndex.value > 0)
  const canGoNext = computed(() => activeIndex.value < mediaChildren.value.length - 1)
  const nextSlide = () => {
    if (canGoNext.value) {
      activeIndex.value++
    }
  }
  const prevSlide = () => {
    if (canGoPrev.value) {
      activeIndex.value--
    }
  }

  onMounted(() => {
    fetchMediaChildren(props.media.id).finally(() => emit('load'))
  })
</script>

<template>
  <div class="album-box">
    <div class="navigation prev">
      <button class="button" :disabled="!canGoPrev" @click="prevSlide">
        <i class="iconfont icon-prev" />
      </button>
    </div>
    <div class="navigation next">
      <button class="button" :disabled="!canGoNext" @click="nextSlide">
        <i class="iconfont icon-next" />
      </button>
    </div>
    <div class="pagination">
      <span
        class="index"
        :class="{ active: index === activeIndex + 1 }"
        v-for="index in mediaChildren.length"
        :key="index"
      ></span>
    </div>
    <slot
      name="child"
      v-if="mediaChildren[activeIndex]"
      v-bind="{ activeIndex, activeMedia: mediaChildren[activeIndex] }"
    ></slot>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .album-box {
    position: relative;

    .pagination {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: $z-index-normal + 1;

      .index {
        $size: 8px;
        display: inline-block;
        width: $size;
        height: $size;
        margin: 0 3px;
        border-radius: 100%;
        background-color: $white;
        opacity: 0.4;
        &.active {
          opacity: 1;
        }
      }
    }

    .navigation {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: $z-index-normal + 1;
      &.prev {
        left: $gap-lg;
      }
      &.next {
        right: $gap-lg;
      }

      .button {
        $size: 3rem;
        width: $size;
        height: $size;
        border-radius: 100%;
        background-color: $module-bg;
        transition: all $motion-duration-fast;

        &[disabled] {
          opacity: 0.7;
          color: $color-text-divider;
        }
        &:not([disabled]):hover {
          color: $color-text;
          background-color: $module-bg-darker-1;
        }
      }
    }
  }
</style>
