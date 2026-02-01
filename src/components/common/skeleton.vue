<template>
  <div class="skeleton"></div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  $skeleton-animation-from: $module-bg;
  $skeleton-animation-to: $module-bg-darker-3;
  $skeleton-background-color: $module-bg-darker-4;

  @keyframes skeleton-loading {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }

  .skeleton {
    border-radius: $radius-xs;
    background-color: $skeleton-background-color;
    background-image: linear-gradient(
      to right,
      $skeleton-animation-from 25%,
      $skeleton-animation-to 37%,
      $skeleton-animation-from 63%
    );
    background-size: 400% 100%;
    background-repeat: repeat;
    animation-name: skeleton-loading;
    animation-timing-function: ease;
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }
</style>
