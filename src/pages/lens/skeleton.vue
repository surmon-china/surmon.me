<template>
  <ul class="skeletons" :style="{ gridTemplateColumns: `repeat(${columns}, 1fr)` }">
    <div class="item" :style="{ height: `${height}px` }" v-for="item in columns * rows" :key="item">
      <skeleton-base />
    </div>
  </ul>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'LensSkeleton',
    props: {
      columns: {
        type: Number,
        required: true
      },
      rows: {
        type: Number,
        default: 2
      },
      height: {
        type: Number,
        required: true
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .skeletons {
    padding: 0;
    display: grid;
    grid-gap: $gap * 2;

    .item {
      padding: $gap;
      @include radius-box($sm-radius);
      @include common-bg-module();
    }
  }
</style>
