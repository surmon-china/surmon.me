<script lang="ts" setup>
  const props = defineProps<{
    animating?: boolean
    danger?: boolean
  }>()
</script>

<template>
  <div class="assistant-bubble-wrapper" :class="{ animating, danger }">
    <slot></slot>
  </div>
</template>

<style lang="css">
  @property --ai-assistant-bubble-background-angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  @keyframes ai-assistant-bubble-border-rotate {
    to {
      --ai-assistant-bubble-background-angle: 360deg;
    }
  }
</style>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .assistant-bubble-wrapper {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: $radius-md;
      border-top-left-radius: $radius-tiny;
      padding: 1px;
      pointer-events: none;
      background: $ai-primary-gradient;
      mask:
        conic-gradient(#000 0 0) content-box,
        conic-gradient(#000 0 0);
      mask-composite: exclude;
    }

    &.animating {
      &::before {
        animation: ai-assistant-bubble-border-rotate 1.6s linear infinite;
        background: conic-gradient(
          from var(--ai-assistant-bubble-background-angle),
          $ai-primary-red,
          $ai-primary-blue,
          $ai-primary-green,
          $ai-primary-red
        );
      }
    }

    &.danger {
      &::before {
        animation: none;
        background: $red;
      }
    }
  }
</style>
