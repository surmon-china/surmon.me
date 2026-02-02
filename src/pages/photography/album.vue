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
    fetchMediaChildren(props.media.id).then(() => emit('load'))
  })
</script>

<template>
  <div class="album-box">
    <div class="navigation">
      <button class="button" :disabled="!canGoPrev" @click="prevSlide">
        <i class="iconfont icon-prev" />
      </button>
      <span class="page">{{ activeIndex + 1 }} / {{ mediaChildren.length }}</span>
      <button class="button" :disabled="!canGoNext" @click="nextSlide">
        <i class="iconfont icon-next" />
      </button>
    </div>
    <slot
      name="content"
      v-bind="{ activeIndex, activeMedia: mediaChildren[activeIndex], ghostMedia: mediaChildren[0] }"
    ></slot>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .album-box {
    position: relative;

    .navigation {
      position: absolute;
      bottom: 2rem;
      right: 2rem;
      z-index: $z-index-normal + 1;
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: rgba(255, 255, 255, 0.7);

      .button {
        $size: 1.4rem;
        width: $size;
        height: $size;
        font-size: $font-size-h5;
        transition: color $motion-duration-fast;
        &[disabled] {
          color: rgba(255, 255, 255, 0.3);
        }
        &:not([disabled]):hover {
          color: rgba(255, 255, 255, 1);
        }
      }

      .page {
        font-weight: bold;
        margin-inline: $gap-xs;
      }
    }
  }
</style>
