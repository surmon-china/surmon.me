<script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'

  const emits = defineEmits(['loadmore'])
  const props = defineProps<{
    loading?: boolean
    finished?: boolean
  }>()

  const element = ref<HTMLDivElement | null>(null)
  const observer = ref<IntersectionObserver | null>(null)
  const emitLoadEvent = () => {
    if (!props.loading && !props.finished) {
      emits('loadmore')
    }
  }

  onMounted(() => {
    if (element.value) {
      observer.value = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            emitLoadEvent()
          }
        },
        { threshold: 0.1 }
      )
      observer.value.observe(element.value)
    }
  })

  onBeforeUnmount(() => {
    if (element.value && observer.value) {
      observer.value.unobserve(element.value)
      observer.value.disconnect()
    }
  })
</script>

<template>
  <div class="loadmore" ref="element">
    <div class="loading-wrapper" key="loading" v-if="loading">
      <slot name="loading"></slot>
    </div>
    <div class="normal-wrapper" key="normal" v-else-if="!finished">
      <slot name="normal"></slot>
    </div>
    <div class="finished-wrapper" key="finished" v-else>
      <slot name="finished"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .loadmore {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
  }
</style>
