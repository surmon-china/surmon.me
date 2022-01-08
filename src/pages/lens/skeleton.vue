<template>
  <ul class="skeletons">
    <div class="item" v-for="item in count" :key="item">
      <skeleton-base />
    </div>
  </ul>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'LensSkeleton',
    props: {
      count: {
        type: Number,
        default: 8
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .skeletons {
    padding: 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: $gap * 2;

    .item {
      height: 243px;
      padding: $gap;
      @include radius-box($sm-radius);
      @include common-bg-module();
    }
  }
</style>
