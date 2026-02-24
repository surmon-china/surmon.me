<script lang="ts" setup>
  defineProps<{ loading?: boolean }>()
</script>

<template>
  <placeholder :loading="loading">
    <template #loading>
      <div class="composer-skeleton" key="skeleton">
        <skeleton class="avatar" />
        <skeleton class="content" />
      </div>
    </template>
    <template #default>
      <div class="composer-container" key="container">
        <slot></slot>
      </div>
    </template>
  </placeholder>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  $avatar-size: 3rem;

  .composer-skeleton {
    display: flex;

    .avatar {
      width: $avatar-size;
      height: $avatar-size;
      margin-right: $gap;
    }

    .content {
      flex-grow: 1;
      height: $avatar-size;
    }
  }
</style>
