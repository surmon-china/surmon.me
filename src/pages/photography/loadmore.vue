<script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'

  enum Event {
    Loadmore = 'loadmore'
  }

  const props = defineProps<{
    loading?: boolean
  }>()

  const emit = defineEmits<{
    (event: Event.Loadmore): void
  }>()

  const element = ref<HTMLDivElement | null>(null)
  const observer = ref<IntersectionObserver | null>(null)
  const emitLoadEvent = () => {
    if (!props.loading) {
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
    <div class="loading" v-if="loading">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <button class="normal" v-else @click="emitLoadEvent">
      <i class="iconfont icon-loadmore"></i>
    </button>
  </div>
</template>

<style lang="scss" scoped>
  @use 'sass:math';
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .loadmore {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    color: $text-disabled;

    .normal {
      font-size: $font-size-h1;
    }

    .loading {
      margin: $sm-gap 0;
      display: flex;
      align-items: center;

      @keyframes loading {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
        100% {
          opacity: 1;
        }
      }

      > div {
        width: 2rem;
        height: 1.4rem;
        margin: 0 $gap;
        border-radius: $mini-radius;
        animation: loading 1s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        &:nth-child(1) {
          background: $module-bg-darker-3;
          animation-delay: -0.6s;
        }
        &:nth-child(2) {
          background: $module-bg-darker-3;
          animation-delay: -0.4s;
        }
        &:nth-child(3) {
          background: $module-bg-darker-4;
          animation-delay: -0.2s;
        }
        &:nth-child(4) {
          background: $module-bg-darker-3;
          animation-delay: -1s;
        }
      }
    }
  }
</style>
