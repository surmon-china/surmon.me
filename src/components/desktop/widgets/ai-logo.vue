<script lang="ts" setup>
  import { useEnhancer } from '/@/app/enhancer'
  import { LocalesKey } from '/@/locales'

  defineProps({
    animation: {
      type: Boolean,
      default: false
    }
  })

  const { i18n: _i18n } = useEnhancer()
</script>

<template>
  <div class="ai-logo" :class="{ animation }">
    <uimage
      class="image"
      :alt="_i18n.t(LocalesKey.AI_ASSISTANT_NAME)"
      src="/images/ai-agent/cybermonk-white.png"
      :cdn="true"
    />
  </div>
</template>

<style lang="scss" scoped>
  @keyframes zen-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes zen-breath {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }

  .ai-logo {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    &.animation {
      animation: zen-breath 4s ease-in-out infinite;
      .image {
        animation: zen-spin 24s linear infinite;
      }
    }
    &:hover {
      animation-play-state: paused;
      opacity: 1 !important;
    }

    .image {
      width: 80%;
      height: auto;
    }
  }
</style>
