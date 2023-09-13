<script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'

  enum Event {
    Loadmore = 'loadmore'
  }

  const props = defineProps<{
    loading?: boolean
    finished?: boolean
  }>()

  const emit = defineEmits<{
    (event: Event.Loadmore): void
  }>()

  const element = ref<HTMLDivElement | null>(null)
  const observer = ref<IntersectionObserver | null>(null)
  const emitLoadEvent = () => {
    if (!props.loading && !props.finished) {
      emit(Event.Loadmore)
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
    <div class="loading-wrapper" v-if="loading">
      <slot name="loading"></slot>
    </div>
    <div class="normal-wrapper" v-else-if="!finished">
      <slot name="normal"></slot>
    </div>
    <div class="finished-wrapper" v-else>
      <slot name="finished"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .loadmore {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
  }
</style>
