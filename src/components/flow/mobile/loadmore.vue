<template>
  <div class="loadmore" ref="element">
    <div class="loading" v-if="loading">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <button class="normal" v-else-if="!finished" @click="emitLoadEvent">
      <i class="iconfont icon-loadmore"></i>
    </button>
    <span class="finised" v-else>
      <i18n :k="LanguageKey.ARTICLE_LIST_NO_MORE" />
    </span>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
  import { LanguageKey } from '/@/language'

  enum Event {
    Loadmore = 'loadmore'
  }

  export default defineComponent({
    name: 'MobileFlowLoadmore',
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      finished: {
        type: Boolean,
        default: false
      }
    },
    emits: [Event.Loadmore],
    setup(props, context) {
      const element = ref<HTMLDivElement | null>(null)
      const observer = ref<IntersectionObserver | null>(null)
      const emitLoadEvent = () => {
        if (!props.loading && !props.finished) {
          context.emit(Event.Loadmore)
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

      return {
        LanguageKey,
        element,
        emitLoadEvent
      }
    }
  })
</script>

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
      width: 100%;
      font-size: $font-size-h2;
    }

    .finised {
      margin: $xs-gap 0;
      color: $text-divider;
      font-weight: bold;
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
        width: 0.6rem;
        margin: 0 $sm-gap;
        border-radius: $mini-radius;
        animation: loading 1s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        &:nth-child(1) {
          height: 1.6rem;
          background: $module-bg-darker-3;
          animation-delay: -0.6s;
        }
        &:nth-child(2) {
          height: 1rem;
          background: $module-bg-darker-3;
          animation-delay: -0.4s;
        }
        &:nth-child(3) {
          height: 1rem;
          background: $module-bg-darker-4;
          animation-delay: -0.2s;
        }
        &:nth-child(4) {
          height: 1.6rem;
          background: $module-bg-darker-3;
          animation-delay: -1s;
        }
      }
    }
  }
</style>
