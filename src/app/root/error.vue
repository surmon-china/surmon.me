<script lang="ts" setup>
  import { useEnhancer } from '/@/app/enhancer'
  import { LocaleKey } from '/@/locales'
  import type { AppError } from '../error'

  const props = defineProps<{
    error: AppError
  }>()

  const emit = defineEmits<{
    (e: 'resolve'): void
  }>()

  const { isDarkTheme } = useEnhancer()
  const handleResolveRoute = () => {
    emit('resolve')
  }
</script>

<template>
  <div class="app-error" :class="{ dark: isDarkTheme }">
    <h1 class="code">{{ props.error.code }}</h1>
    <h3 class="message">
      <template v-if="props.error.message">{{ props.error.message }}</template>
      <i18n v-else :k="LocaleKey.NOT_FOUND" />
    </h3>
    <p class="link" @click="handleResolveRoute">
      <slot name="resolve-text" />
    </p>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .app-error {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    overflow: hidden;
    z-index: $z-index-top;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: $module-bg;
    &.dark {
      background-color: $module-bg-opaque;
      .message {
        color: $color-text-darker;
      }
    }

    @keyframes error-item {
      0% {
        opacity: 0;
        transform: translate3d(0, -30%, 0);
      }
      100% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }

    .code,
    .link,
    .message {
      color: $color-text-secondary;
      animation: error-item ease-out both 0.6s $motion-duration-mid;
    }

    @keyframes code-wave {
      0% {
        opacity: 0;
        background-position-y: 5rem;
      }
      100% {
        opacity: 1;
        background-position-y: 0;
      }
    }

    @keyframes code-wave-play {
      0% {
        background-position-x: 14%;
      }
      100% {
        background-position-x: 100%;
      }
    }

    .code {
      text-transform: uppercase;
      font-size: 12em;
      font-weight: normal;
      margin: 0;
      background-image: global.surl('/images/page-error/wave.png');
      background-size: cover;
      background-repeat: repeat-x;
      background-position: center;
      -webkit-background-clip: text;
      color: rgba(funs.darken($white, 30%), 20%);
      animation:
        error-item ease-out both 0.6s $motion-duration-mid,
        code-wave ease-out both 0.6s $motion-duration-mid,
        code-wave-play linear 2s infinite;
    }

    .message {
      font-weight: bold;
      color: $color-text-divider;
      margin-top: 0;
      margin-bottom: 2rem;
    }

    .link {
      cursor: pointer;
      color: $color-text-divider;
      margin-bottom: 4rem;
      @include mix.text-underline(0.5em);
      @include mix.color-transition();
      &:hover {
        color: $color-text-darker;
      }
    }
  }
</style>
