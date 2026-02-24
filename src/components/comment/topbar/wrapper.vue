<script lang="ts" setup>
  const props = defineProps<{
    loading: boolean
    plain: boolean
  }>()
</script>

<template>
  <placeholder :loading="loading">
    <template #loading>
      <div class="topbar-skeleton">
        <div class="left">
          <skeleton class="item count" />
          <skeleton class="item sort" v-if="!plain" />
        </div>
        <div class="right">
          <skeleton class="item user" />
        </div>
      </div>
    </template>
    <template #default>
      <div class="topbar-container" :class="{ plain }">
        <div class="left">
          <slot name="count"></slot>
          <slot name="sort"></slot>
        </div>
        <div class="right">
          <slot name="user"></slot>
        </div>
      </div>
    </template>
  </placeholder>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  $topbar-size: 2em;

  .topbar-skeleton,
  .topbar-container {
    height: $topbar-size;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .topbar-skeleton {
    .left {
      display: flex;
      column-gap: $gap;
    }

    .item {
      height: $topbar-size;

      &.count {
        width: 10rem;
      }
      &.sort {
        width: 6rem;
      }
      &.user {
        width: 6rem;
      }
    }
  }

  .topbar-container {
    #{--topbar-size}: $topbar-size;
    column-gap: $gap-sm;

    .left {
      display: flex;
      flex-shrink: 0;
      column-gap: $gap-sm;
    }

    &.plain {
      flex-wrap: wrap;
      height: auto;
      gap: $gap-sm;
    }
  }
</style>
