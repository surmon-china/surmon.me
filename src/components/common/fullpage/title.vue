<template>
  <div class="title" :class="`heading-${level}`">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'FullPageTitle',
    props: {
      level: {
        type: Number,
        default: 3
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .title {
    margin: ($gap * 2) 0;
    height: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    text-transform: uppercase;
    letter-spacing: 5px;
    color: $text;
    @include radius-box($xs-radius);
    &.heading-2 {
      font-size: $font-size-h2;
    }
    &.heading-3 {
      font-size: $font-size-h3;
    }
    &.heading-4 {
      font-size: $font-size-h4;
    }

    .left,
    .right,
    .center {
      display: inline-flex;
      align-items: center;
    }

    .center {
      font-weight: bold;
    }
  }
</style>
